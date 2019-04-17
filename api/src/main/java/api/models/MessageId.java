package api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class MessageId implements Serializable {

    @Column(name = "uid")
    private Long uid;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "randomSeed")
    @JsonIgnore
    private Integer randomSeed;

    public MessageId() {

    }

    public MessageId(Long uid) {
        this.uid = uid;
    }
}
