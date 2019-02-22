package ml;

import org.encog.ConsoleStatusReportable;
import org.encog.EncogError;
import org.encog.ml.MLClassification;
import org.encog.ml.data.MLDataPair;
import org.encog.ml.data.versatile.NormalizationHelper;
import org.encog.ml.data.versatile.VersatileMLDataSet;
import org.encog.ml.data.versatile.columns.ColumnDefinition;
import org.encog.ml.data.versatile.columns.ColumnType;
import org.encog.ml.data.versatile.sources.CSVDataSource;
import org.encog.ml.data.versatile.sources.VersatileDataSource;
import org.encog.ml.factory.MLTrainFactory;
import org.encog.ml.model.EncogModel;
import org.encog.util.csv.CSVFormat;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;

class NeuralNets {

    private NeuralNets() {

    }

    static MLClassification trainNeuralNetwork(EncogModel model, VersatileMLDataSet data) {
        model.holdBackValidation(0.3, true, 1001);
        return (MLClassification) model.crossvalidate(5, true);
    }
    
    static VersatileMLDataSet processData() {
        File source = getSource();
        VersatileDataSource dataSource = new CSVDataSource(source, true, CSVFormat.DECIMAL_POINT);
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
        data.defineSourceColumn("numShortenedUrls", ColumnType.continuous);
        data.defineSourceColumn("bccExists", ColumnType.nominal);
        data.defineSourceColumn("fromNameExists", ColumnType.nominal);
        data.defineSourceColumn("fromNonEnglish", ColumnType.nominal);
        data.defineSourceColumn("maxDots", ColumnType.continuous);
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

    static EncogModel prepareModel(VersatileMLDataSet data, String modelType, String architecture) {
        EncogModel model = new EncogModel(data);
        model.selectMethod(data, modelType, architecture, MLTrainFactory.TYPE_RPROP, "");
        model.selectTrainingType(data);
        model.setReport(new ConsoleStatusReportable());

        data.normalize();

        return model;
    }

    private static File getSource() {
        final URL csv = Runner.class.getClassLoader().getResource("output_original.csv");
        File source;

        try {
            source = new File(csv.toURI());
        } catch (URISyntaxException e) {
            throw new EncogError("Source file is missing");
        }

        return source;
    }

}
