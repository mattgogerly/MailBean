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

@Entity
@Table(name = "messages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DetailedMessage implements Serializable {

    @Id
    @Column(name = "uid")
    private Long uid;

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
    private String received;

    @Column(name = "sender", length = 1024)
    private String sender;

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

    public DetailedMessage(Long uid, Integer messageNum, ArrayList<SerializableHeader> headers, String received,
                           String sender, String subject, Boolean seen, Boolean phishing, String content,
                           DetailedFolder folder) {
        this.uid = uid;
        this.messageNum = messageNum;
        this.headers = headers;
        this.received = received;
        this.sender = sender;
        this.subject = subject;
        this.seen = seen;
        this.phishing = phishing;
        this.content = content;
        this.folder = folder;
    }

    public DetailedMessage() {

    }

}
