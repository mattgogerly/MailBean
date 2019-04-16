package api.controllers;

import api.models.LocalResponse;
import api.models.NewMessageInfo;
import api.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * A REST Controller for endpoints relating to IMAP/SMTP connections and operations.
 *
 * @author mattgogerly
 */
@RestController
public class MailController {

    private MailService mailService;

    /**
     * Create a new MailController. This is handled automatically by SpringBoot.
     *
     * @param mailService Automatically provided service for emails
     */
    public MailController(@Autowired MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * Gets folders and messages store in the local database for a given Account.
     *
     * @param account Id of the Account
     * @return LocalResponse object containing known folders and messages for the Account
     */
    @GetMapping("/imap/{account}")
    public LocalResponse getLocal(@PathVariable(name = "account") String account) {
        return mailService.getLocal(account);
    }

    /**
     * Retrieves *limit* older messages (than we currently have stored locally) for each known folder
     * from the server.
     *
     * @param account Id of the Account
     * @param limit Number of messages to get as a maximum (some folders may have less)
     * @return True if successful or false otherwise
     */
    @GetMapping("/imap/{account}/server/{limit}")
    public boolean getOlderMessages(@PathVariable(name = "account") String account,
                                      @PathVariable(name = "limit") Long limit) {
        return mailService.getOlderMessages(account, limit);
    }

    /**
     * Retrieves any new messages from each folder and checks locally stored known messages for changes
     * such as being marked as read or deleted.
     *
     * @param account Id of the Account
     * @return True if successful or false otherwise
     */
    @GetMapping("/imap/{account}/server")
    public boolean syncWithServer(@PathVariable(name = "account") String account) {
        return mailService.update(account);
    }

    /**
     * Deletes a message with a given UID from the IMAP server.
     *
     * @param account Id of the Account
     * @param uid UID of the message
     * @return True if successful or false otherwise
     */
    @DeleteMapping("/imap/{account}/{message}/delete")
    public boolean deleteMessageFromFolder(@PathVariable(name = "account") String account,
                                           @PathVariable(name = "message") Long uid) {
        return mailService.deleteMessage(account, uid);
    }

    /**
     * Marks a message with a given UID as read.
     *
     * @param account Id of the Account
     * @param uid UID of the message
     * @return True if successful or false otherwise
     */
    @PutMapping("/imap/{account}/{message}/read")
    public boolean markMessageRead(@PathVariable(name = "account") String account,
                                   @PathVariable(name = "message") Long uid) {
        return mailService.markRead(account, uid);
    }

    /**
     * Sends a message (extracted from NewMessageInfo) from a given Account.
     *
     * @param account Id of the Account
     * @param info NewMessageInfo object containing information necessary to send an email
     * @return True if successful or false otherwise
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/smtp/{account}")
    public boolean sendMessage(@PathVariable(name = "account") String account,
                               @RequestBody NewMessageInfo info) {
        return mailService.sendMessage(account, info);
    }
}
