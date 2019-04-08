package api.controllers;

import api.models.DetailedMessage;
import api.models.LocalResponse;
import api.models.NewMessageInfo;
import api.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.mail.Store;

@RestController
public class MailController {

    private MailService mailService;

    public MailController(@Autowired MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/imap/{account}/check")
    public boolean checkConnection(@PathVariable(name = "account") String id) {
        return connect(id) != null;
    }

    @GetMapping("/imap/{account}")
    public LocalResponse getLocal(@PathVariable(name = "account") String account) {
        return mailService.getLocal(account);
    }

    @GetMapping("/imap/{account}/{uid}")
    public DetailedMessage getMessage(@PathVariable(name = "account") String account,
                                      @PathVariable(name = "uid") Long uid) {
        return mailService.getMessageByUid(uid);
    }

    @GetMapping("/imap/{account}/server/{limit}")
    public boolean getOlderMessages(@PathVariable(name = "account") String account,
                                      @PathVariable(name = "limit") Long limit) {
        return mailService.getOlderMessages(account, limit);
    }

    @GetMapping("/imap/{account}/server")
    public boolean syncWithServer(@PathVariable(name = "account") String account) {
        return mailService.update(account);
    }

    @DeleteMapping("/imap/{account}/{message}/delete")
    public boolean deleteMessageFromFolder(@PathVariable(name = "account") String account,
                                           @PathVariable(name = "message") Long uid) {
        return mailService.deleteMessage(account, uid);
    }

    @PutMapping("/imap/{account}/{message}/read")
    public boolean markMessageRead(@PathVariable(name = "account") String account,
                                   @PathVariable(name = "message") Long uid) {
        return mailService.markRead(account, uid);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/smtp/{account}")
    public boolean sendMessage(@PathVariable(name = "account") String account,
                               @RequestBody NewMessageInfo info) {
        return mailService.sendMessage(account, info);
    }

    private Store connect(String id) {
        return mailService.connect(id);
    }
}
