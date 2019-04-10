package api.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Class representing an email Account that has been added to the database.
 *
 * @author mattgogerly
 */
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

    /**
     * Intentionally empty constructor
     */
    public Account() {

    }

    /**
     * Create a new Account
     *
     * @param id Id of the Account
     * @param name Name of the Account
     * @param email Email of the Account
     * @param provider Provider of the Account
     * @param connectionSettings Connection information for the Account
     */
    public Account(String id, String name, String email, String provider, ConnectionSettings connectionSettings) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.connectionSettings = connectionSettings;
    }
}
