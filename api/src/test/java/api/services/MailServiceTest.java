package api.services;

import api.exceptions.BadRequestException;
import api.exceptions.NoAuthenticationDetailsProvidedException;
import api.exceptions.ResourceNotFoundException;
import api.models.*;
import api.repositories.FolderRepository;
import api.repositories.MessageRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.Session;
import javax.mail.Store;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(MailService.class)
public class MailServiceTest {

    @Autowired
    private MailService mailService;

    @MockBean
    private AccountService accountService;

    @MockBean
    private AccountAuthService accountAuthService;

    @MockBean
    private FolderRepository folderRepository;

    @MockBean
    private MessageRepository messageRepository;

    private Account gmailAccount;
    private final String gmailRefreshToken = "1/Z_ezM9llead9CFeZMu6mMRYLQ8ejNAcnQuIBtC2amUU";

    private List<DetailedFolder> allFolders;

    private List<DetailedMessage> allMessages;
    private DetailedMessage message;

    @Before
    public void setUp() {
        ConnectionSettings settings = new ConnectionSettings("imap.gmail.com", "993",
                "SSL / TLS", "smtp.gmail.com", "587", "STARTTLS");
        gmailAccount = new Account("123", "Gmail", "mg11g16.soton@gmail.com", "gmail.com", settings);

        DetailedFolder folder = new DetailedFolder("[Gmail]/All Mail", 1, 1L, 1L, gmailAccount);
        DetailedFolder folderTwo = new DetailedFolder("Test", 1, 0L, 1L, gmailAccount);

        allFolders = new ArrayList<>();
        allFolders.add(folder);
        allFolders.add(folderTwo);

        message = new DetailedMessage(1L, 1, new ArrayList<>(), 0L, "Test sender",
                new ArrayList<>(), new ArrayList<>(), "Test subject", false, false,
                "Test content", folder);
        message.setAccount(gmailAccount);

        DetailedMessage messageNotExist = new DetailedMessage(100L, 1, new ArrayList<>(), 0L,
                "Test sender", new ArrayList<>(), new ArrayList<>(), "Test subject", false, false,
                "Test content", folder);
        messageNotExist.setAccount(gmailAccount);

        allMessages = new ArrayList<>();
        allMessages.add(message);
        allMessages.add(messageNotExist);
    }

    @After
    public void tearDown() {
        messageRepository.deleteAll();
        folderRepository.deleteAll();
    }

    @Test
    public void connect() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        Store one = mailService.connect("Test");
        assertNotNull(one);

        when(accountAuthService.getStore(any(String.class))).thenReturn(one);

        Store two = mailService.connect("Test");
        assertEquals(one, two);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void connectNoAccount() {
        when(accountService.getAccountById(any(String.class))).thenReturn(null);
        mailService.connect("Test");
    }

    @Test(expected = NoAuthenticationDetailsProvidedException.class)
    public void connectNoPassword() {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(null);

        mailService.connect("123");
    }

