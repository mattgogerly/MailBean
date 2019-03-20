package api.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class SerializableHeader implements Serializable {

    private String name;
    private String value;

    public SerializableHeader(String name, String value) {
        this.name = name;
        this.value = value;
    }

}
