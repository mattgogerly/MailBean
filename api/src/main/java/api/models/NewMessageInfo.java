package api.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewMessageInfo {

    private List<String> to;
    private List<String> cc;
    private String subject;
    private String content;
    private Boolean reply;
    private Boolean replyAll;
    private Long replyTo;

    public NewMessageInfo(List<String> to, List<String> cc, String subject, String content, Boolean reply,
                          Boolean replyAll, Long replyTo) {
        this.to = to;
        this.cc = cc;
        this.subject = subject;
        this.content = content;
        this.reply = reply;
        this.replyAll = replyAll;
        this.replyTo = replyTo;
    }

    public NewMessageInfo() {

    }

}