    @Test
    public void connectWrongRefreshToken() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn("test");
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        assertNull(mailService.connect("Test"));
    }

    @Test
    public void connectWrongEmail() throws IOException {
        gmailAccount.setEmail("wrongemail@gmail.com");
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        assertNull(mailService.connect("Test"));
    }

    @Test
    public void getLocal() {
        when(folderRepository.findAllByAccount_Id(any(String.class))).thenReturn(allFolders);
        when(messageRepository.findAllByAccount_Id(any(String.class))).thenReturn(allMessages);

        LocalResponse response = mailService.getLocal("Test");
        assertEquals(allFolders.size(), response.getFolders().size());
        assertEquals(allMessages.size(), response.getMessages().size());
    }

    @Test
    public void getOlderMessages() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(folderRepository.findAllByAccount_Id(any(String.class))).thenReturn(allFolders);

        assertTrue(mailService.getOlderMessages("Test", 10L));
    }

    @Test
    public void update() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(folderRepository.findAllByAccount_Id(any(String.class))).thenReturn(allFolders);

        when(messageRepository.save(any(DetailedMessage.class))).thenReturn(message);
        when(messageRepository.findAllByFolder_Id(any(Integer.class))).thenReturn(allMessages);
        when(messageRepository.findAllByFolder_Id(null)).thenReturn(allMessages);

        assertTrue(mailService.update("Test"));
    }

    @Test
    public void deleteMessage() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(messageRepository.findAllByAccount_Id(any(String.class))).thenReturn(allMessages);

        assertTrue(mailService.deleteMessage("Test", 1L));
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteMessageNotExists() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(messageRepository.findAllByAccount_Id(any(String.class))).thenReturn(allMessages);

        mailService.deleteMessage("Test", 100L);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void deleteMessageNotExistsLocal() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(messageRepository.findAllByAccount_Id(any(String.class))).thenReturn(allMessages);

        mailService.deleteMessage("Test", 90L);
    }

    @Test
    public void markRead() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();
        when(messageRepository.findAllByAccount_Id(any(String.class))).thenReturn(allMessages);

        assertTrue(mailService.markRead("Test", 1L));
    }

    @Test
    public void sendMessage() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        Properties props = System.getProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.auth.mechanisms", "XOAUTH2");
        props.put("mail.smtp.host", gmailAccount.getConnectionSettings().getSmtpHost());
        props.put("mail.smtp.port", gmailAccount.getConnectionSettings().getSmtpPort());
        props.put("mail.smtp.starttls.enable", "true");
        Session session = Session.getInstance(props);
        when(accountAuthService.getSession(any(String.class))).thenReturn(session);

        List<String> to = new ArrayList<>();
        to.add("mg11g16.soton@gmail.com");

        List<String> cc = new ArrayList<>();
        cc.add("mg11g16.soton@gmail.com");
        NewMessageInfo info = new NewMessageInfo(to, cc, "Test email", "This is a test", false,
                false, -1L);

        assertTrue(mailService.sendMessage("123", info));
    }

    @Test(expected = BadRequestException.class)
    public void sendMessageBadAddress() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        Properties props = System.getProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.auth.mechanisms", "XOAUTH2");
        props.put("mail.smtp.host", gmailAccount.getConnectionSettings().getSmtpHost());
        props.put("mail.smtp.port", gmailAccount.getConnectionSettings().getSmtpPort());
        props.put("mail.smtp.starttls.enable", "true");
        Session session = Session.getInstance(props);
        when(accountAuthService.getSession(any(String.class))).thenReturn(session);

        List<String> to = new ArrayList<>();
        to.add("mg11g16.sotongmail.com");

        List<String> cc = new ArrayList<>();
        cc.add("mg11g16.soton!/asgmail.com");
        NewMessageInfo info = new NewMessageInfo(to, cc, "Test email", "This is a test", false,
                false, -1L);

        mailService.sendMessage("123", info);
    }

    @Test(expected = BadRequestException.class)
    public void sendMessageNoSession() throws IOException {
        when(accountService.getAccountById(any(String.class))).thenReturn(gmailAccount);
        when(accountAuthService.getPassword(any(String.class))).thenReturn(gmailRefreshToken);
        when(accountAuthService.refreshOAuth(any(String.class))).thenCallRealMethod();

        Properties props = new Properties();
        Session session = Session.getInstance(props);
        when(accountAuthService.getSession(any(String.class))).thenReturn(session);

        List<String> to = new ArrayList<>();
        to.add("mg11g16.soton@gmail.com");

        List<String> cc = new ArrayList<>();
        cc.add("mg11g16.soton@gmail.com");
        NewMessageInfo info = new NewMessageInfo(to, cc, "Test email", "This is a test", false,
                false, -1L);

        mailService.sendMessage("123", info);
    }

    @Test
    public void deleteAllByAccount() {
        mailService.deleteAllByAccount("123");
        verify(messageRepository, times(1)).deleteAllByAccount_Id(any(String.class));
        verify(folderRepository, times(1)).deleteAllByAccount_Id(any(String.class));
    }
}