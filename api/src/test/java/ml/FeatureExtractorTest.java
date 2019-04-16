package ml;

import org.junit.Before;
import org.junit.Test;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.util.Date;
import java.util.Map;
import java.util.Properties;

import static org.junit.Assert.*;

public class FeatureExtractorTest {

    private FeatureExtractor extractor;
    private Message msg;

    @Before
    public void setUp() {
        Properties props = new Properties();
        this.msg = new MimeMessage(Session.getInstance(props));
        this.extractor = new FeatureExtractor(msg);
    }

    @Test
    public void extractFeatures() throws MessagingException {
        msg.setFrom(new InternetAddress("noreply@test.com"));
        msg.addRecipient(Message.RecipientType.TO, new InternetAddress("testto@test.com"));
        msg.addRecipient(Message.RecipientType.CC, new InternetAddress("testcc@test.com"));
        msg.addRecipient(Message.RecipientType.BCC, new InternetAddress("testbcc@test.com"));

        msg.setSentDate(new Date());
        msg.setHeader("Received", "from mail.example.org (mail.example.org [192.168.4.9])\n" +
                "\tby example.com (Postfix) with ESMTP id 5ABB8468E3\n" +
                "\tfor <user@login.example.com>; Mon, 15 Apr 2019 15:00:00 +0100 (BST)");
        msg.setHeader("Sender", "diffsender@test.com");
        msg.setSubject("Test");
        msg.setContent("<!DOCTYPE html><html><head></head><body><a href=\"badlink.com\">Click here</a><a href=\"badlink.com/test.exe\">File ext</a><a href=\"1.1.1.1\">IP URL</a><a href=\"bit.ly/bad\">Shortened link</a><script type=\"text/javascript\">function bad(){console.log('bad!!!');}</script></body></html>", "text/html");

        extractor.extractFeatures();
        Map<String, Object> features = extractor.getValues();

        assertEquals(0, features.get("numAttachments"));
        assertEquals(0L, features.get("sizeAttachments"));
        assertEquals(4, features.get("numLinks"));
        assertEquals(1, features.get("numLinksClickHere"));
        assertEquals(0, features.get("numIpUrl"));
        assertEquals(1, features.get("numLinksFileExt"));
        assertEquals(true, features.get("htmlJavascript"));
        assertEquals(3, features.get("numRecipients"));
        assertEquals(true, features.get("htmlBody"));
        assertEquals(0, features.get("numLinksNonMatching"));
        assertEquals(0, features.get("numConcatenatedUrls"));
        assertEquals(false, features.get("fromSenderSimilar"));
        assertEquals(0L, features.get("spanTime"));
        assertEquals(3, features.get("numUniqueDomains"));
        assertEquals(1, features.get("numUrlShortened"));
        assertEquals(true, features.get("bccExists"));
        assertEquals(false, features.get("fromNameExists"));
        assertEquals(false, features.get("fromNonEnglish"));
        assertEquals(3, features.get("maximalDots"));
        assertEquals(1, features.get("numCc"));
        assertEquals(true, features.get("noReply"));
        assertEquals(true, features.get("subjectExists"));
        assertEquals(4, features.get("subjectLength"));
        assertEquals(true, features.get("senderExists"));
    }

    @Test
    public void getValues() {
    }
}