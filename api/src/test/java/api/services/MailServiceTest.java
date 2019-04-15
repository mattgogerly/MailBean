package api.services;

import api.exceptions.NoAuthenticationDetailsProvidedException;
import api.models.*;
import api.repositories.FolderRepository;
import api.repositories.MessageRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.Store;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
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

    private Account imapAccount;

    private List<DetailedFolder> allFolders;
    private DetailedFolder folder;

    private List<DetailedMessage> allMessages;
    private DetailedMessage message;

    @Before
    public void setUp() {
        ConnectionSettings settings = new ConnectionSettings("imap.gmail.com", "993",
                "SSL / TLS", "smtp.gmail.com", "587", "STARTTLS");
        gmailAccount = new Account("123", "Gmail", "mg11g16.soton@gmail.com", "gmail.com", settings);

        DetailedFolder folder = new DetailedFolder("[Gmail]/All Mail", 1, 0L, 1L, gmailAccount);
        allFolders = new ArrayList<>();
        allFolders.add(folder);

        message = new DetailedMessage(1L, 1, new ArrayList<>(), 0L, "Test sender",
                new ArrayList<>(), new ArrayList<>(), "Test subject", false, false,
                "Test content", folder);
        allMessages = new ArrayList<>();
        allMessages.add(message);
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
        assertEquals(response.getFolders().size(), allFolders.size());
        assertEquals(response.getMessages().size(), allMessages.size());
    }

    @Test
    public void getOlderMessages() {
    }

    @Test
    public void update() {
    }

    @Test
    public void deleteMessage() {
    }

    @Test
    public void markRead() {
    }

    @Test
    public void sendMessage() {
    }

    @Test
    public void deleteAllByAccount() {
    }
}