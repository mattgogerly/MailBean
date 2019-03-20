package ml;

import org.encog.Encog;
import org.encog.ml.data.MLDataPair;
import org.encog.ml.data.versatile.NormalizationHelper;
import org.encog.ml.data.versatile.VersatileMLDataSet;
import org.encog.ml.factory.MLMethodFactory;
import org.encog.ml.model.EncogModel;
import org.encog.neural.networks.BasicNetwork;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Message;
import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.util.Map;

public class Runner {

    private static Logger logger;

    /**
     *
     * @param args No arguments are expected
     */
    public static void main(String[] args) {
        logger = LoggerFactory.getLogger(Runner.class);
        //extractFeatures();

        runML("?:B->SIGMOID->12:B->SIGMOID->?");
        runML("?:B->SIGMOID->24:B->SIGMOID->?");
        runML("?:B->SIGMOID->36:B->SIGMOID->?");
        runML("?:B->SIGMOID->40:B->SIGMOID->?");
        runML("?:B->SIGMOID->44:B->SIGMOID->?");
        runML("?:B->SIGMOID->48:B->SIGMOID->?");
        runML("?:B->SIGMOID->60:B->SIGMOID->?");
        runML("?->SIGMOID->12->SIGMOID->?");
        runML("?->SIGMOID->24->SIGMOID->?");
        runML("?->SIGMOID->36->SIGMOID->?");
        runML("?->SIGMOID->40->SIGMOID->?");
        runML("?->SIGMOID->44->SIGMOID->?");
        runML("?->SIGMOID->48->SIGMOID->?");
        runML("?->SIGMOID->60->SIGMOID->?");
    }

    /**
     * Load in a specified file and extract the features from each email in the file. The result is written to
     * output.csv.
     */
    private static void extractFeatures() {
        URL resource = Runner.class.getClassLoader().getResource("nazario.mbox");

        try {
            Path path = new File(resource.toURI()).toPath();
            Message[] emails = MboxParser.readFromMboxFile(path);

            for (Message m : emails) {
                FeatureExtractor fe = new FeatureExtractor(m);
                fe.extractFeatures();
                Map<String, Object> values = fe.getValues();

                FeatureWriter.writeFeatureTitles("output.csv", values);
                FeatureWriter.writeFeatures("output.csv", "phishing", values);
            }
        } catch (NullPointerException | URISyntaxException e) {
            logger.error("mbox file not found", e);
        }
    }

    private static void runML(String architecture) {
        VersatileMLDataSet data = NeuralNets.processData();
        EncogModel model = NeuralNets.prepareModel(data, MLMethodFactory.TYPE_FEEDFORWARD, architecture);
        NormalizationHelper helper = data.getNormHelper();

        TrainResults results = new TrainResults();
        int runs = 0;
        for (; runs < 5; runs++) {
            BasicNetwork classifier = (BasicNetwork) NeuralNets.trainNeuralNetwork(model);
            calculateMetrics(classifier, helper, results);
        }

        results.setError(results.getError() / runs);
        results.setAccuracy(results.getAccuracy() / runs);
        results.setPrecision(results.getPrecision() / runs);
        results.setRecall(results.getRecall() / runs);
        results.setF1(results.getF1() / runs);
        results.setFpr(results.getFpr() / runs);
        results.setFnr(results.getFnr() / runs);

        printResults(architecture, results);
        Encog.getInstance().shutdown();
    }

    private static void calculateMetrics(BasicNetwork classifier, NormalizationHelper helper, TrainResults avgResults) {
        double total = 0;
        double correct = 0;
        double truePositive = 0;
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

        avgResults.setError(avgResults.getError() + ((total - correct) / total));
        avgResults.setAccuracy(avgResults.getAccuracy() + (correct / total));
        avgResults.setPrecision(avgResults.getPrecision() + precision);
        avgResults.setRecall(avgResults.getRecall() + recall);
        avgResults.setF1(avgResults.getF1() + (2 / ((1 / precision) + (1 / recall))));
        avgResults.setFpr(avgResults.getFpr() + (falsePositive / total));
        avgResults.setFnr(avgResults.getFnr() + (falseNegative / total));
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
    }

}
