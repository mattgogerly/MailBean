package api.controllers;

import api.controllers.exceptions.BadRequestException;
import api.controllers.exceptions.ResourceNotFoundException;
import api.models.Account;
import api.services.AccountAuthService;
import api.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AccountController {

    private AccountService accountService;
    private AccountAuthService accountAuthService;

    public AccountController(@Autowired AccountService accountService,
                             @Autowired AccountAuthService accountAuthService) {
        this.accountService = accountService;
        this.accountAuthService = accountAuthService;
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
    }

}
