package com.parlayanyildizlar.ices4hudemo.model;

import java.util.List;

public class Question {
    private String questionText;
    private String questionType;
    private List<String> options;

    public Question(){}
    public Question(String questionText, String questionType, List<String> options){
        questionText = this.questionText;
        questionType = this.questionType;
        if (questionType == "text") {
            options = null;
        }else{
            options = this.options;
        }
    }

    public String getQuestionText() {
        return this.questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getQuestionType() {
        return this.questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public List<String> getOptions() {
        return this.options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
    
}
