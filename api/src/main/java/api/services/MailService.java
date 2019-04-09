package api.services;

import api.exceptions.BadRequestException;
import api.exceptions.NoAuthenticationDetailsProvidedException;
import api.exceptions.ResourceNotFoundException;
import api.models.*;
import api.repositories.FolderRepository;
import api.repositories.MessageRepository;
import com.sun.mail.imap.IMAPFolder;
import ml.FeatureExtractor;
import org.encog.Encog;
import org.encog.ml.data.MLData;
import org.encog.ml.data.versatile.NormalizationHelper;
import org.encog.neural.networks.BasicNetwork;
import org.encog.util.obj.SerializeObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import utils.MessageContentUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.StreamSupport;

import static java.lang.Math.toIntExact;

@Service
public class MailService {

    private AccountAuthService accountAuthService;
    private AccountService accountService;
    private MessageRepository messageRepository;
    private FolderRepository folderRepository;

    private BasicNetwork classifier;
    private NormalizationHelper normHelper;

    public MailService(@Autowired AccountAuthService accountAuthService,
                       @Autowired AccountService accountService,
                       @Autowired MessageRepository messageRepository,
                       @Autowired FolderRepository folderRepository) {
        this.accountAuthService = accountAuthService;
        this.accountService = accountService;
        this.messageRepository = messageRepository;
        this.folderRepository = folderRepository;

        try {
            File classifier = new ClassPathResource("classifier", this.getClass().getClassLoader()).getFile();
            this.classifier = (BasicNetwork) SerializeObject.load(classifier);

            File normaliser = new ClassPathResource("normaliser", this.getClass().getClassLoader()).getFile();
            this.normHelper = (NormalizationHelper) SerializeObject.load(normaliser);
        } catch (IOException | ClassNotFoundException e) {
            Encog.getInstance().shutdown();
            System.exit(1);
        }
    }

