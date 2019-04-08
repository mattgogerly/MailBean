package api.controllers;

import api.models.*;
import api.services.AccountAuthService;
import api.services.AccountService;
import api.services.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.mail.imap.IMAPStore;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.mail.Session;
import javax.mail.Store;

import java.util.*;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(MailController.class)
public class MailControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AccountService accountService;

    @MockBean
    AccountAuthService accountAuthService;

    @MockBean
    MailService mailService;

    @Mock
    private Store store;

    private Account account;
    private DetailedMessage message;
    private List<DetailedMessage> messages;
    private List<DetailedFolder> folders;

    @Before
    public void setUp() {
        Properties props = new Properties();
        Session session = Session.getInstance(props);
        store = new IMAPStore(session, null);

        ConnectionSettings settings = new ConnectionSettings("test", "test", "test",
                "test", "test", "test", "test");
        account = new Account("123", "test", "test", "test", settings);

        DetailedFolder folder = new DetailedFolder("Test folder", 1, 0L, 1L, account);
        folders = new ArrayList<>();
        folders.add(folder);

        message = new DetailedMessage(1L, 1, new ArrayList<>(), 0L, "Test sender",
                new ArrayList<>(), new ArrayList<>(), "Test subject", false, false,
                "Test content", folder);
        messages = new ArrayList<>();
        messages.add(message);
    }

    @Test
    public void checkConnection() throws Exception {
        when(accountService.getAccountById("123")).thenReturn(account);
        when(mailService.connect("123")).thenReturn(store);

        this.mockMvc.perform(get("/imap/123/check"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("true")));
    }

    @Test
    public void getLocal() throws Exception {
        LocalResponse res = new LocalResponse(folders, messages);
        when(mailService.getLocal("123")).thenReturn(res);

        this.mockMvc.perform(get("/imap/123"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Test folder")));
    }

    @Test
    public void getMessage() throws Exception {
        when(mailService.getMessageByUid(1L)).thenReturn(message);

        this.mockMvc.perform(get("/imap/123/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Test subject")));
    }

    @Test
    public void getOlderMessages() throws Exception {
        when(mailService.getOlderMessages("123", 50L)).thenReturn(true);

        this.mockMvc.perform(get("/imap/123/server/50"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("true")));
    }

    @Test
    public void syncWithServer() throws Exception {
        when(mailService.update("123")).thenReturn(true);

        this.mockMvc.perform(get("/imap/123/server"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("true")));
    }

    @Test
    public void deleteMessageFromFolder() throws Exception {
        when(mailService.deleteMessage("123", 1L)).thenReturn(true);

        this.mockMvc.perform(delete("/imap/123/1/delete"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("true")));
    }

    @Test
    public void markMessageRead() throws Exception {
        when(mailService.markRead("123", 1L)).thenReturn(true);

        this.mockMvc.perform(put("/imap/123/1/read"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("true")));
    }

    @Test
    public void sendMessage() throws Exception {
        when(mailService.sendMessage(any(String.class), any(NewMessageInfo.class))).thenReturn(true);

        NewMessageInfo info = new NewMessageInfo(new ArrayList<>(), new ArrayList<>(), "Test subject",
                "Test content", false, false, 0L);

        this.mockMvc.perform(post("/smtp/123")
                    .content(asJsonString(info))
                    .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().string(containsString("true")));
    }

    private static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}