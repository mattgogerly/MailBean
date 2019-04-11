package api.services;

import api.models.DetailedFolder;
import api.models.DetailedMessage;
import api.repositories.AccountRepository;
import api.repositories.FolderRepository;
import api.repositories.MessageRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@WebMvcTest(MailService.class)
public class MailServiceTest {

    @Autowired
    private MailService mailService;

    @MockBean
    private AccountRepository accountRepository;

    @MockBean
    private FolderRepository folderRepository;

    @MockBean
    private MessageRepository messageRepository;

    private List<DetailedFolder> allFolders;
    private DetailedFolder folder;

    private List<DetailedMessage> allMessages;
    private DetailedMessage message;

    @Before
    public void setUp() {
    }

    @Test
    public void connect() {
    }

    @Test
    public void getLocal() {
    }

    @Test
    public void getMessageByUid() {
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