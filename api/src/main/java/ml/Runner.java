package ml;

import javax.mail.Message;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Runner {

    public static void main(String[] args) {
        Path path = Paths.get(args[0]);
        Message[] emails = MboxParser.readFromMboxFile(path);
        System.out.println(emails.length);
    }

}
