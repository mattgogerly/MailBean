package api.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Class representing a newly compose message.
 *
 * @author mattgogerly
 */
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

    /**
     * Intentionally empty constructor.
     */
    public NewMessageInfo() {

    }

    /**
     * Create a NewMessageInfo object.
     *
     * @param to List of to addresses
     * @param cc List of cc addresses
     * @param subject Subject of the message
     * @param content Content of the message
     * @param reply Whether the message is a reply
     * @param replyAll Whether the message is reply all
     * @param replyTo The UID of the message being replied to
     */
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

}
