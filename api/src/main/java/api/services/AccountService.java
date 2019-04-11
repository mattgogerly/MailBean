package api.services;

import api.models.Account;
import api.repositories.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class to handle CRUD operations for Accounts.
 *
 * @author mattgogerly
 */
@Service
public class AccountService {

    private Logger logger = LoggerFactory.getLogger(AccountService.class);

    private AccountRepository accountRepository;

    /**
     * Create a new Account service.
     *
     * @param repository Account repository to interface with JPA. Wired automatically by SpringBoot.
     */
    public AccountService(@Autowired AccountRepository repository) {
        this.accountRepository = repository;
    }

    /**
     * Gets all Accounts from the database.
     *
     * @return List of Accounts
     */
    public Iterable<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    /**
     * Gets an Account by its hexadecimal id
     *
     * @param id Id of the Account
     * @return The Account, or null if it doesn't exist
     */
    public Account getAccountById(String id) {
        Optional<Account> opt = accountRepository.findById(id);
        return opt.orElse(null);
    }

    /**
     * Adds an Account to the database.
     *
     * @param newAccount The Account to add.
     * @return The newly created Account.
     */
    public Account addAccount(Account newAccount) {
        logger.info("Added new account " + newAccount.getEmail());
        return accountRepository.save(newAccount);
    }

    /**
     * Deletes an Account with the given id.
     *
     * @param id Id of the Account to be deleted.
     */
    public void deleteAccount(String id) {
        logger.info("Deleted account with id " + id);
        accountRepository.deleteById(id);
    }
}
