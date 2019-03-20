package api.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ConnectionSettings implements Serializable {

    String imapHost;
    String imapPort;
    String imapSecurity;
    String smtpHost;
    String smtpPort;
    String smtpSecurity;

    public ConnectionSettings() {

    }

    public ConnectionSettings(String displayName, String imapHost, String imapPort, String imapSecurity,
                              String smtpHost, String smtpPort, String smtpSecurity) {
        this.imapHost = imapHost;
        this.imapPort = imapPort;
        this.imapSecurity = imapSecurity;
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
        this.smtpSecurity = smtpSecurity;
    }
}
