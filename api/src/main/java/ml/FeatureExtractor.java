package ml;

import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import utils.MessageContentUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Class to facilitate the extraction of features from an email in order to produce an input for the Machine Learning
 * models.
 *
 * @author mattgogerly
 */
public class FeatureExtractor {

    private Message msg; // the email message
    private String emailBody; // body of the email needs to be accessed throughout class
    private Document body; // parsed HTML from JSoup

    private Map<String, Object> values; // feature names mapped to their values

    /**
     * Constructor for the FeatureSelector class
     * @param msg The email message we're extracting features for
     */
    public FeatureExtractor(Message msg) {
        this.msg = msg;

        // LinkedHashMap since we want to preserve ordering for writing later (all rows have same order)
        this.values = new LinkedHashMap<>();
    }

    /**
     * Method to run feature extraction
     */
    public void extractFeatures() {
        try {
            // extract the body once to avoid repetition
            this.emailBody = MessageContentUtils.getMessageContent(this.msg);
        } catch (Exception e) {
            this.emailBody = "";
        }

        // parse the body so we can easily extract number of links etc
        body = Jsoup.parse(this.emailBody);

        // we've selected 24 features so we must extract them individually
        // each feature is extracted by its own method for easy changes in the future
        // result is stored in the values HashMap for easy printing to csv etc
        getNumAttachments();
        getNumLinks();
        getNumLinksClickHere();
        getNumIpUrl();
        getNumLinksFileExt();
        checkHtmlJavascript();
        getNumRecipients();
        checkHtmlBody();
        getNumLinksNonMatching();
        getNumConcatenatedUrls();
        checkFromSenderSimilarity();
        getSpanTime();
        getNumUniqueDomains();
        getNumUrlShortened();
        checkBccExist();
        checkFromNameExist();
        checkFromNonEnglish();
        getMaximalDots();
        getNumCc();
        checkNoReply();
        checkSubjectExist();
        getSubjectLength();
        checkSenderExist();
    }

    /**
     * @return The Map of String -> Object representing the features extracted from the email
     */
    public Map<String, Object> getValues() {
        return this.values;
    }

    /**
     * Get the number of email attachments and put it under the numAttachments key
     */
    private void getNumAttachments() {
        int count = 0;
        long size = 0L;

        String type = "";
        try {
            type = this.msg.getContentType(); // get type of email
        } catch (MessagingException e) {
            // intentionally empty
        }

        if (type.contains("multipart")) { // can only contain attachment if multipart
            Multipart multipart;
            int parts; // number of parts

            try {
                multipart = (Multipart) this.msg.getContent(); // get the content
                parts = multipart.getCount();
            } catch (Exception e) {
                this.values.put("numAttachments", count);
                this.values.put("sizeAttachments", size);
                return;
            }

            for (int i = 0; i < parts; i++) { // loop over the parts
                try {
                    MimeBodyPart part = (MimeBodyPart) multipart.getBodyPart(i);
                    if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                        count++; // is attachment part so increment counter
                        size += part.getSize();
                    }
                } catch (Exception e) {
                    // intentionally empty
                }
            }
        }

