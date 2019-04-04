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

@RestController
public class AccountController {

    private AccountService accountService;
    private AccountAuthService accountAuthService;
    private MailService mailService;

    public AccountController(@Autowired AccountService accountService,
                             @Autowired AccountAuthService accountAuthService,
                             @Autowired MailService mailService) {
        this.accountService = accountService;
        this.accountAuthService = accountAuthService;
        this.mailService = mailService;
    }

    @GetMapping("/accounts")
    public Iterable<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping("/accounts")
    public Account addAccount(@RequestBody Account newAccount) {
        return accountService.addAccount(newAccount);
    }

    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable(name = "id") String id) {
        Account account = accountService.getAccountById(id);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

        return account;
    }

    @PostMapping("/accounts/{id}")
    public boolean useAccount(@PathVariable(name = "id") String id, @RequestBody Map<String, String> payload) {
        String password = payload.get("password");
        if (password == null) {
            System.err.println("here");
            throw new BadRequestException();
        }

        Account account = accountService.getAccountById(id);
        if (account == null) {
            throw new ResourceNotFoundException();
        }

        if (account.checkValidAuth(password)) {
            accountAuthService.addAccount(id, password);
            return true;
        } else {
            return false;
        }
    }

    @DeleteMapping("/accounts/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteAccount(@PathVariable(name = "id") String id) {
        accountService.deleteAccount(id);
        accountAuthService.deleteAccount(id);
        mailService.deleteAllByAccount(id);
    }

}
