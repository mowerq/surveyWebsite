package com.parlayanyildizlar.ices4hudemo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feedbacks")
public class Feedback {
    
    @Id
    private String id;
    private String userEmail;
    private String subject;
    private String feedbackMessage;

    public Feedback() {
    }

    public Feedback(String userEmail, String content, String feedbackMessage) {
        this.userEmail = userEmail;
        this.subject = content;
        this.feedbackMessage = feedbackMessage;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String content) {
        this.subject = content;
    }
    public String getFeedbackMessage() {
        return feedbackMessage;
    }
    public void setFeedbackMessage(String feedbackMessage) {
        this.feedbackMessage = feedbackMessage;
    }
}

    

   
