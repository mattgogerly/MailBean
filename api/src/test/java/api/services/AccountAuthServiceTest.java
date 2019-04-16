package api.services;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.sun.mail.imap.IMAPStore;
import org.hamcrest.collection.IsMapContaining;
import static org.hamcrest.CoreMatchers.not;
import org.junit.Before;
import org.junit.Test;

import javax.mail.Session;
import javax.mail.Store;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Map;

import static org.junit.Assert.*;

@SuppressWarnings("unchecked")
public class AccountAuthServiceTest {

    private AccountAuthService accountAuthService;

    @Before
    public void setUp() {
        accountAuthService = new AccountAuthService();
        accountAuthService.addAccount("Test", "Test password");
        accountAuthService.addSession("Test", null);
        accountAuthService.addStore("Test", null);
    }

    @Test
    public void addAccount() throws Exception {
        accountAuthService.addAccount("Test key", "Test password");

        Field accounts = accountAuthService.getClass().getDeclaredField("authStorage");
        accounts.setAccessible(true);
        Map<String, String> actual = (Map<String, String>) accounts.get(accountAuthService);

        assertThat(actual, IsMapContaining.hasEntry("Test key", "Test password"));
    }

    @Test
    public void deleteAccount() throws Exception {
        accountAuthService.deleteAccount("Test");

        Field accounts = accountAuthService.getClass().getDeclaredField("authStorage");
        accounts.setAccessible(true);
        Map<String, String> actualAuth = (Map<String, String>) accounts.get(accountAuthService);

        Field stores = accountAuthService.getClass().getDeclaredField("storeStorage");
        stores.setAccessible(true);
        Map<String, Store> actualStores = (Map<String, Store>) stores.get(accountAuthService);

        Field sessions = accountAuthService.getClass().getDeclaredField("sessionStorage");
        sessions.setAccessible(true);
        Map<String, Store> actualSessions = (Map<String, Store>) sessions.get(accountAuthService);

        assertThat(actualAuth, not(IsMapContaining.hasEntry("Test", "Test password")));
        assertThat(actualStores, not(IsMapContaining.hasEntry("Test", null)));
        assertThat(actualSessions, not(IsMapContaining.hasEntry("Test", null)));
    }

    @Test
    public void getPassword() {
        assertEquals("Test password", accountAuthService.getPassword("Test"));
    }

    @Test
    public void addStore() throws Exception {
        Session session = Session.getInstance(System.getProperties());
        Store store = new IMAPStore(session, null);
        accountAuthService.addStore("Test key", store);

        Field stores = accountAuthService.getClass().getDeclaredField("storeStorage");
        stores.setAccessible(true);
        Map<String, Store> actual = (Map<String, Store>) stores.get(accountAuthService);

        assertThat(actual, IsMapContaining.hasEntry("Test key", store));
    }

    @Test
    public void getStore() {
        assertNull(accountAuthService.getStore("Test"));
    }

    @Test
    public void addSession() throws Exception {
        Session session = Session.getInstance(System.getProperties());
        accountAuthService.addSession("Test key", session);

        Field sessions = accountAuthService.getClass().getDeclaredField("sessionStorage");
        sessions.setAccessible(true);
        Map<String, Store> actual = (Map<String, Store>) sessions.get(accountAuthService);

        assertThat(actual, IsMapContaining.hasEntry("Test key", session));
    }

    @Test
    public void getSession() {
        assertNull(accountAuthService.getSession("Test"));
    }

    @Test(expected = TokenResponseException.class)
    public void refreshOAuth() throws IOException {
        accountAuthService.refreshOAuth("test");
    }
}