package api.services;

import api.controllers.exceptions.NoAuthenticationDetailsProvidedException;
import api.controllers.exceptions.ResourceNotFoundException;
import api.models.*;
import api.repositories.AccountRepository;
import api.repositories.FolderRepository;
import api.repositories.MessageRepository;
import com.sun.mail.imap.IMAPFolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utils.MessageContentUtils;

import javax.mail.*;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.StreamSupport;

@Service
public class ImapService {

    private AccountAuthService accountAuthService;
    private AccountRepository accountRepository;
    private MessageRepository messageRepository;
    private FolderRepository folderRepository;

    public ImapService(@Autowired AccountAuthService accountAuthService,
                       @Autowired AccountRepository accountRepository,
                       @Autowired MessageRepository messageRepository,
                       @Autowired FolderRepository folderRepository) {
        this.accountAuthService = accountAuthService;
        this.accountRepository = accountRepository;
        this.messageRepository = messageRepository;
        this.folderRepository = folderRepository;
    }

    public Store connect(String accountId) {
        Account account = getAccount(accountId);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

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
            password = accountAuthService.refreshOAuth(password);
            props.put("mail.imap.auth.mechanisms", "XOAUTH2");
        }

        if (settings.getImapSecurity().equals("SSL / TLS")) {
            props.put("mail.imap.ssl.enable", "true");
        }

        try {
            Session session = Session.getInstance(props);
            Store store = session.getStore("imap");
            store.connect(settings.getImapHost(), Integer.valueOf(settings.getImapPort()), account.getEmail(), password);

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
            return false;
        }

        return true;
    }

    private boolean updateMessages(String accountId, Long limit) {
        Account account = getAccount(accountId);
        Store store = connect(accountId);

        boolean newMessagesResult = true;
        boolean existingMessagesResult = true;

        try {
            Iterable<DetailedFolder> dfs = this.folderRepository.findAllByAccount_Id(accountId);

            for (DetailedFolder df : dfs) {
                Folder f = store.getFolder(df.getName());

                if (f == null) {
                    // folder deleted so remove it
                    this.folderRepository.delete(df);
                    continue;
                }

                f.open(Folder.READ_ONLY);
                UIDFolder uf = (UIDFolder) f;
                Long latestUid = uf.getUIDNext() - 1;

                if (df.getLatestUid().equals(0L) || df.getLatestUid() < latestUid) {
                    if (limit < 0L) {
                        Long max = uf.getUIDNext() - 1;
                        newMessagesResult = processNewMessages(account, df, f, max - 50, max);
                    } else {
                        newMessagesResult = processNewMessages(account, df, f,df.getOldestUid() - limit, df.getOldestUid() - 1);
                    }
                }

                if (df.getLatestUid() > 0L) {
                    existingMessagesResult = processExistingMessages(account, df, f);
                }

                f.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return newMessagesResult && existingMessagesResult;
    }

    private boolean processNewMessages(Account account, DetailedFolder df, Folder f, Long min, Long max) {
        FetchProfile fp = new FetchProfile();
        fp.add(UIDFolder.FetchProfileItem.UID);
        fp.add(IMAPFolder.FetchProfileItem.MESSAGE);

        List<DetailedMessage> detailedMessages = new ArrayList<>();
        boolean successful = true;

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
                DetailedMessage dm = processNewMessage(account, m, df, uf);

                if (dm != null) {
                    detailedMessages.add(dm);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            successful = false;
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
        return successful;
    }

    private DetailedMessage processNewMessage(Account account, Message m, DetailedFolder df, UIDFolder uf)
            throws MessagingException, IOException {
        Long messageUid = uf.getUID(m);

        Integer messageNumber = m.getMessageNumber();
        String received = m.getReceivedDate().toString();
        String sender = m.getFrom() != null && m.getFrom().length > 0 ? m.getFrom()[0].toString() : "Unknown Sender";
        String subject = m.getSubject();

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
            content = "Could not display content in the specified format.";
        }

        DetailedMessage d = new DetailedMessage(messageUid, messageNumber, headers, received, sender, subject,
                false, false, content, df); // TODO: update with model result
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

        boolean successful = true;

        try {
            UIDFolder uf = (UIDFolder) f;
            Message[] messages = uf.getMessagesByUID(firstUid, df.getLatestUid());
            f.fetch(messages, fp);

            List<DetailedMessage> unprocessed = this.messageRepository.findAllByAccount_Id(account.getId());

            for (Message m : messages) {
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

                unprocessed.remove(dm); // remove from unprocessed list
            }

            // TODO: look at why this fails    this.messageRepository.deleteAll(unprocessed); // message not found so probably deleted on another client
        } catch (Exception e) {
            e.printStackTrace();
            successful = false;
        } finally {
            this.messageRepository.deleteAll(toBeDeletedLocally);
            this.messageRepository.saveAll(toBeSetSeenLocally);
        }

        return successful;
    }

    public boolean deleteMessage(DetailedMessage msg) {
        Store store = connect(msg.getAccount().getId());

        try {
            Folder f = store.getFolder(msg.getFolder().getName());
            UIDFolder uf = (UIDFolder) f;
            f.open(Folder.READ_WRITE);

            Message toBeDeleted = uf.getMessageByUID(msg.getUid());
            toBeDeleted.setFlag(Flags.Flag.DELETED, true);

            f.expunge();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Account getAccount(String accountId) {
        return this.accountRepository.findById(accountId).orElse(null);
    }
}
