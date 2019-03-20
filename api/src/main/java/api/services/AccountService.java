package api.services;

import api.models.Account;
import api.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    private AccountRepository accountRepository;

    public AccountService(@Autowired AccountRepository repository) {
        this.accountRepository = repository;
    }

    public Iterable<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(String id) {
        Optional<Account> opt = accountRepository.findById(id);
        return opt.orElse(null);
    }

    public Account addAccount(Account newAccount) {
        return accountRepository.save(newAccount);
    }

    public void deleteAccount(String id) {
        accountRepository.deleteById(id);
    }
}
