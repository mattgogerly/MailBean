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

@Service
public class AccountAuthService {

    private Map<String, String> authStorage;
    private Map<String, Store> storeStorage;
    private Map<String, Session> sessionStorage;

    public AccountAuthService() {
        authStorage = new HashMap<>();
        storeStorage = new HashMap<>();
        sessionStorage = new HashMap<>();
    }

    public void addAccount(String key, String password) {
        authStorage.put(key, password);
    }

    public void deleteAccount(String key) {
        authStorage.remove(key);
        storeStorage.remove(key);
        sessionStorage.remove(key);
    }

    String getPassword(String key) {
        return authStorage.get(key);
    }

    void addStore(String accountId, Store store) {
        storeStorage.put(accountId, store);
    }

    Store getStore(String accountId) {
        return storeStorage.get(accountId);
    }

    void addSession(String accountId, Session session) {
        sessionStorage.put(accountId, session);
    }

    Session getSession(String accountId) {
        return sessionStorage.get(accountId);
    }

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
