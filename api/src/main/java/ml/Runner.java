package ml;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Message;
import java.io.File;
import java.net.URL;
import java.nio.file.Path;

public class Runner {

    /**
     *
     * @param args
     */
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(Runner.class);
        URL resource = Runner.class.getClassLoader().getResource("phishing.mbox");

        try {
            Path path = new File(resource.toURI()).toPath();
            Message[] emails = MboxParser.readFromMboxFile(path);

            for (Message m : emails) {
                FeatureExtractor fe = new FeatureExtractor(m);
                fe.extractFeatures();
            }
        } catch (Exception e) {
            logger.error("mbox file not found", e);
        }
    }

}
