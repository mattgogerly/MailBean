package ml;

import org.encog.EncogError;
import org.encog.ml.MLClassification;
import org.encog.ml.data.versatile.VersatileMLDataSet;
import org.encog.ml.data.versatile.columns.ColumnDefinition;
import org.encog.ml.data.versatile.columns.ColumnType;
import org.encog.ml.data.versatile.sources.CSVDataSource;
import org.encog.ml.data.versatile.sources.VersatileDataSource;
import org.encog.ml.factory.MLMethodFactory;
import org.encog.ml.factory.MLTrainFactory;
import org.encog.ml.model.EncogModel;
import org.encog.util.csv.CSVFormat;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

/**
 * Class to facilitate obtaining data from files and training a neural classifier.
 *
 * @author mattgogerly
 */
class NeuralNets {

    /**
     * Intentionally empty constructor
     */
    private NeuralNets() {

    }

    /**
     * Takes a normalised EncogModel and performs 5-fold cross-validation to obtain the best classifier.
     * @param model The normalised model that is ready to be trained
     * @return The best model resulting from 5 fold cross-validation
     */
    static MLClassification trainNeuralNetwork(EncogModel model) {
        model.holdBackValidation(0, false, 1001);
        return (MLClassification) model.crossvalidate(5, false);
    }

    /**
     * Defines the columns of the input data and analyses it ready for normalisation.
     * @return The analysed VersatileMLDataSet
     */
    static VersatileMLDataSet processData() {
        VersatileDataSource dataSource = getData("TRAINING");
        VersatileMLDataSet data = new VersatileMLDataSet(dataSource);

        data.defineSourceColumn("numAttachments", ColumnType.continuous);
        data.defineSourceColumn("sizeAttachments", ColumnType.continuous);
        data.defineSourceColumn("numLinks", ColumnType.continuous);
        data.defineSourceColumn("numLinksClickHere", ColumnType.continuous);
        data.defineSourceColumn("numIpUrl", ColumnType.continuous);
        data.defineSourceColumn("numLinksFileExt", ColumnType.continuous);
        data.defineSourceColumn("htmlJavascript", ColumnType.nominal);
        data.defineSourceColumn("numRecipients", ColumnType.continuous);
        data.defineSourceColumn("htmlBody", ColumnType.nominal);
        data.defineSourceColumn("numLinksNonMatching", ColumnType.continuous);
        data.defineSourceColumn("numConcatenatedUrls", ColumnType.continuous);
        data.defineSourceColumn("fromSenderSimilar", ColumnType.nominal);
        data.defineSourceColumn("spanTime", ColumnType.continuous);
        data.defineSourceColumn("numUniqueDomains", ColumnType.continuous);
        data.defineSourceColumn("numUrlShortened", ColumnType.continuous);
        data.defineSourceColumn("bccExists", ColumnType.nominal);
        data.defineSourceColumn("fromNameExists", ColumnType.nominal);
        data.defineSourceColumn("fromNonEnglish", ColumnType.nominal);
        data.defineSourceColumn("maximalDots", ColumnType.continuous);
        data.defineSourceColumn("numCc", ColumnType.continuous);
        data.defineSourceColumn("noReply", ColumnType.nominal);
        data.defineSourceColumn("subjectExists", ColumnType.nominal);
        data.defineSourceColumn("subjectLength", ColumnType.continuous);
        data.defineSourceColumn("senderExists", ColumnType.nominal);

        ColumnDefinition outputColumn = data.defineSourceColumn("class", ColumnType.nominal);
        data.defineSingleOutputOthersInput(outputColumn);

        data.analyze();
        return data;
    }

    /**
     * @param data VersatileMLDataSet that has had columns defined and analysed
     * @param architecture The architecture of the model
     * @return The normalised dataset
     */
    static EncogModel prepareModel(VersatileMLDataSet data, String architecture) {
        EncogModel model = new EncogModel(data);
        model.selectMethod(data, MLMethodFactory.TYPE_FEEDFORWARD, architecture, MLTrainFactory.TYPE_RPROP, "");
        model.selectTrainingType(data);
        data.normalize();

        return model;
    }

    /**
     * @param type Either TRAINING or TESTING depending on data required
     * @return A populated CSVDataSource with the specified data
     */
    static CSVDataSource getData(String type) {
        String filename;
        if (type.equals("TRAINING")) {
            filename = "train.csv";
        } else {
            filename = "test.csv";
        }

        File source;
        try {
            final URL csv = Driver.class.getClassLoader().getResource(filename);
            if (csv == null) {
                throw new IOException("Classpath resource missing");
            }

            source = new File(csv.toURI());
        } catch (URISyntaxException | IOException e) {
            throw new EncogError("Source file is missing");
        }

        return new CSVDataSource(source, true, CSVFormat.DECIMAL_POINT);
    }

}
