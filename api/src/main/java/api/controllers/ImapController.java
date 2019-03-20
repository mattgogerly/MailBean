package api.controllers;

import api.models.DetailedMessage;
import api.models.LocalResponse;
import api.services.ImapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.Store;

@RestController
public class ImapController {

    private ImapService imapService;

    public ImapController(@Autowired ImapService imapService) {
        this.imapService = imapService;
    }

    @GetMapping("/imap/{account}/check")
    public boolean checkConnection(@PathVariable(name = "account") String id) {
        return connect(id) != null;
    }

    @GetMapping("/imap/{account}")
    public LocalResponse getLocal(@PathVariable(name = "account") String account) {
        return imapService.getLocal(account);
    }

    @GetMapping("/imap/{account}/{uid}")
    public DetailedMessage getMessage(@PathVariable(name = "account") String account,
                                      @PathVariable(name = "uid") Long uid) {
        return imapService.getMessageByUid(uid);
    }

    @GetMapping("/imap/{account}/server/{limit}")
    public boolean getOlderMessages(@PathVariable(name = "account") String account,
                                      @PathVariable(name = "limit") Long limit) {
        return imapService.getOlderMessages(account, limit);
    }

    @GetMapping("/imap/{account}/server")
    public boolean syncWithServer(@PathVariable(name = "account") String account) {
        return imapService.update(account);
    }

    @DeleteMapping("/imap/{account}")
    public boolean deleteMessageFromFolder(@PathVariable(name = "account") String account,
                                           @RequestBody DetailedMessage msg) {
        return imapService.deleteMessage(msg);
    }

    private Store connect(String id) {
        return imapService.connect(id);
    }
}
