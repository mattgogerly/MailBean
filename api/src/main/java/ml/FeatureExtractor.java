package ml;

import com.sun.mail.util.QPDecoderStream;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.mail.*;
import javax.mail.internet.ContentType;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


class FeatureExtractor {

    private Message msg;
    private String emailBody; // body of the email needs to be accessed throughout class
    private Document body; // parsed HTML from Jsoup

    /**
     * Constructor for the FeatureSelector class
     */
    FeatureExtractor(Message msg) {
        this.msg = msg;
    }

    /**
     * Method to coordinate feature extraction
     */
    void extractFeatures() {
        try {
            // extract the body once to avoid repetition
            this.emailBody = getMessageContent();
        } catch (Exception e) {
            this.emailBody = "";
        }

        // parse the body so we can easily extract number of links etc
        body = Jsoup.parse(this.emailBody);

        // we've selected 25 features so we must extract them individually
        // each feature is extracted by its own method for easy changes in the future
        int numAttachments = getNumAttachments();
        int numLinks = getNumLinks();
        int numLinksClickHere = getNumLinksClickHere();
        int numIpUrl = getNumIpUrl();
        int numUrlExt = getNumLinksFileExt();
        boolean htmlJavascript = checkHtmlJavascript();
        int numRecipients = getNumRecipients();
        boolean htmlBody = checkHtmlBody();

        try {
            if (!htmlBody) {
                System.out.println(msg.getSubject());
            }
        } catch (Exception e) {

        }
    }

    /**
     * Method to get the number of email attachments
     * @return int number of attachments the message has
     */
    private int getNumAttachments() {
        int count = 0;

        String type = "";
        try {
            type = this.msg.getContentType(); // get type of email
        } catch (MessagingException e) {
            e.printStackTrace();
            // TODO: error handling
        }

        if (type.contains("multipart")) { // can only contain attachment if multipart
            Multipart multipart;
            int parts; // number of parts

            try {
                multipart = (Multipart) this.msg.getContent(); // get the content
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
     * Method to get the number of HTML links in a message
     * @return int number of <a href> tags in the HTML body of the message
     */
    private int getNumLinks() {
        // we only care about HTML <a href> tags, not raw links (see Fette et al)
        Elements links = this.body.select("a[href]");
        return links.size();
    }

    private int getNumLinksClickHere() {
        String regex = "^(here|click|login|link|update)"; //  regex matches words we're looking for in links
        Elements links = this.body.select("a[href]:matches(" + regex + ")"); //  get <a href> that contains regex
        return links.size(); // return number of them
    }

    private int getNumIpUrl() {
        // Regex from OWASP Validation Regex Repository
        // https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
        Pattern p = Pattern.compile("https?://(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)");
        Matcher m = p.matcher(this.emailBody);

        return countRegexMatches(m);
    }

    private int getNumLinksFileExt() {
        Pattern p = Pattern.compile("\\.\\w{3,4}($|\\?)"); // matches .aaa or .bbbb
        Matcher m = p.matcher(this.emailBody);

        return countRegexMatches(m);
    }

    private boolean checkHtmlJavascript() {
        Elements scripts = this.body.select("script[type='text/javascript']"); // get all JS script elements
        return scripts.size() > 0;
    }

    private int getNumRecipients() {
        try {
            Address[] recipients = this.msg.getAllRecipients();

            if (recipients != null) {
                return recipients.length;
            } else {
                return 0;
            }
        } catch (MessagingException e) {
            return 0; // just return 0 if there's an error
        }
    }

    private boolean checkHtmlBody() {
        List<String> htmlTags = Arrays.asList("html", "head", "body");
        return htmlTags.stream().parallel().anyMatch(this.emailBody.toLowerCase()::contains);
    }

    private int countRegexMatches(Matcher m) {
        int count = 0;
        int i = 0;
        while (m.find(i)) {
            count++;
            i = m.start() + 1; // prevent overlaps
        }

        return count;
    }

    /**
     * Utility method to get the body of a message
     * @return String body of the message
     * @throws IOException when file is not found/other file errors
     * @throws MessagingException when body of message is invalid
     */
    // adapted from https://stackoverflow.com/a/36932127
    private String getMessageContent() throws IOException, MessagingException {
        String result = "";

        if (this.msg.isMimeType("text/plain") || this.msg.isMimeType("text/html")) {
            result = this.msg.getContent().toString();
        } else if (this.msg.isMimeType("multipart/*")) {
            MimeMultipart multipart = (MimeMultipart) this.msg.getContent();
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

        boolean alternative = new ContentType(multipart.getContentType()).toString().contains("multipart/alternative");
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
        String result;

        if (part.getContent() instanceof MimeMultipart) {
            result = extractFromMultipart((MimeMultipart) part.getContent());
        } else if (part.getContent() instanceof QPDecoderStream) {
            BufferedInputStream i = new BufferedInputStream((QPDecoderStream) part.getContent());
            ByteArrayOutputStream o = new ByteArrayOutputStream();

            while (true) {
                int c = i.read();
                if (c == -1) { break; }
                o.write(c);
            }

            i.close();
            result = new String(o.toByteArray());
        } else {
            result = part.getContent().toString();
        }

        return result;
    }

}
