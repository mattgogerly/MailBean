package ml;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.*;
import java.nio.file.Path;
import java.util.Properties;


final class MboxParser {

    private MboxParser() {  }

    static Message[] readFromMboxFile(Path path) {
        Logger logger = LoggerFactory.getLogger(Runner.class);
        Message[] emails = new Message[0];

        Properties props = new Properties();
        props.setProperty("mail.store.protocol", "mstor"); // using mstor implementation
        Session session = Session.getDefaultInstance(props);

        try {
            logger.info("Attempting to open " + path);
            Store store = session.getStore(new URLName("mstor:" + path));
            store.connect();

            logger.info("Reading messages...");
            Folder f = store.getDefaultFolder();
            f.open(Folder.READ_ONLY);
            emails = f.getMessages();
        } catch (MessagingException e) {
            logger.error("Error reading mbox file", e);
        }

        logger.info("Read " + emails.length + " emails from " + path);
        return emails;
    }

}
