package api.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * Class to store connection information for an Account.
 *
 * @author mattgogerly
 */
@Getter
@Setter
public class ConnectionSettings implements Serializable {

    private String imapHost;
    private String imapPort;
    private String imapSecurity;
    private String smtpHost;
    private String smtpPort;
    private String smtpSecurity;

    /**
     * Intentionally empty constructor.
     */
    public ConnectionSettings() {

    }

    /**
     * Create a ConnectionSettings object.
     *
     * @param imapHost IMAP hostname
     * @param imapPort IMAP port
     * @param imapSecurity IMAP security type
     * @param smtpHost SMTP hostname
     * @param smtpPort SMTP port
     * @param smtpSecurity SMTP security type
     */
    public ConnectionSettings(String imapHost, String imapPort, String imapSecurity,
                              String smtpHost, String smtpPort, String smtpSecurity) {
        this.imapHost = imapHost;
        this.imapPort = imapPort;
        this.imapSecurity = imapSecurity;
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
        this.smtpSecurity = smtpSecurity;
    }
}
