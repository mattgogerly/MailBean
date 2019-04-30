package api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Composite ID for a message as there is no guarantee that two email providers won't have conflicting UIDs.
 *
 * @author mattgogerly
 */
@Getter
@Setter
@Embeddable
public class MessageId implements Serializable {

    @Column(name = "uid")
    private Long uid;

    @Column(name = "randomSeed")
    @JsonIgnore
    private Double randomSeed;

    /**
     * Intentionally empty constructor
     */
    public MessageId() {

    }

    /**
     * Create a new MessageId
     *
     * @param uid uid of the message
     */
    public MessageId(Long uid) {
        this.uid = uid;
        this.randomSeed = Math.random();
    }
}