        this.values.put("numAttachments", count);
        this.values.put("sizeAttachments", size);
    }

    /**
     * Get the number of HTML links in a message and put it under the numLinks key
     */
    private void getNumLinks() {
        // we only care about HTML <a href> tags, not raw links (see Fette et al)
        Elements links = this.body.select("a[href]");
        this.values.put("numLinks", links.size());
    }


    /**
     * Get the number of links where the text is "Click Here" and other known phishing phrases and put it under the
     * numLinksClickHere key
     */
    private void getNumLinksClickHere() {
        String regex = "^(here|click|login|link|update)"; //  regex matches words we're looking for in links
        Elements links = this.body.select("a[href]:matches(" + regex + ")"); //  get <a href> that contains regex
        this.values.put("numLinksClickHere", links.size());
    }

    /**
     * Get the number of URLs that are IP addresses and put it under the numIpUrl key
     */
    private void getNumIpUrl() {
        // Regex from OWASP Validation Regex Repository
        // https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
        Pattern p = Pattern.compile("https?://(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)");
        Matcher m = p.matcher(this.emailBody);

        this.values.put("numIpUrl", countRegexMatches(m));
    }

    /**
     * Get the number of links that end in file extensions and put it under the numLinksFileExt key
     * e.g. example.com/badfile.exe
     */
    private void getNumLinksFileExt() {
        Pattern p = Pattern.compile("\\.\\w{3,4}($|\\?)"); // matches .aaa or .bbbb
        Matcher m = p.matcher(this.emailBody);

        this.values.put("numLinksFileExt", countRegexMatches(m));
    }

    /**
     * Check if the (HTML) email contains script tags and put it under the htmlJavascript key
     */
    private void checkHtmlJavascript() {
        Elements scripts = this.body.select("script"); // get all JS script elements
        this.values.put("htmlJavascript", scripts.size() > 0);
    }

    /**
     * Get the number of recipients and put it under the numRecipients key
     */
    private void getNumRecipients() {
        try {
            Address[] recipients = this.msg.getAllRecipients();

            if (recipients != null) {
                this.values.put("numRecipients", recipients.length);
            } else {
                this.values.put("numRecipients", 0);
            }
        } catch (MessagingException e) {
            this.values.put("numRecipients", 0);
        }
    }

    /**
     * Check if the body contains HTML and put it under the htmlBody key
     */
    private void checkHtmlBody() {
        List<String> htmlTags = Arrays.asList("html", "head", "body");
        boolean htmlBody = htmlTags.stream().parallel().anyMatch(this.emailBody.toLowerCase()::contains);
        this.values.put("htmlBody", htmlBody);
    }

    /**
     * Get the number of links where the text doesn't match the href attribute and put it under the numLinksNonMatching key
     * Only consider links where the text is actually a URL so ignore <a href="bla.com">Click Here!</a>
     */
    private void getNumLinksNonMatching() {
        Elements links = this.body.select("a[href]");

        int count = 0;
        for (Element l : links) {
            String text = l.text();

            // there is a link in the text
            if (text.contains("http://") || text.contains("https://") || text.contains("wwww")) {
                // if diff is greater than 10 ("https://www" ignored) then the link is different
                if (calculateStringDiff(text, l.attr("href")) > 11) {
                    count++;
                }
            }
        }

        this.values.put("numLinksNonMatching", count);
    }

    /**
     * Get the number of concatenated URLs and put it under the numConcatenatedUrls header
     * A concatenated URL: https://www.google.co.uk/:http://badsite.com
     */
    private void getNumConcatenatedUrls() {
        Elements links = this.body.select("a[href]");

        int count = 0;
        for (Element l : links) {
            String dest = l.attr("href");
            Pattern p = Pattern.compile("http|https|wwww]");
            Matcher m = p.matcher(dest);

            int occurrences = countRegexMatches(m);
            // count greater than 2 to exclude http://www.
            if (occurrences > 2) {
                count++;
            }
        }

        this.values.put("numConcatenatedUrls", count);
    }

    /**
     * Get the similarity between the From and Sender headers and put it under the fromSenderSimilar key
     */
    private void checkFromSenderSimilarity() {
        try {
            String from = this.msg.getFrom()[0].toString();
            String sender = this.msg.getHeader("Sender")[0]; // just use the first - not sure why it returns an Array

            boolean similar = calculateStringDiff(from, sender) <= 2; // 2 accounts for "" around initial address
            this.values.put("fromSenderSimilar", similar);
        } catch (MessagingException | NullPointerException e2) {
            // one is missing so assume similarity
            this.values.put("fromSenderSimilar", true);
        }
    }

    /**
     * Get the time between the email being sent and received in seconds, and put it under the spanTime header
     */
    private void getSpanTime() {
        try {
            String[] receivedStrs = this.msg.getHeader("Received");

            String sentReceivedStr = receivedStrs[receivedStrs.length - 1]; // last is origin
            String localReceivedStr = receivedStrs[0]; // first is most recent

            // split on ; as this separates content from date
            String[] splitSent = sentReceivedStr.split(";");
            String[] splitReceived = localReceivedStr.split(";");

            if (splitSent.length < 2 || splitReceived.length < 2) {
                throw new MessagingException("Origin or received date is missing");
            }

            // parse the extracted dates by removing commas, brackets etc
            SimpleDateFormat parser;
            String sentStr = splitSent[1].replaceAll(",", "").replaceAll("\\(.*?\\) ?", "").trim();
            String recStr = splitReceived[1].replaceAll(",", "").replaceAll("\\(.*?\\) ?", "").trim();

            if (sentStr.split(" ")[0].length() == 3) {
                // Thu 30 Jul 1998 15:00:00 +0000
                parser = new SimpleDateFormat("EEE dd MMM yyyy HH:mm:ss Z");
            } else {
                // 30 Jul 1998 15:00:00 +0000
                parser = new SimpleDateFormat("dd MMM yyyy HH:mm:ss Z");
            }

            Date sent = parser.parse(sentStr);
            Date received = parser.parse(recStr);

            // if either failed just return 0
            if (sent == null || received == null) {
                throw new MessagingException("Sent or received date is missing");
            }

            // return seconds between sent and received
            long time = Math.abs(received.getTime() - sent.getTime()) / 1000;
            this.values.put("spanTime", time);
        } catch (MessagingException | ParseException | NullPointerException e) {
            // error so return 0
            this.values.put("spanTime", 0L);
        }
    }

    /**
     * Get the number of unique domains in the body
     */
    private void getNumUniqueDomains() {
        Set<String> domains = new HashSet<>(); // use a Set to remove duplicates
        Elements links = this.body.select("a[href]"); // get all <a href>

        int count = 0;
        for (Element l : links) {
            try {
                String href = l.attr("href").trim(); // remove any whitespace
                URI uri = new URI(href); // parse as a URI
                String domain = uri.getHost(); // get the host (e.g. @domain.com)

                domains.add(domain); // add domain to the set
            } catch (URISyntaxException e) {
                count++;
                // error parsing href attribute
                // nothing we can do about it as it's a malformed URI so we assume it's unique
            }
        }

        this.values.put("numUniqueDomains", domains.size() + count);
    }

    /**
     * Get the number of shortened URLs and put it under the numShortenedUrls key
     */
    private void getNumUrlShortened() {
        // known shorteners
        String[] shortenedDomains = { "bit.ly", "t.co", "goo.gl", "owl.ly", "deck.ly", "su.pr", "lnk.co", "fur.ly", "moourl.com", "tinyurl.com", "tiny.cc", "lc.chat" };
        Elements links = this.body.select("a[href]"); // get all <a href>

        int count = 0;
        for (Element l : links) {
            String href = l.attr("href").toLowerCase();

            boolean shortened = Arrays.stream(shortenedDomains).parallel().anyMatch(href::contains); // if href contains any known shorteners
            if (shortened) {
                count++; // increment the count
            }
        }

        this.values.put("numShortenedUrls", count);
    }

    /**
     * Check if the Bcc header exists and put it under the BccExists key
     */
    private void checkBccExist() {
        try {
            boolean bcc = this.msg.getRecipients(Message.RecipientType.BCC).length > 0; // return length of bcc's greater than 0
            this.values.put("bccExists", bcc);
        } catch (MessagingException | NullPointerException e) {
            this.values.put("bccExists", false); // no bcc
        }
    }

    /**
     * Check if the From header has a name and put result under fromNameExists key
     */
    private void checkFromNameExist() {
        boolean namePresent = true;

        try {
            Address[] from = this.msg.getFrom();

            for (Address f : from) {
                if (f instanceof InternetAddress) {
                    if (((InternetAddress) f).getPersonal().equals("")) {
                        namePresent = false; // name is missing so set to false
                    }
                }
            }
        } catch (MessagingException | NullPointerException e) {
            namePresent = false; // assume From is missing so return false
        }

        this.values.put("fromNameExists", namePresent);
    }

    /**
     * Check if the From address has non-English characters and put it under fromNonEnglish key
     */
    private void checkFromNonEnglish() {
        boolean nonEnglish = false;
        CharsetEncoder ce = Charset.forName("US-ASCII").newEncoder();

        try {
            Address[] from = this.msg.getFrom();

            if (from == null) {
                throw new MessagingException("From missing");
            }

            for (Address f : from) {
                if (f instanceof InternetAddress) {
                    String address = f.toString(); // get String of the Address

                    if (!ce.canEncode(address)) { // if it can't be ASCII encoded it isn't English
                        nonEnglish = true;
                    }
                }
            }
        } catch (MessagingException e) {
            nonEnglish = true; // assume From is missing so return true
        }

        this.values.put("fromNonEnglish", nonEnglish);
    }

    /**
     * Get the maximum number of dots in any URI and put it under the maxDots key
     */
    private void getMaximalDots() {
        Elements links = this.body.select("a[href]"); // get all <a href>
        int maxDots = 0;

        for (Element l : links) {
            String href = l.attr("href").trim(); // remove whitespace
            int count = StringUtils.countMatches(href, "."); // count . in href attribute

            if (count > maxDots) { // if num is greater than current max then switch
                maxDots = count;
            }
        }

        this.values.put("maxDots", maxDots);
    }

    /**
     * Get the number of CCed addresses from the headers and put it under the numCc key
     */
    private void getNumCc() {
        int numCc;
        try {
            numCc = this.msg.getRecipients(Message.RecipientType.CC).length; // return number of CC recipients
        } catch (MessagingException | NullPointerException e) {
            numCc = 0; // error so assume 0
        }

        this.values.put("numCc", numCc);
    }

    /**
     * Check if the From address is a no-reply and put result under noReply key
     */
    private void checkNoReply() {
        boolean noReply = false;
        String[] noReplyAddr = { "no-reply", "noreply" }; // no-reply@example.com

        try {
            Address[] from = this.msg.getFrom(); // get From addresses

            // if From is missing throw Exception
            if (from == null) {
                throw new MessagingException("From missing");
            }

            for (Address f : from) {
                if (f instanceof InternetAddress) { // if it's an InternetAddress (ignore Group)
                    // Joe Bloggs <hello@example.com>
                    String name = ((InternetAddress) f).getPersonal(); // get the name
                    String address = ((InternetAddress) f).getAddress(); // get the email

                    // if the name or address contain above Strings then its noReply
                    if ((name != null && Arrays.stream(noReplyAddr).parallel().anyMatch(name::contains)) ||
                            (address != null && Arrays.stream(noReplyAddr).parallel().anyMatch(address::contains))) {
                        noReply = true;
                    }
                }
            }
        } catch (MessagingException e) {
            noReply = true; // no From so return true
        }

        this.values.put("noReply", noReply);
    }

    /**
     * Check if the Subject header exists and put it under the subjectExists key
     */
    private void checkSubjectExist() {
        try {
            this.values.put("subjectExists", this.msg.getSubject() != null);
        } catch (MessagingException e) {
            this.values.put("subjectExists", false);
        }
    }

    /**
     * Get the length of the Subject header and put it under the subjectLength key
     */
    private void getSubjectLength() {
        int subjectLength;
        try {
            String subject = this.msg.getSubject();
            subjectLength = subject.length();
        } catch (MessagingException | NullPointerException e) {
            subjectLength = 0;
        }

        this.values.put("subjectLength", subjectLength);
    }

    /**
     * Check if the Sender header is present in the email and put it under the senderExists key
     */
    private void checkSenderExist() {
        try {
            String sender = this.msg.getHeader("Sender")[0];
            this.values.put("senderExists", sender.length() > 0);
        } catch (MessagingException | NullPointerException e) {
            this.values.put("senderExists", false);
        }
    }

    /**
     * Utility method to calculate the difference of two Strings
     * Obtained from https://www.baeldung.com/java-levenshtein-distance
     * @param x First String
     * @param y Second String
     * @return The cost of changing x to y
     */
    private int calculateStringDiff(String x, String y) {
        int[][] store = new int[x.length() + 1][y.length() + 1];

        for (int i = 0; i <= x.length(); i++) {
            for (int j = 0; j <= y.length(); j++) {
                if (i == 0) {
                    store[i][j] = j;
                } else if (j == 0) {
                    store[i][j] = i;
                } else {
                    store[i][j] = min(store[i - 1][j - 1] + costOfSubstitution(x.charAt(i - 1), y.charAt(j - 1)),
                            store[i - 1][j] + 1,
                            store[i][j - 1] + 1);
                }
            }
        }

        return store[x.length()][y.length()];
    }


    /**
     * @param a Char to check
     * @param b Char to check
     * @return Cost of substituting: 1 if they don't match, 0 otherwise
     */
    private int costOfSubstitution(char a, char b) {
        return a == b ? 0 : 1;
    }

    /**
     * @param numbers An array of numbers
     * @return The minimum value in the Array (or MAX_VALUE if none)
     */
    private int min(int... numbers) {
        return Arrays.stream(numbers)
                .min().orElse(Integer.MAX_VALUE);
    }

    /**
     * @param m The Matcher object we're using to count occurrences in a String.
     * @return The count of regex matches from the Matcher.
     */
    private int countRegexMatches(Matcher m) {
        int count = 0;
        int i = 0;
        while (m.find(i)) {
            count++;
            i = m.start() + 1; // prevent overlaps
        }

        return count;
    }

}
