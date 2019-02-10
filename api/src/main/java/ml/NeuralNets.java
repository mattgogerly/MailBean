package ml;

import org.encog.ConsoleStatusReportable;
import org.encog.Encog;
import org.encog.EncogError;
import org.encog.engine.network.activation.ActivationSigmoid;
import org.encog.engine.network.activation.ActivationTANH;
import org.encog.ml.CalculateScore;
import org.encog.ml.MLMethod;
import org.encog.ml.data.MLDataPair;
import org.encog.ml.data.MLDataSet;
import org.encog.ml.data.basic.BasicMLDataSet;
import org.encog.ml.data.specific.CSVNeuralDataSet;
import org.encog.ml.factory.MLMethodFactory;
import org.encog.ml.factory.MLTrainFactory;
import org.encog.ml.svm.SVM;
import org.encog.ml.svm.training.SVMTrain;
import org.encog.ml.train.MLTrain;
import org.encog.ml.train.strategy.Greedy;
import org.encog.ml.train.strategy.HybridStrategy;
import org.encog.ml.train.strategy.StopTrainingStrategy;
import org.encog.neural.networks.BasicNetwork;
import org.encog.neural.networks.layers.BasicLayer;
import org.encog.neural.networks.training.TrainingSetScore;
import org.encog.neural.networks.training.anneal.NeuralSimulatedAnnealing;
import org.encog.neural.networks.training.propagation.back.Backpropagation;
import org.encog.neural.networks.training.propagation.resilient.ResilientPropagation;
import org.encog.neural.pattern.FeedForwardPattern;
import org.encog.util.csv.CSVFormat;
import org.encog.util.normalize.DataNormalization;
import org.encog.util.normalize.input.InputField;
import org.encog.util.normalize.input.InputFieldCSV;
import org.encog.util.normalize.input.InputFieldCSVText;
import org.encog.util.normalize.output.OutputFieldRangeMapped;
import org.encog.util.normalize.output.nominal.OutputOneOf;
import org.encog.util.normalize.target.NormalizationStorageCSV;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;

class NeuralNets {

    private NeuralNets() {

    }

    static SVM createSVM() {
        return new SVM(24, false);
    }

    static double trainSVM(SVM svm, MLDataSet trainingSet) {
        SVMTrain train = new SVMTrain(svm, trainingSet);

        int epoch = 1;
        do {
            train.iteration();
            System.out.println("Epoch #" + epoch + " Error: " + train.getError());
            epoch++;
        } while (train.getError() > 0.001);

        return train.getError();
    }

    static BasicNetwork createFeedforward() {
        BasicNetwork network = new BasicNetwork();
        network.addLayer(new BasicLayer(null, true, 24));
        network.addLayer(new BasicLayer(new ActivationSigmoid(), true, 6));
        network.addLayer(new BasicLayer(new ActivationSigmoid(), false, 1));
        network.getStructure().finalizeStructure();
        network.reset();

        return network;
    }

    static double trainNeuralNetwork(BasicNetwork network, CSVNeuralDataSet data) {
        final MLTrain trainMain = new ResilientPropagation(network, data);
        trainMain.addStrategy(new Greedy());

        CalculateScore score = new TrainingSetScore(data);
        final MLTrain trainAlt = new NeuralSimulatedAnnealing(network, score, 10, 2, 100);
        trainMain.addStrategy(new HybridStrategy(trainAlt));

        final StopTrainingStrategy stop = new StopTrainingStrategy();
        trainMain.addStrategy(stop);

        int epoch = 1;
        while (!stop.shouldStop()) {
            trainMain.iteration();
            System.out.println("Training Epoch #" + epoch + " Error: " + trainMain.getError());
            epoch++;
        }

        trainMain.finishTraining();
        return trainMain.getError();
    }
    
