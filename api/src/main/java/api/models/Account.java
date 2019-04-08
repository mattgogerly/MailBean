package api.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
@Getter
@Setter
public class Account {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "provider")
    private String provider;

    @Column(name = "connection_settings")
    private ConnectionSettings connectionSettings;

    public Account() {

    }

    public Account(String id, String name, String email, String provider, ConnectionSettings connectionSettings) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.connectionSettings = connectionSettings;
    }
}
