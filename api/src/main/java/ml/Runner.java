package ml;

import org.encog.Encog;
import org.encog.ml.MLClassification;
import org.encog.ml.data.MLDataPair;
import org.encog.ml.data.MLDataSet;
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
        runML();
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

    private static void runML() {
        VersatileMLDataSet data = NeuralNets.processData();
        EncogModel model = NeuralNets.prepareModel(data, MLMethodFactory.TYPE_FEEDFORWARD,
                "?:B->SIGMOID->36:B->SIGMOID->?");

        BasicNetwork classifier = (BasicNetwork) NeuralNets.trainNeuralNetwork(model, data);
        NormalizationHelper helper = data.getNormHelper();

        printResults("Feedforward", classifier, helper, model.getValidationDataset());

        Encog.getInstance().shutdown();
    }

    private static void printResults(String type, BasicNetwork classifier, NormalizationHelper helper,
                                     MLDataSet validationSet) {
        double total = 0;
        double correct = 0;
        double falseNegative = 0;
        double falsePositive = 0;

        for (MLDataPair p : validationSet) {
            String expected = helper.denormalizeOutputVectorToString(p.getIdeal())[0];

            int predicted = classifier.classify(p.getInput());
            String predictedClass = helper.getOutputColumns().get(0).getClasses().get(predicted);

            if (expected.equals(predictedClass))
                correct++;

            if (expected.equals("phishing") && predictedClass.equals("non-phishing"))
                falseNegative++;

            if (expected.equals("non-phishing") && predictedClass.equals("phishing"))
                falsePositive++;

            total++;
        }

        System.out.println();
        System.out.println("---------------------------------------------");
        System.out.println(type + " with structure " + classifier.getFactoryArchitecture());
        System.out.println("---------------------------------------------");
        System.out.println(correct + " correct of " + total  + " total");
        System.out.println("Accuracy: " + (correct / total) * 100 + "%");
        System.out.println("Error: " + (total - correct) / total);
        System.out.println("FP rate: " + falsePositive / total);
        System.out.println("FN rate: " + falseNegative / total);
    }

}