    public Store connect(String accountId) {
        Account account = getAccount(accountId);

        Store currentStore = this.accountAuthService.getStore(account.getId());
        if (currentStore != null && currentStore.isConnected()) {
            return currentStore;
        }

        ConnectionSettings settings = account.getConnectionSettings();
        Properties props = new Properties();
        props.put("mail.imap.partialfetch", "false");

        String password = this.accountAuthService.getPassword(account.getId());
        if (password == null) {
            throw new NoAuthenticationDetailsProvidedException();
        }

        // if it's Gmail we need to use the refresh token to get the access token
        if (account.getProvider().equals("gmail.com")) {
            try {
                password = accountAuthService.refreshOAuth(password);
            } catch (IOException e) {
                return null;
            }

            props.put("mail.imap.auth.mechanisms", "XOAUTH2");
            props.put("mail.smtp.auth.mechanisms", "XOAUTH2");
        }

        if (settings.getImapSecurity().equals("SSL / TLS")) {
            props.put("mail.imap.ssl.enable", "true");
        }

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", settings.getSmtpHost());
        props.put("mail.smtp.port", settings.getSmtpPort());

        if (settings.getSmtpSecurity().equals("SSL / TLS")) {
            props.put("mail.smtp.ssl.enable", "true");
        } else if (settings.getSmtpSecurity().equals("STARTTLS")) {
            props.put("mail.smtp.starttls.enable", "true");
        }

        try {
            Session session = Session.getInstance(props);
            Store store = session.getStore("imap");
            store.connect(settings.getImapHost(), Integer.valueOf(settings.getImapPort()), account.getEmail(), password);

            this.accountAuthService.addSession(account.getId(), session);
            this.accountAuthService.addStore(account.getId(), store);
            return store;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public LocalResponse getLocal(String id) {
        List<DetailedFolder> folders = this.folderRepository.findAllByAccount_Id(id);
        List<DetailedMessage> messages = this.messageRepository.findAllByAccount_Id(id);

        return new LocalResponse(folders, messages);
    }

    public DetailedMessage getMessageByUid(Long uid) {
        return this.messageRepository.findById(uid).orElse(null);
    }

    public boolean getOlderMessages(String accountId, Long limit) {
        return updateMessages(accountId, limit);
    }

    public boolean update(String accountId) {
        return updateFolders(accountId) && updateMessages(accountId, -1L);
    }

    private boolean updateFolders(String accountId) {
        Store store = connect(accountId);
        Iterable<DetailedFolder> knownFolders = this.folderRepository.findAllByAccount_Id(accountId);

        try {
            // Gmail has a parent folder [Gmail]. To get all subfolders (sent, drafts etc) we need to use the wildcard.
            Folder[] fs = store.getDefaultFolder().list("*");

            for (Folder f : fs) {
                if ((f.getType() & javax.mail.Folder.HOLDS_MESSAGES) != 0) {
                    String name = f.getFullName();
                    DetailedFolder df = StreamSupport.stream(knownFolders.spliterator(), false).filter(x -> x.getName().equals(name)).findAny().orElse(null);

                    if (df == null) {
                        Account account = getAccount(accountId);
                        df = new DetailedFolder(name, f.getUnreadMessageCount(), 0L, Long.MAX_VALUE, account);
                    } else {
                        df.setUnread(f.getUnreadMessageCount());
                    }

                    this.folderRepository.save(df);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    private boolean updateMessages(String accountId, Long limit) {
        Account account = getAccount(accountId);
        Store store = connect(accountId);

        final AtomicBoolean newMessagesResult = new AtomicBoolean(true);
        final AtomicBoolean existingMessagesResult = new AtomicBoolean(true);

        List<DetailedFolder> dfs = this.folderRepository.findAllByAccount_Id(accountId);

        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);

        dfs.stream().parallel().forEach(df -> {
            try {
                Folder f = store.getFolder(df.getName());

                if (f == null) {
                    // folder deleted so remove it
                    this.folderRepository.delete(df);
                    return;
                }

                f.open(Folder.READ_ONLY);
                UIDFolder uf = (UIDFolder) f;
                Long latestUid = uf.getUIDNext() - 1;

                if (df.getLatestUid() > 0L) {
                    existingMessagesResult.weakCompareAndSet(true, processExistingMessages(account, df, f));
                }

                if (df.getLatestUid().equals(0L) || df.getLatestUid() < latestUid || limit > 0L) {
                    Message[] messages = f.getMessages();
                    f.fetch(messages, fp);

                    List<Long> validUids = new LinkedList<>();
                    for (Message m : messages) {
                        validUids.add(uf.getUID(m));
                    }

                    if (validUids.size() > 0) {
                        Long max = uf.getUIDNext() - 1;

                        if (limit < 0L) {
                            Long min;
                            if (validUids.size() < 50) {
                                // don't have 50 so get the first element
                                min = validUids.get(0);
                            } else {
                                // otherwise get the 50th from the end as the minimum
                                min = validUids.get(validUids.size() - 51);
                            }

                            newMessagesResult.weakCompareAndSet(true, processNewMessages(account, df, f, min, max));
                        } else {
                            Long min;
                            if (validUids.size() < limit) {
                                // don't have 50 so get the first element
                                min = validUids.get(0);
                            } else {
                                // otherwise get the limit as min
                                Long currentOldest = df.getOldestUid();
                                int currentLow = validUids.indexOf(currentOldest);

                                if (currentLow < limit) {
                                    min = validUids.get(0);
                                } else {
                                    min = validUids.get(toIntExact(currentLow - limit));
                                }
                            }

                            newMessagesResult.weakCompareAndSet(true, processNewMessages(account, df, f, min, max));
                        }
                    }
                }

                f.close();
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        });

        return newMessagesResult.get() && existingMessagesResult.get();
    }

    private boolean processNewMessages(Account account, DetailedFolder df, Folder f, Long min, Long max) {
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);
        fp.add(IMAPFolder.FetchProfileItem.MESSAGE);

        List<DetailedMessage> detailedMessages = new ArrayList<>();
        AtomicBoolean successful = new AtomicBoolean(true);

        try {
            UIDFolder uf = (UIDFolder) f;

            Message[] messages = f.getMessages();
            if (messages.length == 0) {
                return true;
            }

            Long minUid = uf.getUID(messages[0]);
            min = min > minUid ? min : minUid;

            messages = uf.getMessagesByUID(min, max);
            f.fetch(messages, fp);

            for (Message m : messages) {
                try {
                    DetailedMessage dm = processNewMessage(account, m, df, uf);

                    if (dm != null) {
                        detailedMessages.add(dm);
                    }
                } catch (IOException | MessagingException e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            successful.set(false);
        }

        if (detailedMessages.size() > 0) {
            if (df.getOldestUid() > detailedMessages.get(0).getUid()) {
                df.setOldestUid(detailedMessages.get(0).getUid());
            }

            if (df.getLatestUid() < detailedMessages.get(detailedMessages.size() - 1).getUid()) {
                df.setLatestUid(detailedMessages.get(detailedMessages.size() - 1).getUid());
            }
        }

        this.messageRepository.saveAll(detailedMessages);
        this.folderRepository.save(df);
        return successful.get();
    }

    private DetailedMessage processNewMessage(Account account, Message m, DetailedFolder df, UIDFolder uf)
            throws MessagingException, IOException {
        Long messageUid = uf.getUID(m);

        Integer messageNumber = m.getMessageNumber();
        long received = m.getReceivedDate().getTime();

        String sender = m.getFrom() != null && m.getFrom().length > 0 ? m.getFrom()[0].toString() : "Unknown Sender";

        ArrayList<String> to = new ArrayList<>();
        Address[] toArr = m.getRecipients(Message.RecipientType.TO);
        if (toArr != null) {
            for (Object a : toArr) {
                to.add(a.toString());
            }
        }

        ArrayList<String> cc = new ArrayList<>();
        Address[] ccArr = m.getRecipients(Message.RecipientType.CC);
        if (ccArr != null) {
            for (Object a : ccArr) {
                to.add(a.toString());
            }
        }

        String subject = m.getSubject();
        Boolean seen = m.isSet(Flags.Flag.SEEN);

        // Extract features from the Message
        FeatureExtractor fe = new FeatureExtractor(m);
        fe.extractFeatures();
        Map<String, Object> features = fe.getValues();

        // Normalise the features
        String[] data = new String[24];
        int i = 0;
        for (Map.Entry<String, Object> entry : features.entrySet()) {
            data[i] = String.valueOf(entry.getValue());
            i++;
        }
        MLData input = normHelper.allocateInputVector();
        normHelper.normalizeInputVector(data, input.getData(), false);

        // Classify and determine result
        MLData output = this.classifier.compute(input);
        String predictedClass = this.normHelper.denormalizeOutputVectorToString(output)[0];

        Boolean phishing = predictedClass.equals("phishing");

        Enumeration<Header> headersObjs = m.getAllHeaders();
        ArrayList<SerializableHeader> headers = new ArrayList<>();
        while (headersObjs.hasMoreElements()) {
            Header h = headersObjs.nextElement();
            SerializableHeader header = new SerializableHeader(h.getName(), h.getValue());
            headers.add(header);
        }

        String content;
        try {
            content = MessageContentUtils.getMessageContent(m);
        } catch (UnsupportedEncodingException e) {
            content = "Could not display content.";
        }

        DetailedMessage d = new DetailedMessage(messageUid, messageNumber, headers, received, sender, to, cc, subject,
                seen, phishing, content, df);
        d.setAccount(account);
        return d;
    }

    private boolean processExistingMessages(Account account, DetailedFolder df, Folder f) {
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);
        fp.add(IMAPFolder.FetchProfileItem.FLAGS);

        List<DetailedMessage> knownMessages = this.messageRepository.findAllByFolder_Id(df.getId());
        if (knownMessages.size() == 0) {
            return true;
        }
        Long firstUid = knownMessages.get(0).getUid();

        List<DetailedMessage> toBeDeletedLocally = new ArrayList<>();
        List<DetailedMessage> toBeSetSeenLocally = new ArrayList<>();

        AtomicBoolean successful = new AtomicBoolean(true);

        try {
            UIDFolder uf = (UIDFolder) f;
            Message[] messages = uf.getMessagesByUID(firstUid, df.getLatestUid());
            f.fetch(messages, fp);

            for (Message m : messages) {
                try {
                    Long uid = uf.getUID(m);

                    DetailedMessage dm = this.messageRepository.findById(uid).orElse(null);
                    if (dm == null) {
                        dm = processNewMessage(account, m, df, uf);
                    }

                    if (m.isSet(Flags.Flag.DELETED)) {
                        toBeDeletedLocally.add(dm);
                    } else if (m.isSet(Flags.Flag.SEEN)) {
                        dm.setSeen(true);
                        toBeSetSeenLocally.add(dm);
                    }

                    knownMessages.remove(dm); // remove from unprocessed list
                } catch (IOException | MessagingException e) {
                    e.printStackTrace();
                }
            }

            this.messageRepository.deleteAll(knownMessages); // message not found so probably deleted on another client
        } catch (Exception e) {
            successful.set(false);
        } finally {
            this.messageRepository.deleteAll(toBeDeletedLocally);
            this.messageRepository.saveAll(toBeSetSeenLocally);
        }

        return successful.get();
    }

    public boolean deleteMessage(String accountId, Long uid) {
        try {
            Message toBeDeleted = getMessage(accountId, uid);
            if (toBeDeleted != null) {
                // hasn't already been deleted
                toBeDeleted.setFlag(Flags.Flag.DELETED, true);
            }

            // remove it from local store
            DetailedMessage msg = getLocalMessage(accountId, uid);
            this.messageRepository.delete(msg);
        } catch (MessagingException e) {
            return false;
        }

        return true;
    }

    public boolean markRead(String accountId, Long uid) {
        try {
            Message toBeMarkedRead = getMessage(accountId, uid);
            toBeMarkedRead.setFlag(Flags.Flag.SEEN, true);

            DetailedMessage msg = getLocalMessage(accountId, uid);
            msg.setSeen(true);
            this.messageRepository.save(msg);

            DetailedFolder folder = msg.getFolder();
            folder.setUnread(folder.getUnread() - 1);
            this.folderRepository.save(folder);
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public boolean sendMessage(String accountId, NewMessageInfo info) {
        Account account = getAccount(accountId);
        Session session = this.accountAuthService.getSession(accountId);

        try {
            Message message;
            if (info.getReply()) {
                Message temp = getMessage(accountId, info.getReplyTo());
                message = temp.reply(info.getReplyAll());
            } else {
                message = new MimeMessage(session);
            }

            message.setFrom(new InternetAddress(account.getEmail()));
            info.getTo().forEach(t -> {
                try {
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(t));
                } catch (MessagingException e) {
                    throw new BadRequestException();
                }
            });
            info.getCc().forEach(t -> {
                try {
                    message.addRecipient(Message.RecipientType.CC, new InternetAddress(t));
                } catch (MessagingException e) {
                    throw new BadRequestException();
                }
            });

            message.setSubject(info.getSubject());
            message.setContent(info.getContent(), "text/html");

            String password = this.accountAuthService.getPassword(account.getId());
            Transport.send(message, account.getEmail(), password);
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public void deleteAllByAccount(String accountId) {
        this.folderRepository.deleteAllByAccount_Id(accountId);
        this.messageRepository.deleteAllByAccount_Id(accountId);
    }

    private Message getMessage(String accountId, Long uid) {
        DetailedMessage msg = getLocalMessage(accountId, uid);

        Store store = connect(msg.getAccount().getId());
        try {
            Folder f = store.getFolder(msg.getFolder().getName());
            UIDFolder uf = (UIDFolder) f;
            f.open(Folder.READ_WRITE);

            return uf.getMessageByUID(msg.getUid());
        } catch (MessagingException e) {
            throw new ResourceNotFoundException();
        }
    }

    private DetailedMessage getLocalMessage(String accountId, Long uid) {
        DetailedMessage msg = this.messageRepository.findAllByAccount_Id(accountId).stream()
                .filter(m -> m.getUid().equals(uid))
                .findFirst()
                .orElse(null);

        if (msg == null) {
            throw new ResourceNotFoundException();
        }

        return msg;
    }

    private Account getAccount(String accountId) {
        Account account = this.accountService.getAccountById(accountId);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

        return account;
    }
}
