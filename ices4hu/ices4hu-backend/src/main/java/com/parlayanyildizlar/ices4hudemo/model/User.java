package com.parlayanyildizlar.ices4hudemo.model;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "users")
public class User {

    @Id
    private ObjectId userID;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String userType;

    // For students
    private boolean isBanned;
    @Field(value = "enrolledLectures")
    private List<String> enrolledLectures = new ArrayList<>();

    @Field(value = "completedSurveys")
    private List<String> completedSurveys = new ArrayList<>();


    // Default constructor
    public User() {
    }

    // Constructor with fields
    public User(String lastName, String firstName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = "";
        this.userType = "student";
        this.isBanned = false;
    }

    

    public List<String> getCompletedSurveys() {
        return completedSurveys;
    }

    public void setCompletedSurveys(List<String> completedSurveys) {
        this.completedSurveys = completedSurveys;
    }

    public boolean getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(boolean isBanned) {
        this.isBanned = isBanned;
    }

    public void setBanned(boolean isBanned) {
        this.isBanned = isBanned;
    }

    public List<String> getEnrolledLectures() {
        return enrolledLectures;
    }

    public void setEnrolledLectures(List<String> enrolledLectures) {
        this.enrolledLectures = enrolledLectures;
    }

    // Getters and setters
    public ObjectId get_id() {
        return this.userID;
    }

    public void set_id(ObjectId userID) {
        this.userID = userID;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
