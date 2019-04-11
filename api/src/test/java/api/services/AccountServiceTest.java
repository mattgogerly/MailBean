package api.services;

import api.models.Account;
import api.models.ConnectionSettings;
import api.repositories.AccountRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(AccountService.class)
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @MockBean
    private AccountRepository accountRepository;

    private List<Account> allAccounts;
    private Account account;

    @Before
    public void setUp() {
        allAccounts = new ArrayList<>();

        ConnectionSettings settings = new ConnectionSettings("test", "test",
                "test", "test", "test", "test");
        account = new Account("123", "test", "test", "test", settings);

        allAccounts.add(account);
        allAccounts.add(account);
    }

    @Test
    public void getAllAccounts() {
        when(accountRepository.findAll()).thenReturn(allAccounts);

        Iterable<Account> result = accountService.getAllAccounts();
        Iterator<Account> it = result.iterator();

        int count = 0;
        while (it.hasNext()) {
            it.next();
            count++;
        }

        assertEquals(count, allAccounts.size());
    }

    @Test
    public void getAccountById() {
        when(accountRepository.findById(any(String.class))).thenReturn(Optional.of(account));

        Account result = accountService.getAccountById("Test");
        assertEquals(result.getEmail(), account.getEmail());
    }

    @Test
    public void addAccount() {
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        Account result = accountService.addAccount(account);
        assertEquals(result.getEmail(), account.getEmail());
    }

    @Test
    public void deleteAccount() {
        when(accountRepository.findById("123")).thenReturn(Optional.of(account));

        accountService.deleteAccount(account.getId());
        verify(accountRepository, times(1)).deleteById(account.getId());
    }

}