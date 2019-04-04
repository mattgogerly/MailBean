package ml;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.*;
import java.nio.file.Path;
import java.util.Properties;

/**
 * Class to read in emails from a .mbox file
 */
final class MboxParser {

    /**
     * Intentionally empty Constructor
     */
    private MboxParser() {

    }

    /**
     *
     * @param path The path of the file to read
     * @return An Array of Messages representing emails from the file
     */
    static Message[] readFromMboxFile(Path path) {
        Logger logger = LoggerFactory.getLogger(Runner.class);

        Message[] emails = new Message[0]; // initialise array
        Properties props = new Properties();
        props.setProperty("mail.store.protocol", "mstor"); // using mstor implementation
        Session session = Session.getDefaultInstance(props);

        try {
            logger.info("Attempting to open " + path);

            // connect to the "store" (file)
            Store store = session.getStore(new URLName("mstor:" + path));
            store.connect();

            logger.info("Reading messages...");

            Folder f = store.getDefaultFolder();
            f.open(Folder.READ_ONLY); // open the file
            emails = f.getMessages(); // get the messages
        } catch (MessagingException e) {
            logger.error("Error reading mbox file", e);
        }

        logger.info("Read " + emails.length + " emails from " + path);
        return emails;
    }

}
