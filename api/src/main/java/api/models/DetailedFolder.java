package api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Class to store an IMAP Folder with extra information to faciliate retrieving new messages.
 *
 * @author mattgogerly
 */
@Entity
@Table(name = "folders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DetailedFolder implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "unread")
    private Integer unread;

    @Column(name = "latest_uid")
    private Long latestUid;

    @Column(name = "oldest_uid")
    private Long oldestUid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account account;

    /**
     * Intentionally empty constructor
     */
    public DetailedFolder() {

    }

    /**
     * Create a new DetailedFolder
     *
     * @param name name of the folder
     * @param unread number of unread messages
     * @param latestUid most recent message UID
     * @param oldestUid oldest message UID
     * @param account Account the folde rbelongs to
     */
    public DetailedFolder(String name, Integer unread, Long latestUid, Long oldestUid, Account account) {
        this.name = name;
        this.unread = unread;
        this.latestUid = latestUid;
        this.oldestUid = oldestUid;
        this.account = account;
    }

}
