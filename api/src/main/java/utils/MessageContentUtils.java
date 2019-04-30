package utils;

import com.sun.mail.util.BASE64DecoderStream;
import com.sun.mail.util.QPDecoderStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.util.Base64;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.ContentType;
import javax.mail.internet.MimeMultipart;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public final class MessageContentUtils {

    private MessageContentUtils() {}

    /**
     * Adapted from https://stackoverflow.com/a/36932127
     * Utility method to get the body of a message
     *
     * @param msg Message to extract body from
     * @return String body of the message
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    static public String getMessageContent(Message msg) throws IOException, MessagingException {
        String result = "";

        if (msg.isMimeType("text/plain") || msg.isMimeType("text/html")) {
            result = msg.getContent().toString();
        } else if (msg.isMimeType("multipart/*")) {
            MimeMultipart multipart = (MimeMultipart) msg.getContent();
            result = extractFromMultipart(multipart);
        }

        return result;
    }

    /**
     * Adapted from https://stackoverflow.com/a/36932127
     * Utility method to get the body of a multipart message
     *
     * @param multipart the part we are extracting from
     * @return String of multipart section of body
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    static private String extractFromMultipart(MimeMultipart multipart) throws IOException, MessagingException {
        int parts = multipart.getCount();

        if (parts == 0) {
            throw new MessagingException("Multipart must have constituent parts.");
        }

        boolean alternative = new ContentType(multipart.getContentType()).match("multipart/alternative");
        if (alternative) {
            return extractFromPart(multipart.getBodyPart(parts - 1));
        }

        StringBuilder result = new StringBuilder(); // use a StringBuilder to prevent recreating the String repeatedly
        for (int i = 0; i < parts; i++) {
            BodyPart part = multipart.getBodyPart(i);
            result.append(extractFromPart(part));
        }

        return result.toString();
    }

    /**
     * Adapted from https://stackoverflow.com/a/36932127
     * Utility method to get the body of a multipart message
     *
     * @param part the part we are extracting from
     * @return String of multipart section of body
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    static private String extractFromPart(BodyPart part) throws IOException, MessagingException {
        String result;

        if (part.getContent() instanceof MimeMultipart) {
            result = extractFromMultipart((MimeMultipart) part.getContent());
        } else if (part.getContent() instanceof QPDecoderStream) {
            BufferedInputStream i = new BufferedInputStream((QPDecoderStream) part.getContent());
            ByteArrayOutputStream o = new ByteArrayOutputStream();

            while (true) {
                int c = i.read();
                if (c == -1) {
                    break;
                }
                o.write(c);
            }

            i.close();
            result = new String(o.toByteArray());
        } else if (part.getContent() instanceof BASE64DecoderStream) {
            String[] typeHeaders = part.getHeader("Content-Type");
            if (typeHeaders.length > 0) {
                String header = typeHeaders[0];

                if (header.contains("image")) {
                    // image in Base 64
                    BASE64DecoderStream base64DecoderStream = (BASE64DecoderStream) part.getContent();
                    byte[] byteArray = IOUtils.toByteArray(base64DecoderStream);
                    byte[] encodeBase64 = Base64.encodeBase64(byteArray);
                    result = new String(encodeBase64, "UTF-8");

                    if (header.contains("png")) {
                        return "<img src=\"data:image/png;base64," + result + "\">";
                    } else {
                        return "<img src=\"data:image/jpg;base64," + result + "\">";
                    }
                }
            }

            return "";
        } else {
            result = part.getContent().toString();
        }

        return result;
    }

}
