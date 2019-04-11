package api.services;

import com.google.api.client.auth.oauth2.RefreshTokenRequest;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.http.BasicAuthentication;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.stereotype.Service;

import javax.mail.Session;
import javax.mail.Store;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Service to facilitate storing required authentication details for Accounts (passwords and tokens)
 * on a per session basis in memory.
 *
 * @author mattgogerly
 */
@Service
public class AccountAuthService {

    private Map<String, String> authStorage;
    private Map<String, Store> storeStorage;
    private Map<String, Session> sessionStorage;

    /**
     * Create a new AccountAuthService.
     */
    public AccountAuthService() {
        authStorage = new HashMap<>();
        storeStorage = new HashMap<>();
        sessionStorage = new HashMap<>();
    }

    /**
     * Adds an Account to the authentication storage mapping.
     *
     * @param key Id of the Account
     * @param password Password or token for the Account
     */
    public void addAccount(String key, String password) {
        authStorage.put(key, password);
    }

    /**
     * Deletes an Account from all storage mappings.
     *
     * @param key Id of the Account to remove
     */
    public void deleteAccount(String key) {
        authStorage.remove(key);
        storeStorage.remove(key);
        sessionStorage.remove(key);
    }

    /**
     * Gets the password or token for an Account.
     *
     * @param key Id of the Account
     * @return Password or token, or null if it has not been added
     */
    String getPassword(String key) {
        return authStorage.get(key);
    }

    /**
     * Adds a JavaMail Store object to the store storage mapping. We want to reuse these as
     * reconnecting for every operation is expensive and can cause rate limiting.
     *
     * @param accountId Id of the Account
     * @param store Store to be added
     */
    void addStore(String accountId, Store store) {
        storeStorage.put(accountId, store);
    }

    /**
     * Get the Store associated with an Account.
     *
     * @param accountId Id of the Account
     * @return Store if it exists, null otherwise
     */
    Store getStore(String accountId) {
        return storeStorage.get(accountId);
    }

    /**
     * Adds a JavaMail Session object to the session storage mapping. We want to reuse these
     * as reconnecting for every operation is expensive and can cause rate limiting.
     *
     * @param accountId Id of the Account
     * @param session Session to be added
     */
    void addSession(String accountId, Session session) {
        sessionStorage.put(accountId, session);
    }

    /**
     * Get the Session associated with an Account.
     *
     * @param accountId Id of the Account
     * @return Session if it exists, null otherwise
     */
    Session getSession(String accountId) {
        return sessionStorage.get(accountId);
    }

    /**
     * Google OAuth tokens (for Gmail) expire after 3600 seconds (1 hour). We therefore need to use the
     * refresh token to get a new access token when the old one expires. We store the refresh token rather
     * than the access token or password and simply request a new access token whenever we need one.
     *
     * @param refreshToken The refresh token for an Account
     * @return Access token valid for 3600 seconds
     * @throws IOException If the request fails
     */
    String refreshOAuth(String refreshToken) throws IOException {
        TokenResponse response = new RefreshTokenRequest(new NetHttpTransport(), new JacksonFactory(), new GenericUrl(
                "https://www.googleapis.com/oauth2/v4/token"), refreshToken)
                .setClientAuthentication(new BasicAuthentication(
                        "634807762350-ohpmnrkua0cj7nlkfkpbvlirn1dchudh.apps.googleusercontent.com",
                        "xnhTTXlur3LIIOueUXSaPKXW"))
                .execute();

        return response.getAccessToken();
    }

}
