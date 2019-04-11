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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

/**
 * Service to facilitate interacting with external IMAP and SMTP servers. Handles creating,
 * updating, deleting, and retrieving locally stored folders and messages to be sent back
 * to the client.
 *
 * @author mattgogerly
 */
@Service
public class MailService {

    private Logger logger = LoggerFactory.getLogger(MailService.class);

    private AccountAuthService accountAuthService;
    private AccountService accountService;
    private MessageRepository messageRepository;
    private FolderRepository folderRepository;

    private BasicNetwork classifier;
    private NormalizationHelper normHelper;

    /**
     * Create a new MailService. Tries to load the classifier and data normaliser from the classpath. If either
     * are missing then we just exit because there's no point continuing.
     *
     * @param accountAuthService AccountAuthService for getting auth info. Autowired by SpringBoot.
     * @param accountService AccountService for getting Accounts. Autowired by SpringBoot.
     * @param messageRepository MessageRepository is a CRUD interface for messages in the database. Autowired by SpringBoot.
     * @param folderRepository FolderRepository is a CRUD interface for folders in the database. Autowired by SpringBoot.
     */
    public MailService(@Autowired AccountAuthService accountAuthService,
                       @Autowired AccountService accountService,
                       @Autowired MessageRepository messageRepository,
                       @Autowired FolderRepository folderRepository) {
        this.accountAuthService = accountAuthService;
        this.accountService = accountService;
        this.messageRepository = messageRepository;
        this.folderRepository = folderRepository;

        try {
            // try and load both the classifier and the normaliser
            File classifier = new ClassPathResource("classifier", this.getClass().getClassLoader()).getFile();
            this.classifier = (BasicNetwork) SerializeObject.load(classifier);

            File normaliser = new ClassPathResource("normaliser", this.getClass().getClassLoader()).getFile();
            this.normHelper = (NormalizationHelper) SerializeObject.load(normaliser);
        } catch (IOException | ClassNotFoundException e) {
            // if either is missing we can't continue, so exit
            logger.error("Failed to load classifier or normaliser, exiting...");
            Encog.getInstance().shutdown();
            System.exit(1);
        }
    }

    /**
     * Try and connect to an IMAP/SMTP server. If we already have an active connection then we return that
     * instead, since connecting is expensive and can result in being rate limited.
     *
     * @param accountId Id of the Account we're connecting to
     * @return JavaMail Store object we can use to interact with the server
     */
    public Store connect(String accountId) {
        Account account = getAccount(accountId);

        // if we have an active Store just return that
        Store currentStore = this.accountAuthService.getStore(account.getId());
        if (currentStore != null && currentStore.isConnected()) {
            return currentStore;
        }

        // get the connection settings from the Account
        ConnectionSettings settings = account.getConnectionSettings();

        Properties props = new Properties();
        props.put("mail.imap.partialfetch", "false"); // Exchange bug: https://javaee.github.io/javamail/docs/NOTES.txt

        // try and get the password - if it hasn't been set then exit
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

            // Gmail uses XOAUTH2
            props.put("mail.imap.auth.mechanisms", "XOAUTH2");
            props.put("mail.smtp.auth.mechanisms", "XOAUTH2");
        }

        // enable SSL/TLS if supported
        if (settings.getImapSecurity().equals("SSL / TLS")) {
            props.put("mail.imap.ssl.enable", "true");
        }

        props.put("mail.smtp.auth", "true"); // auth is obviously required
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

