package com.parlayanyildizlar.ices4hudemo.model;

import java.util.HashMap;
import java.util.Map;

public class QuestionStatistics {

    private String questionText;
    private Map<String, Integer> answers;

    public QuestionStatistics(String questionText, Map<String, Integer> answers) {
        this.questionText = questionText;
        this.answers = answers;
    }

    public QuestionStatistics(String questionText) {
        this.questionText = questionText;
        this.answers = new HashMap<>();
    }


    public void addAnswer(String answer) {
        answers.put(answer, answers.getOrDefault(answer, 0) + 1);
    }

    public Map<String, Double> getAnswerPercentages() {
        Map<String, Double> percentages = new HashMap<>();
        int totalAnswers = answers.values().stream().mapToInt(Integer::intValue).sum();

        for (Map.Entry<String, Integer> entry : answers.entrySet()) {
            double percentage = (double) entry.getValue() / totalAnswers;
            percentages.put(entry.getKey(), percentage);
        }

        return percentages;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Map<String, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, Integer> answers) {
        this.answers = answers;
    }

}
