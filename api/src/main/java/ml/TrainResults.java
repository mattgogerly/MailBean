package ml;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class TrainResults {

    private double error = 0;
    private double accuracy = 0;
    private double precision = 0;
    private double recall = 0;
    private double f1 = 0;
    private double fpr = 0;
    private double fnr = 0;

    TrainResults() {
    }
}
