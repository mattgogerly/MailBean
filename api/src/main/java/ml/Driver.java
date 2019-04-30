package ml;

import org.encog.Encog;
import org.encog.ml.data.MLDataPair;
import org.encog.ml.data.versatile.NormalizationHelper;
import org.encog.ml.data.versatile.VersatileMLDataSet;
import org.encog.ml.model.EncogModel;
import org.encog.neural.networks.BasicNetwork;
import org.encog.util.obj.SerializeObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Message;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.util.Map;

/**
 * Driver class to run ML related tasks
 *
 * @author mattgogerly
 */
public class Driver {

    private static Logger logger;

    /**
     *
     * @param args First argument should be either extract or train. For extraction the second argument should be
     *             a filename in the classpath and the third argument should be the class (phishing/non-phishing). For
     *             training the second argument should be the network architecture and the third argument is true/false
     *             dependent on whether saving the network is desired.
     */
    public static void main(String[] args) {
        logger = LoggerFactory.getLogger(Driver.class);

        if (args[0].equals("extract")) {
            extractFeatures(args[1], args[2]);
        } else if (args[0].equals("train")) {
            runML(args[1], Boolean.valueOf(args[2]));
        }
    }

    /**
     * Load in a specified file and extract the features from each email in the file. The result is written to
     * output.csv.
     * @param filename The classpath filename to load data and extract features from
     */
    private static void extractFeatures(String filename, String clazz) {
        try {
            URL resource = Driver.class.getClassLoader().getResource(filename);
            if (resource == null) {
                throw new IOException("Classpath resource missing");
            }

            Path path = new File(resource.toURI()).toPath();
            Message[] emails = MboxParser.readFromMboxFile(path);

            for (Message m : emails) {
                FeatureExtractor fe = new FeatureExtractor(m);
                fe.extractFeatures();
                Map<String, Object> values = fe.getValues();

                FeatureWriter.writeFeatures("dataset.csv", clazz, values);
            }
        } catch (IOException | URISyntaxException e) {
            logger.error("mbox file not found", e);
        }
    }

    private static void runML(String architecture, boolean save) {
        VersatileMLDataSet data = NeuralNets.processData();
        EncogModel model = NeuralNets.prepareModel(data, architecture);
        NormalizationHelper helper = data.getNormHelper();

        BasicNetwork classifier = (BasicNetwork) NeuralNets.trainNeuralNetwork(model);
        TrainResults results = calculateMetrics(classifier, helper);
        printResults(architecture, results);

        if (save) {
            try {
                SerializeObject.save(new File("classifier"), classifier);
                SerializeObject.save(new File("normaliser"), helper);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        Encog.getInstance().shutdown();
    }

    private static TrainResults calculateMetrics(BasicNetwork classifier, NormalizationHelper helper) {
        double total = 0;
        double correct = 0;
        double truePositive = 0;
        double trueNegative = 0;
        double falsePositive = 0;
        double falseNegative = 0;

        VersatileMLDataSet testSet = new VersatileMLDataSet(NeuralNets.getData("TEST"));
        testSet.setNormHelper(helper);
        testSet.analyze();
        testSet.normalize();

        for (MLDataPair p : testSet) {
            String expected = helper.denormalizeOutputVectorToString(p.getIdeal())[0];

            int predicted = classifier.classify(p.getInput());
            String predictedClass = helper.getOutputColumns().get(0).getClasses().get(predicted);

            if (expected.equals(predictedClass) && predictedClass.equals("phishing")) {
                truePositive++;
                correct++;
            } else if (expected.equals(predictedClass) && predictedClass.equals("non-phishing")) {
                trueNegative++;
                correct++;
            }

            if (expected.equals("phishing") && predictedClass.equals("non-phishing"))
                falseNegative++;

            if (expected.equals("non-phishing") && predictedClass.equals("phishing"))
                falsePositive++;

            total++;
        }

        double precision = truePositive / (truePositive + falsePositive);
        double recall = truePositive / (truePositive + falseNegative);

        TrainResults results = new TrainResults();

        results.setError(((total - correct) / total));
        results.setAccuracy((correct / total));
        results.setPrecision(precision);
        results.setRecall(recall);
        results.setF1((2 / ((1 / precision) + (1 / recall))));
        results.setFpr((falsePositive / (trueNegative + falsePositive)));
        results.setFnr((falseNegative / (falseNegative + truePositive)));

        return results;
    }

    private static void printResults(String architecture, TrainResults r) {
        System.out.println();
        System.out.println("-----------------------------------------------");
        System.out.println(architecture);
        System.out.println("-----------------------------------------------");
        System.out.println("Error: " + r.getError());
        System.out.println("Accuracy: " + r.getAccuracy());
        System.out.println("Precision: " + r.getPrecision());
        System.out.println("Recall: " + r.getRecall());
        System.out.println("F1: " + r.getF1());
        System.out.println("FP rate: " + r.getFpr());
        System.out.println("FN rate: " + r.getFnr());

        System.out.println();
        System.out.printf("Excel friendly: %f,%f,%f,%f,%f,%f", r.getAccuracy(), r.getPrecision(), r.getRecall(),
                r.getF1(), r.getFpr(), r.getFnr());
        System.out.println();
    }

}
