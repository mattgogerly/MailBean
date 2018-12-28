package ml;

import javax.mail.*;
import java.nio.file.Path;
import java.util.Properties;


final class MboxParser {

    private MboxParser() {

    }

    static Message[] readFromMboxFile(Path path) {
        Message[] emails = new Message[0];
        URLName server = new URLName("mbox:" + path.toString());
        Properties props = new Properties();
        props.setProperty("mail.mime.address.strict", "false");
        Session session = Session.getDefaultInstance(props);

        try {
            Folder f = session.getFolder(server);
            f.open(Folder.READ_ONLY);
            emails = f.getMessages();
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return emails;
    }

}
