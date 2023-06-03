package com.parlayanyildizlar.ices4hudemo.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "answers")
public class Answer {

    @Id
    private String id;
    private String surveyId;
    private String userEmail;
    private List<String> answers;

    public Answer() {}

    public Answer(String surveyId, String userEmail, List<String> answers) {
        this.surveyId = surveyId;
        this.userEmail = userEmail;
        this.answers = answers;
    }

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    
}
