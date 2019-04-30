package utils;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import javax.mail.*;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import java.io.IOException;

import static org.junit.Assert.*;

public class MessageContentUtilsTest {

    @Mock
    private MimeMessage message;

    @Before
    public void init() {
        message = new MimeMessage((Session) null);
    }

    @Test
    public void testHtmlMessageContent() throws IOException, MessagingException {
        message.setContent("This is test content", "text/html");
        assertEquals("This is test content", MessageContentUtils.getMessageContent(message));
    }

    @Test
    public void testMultipartMessageContent() throws IOException, MessagingException {
        Multipart multi = new MimeMultipart();

        BodyPart partOne = new MimeBodyPart();
        partOne.setContent("This is", "text/plain");
        multi.addBodyPart(partOne);

        BodyPart partTwo = new MimeBodyPart();
        partTwo.setContent(" test content", "text/plain");
        multi.addBodyPart(partTwo);

        message.setContent(multi);
        message.saveChanges();

        assertEquals("This is test content", MessageContentUtils.getMessageContent(message));
    }

    @Test(expected = MessagingException.class)
    public void testEmptyMultipartMessage() throws IOException, MessagingException {
        Multipart multi = new MimeMultipart();
        message.setContent(multi);
        message.saveChanges();

        MessageContentUtils.getMessageContent(message);
    }

    @Test
    public void testNestedMultipartMessage() throws IOException, MessagingException {
        Multipart multiOne = new MimeMultipart();
        BodyPart bodyOne = new MimeBodyPart();
        multiOne.addBodyPart(bodyOne);

        Multipart multiTwo = new MimeMultipart();
        BodyPart bodyTwo = new MimeBodyPart();
        bodyTwo.setContent("This is test content", "text/plain");
        multiTwo.addBodyPart(bodyTwo);

        bodyOne.setContent(multiTwo);
        message.setContent(multiOne);
        message.saveChanges();

        assertEquals("This is test content", MessageContentUtils.getMessageContent(message));
    }
}