package com.parlayanyildizlar.ices4hudemo.model;

import java.util.ArrayList;
import java.util.List;

public class SurveyStatistics {

    private String surveyId;
    private List<QuestionStatistics> questionStatistics;

    public SurveyStatistics() {
    }

   public SurveyStatistics(String surveyId) {
    this.surveyId = surveyId;
    this.questionStatistics = new ArrayList<>();
}


    public void addAnswer(String question, String answer) {
        for (QuestionStatistics qStats : questionStatistics) {
            if (qStats.getQuestionText().equals(question)) {
                qStats.addAnswer(answer);
                return;
            }
        }

        // If we didn't find the question it's a new one
        QuestionStatistics newQStats = new QuestionStatistics(question);
        newQStats.addAnswer(answer);
        questionStatistics.add(newQStats);
    }

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public List<QuestionStatistics> getQuestionStatistics() {
        return questionStatistics;
    }

    public void setQuestionStatistics(List<QuestionStatistics> questionStatistics) {
        this.questionStatistics = questionStatistics;
    }

}
