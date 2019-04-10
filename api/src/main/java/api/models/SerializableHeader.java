package api.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * Utility class to store message headers in the database. For some reason JavaMail headers are not Serializable.
 *
 * @author mattgogerly
 */
@Getter
@Setter
public class SerializableHeader implements Serializable {

    private String name;
    private String value;

    /**
     * @param name Name of the header, e.g. Content-Type
     * @param value Value of the header, e.g. application/json
     */
    public SerializableHeader(String name, String value) {
        this.name = name;
        this.value = value;
    }

}
