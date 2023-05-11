package com.parlayanyildizlar.ices4hudemo.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "surveys")
public class Survey {
    
    @Id
    private ObjectId surveyID;

    private ObjectId createdBy;
    private List<Question> questions;

    public Survey(){}
    public Survey(ObjectId createdBy, List<Question> questions){
        this.createdBy = createdBy;
        this.questions = questions;
    }

    public ObjectId getSurveyID() {
        return this.surveyID;
    }

    public void setSurveyID(ObjectId surveyID) {
        this.surveyID = surveyID;
    }

    public ObjectId getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(ObjectId createdBy) {
        this.createdBy = createdBy;
    }

    public List<Question> getQuestions() {
        return this.questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
