package api.controllers;

import api.models.Account;
import api.models.ConnectionSettings;
import api.services.AccountAuthService;
import api.services.AccountService;
import api.services.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(AccountController.class)
public class AccountControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AccountService accountService;

    @MockBean
    AccountAuthService accountAuthService;

    @MockBean
    MailService mailService;

    private Account account;
    private List<Account> accounts;

    @Before
    public void setUp() {
        ConnectionSettings settings = new ConnectionSettings("test", "test",
                "test", "test", "test", "test");
        account = new Account("123", "test", "test", "test", settings);
        Account accountTwo = new Account();

        accounts = new ArrayList<>();
        accounts.add(account);
        accounts.add(accountTwo);
    }

    @Test
    public void getAllAccounts() throws Exception {
        when(accountService.getAllAccounts()).thenReturn(accounts);
        this.mockMvc.perform(get("/accounts"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("123")));
    }

    @Test
    public void addAccount() throws Exception {
        when(accountService.addAccount(any(Account.class))).thenReturn(account);
        this.mockMvc.perform(post("/accounts")
                        .content(asJsonString(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8"))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().string(containsString("123")));
    }

    @Test
    public void getAccount() throws Exception {
        when(accountService.getAccountById("123")).thenReturn(account);
        this.mockMvc.perform(get("/accounts/123"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("123")));
    }

    @Test
    public void getNullAccount() throws Exception {
        when(accountService.getAccountById("124")).thenReturn(null);
        this.mockMvc.perform(get("/accounts/124"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void useAccount() throws Exception {
        Map<String, String> body = new HashMap<>();
        body.put("password", "testing");

        when(accountService.getAccountById("123")).thenReturn(account);

        this.mockMvc.perform(post("/accounts/123")
                .content(asJsonString(body))
                .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(containsString("true")));
    }

    @Test
    public void useAccountNoPassword() throws Exception {
        Map<String, String> body = new HashMap<>();

        this.mockMvc.perform(post("/accounts/123")
                .content(asJsonString(body))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void useAccountNullAccount() throws Exception {
        Map<String, String> body = new HashMap<>();
        body.put("password", "testing");

        this.mockMvc.perform(post("/accounts/124")
                .content(asJsonString(body))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void deleteAccount() throws Exception {
        this.mockMvc.perform(delete("/accounts/123"))
                .andDo(print())
                .andExpect(status().isNoContent());
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