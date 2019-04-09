package ml;

import java.io.*;
import java.util.Map;
import java.util.Set;

/**
 * Static class to write the results of Feature extraction to a file.
 *
 * @author mattgogerly
 */
class FeatureWriter {

    /**
     * Private constructor allows us to create a "static" class
     */
    private FeatureWriter() {

    }

    /**
     * @param location The location of the output file
     * @param values The mapping of features to their values
     */
    static void writeFeatureTitles(String location, Map<String, Object> values) {
        Set<String> keys = values.keySet(); // get the keys from the Map

        try {
            // if the file doesn't already exist (don't want to overwrite)
            if (checkNotExists(location)) {
                BufferedWriter bw = new BufferedWriter(new FileWriter(location));

                // write each key followed by a comma (CSV)
                for (String k : keys) {
                    if (k.equals("true") || k.equals("false")) {
                        bw.write(k.equals("true") ? 1 : 0);
                        bw.write(",");
                    } else {
                        bw.write(k + ",");
                    }
                }

                // write the classification header and a new line
                bw.write("class");
                bw.write('\n');

                bw.flush();
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * @param location The location of the output file
     * @param type Whether the email is "phishing" or "non-phishing"
     * @param values The values of the features for a given email
     */
    static void writeFeatures(String location, String type, Map<String, Object> values) {
        Set<String> keys = values.keySet(); // get the keys from the Map

        try {
            // if the file doesn't exist then write the headers first
            if (checkNotExists(location)) {
                writeFeatureTitles(location, values);
            }

            BufferedWriter bw = new BufferedWriter(new FileWriter(location, true));

            // write each value followed by a comma (CSV)
            for (String k : keys) {
                bw.write(values.get(k).toString());
                bw.write(',');
            }

            // write whether its phishing or non-phishing and a new line
            bw.write(type);
            bw.write('\n');

            bw.flush();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * @param location The location of the file
     * @return Whether the file doesn't exist (true) or does (false)
     */
    private static boolean checkNotExists(String location) {
        try {
            BufferedReader br = new BufferedReader(new FileReader(location));
            String first = br.readLine();
            br.close();

            return first.contains("numAttachments");
        } catch (IOException | NullPointerException e) {
            return false;
        }
    }
}
