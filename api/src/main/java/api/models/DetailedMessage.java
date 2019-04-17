package api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Class representing a message that has been downloaded from an IMAP server with the information required
 * to display it on the frontend and make changes to it.
 *
 * @author mattgogerly
 */
@Entity
@Table(name = "messages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DetailedMessage implements Serializable {

    @EmbeddedId
    @Column(name = "id")
    private MessageId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account account;

    @Column(name = "messageNum")
    private Integer messageNum;

    @Lob
    @Basic
    @JsonIgnore
    private ArrayList<SerializableHeader> headers;

    @Column(name = "received", length = 512)
    private Long received;

    @Column(name = "sender", length = 1024)
    private String sender;

    @Lob
    @Basic
    private ArrayList<String> to;

    @Lob
    @Basic
    private ArrayList<String> cc;

    @Column(name = "subject", length = 1024)
    private String subject;

    @Column(name = "seen")
    private Boolean seen;

    @Column(name = "phishing")
    private Boolean phishing;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "folder_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties({"id", "unread", "account"})
    private DetailedFolder folder;

    /**
     * Intentionally empty constructor
     */
    public DetailedMessage() {

    }

    /**
     * Create a new DetailedMessage object
     *
     * @param id UID of the message
     * @param messageNum Message number from IMAP
     * @param headers Headers of the message
     * @param received Received date as UNIX timestamp
     * @param sender Senders email address
     * @param to List of addresses the email was sent to
     * @param cc List of addresses the email was sent as cc to
     * @param subject Subject of the message
     * @param seen Whether the message has been read or not
     * @param phishing Whether the message has been classified as phishing
     * @param content The content of the message
     * @param folder The folder the message belongs to
     */
    public DetailedMessage(MessageId id, Integer messageNum, ArrayList<SerializableHeader> headers, Long received,
                           String sender, ArrayList<String> to, ArrayList<String> cc, String subject, Boolean seen,
                           Boolean phishing, String content, DetailedFolder folder) {
        this.id = id;
        this.messageNum = messageNum;
        this.headers = headers;
        this.received = received;
        this.sender = sender;
        this.to = to;
        this.cc = cc;
        this.subject = subject;
        this.seen = seen;
        this.phishing = phishing;
        this.content = content;
        this.folder = folder;
    }

}