    static void prepareDataManual() {
        File source = getSource();
        DataNormalization norm = new DataNormalization();
        
        InputField numAttachments, sizeAttachments, numLinks, numLinksClickHere, numIpUrl, numLinksFileExt, numRecipients,
                numLinksNonMatching, numConcatenatedUrls, spanTime, numUniqueDomains, numShortenedUrls, maxDots, numCc,
                subjectLength;

        InputFieldCSVText htmlJavascript, htmlBody, fromSenderSimilar, bccExists, fromNameExists, fromNonEnglish, noReply,
                subjectExists, senderExists, classification;

        norm.addInputField(numAttachments = new InputFieldCSV(true, source, 0));
        norm.addInputField(sizeAttachments = new InputFieldCSV(true, source, 1));
        norm.addInputField(numLinks = new InputFieldCSV(true, source, 2));
        norm.addInputField(numLinksClickHere = new InputFieldCSV(true, source, 3));
        norm.addInputField(numIpUrl = new InputFieldCSV(true, source, 4));
        norm.addInputField(numLinksFileExt = new InputFieldCSV(true, source, 5));
        norm.addInputField(htmlJavascript = new InputFieldCSVText(true, source, 6));
        norm.addInputField(numRecipients = new InputFieldCSV(true, source, 7));
        norm.addInputField(htmlBody = new InputFieldCSVText(true, source, 8));
        norm.addInputField(numLinksNonMatching = new InputFieldCSV(true, source, 9));
        norm.addInputField(numConcatenatedUrls = new InputFieldCSV(true, source, 10));
        norm.addInputField(fromSenderSimilar = new InputFieldCSVText(true, source, 11));
        norm.addInputField(spanTime = new InputFieldCSV(true, source, 12));
        norm.addInputField(numUniqueDomains = new InputFieldCSV(true, source, 13));
        norm.addInputField(numShortenedUrls = new InputFieldCSV(true, source, 14));
        norm.addInputField(bccExists = new InputFieldCSVText(true, source, 15));
        norm.addInputField(fromNameExists = new InputFieldCSVText(true, source, 16));
        norm.addInputField(fromNonEnglish = new InputFieldCSVText(true, source, 17));
        norm.addInputField(maxDots = new InputFieldCSV(true, source, 18));
        norm.addInputField(numCc = new InputFieldCSV(true, source, 19));
        norm.addInputField(noReply = new InputFieldCSVText(true, source, 20));
        norm.addInputField(subjectExists = new InputFieldCSVText(true, source, 21));
        norm.addInputField(subjectLength = new InputFieldCSV(true, source, 22));
        norm.addInputField(senderExists = new InputFieldCSVText(true, source, 23));
        norm.addInputField(classification = new InputFieldCSVText(true, source, 24));

        htmlJavascript.addMapping("TRUE");
        htmlJavascript.addMapping("FALSE");
        htmlBody.addMapping("TRUE");
        htmlBody.addMapping("FALSE");
        fromSenderSimilar.addMapping("TRUE");
        fromSenderSimilar.addMapping("FALSE");
        bccExists.addMapping("TRUE");
        bccExists.addMapping("FALSE");
        fromNameExists.addMapping("TRUE");
        fromNameExists.addMapping("FALSE");
        fromNonEnglish.addMapping("TRUE");
        fromNonEnglish.addMapping("FALSE");
        noReply.addMapping("TRUE");
        noReply.addMapping("FALSE");
        subjectExists.addMapping("TRUE");
        subjectExists.addMapping("FALSE");
        senderExists.addMapping("TRUE");
        senderExists.addMapping("FALSE");
        classification.addMapping("phishing");
        classification.addMapping("non-phishing");

        norm.addOutputField(new OutputFieldRangeMapped(numAttachments, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(sizeAttachments, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numLinks, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numLinksClickHere, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numIpUrl, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numLinksFileExt, 0, 1));
        norm.addOutputField(new OutputOneOf(htmlJavascript, 1, 0));
        norm.addOutputField(new OutputFieldRangeMapped(numRecipients, 0, 1));
        norm.addOutputField(new OutputOneOf(htmlBody, 1, 0));
        norm.addOutputField(new OutputFieldRangeMapped(numLinksNonMatching, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numConcatenatedUrls, 0, 1));
        norm.addOutputField(new OutputOneOf(fromSenderSimilar, 1, 0));
        norm.addOutputField(new OutputFieldRangeMapped(spanTime, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numUniqueDomains, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numShortenedUrls, 0, 1));
        norm.addOutputField(new OutputOneOf(bccExists, 1, 0));
        norm.addOutputField(new OutputOneOf(fromNameExists, 1, 0));
        norm.addOutputField(new OutputOneOf(fromNonEnglish, 1, 0));
        norm.addOutputField(new OutputFieldRangeMapped(maxDots, 0, 1));
        norm.addOutputField(new OutputFieldRangeMapped(numCc, 0, 1));
        norm.addOutputField(new OutputOneOf(noReply, 1, 0));
        norm.addOutputField(new OutputOneOf(subjectExists, 1, 0));
        norm.addOutputField(new OutputFieldRangeMapped(subjectLength, 0, 1));
        norm.addOutputField(new OutputOneOf(senderExists, 1, 0));
        norm.addOutputField(new OutputOneOf(classification, 1, 0));

        File output = new File("normalised_all.csv");
        norm.setCSVFormat(CSVFormat.DECIMAL_POINT);
        norm.setTarget(new NormalizationStorageCSV(CSVFormat.ENGLISH, output));
        norm.setReport(new ConsoleStatusReportable());
        norm.process();
    }

    static CSVNeuralDataSet prepareNeuralTrainData() {
        return new CSVNeuralDataSet("normalised_train.csv", 24, 1, false);
    }

    static CSVNeuralDataSet prepareNeuralTestData() {
        return new CSVNeuralDataSet("normalised_test.csv", 24, 1, false);
    }

    private static File getSource() {
        final URL csv = Runner.class.getClassLoader().getResource("output.csv");
        File source;

        try {
            source = new File(csv.toURI());
        } catch (URISyntaxException e) {
            throw new EncogError("Source file is missing");
        }

        return source;
    }

}
