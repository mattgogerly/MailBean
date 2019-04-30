package api.controllers;

import api.exceptions.BadRequestException;
import api.exceptions.ResourceNotFoundException;
import api.models.Account;
import api.services.AccountAuthService;
import api.services.AccountService;
import api.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * A REST Controller for endpoints relating to Accounts.
 *
 * @author mattgogerly
 */
@RestController
public class AccountController {

    private AccountService accountService;
    private AccountAuthService accountAuthService;
    private MailService mailService;

    /**
     * Create a new AccountController. This is handled automatically by SpringBoot.
     *
     * @param accountService Automatically provided service for accounts
     * @param accountAuthService Automatically provided service for account auth details (passwords, tokens)
     * @param mailService Automatically provided service for emails
     */
    public AccountController(@Autowired AccountService accountService,
                             @Autowired AccountAuthService accountAuthService,
                             @Autowired MailService mailService) {
        this.accountService = accountService;
        this.accountAuthService = accountAuthService;
        this.mailService = mailService;
    }

    /**
     * @return Return a list of all accounts
     */
    @GetMapping("/accounts")
    public Iterable<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    /**
     * Test that we can connect to an Account using the provided details.
     *
     * @param account Account object to test
     * @param password Password to test
     * @return Result of test
     */
    @PostMapping("/accounts/test/{password}")
    public boolean testAccount(@RequestBody Account account, @PathVariable(name = "password") String password) {
        this.accountService.addAccount(account);
        this.accountAuthService.addAccount(account.getId(), password);

        boolean successful = this.mailService.connect(account.getId()) != null;

        this.accountService.deleteAccount(account.getId());
        this.accountAuthService.deleteAccount(account.getId());

        return successful;
    }

    /**
     * Add a new Account and store it in the database.
     *
     * @param newAccount The new Account to be added
     * @return The newly created Account
     */
    @PostMapping("/accounts")
    @ResponseStatus(HttpStatus.CREATED)
    public Account addAccount(@RequestBody Account newAccount) {
        return accountService.addAccount(newAccount);
    }

    /**
     * Get an Account from an id.
     *
     * @param id The id of the Account (hexadecimal hash generated on creation)
     * @return The Account
     * @throws ResourceNotFoundException if no Account by id exists
     */
    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable(name = "id") String id) {
        Account account = accountService.getAccountById(id);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

        return account;
    }

    /**
     * Stores the password/token for the Account in memory so we can use it in this session.
     *
     * @param id The id of the Account we want to use in this session
     * @param payload A key value pair of password = (token or password)
     * @return True if auth details were set successfully
     * @throws BadRequestException if the password is not provided in the payload
     * @throws ResourceNotFoundException if the Account is not found
     */
    @PostMapping("/accounts/{id}")
    public boolean useAccount(@PathVariable(name = "id") String id, @RequestBody Map<String, String> payload) {
        String password = payload.get("password");
        if (password == null) {
            throw new BadRequestException();
        }

        Account account = accountService.getAccountById(id);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

        accountAuthService.addAccount(id, password);
        return true;
    }

    /**
     * Deletes an Account from all services.
     *
     * @param id The id of the Account to delete
     */
    @DeleteMapping("/accounts/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteAccount(@PathVariable(name = "id") String id) {
        accountService.deleteAccount(id);
        accountAuthService.deleteAccount(id);
        mailService.deleteAllByAccount(id);
    }

}
