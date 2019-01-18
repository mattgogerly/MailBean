package ml;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.mail.*;
import javax.mail.internet.ContentType;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;


class FeatureExtractor {

    private String emailBody; // body of the email needs to be accessed throughout class
    private Document body; // parsed HTML from Jsoup

    /**
     * Intentionally empty
     */
    FeatureExtractor() {}

    /**
     *
     * @param msg the email message we are extracting features for
     */
    void extractFeatures(Message msg) {
        try {
            // extract the body once to avoid repetition
            this.emailBody = getMessageContent(msg);
        } catch (Exception e) {
            this.emailBody = "";
        }

        // parse the body so we can easily extract number of links etc
        body = Jsoup.parse(this.emailBody);

        // we've selected 25 features so we must extract them individually
        // each feature is extracted by its own method for easy changes in the future
        int numAttachments = getNumAttachments(msg);
        int numLinks = getNumLinks();
    }

    /**
     *
     * @param msg: the message we are extracting features for
     * @return int number of attachments the message has
     */
    private int getNumAttachments(Message msg) {
        int count = 0;

        String type = "";
        try {
            type = msg.getContentType(); // get type of email
        } catch (MessagingException e) {
            e.printStackTrace();
            // TODO: error handling
        }

        if (type.contains("multipart")) { // can only contain attachment if multipart
            Multipart multipart;
            int parts; // number of parts

            try {
                multipart = (Multipart) msg.getContent(); // get the content
                parts = multipart.getCount();
            } catch (Exception e) {
                return 0; // can't get the content so just return 0
            }

            for (int i = 0; i < parts; i++) { // loop over the parts
                try {
                    MimeBodyPart part = (MimeBodyPart) multipart.getBodyPart(i);
                    if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                        count++; // is attachment part so increment counter
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    // TODO: error handling
                }
            }
        }

        return count;
    }

    /**
     *
     * @return int number of <a href> tags in the HTML body of the message
     */
    private int getNumLinks() {
        // we only care about HTML <a href> tags, not raw links (see Fette et al)
        Elements links = this.body.select("a[href]");
        return links.size();
    }

    /**
     * Utility method to get the body of a message
     * @param msg: message we are extracting features for
     * @return String body of the message
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    // adapted from https://stackoverflow.com/a/36932127
    private String getMessageContent(Message msg) throws IOException, MessagingException {
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
     * Utility method to get the body of a multipart message
     * @param multipart the part we are extracting from
     * @return String of multipart section of body
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    // adapted from https://stackoverflow.com/a/36932127
    private String extractFromMultipart(MimeMultipart multipart) throws IOException, MessagingException {
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
     * Utility method to get the body of a multipart message
     * @param part the part we are extracting from
     * @return String of multipart section of body
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    // adapted from https://stackoverflow.com/a/36932127
    private String extractFromPart(BodyPart part) throws IOException, MessagingException {
        String result = "";

        if (part.isMimeType("text/plain") || part.isMimeType("text/html")) {
            result = part.getContent().toString();
        } else if (part.getContent() instanceof MimeMultipart) {
            result = extractFromMultipart((MimeMultipart) part.getContent());
        }

        return result;
    }

}