            // store the Session and Store so we can reuse them
            this.accountAuthService.addSession(account.getId(), session);
            this.accountAuthService.addStore(account.getId(), store);
            return store;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return null;
        }
    }

    /**
     * Gets folders and messages that we have previously stored in the database.
     *
     * @param id Id of the Account
     * @return LocalResponse object containing folders and messages
     */
    public LocalResponse getLocal(String id) {
        List<DetailedFolder> folders = this.folderRepository.findAllByAccount_Id(id);
        List<DetailedMessage> messages = this.messageRepository.findAllByAccount_Id(id);

        return new LocalResponse(folders, messages);
    }

    /**
     * Gets a message from the database by its UID.
     *
     * @param uid UID of the message
     * @return DetailedMessage if it exists or otherwise null
     */
    public DetailedMessage getMessageByUid(Long uid) {
        return this.messageRepository.findById(uid).orElse(null);
    }

    /**
     * Get up to <i>limit</i> messages older than the oldest local message for each folder.
     *
     * @param accountId Id of the Account
     * @param limit Maximum number of messages to get
     * @return True if successful or false otherwise
     */
    public boolean getOlderMessages(String accountId, Long limit) {
        return updateMessages(accountId, limit);
    }

    /**
     * Get updates from the server. Fetches new messages that have arrived since we last connected
     * and checks that known messages haven't had flags changed (i.e. read or deleted).
     *
     * @param accountId Id of the Account
     * @return True if successful or false otherwise
     */
    public boolean update(String accountId) {
        // limit is -1 to prevent older messages
        return updateFolders(accountId) && updateMessages(accountId, -1L);
    }

    /**
     * Gets updates to folders since last check. Retrieves latest unread message count, deletes removed folders
     * and adds new ones.
     *
     * @param accountId Id of the Account
     * @return True if successful or false otherwise
     */
    private boolean updateFolders(String accountId) {
        Store store = connect(accountId);
        Iterable<DetailedFolder> knownFolders = this.folderRepository.findAllByAccount_Id(accountId);

        try {
            // Gmail has a parent folder [Gmail]. To get all subfolders (sent, drafts etc) we need to use the wildcard.
            Folder[] fs = store.getDefaultFolder().list("*");

            // for every folder on the server
            for (Folder f : fs) {
                // if the folder doesn't hold messages we don't care about it
                if ((f.getType() & javax.mail.Folder.HOLDS_MESSAGES) != 0) {
                    String name = f.getFullName();

                    // get the local folder if it exists
                    DetailedFolder df = StreamSupport.stream(knownFolders.spliterator(), false)
                            .filter(x -> x.getName().equals(name)).findAny().orElse(null);

                    if (df == null) {
                        // we don't know about it so create a new folder
                        Account account = getAccount(accountId);
                        df = new DetailedFolder(name, f.getUnreadMessageCount(), 0L, Long.MAX_VALUE, account);
                    } else {
                        // update unread message count
                        df.setUnread(f.getUnreadMessageCount());
                    }

                    // save new or updated folder
                    this.folderRepository.save(df);
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }

        logger.info("Finished updating folders");
        return true;
    }

    /**
     * Gets updates to messages since last check. Gets new messages, old messages up to a specified limit,
     * and checks flags for existing messages.
     *
     * @param accountId Id of the Account
     * @param limit Limit if getting older messages
     * @return True if successful or false otherwise
     */
    private boolean updateMessages(String accountId, Long limit) {
        Account account = getAccount(accountId);
        Store store = connect(accountId);

        // use AtomicBoolean since we're using parallel streams and need atomicity
        final AtomicBoolean newMessagesResult = new AtomicBoolean(true);
        final AtomicBoolean existingMessagesResult = new AtomicBoolean(true);

        List<DetailedFolder> dfs = this.folderRepository.findAllByAccount_Id(accountId);

        // pre-fetch UIDs for efficiency
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);

        // process folders in parallel for efficiency
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
                Long latestUid = uf.getUIDNext() - 1; // get most recent UID

                // if we have previously retrieved messages for this folder
                if (df.getLatestUid() > 0L) {
                    // process messages we already know about in this folder
                    existingMessagesResult.weakCompareAndSet(true, processExistingMessages(account, df, f));
                }

                // if we haven't looked at this folder before || there are new messages || we're getting older messages
                if (df.getLatestUid().equals(0L) || df.getLatestUid() < latestUid || limit > 0L) {
                    Message[] messages = f.getMessages();
                    f.fetch(messages, fp);

                    // get a list of all valid UIDs in the folder
                    List<Long> validUids = new LinkedList<>();
                    for (Message m : messages) {
                        validUids.add(uf.getUID(m));
                    }

                    // if there's actually any messages in the folder
                    if (validUids.size() > 0) {
                        // max UID is most recent UID
                        Long max = uf.getUIDNext() - 1;

                        // if we're getting new messages
                        if (limit < 0L) {
                            Long min;
                            if (validUids.size() < 50) {
                                // don't have 50 so get the first element
                                min = validUids.get(0);
                            } else {
                                // otherwise get the 50th from the end as the minimum
                                min = validUids.get(validUids.size() - 51);
                            }

                            // process new messages
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

                                // need to get oldest UID - limit hence this horrific code
                                if (currentLow < limit) {
                                    min = validUids.get(0);
                                } else {
                                    min = validUids.get(toIntExact(currentLow - limit));
                                }
                            }

                            // process new messages
                            newMessagesResult.weakCompareAndSet(true, processNewMessages(account, df, f, min, max));
                        }
                    }
                }

                // close the folder or the server complains
                f.close();
            } catch (MessagingException e) {
                logger.error(e.getMessage());
            }
        });

        logger.info("Finished updating messages");
        return newMessagesResult.get() && existingMessagesResult.get();
    }

    /**
     * Processes messages with UIDs between min and max.
     *
     * @param account Account we're dealing with
     * @param df Local folder the messages belong to
     * @param f Remote folder we're retrieving from
     * @param min Minimum UID (aka oldest)
     * @param max Maximum UID (aka newest)
     * @return True if successful or false otherwise
     */
    private boolean processNewMessages(Account account, DetailedFolder df, Folder f, Long min, Long max) {
        // pre-fetch UID and message info for efficiency
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);
        fp.add(IMAPFolder.FetchProfileItem.MESSAGE);

        List<DetailedMessage> detailedMessages = new ArrayList<>();
        boolean successful = true;

        try {
            UIDFolder uf = (UIDFolder) f;

            Message[] messages = f.getMessages();
            if (messages.length == 0) {
                // no messages in the folder so return
                return true;
            }

            // get lowest UID in the folder
            Long minUid = uf.getUID(messages[0]);
            // if the minimum provided is greater than the lowest in the folder then use it
            min = min > minUid ? min : minUid;

            // get messages between min and max
            messages = uf.getMessagesByUID(min, max);
            f.fetch(messages, fp);

            for (Message m : messages) {
                try {
                    // create a new message
                    DetailedMessage dm = processNewMessage(account, m, df, uf);

                    // if we were successful add it to the local database
                    if (dm != null) {
                        detailedMessages.add(dm);
                    }
                } catch (IOException | MessagingException e) {
                    logger.error(e.getMessage());
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            successful = false;
        }

        // if we've processed new messages
        if (detailedMessages.size() > 0) {
            // if our new oldest UID is older than the previous oldest then update the folder
            if (df.getOldestUid() > detailedMessages.get(0).getUid()) {
                df.setOldestUid(detailedMessages.get(0).getUid());
            }

            // if our newest UID is newer than the previous newest then update the folder
            if (df.getLatestUid() < detailedMessages.get(detailedMessages.size() - 1).getUid()) {
                df.setLatestUid(detailedMessages.get(detailedMessages.size() - 1).getUid());
            }
        }

        // save all changes
        this.messageRepository.saveAll(detailedMessages);
        this.folderRepository.save(df);

        return successful;
    }

    /**
     * Processes a new message from the server.
     *
     * @param account Account the message belongs to
     * @param m Message we're processing
     * @param df Local folder the message belongs to
     * @param uf Remove folder the message belongs to
     * @return DetailedMessage if successful or null
     * @throws MessagingException if there's data missing for the Message
     * @throws IOException if there's a file or connection issue
     */
    private DetailedMessage processNewMessage(Account account, Message m, DetailedFolder df, UIDFolder uf)
            throws MessagingException, IOException {
        Long messageUid = uf.getUID(m);

        // extract message number and received date as UNIX timestamp
        Integer messageNumber = m.getMessageNumber();
        long received = m.getReceivedDate().getTime();

        // get the sender if it exists
        String sender = m.getFrom() != null && m.getFrom().length > 0 ? m.getFrom()[0].toString() : "Unknown Sender";

        // get all TO recipients
        ArrayList<String> to = new ArrayList<>();
        Address[] toArr = m.getRecipients(Message.RecipientType.TO);
        if (toArr != null) {
            for (Object a : toArr) {
                to.add(a.toString());
            }
        }

        // get all CC recipients
        ArrayList<String> cc = new ArrayList<>();
        Address[] ccArr = m.getRecipients(Message.RecipientType.CC);
        if (ccArr != null) {
            for (Object a : ccArr) {
                to.add(a.toString());
            }
        }

        // get the subject and whether it's been read
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

        // get headers from the message
        Enumeration<Header> headersObjs = m.getAllHeaders();
        ArrayList<SerializableHeader> headers = new ArrayList<>();
        while (headersObjs.hasMoreElements()) {
            Header h = headersObjs.nextElement();
            SerializableHeader header = new SerializableHeader(h.getName(), h.getValue());
            headers.add(header);
        }

        // extract body of the message
        String content;
        try {
            content = MessageContentUtils.getMessageContent(m);
        } catch (UnsupportedEncodingException e) {
            content = "Could not display content.";
        }

        // create a new DetailedMessage with the info
        DetailedMessage d = new DetailedMessage(messageUid, messageNumber, headers, received, sender, to, cc, subject,
                seen, phishing, content, df);
        d.setAccount(account);
        return d;
    }

    /**
     * Processes known messages that are already stored locally.
     *
     * @param account Account the messages belong to
     * @param df Local folder the messages belong to
     * @param f Remote folder the messages belong to
     * @return True if successful or false otherwise
     */
    private boolean processExistingMessages(Account account, DetailedFolder df, Folder f) {
        // pre-fetch UID and flags for efficiency
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);
        fp.add(IMAPFolder.FetchProfileItem.FLAGS);

        // get all known messages
        List<DetailedMessage> knownMessages = this.messageRepository.findAllByFolder_Id(df.getId());
        if (knownMessages.size() == 0) {
            return true;
        }

        // get the first (oldest) UID
        Long firstUid = knownMessages.get(0).getUid();

        boolean successful = true;
        try {
            UIDFolder uf = (UIDFolder) f;
            Message[] messages = uf.getMessagesByUID(firstUid, df.getLatestUid());
            f.fetch(messages, fp);

            for (Message m : messages) {
                try {
                    Long uid = uf.getUID(m);

                    // try and get the message locally
                    DetailedMessage dm = this.messageRepository.findById(uid).orElse(null);
                    if (dm == null) {
                        // if we can't find it then recreate it
                        dm = processNewMessage(account, m, df, uf);
                    }

                    if (m.isSet(Flags.Flag.DELETED)) {
                        // delete the message locally
                        this.messageRepository.delete(dm);
                    } else if (m.isSet(Flags.Flag.SEEN)) {
                        // set seen and save
                        dm.setSeen(true);
                        this.messageRepository.save(dm);
                    }

                    knownMessages.remove(dm); // remove from unprocessed list
                } catch (IOException | MessagingException e) {
                    logger.error(e.getMessage());
                }
            }

            this.messageRepository.deleteAll(knownMessages); // message not found so probably deleted on another client
        } catch (Exception e) {
            logger.error(e.getMessage());
            successful = false;
        }

        logger.info("Finished processing existing messages");
        return successful;
    }

    /**
     * Deletes a specified message on the server.
     *
     * @param accountId Id of the Account the message belongs to
     * @param uid UID of the message
     * @return True if successful or false otherwise
     */
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
            logger.error(e.getMessage());
            return false;
        }

        logger.info("Message deleted successfully");
        return true;
    }

    /**
     * Marks a message as seen on the remote server.
     *
     * @param accountId Id of the Account the message belongs to
     * @param uid UID of the message
     * @return True if successful or false otherwise
     */
    public boolean markRead(String accountId, Long uid) {
        try {
            Message toBeMarkedRead = getMessage(accountId, uid);
            toBeMarkedRead.setFlag(Flags.Flag.SEEN, true);

            // update the message locally
            DetailedMessage msg = getLocalMessage(accountId, uid);
            msg.setSeen(true);
            this.messageRepository.save(msg);

            // reduce unread count of folder by 1
            DetailedFolder folder = msg.getFolder();
            folder.setUnread(folder.getUnread() - 1);
            this.folderRepository.save(folder);
        } catch (MessagingException e) {
            logger.error(e.getMessage());
            return false;
        }

        logger.info("Message marked as read successfully");
        return true;
    }

    /**
     * Sends a message from the Account specified by the supplied id.
     *
     * @param accountId Id of the Account to send the message from
     * @param info Message data to be converted to a new Message object
     * @return True if successful or false otherwise
     */
    public boolean sendMessage(String accountId, NewMessageInfo info) {
        Account account = getAccount(accountId);
        Session session = this.accountAuthService.getSession(accountId);

        try {
            Message message;

            // if the message is a reply get the Message object from JavaMail
            if (info.getReply()) {
                Message temp = getMessage(accountId, info.getReplyTo());
                message = temp.reply(info.getReplyAll());
            } else {
                // otherwise create a new MimeMessage
                message = new MimeMessage(session);
            }

            message.setFrom(new InternetAddress(account.getEmail()));

            // add all TO recipients
            info.getTo().forEach(t -> {
                try {
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(t));
                } catch (MessagingException e) {
                    logger.error(e.getMessage());
                    throw new BadRequestException();
                }
            });

            // add all CC recipients
            info.getCc().forEach(t -> {
                try {
                    message.addRecipient(Message.RecipientType.CC, new InternetAddress(t));
                } catch (MessagingException e) {
                    logger.error(e.getMessage());
                    throw new BadRequestException();
                }
            });

            message.setSubject(info.getSubject());
            message.setContent(info.getContent(), "text/html");

            // get the password or token
            String password = this.accountAuthService.getPassword(account.getId());

            // send the message
            Transport.send(message, account.getEmail(), password);
        } catch (MessagingException e) {
            logger.error(e.getMessage());
            return false;
        }

        logger.info("Message sent successfully");
        return true;
    }

    /**
     * Deletes all locally stored folders and messages belonging to an Account.
     *
     * @param accountId Id of the Account
     */
    public void deleteAllByAccount(String accountId) {
        this.folderRepository.deleteAllByAccount_Id(accountId);
        this.messageRepository.deleteAllByAccount_Id(accountId);

        logger.info("Folders and messages deleted successfully");
    }

    /**
     * Gets a message with a specified UID from the server.
     *
     * @param accountId Id of the Account the message belongs to
     * @param uid UID of the message
     * @return Message if it exists
     * @throws ResourceNotFoundException if the Message does not exist
     */
    private Message getMessage(String accountId, Long uid) {
        DetailedMessage msg = getLocalMessage(accountId, uid);

        Store store = connect(msg.getAccount().getId());
        try {
            Folder f = store.getFolder(msg.getFolder().getName());
            UIDFolder uf = (UIDFolder) f;
            f.open(Folder.READ_WRITE);

            return uf.getMessageByUID(msg.getUid());
        } catch (MessagingException e) {
            logger.warn("Message does not exist");
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Gets a message from the local database.
     *
     * @param accountId Id of the Account the message belongs to
     * @param uid UID of the message
     * @return The DetailedMessage if it exists
     * @throws ResourceNotFoundException if the message does not exist
     */
    private DetailedMessage getLocalMessage(String accountId, Long uid) {
        DetailedMessage msg = this.messageRepository.findAllByAccount_Id(accountId).stream()
                .filter(m -> m.getUid().equals(uid))
                .findFirst()
                .orElse(null);

        if (msg == null) {
            logger.warn("Messages does not exist");
            throw new ResourceNotFoundException();
        }

        return msg;
    }

    /**
     * Gets an Account object from the local database by its id.
     *
     * @param accountId Id of the Account
     * @return Account if it exists
     * @throws ResourceNotFoundException if the Account does not exist
     */
    private Account getAccount(String accountId) {
        Account account = this.accountService.getAccountById(accountId);
        if (account == null) {
            logger.warn("Account does not exist");
            throw new ResourceNotFoundException();
        }

        return account;
    }
}
