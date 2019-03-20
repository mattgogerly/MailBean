package ml;

class TrainResults {

    private double error = 0;
    private double accuracy = 0;
    private double precision = 0;
    private double recall = 0;
    private double f1 = 0;
    private double fpr = 0;
    private double fnr = 0;

    public TrainResults() {
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public double getPrecision() {
        return precision;
    }

    public void setPrecision(double precision) {
        this.precision = precision;
    }

    public double getRecall() {
        return recall;
    }

    public void setRecall(double recall) {
        this.recall = recall;
    }

    public double getF1() {
        return f1;
    }

    public void setF1(double f1) {
        this.f1 = f1;
    }

    public double getFpr() {
        return fpr;
    }

    public void setFpr(double fpr) {
        this.fpr = fpr;
    }

    public double getFnr() {
        return fnr;
    }

    public void setFnr(double fnr) {
        this.fnr = fnr;
    }

    public double getError() {
        return error;
    }

    public void setError(double error) {
        this.error = error;
    }
}
