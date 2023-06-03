package com.parlayanyildizlar.ices4hudemo.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "surveys")
public class Survey {
    
    @Id
    private ObjectId _id;

    private String surveyID;
    private String createdBy;
    private String lectureCode;
    private List<Question> questions;

    public Survey(){}
    public Survey(String createdBy, String lectureCode, List<Question> questions){
        this.createdBy = createdBy;
        this.questions = questions;
        this.lectureCode = lectureCode;
        this.surveyID = _id.toHexString();
    }

    public String getLectureCode() {
        return this.lectureCode;
    }

    public void setLectureCode(String lectureCode) {
        this.lectureCode = lectureCode;
    }

    public ObjectId get_id() {
        return this._id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String getSurveyID() {
        return this.surveyID;
    }

    public void setSurveyID(String surveyID) {
        this.surveyID = surveyID;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public List<Question> getQuestions() {
        return this.questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
