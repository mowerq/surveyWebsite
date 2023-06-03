[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/9Bhb8Xty)


# ICES-4U Demo

## Table of Contents

- [Description](#description)
- [Setup and Installation](#setup-and-installation)
- [UserController.java](#usercontrollerjava)
    - [GET /allUsers](#1-get-allusers)
    - [GET /name/{firstName}](#2-get-namefirstname)
    - [DELETE /delete/{email}](#3-delete-deleteemail)
    - [GET /{email}](#4-get-email)
    - [POST /register](#5-post-register)
    - [POST /login](#6-post-login)
    - [PUT /ban/{email}](#7-put-banemail)
    - [POST /{email}/enroll/{lectureCode}](#8-post-emailenrolllecturecode)
    - [GET /{email}/enrolledLectures](#9-get-emailenrolledlectures)
- [SurveyController.java](#surveycontrollerjava)
    - [POST /submit-answer](#1-post-submit-answer)
    - [GET /survey-stats/{surveyId}](#2-get-survey-statssurveyid)
    - [GET /survey/{_id}](#3-get-surveysurvey_id)
    - [GET /surveys](#4-get-surveys)
    - [PUT /edit-survey/{_id}](#5-put-edit-surveysurvey_id)
    - [POST /new-survey](#6-post-new-survey)
    - [DELETE /delete-survey/{_id}](#7-delete-delete-surveysurvey_id)

## Description

ICES-4U Demo is a project developed to get feedback about lectures. It allows instructors to create surveys related to their lectures and students to respond to them. Administrators can manage users, lectures, and surveys.

## Setup and Installation

To set up the project on your local machine for development and testing purposes, follow these steps:

1. Clone the project to your machine:

```bash
git clone git@github.com:BBM384-2021/demo-parlayan-yildizlar-takimi.git
```

2. Navigate to the project directory:

```bash
cd demo-parlayan-yildizlar-takimi
```

3. Install the dependencies:

```bash
cd ices4hu
cd ices4hu-frontend && npm install
``` 

4. Run the project:

for frontend while in the **ices4hu-frontend** directory
```bash
npm start 
```
for backend while in the **ices4hu-backend** directory
```bash
mvn spring-boot:run
```

# UserController.java

This class is a controller for User model in our application, which manages user related functionalities such as login, registration, etc.

It's annotated with `@RestController` and `@RequestMapping("/api/auth")`, so it handles the API requests that start with "/api/auth".

Here's the code for UserController:

```java
package com.parlayanyildizlar.ices4hudemo.controller;

import com.parlayanyildizlar.ices4hudemo.model.User;
import com.parlayanyildizlar.ices4hudemo.service.UserService;

// Other import statements...

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;
    //... other methods and endpoints...
}
```


## 1. GET /allUsers
This endpoint returns all the users in the system.

```java
@GetMapping("/allUsers")
public ResponseEntity<List<User>> showUsers() {
    return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
}
```

## 2. GET /name/{firstName}
This endpoint returns a user with the provided first name.
    
```java
@GetMapping("/name/{firstName}")
public ResponseEntity<Optional<User>> getUserByFirstName(@PathVariable String firstName) {
    return new ResponseEntity<>(userService.getUserByFirstName(firstName), HttpStatus.OK);
}
```
## 3. DELETE /delete/{email}
This endpoint deletes the user with the given email.

```java
@DeleteMapping("/delete/{email}")
public ResponseEntity<Void> deleteUserByEmail(@PathVariable String email) {
    userService.deleteUserByEmail(email);
    return ResponseEntity.ok().build();
}
```

## 4. GET /{email}
This endpoint returns the user details of the given email.

```java
@GetMapping("/{email}")
public ResponseEntity<Optional<User>> selectUser(@PathVariable String email) {
    return new ResponseEntity<Optional<User>>(userService.singleUser(email), HttpStatus.OK);
}
```

## 5. POST /register
This endpoint allows a new user to register.
    
```java
    @PostMapping("/register")
public ResponseEntity<User> registerUser(@RequestBody User newUser) {
    User registeredUser = userService.registerUser(newUser);
    return ResponseEntity.ok(registeredUser);
}
```

## 6. POST /login
This endpoint allows a user to login.

```java
@PostMapping("/login")
public ResponseEntity<User> loginUser(@RequestBody User loginUser) {
    //...logic...
}
```

## 7. PUT /ban/{email}

This endpoint allows banning a user. It takes the user's email as a path variable, fetches the user details, and sets the user's `isBanned` field to `true`. If the user is found and successfully banned, it returns the user's updated data; otherwise, it responds with a 404 status code (NOT FOUND).

```java
@PutMapping("/ban/{email}")
public ResponseEntity<User> banUser(@PathVariable String email) {
    Optional<User> userOptional = userService.singleUser(email);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setIsBanned(true);
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
```

## 8. POST /{email}/enroll/{lectureCode}

This endpoint allows a user to enroll in a lecture. It takes the user's email and the lecture's code as path variables, and adds the lecture to the user's list of enrolled lectures.

```java
@PostMapping("/{email}/enroll/{lectureCode}")
public ResponseEntity<Void> enrollLecture(@PathVariable String email, @PathVariable String lectureCode) {
    userService.enrollLecture(email, lectureCode);
    return ResponseEntity.ok().build();
}
```

## 9. GET /{email}/enrolledLectures

This endpoint fetches the list of lectures that a user is enrolled in. It takes the user's email as a path variable, retrieves the user's data, and responds with the list of the user's enrolled lectures. If the user is not found, it responds with a 404 status code (NOT FOUND).

```java
@GetMapping("/{email}/enrolledLectures")
public ResponseEntity<List<String>> getEnrolledLectures(@PathVariable String email) {
    Optional<User> userOptional = userService.singleUser(email);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        return ResponseEntity.ok(user.getEnrolledLectures());
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
```

# SurveyController.java

This class provides the endpoints related to the surveys.

## 1. POST /submit-answer

This endpoint allows submitting an answer to a survey. It receives the answer data in the request body and saves it in the database. Upon successful save, it returns the saved answer.

```java
@PostMapping("/submit-answer")
public ResponseEntity<Answer> submitAnswer(@RequestBody Answer answer){
    Answer savedAnswer = answerService.saveAnswer(answer);
    return ResponseEntity.ok(savedAnswer);
}
```

## 2. GET /survey-stats/{surveyId}

This endpoint fetches the statistics for a particular survey. It takes the survey ID as a path variable, retrieves the statistics associated with the survey and returns them.

```java
@GetMapping("/survey-stats/{surveyId}")
public ResponseEntity<SurveyStatistics> getSurveyStats(@PathVariable String surveyId){
    ObjectId objectId = new ObjectId(surveyId);
    SurveyStatistics statistics = surveyService.getSurveyStats(objectId);
    return ResponseEntity.ok(statistics);
}
```

## 3. GET /survey/{_id} 

This endpoint fetches a survey with the given ID. It takes the survey ID as a path variable, retrieves the survey data and returns it.

```java
@GetMapping("/survey/{_id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable String _id){
        ObjectId objectId = new ObjectId(_id);
        Survey survey = surveyService.getSurveyById(objectId);
        return ResponseEntity.ok(survey);
    }
```

## 4. GET /surveys

This endpoint fetches all the surveys. It doesn't require any request parameters. It retrieves all surveys and returns them as a list.

```java
@GetMapping("/surveys")
public ResponseEntity<List<Survey>> showSurveys(){
    List<Survey> allSurveys = surveyService.getAllSurveys();
    return new ResponseEntity<List<Survey>>(allSurveys ,HttpStatus.OK);
}
```

## 5. PUT /edit-survey/{_id}

This endpoint allows editing a survey. It takes the survey ID as a path variable and the new survey data in the request body. It updates the survey with the given ID and returns the updated survey.

```java
@PutMapping("/edit-survey/{_id}")
public ResponseEntity<Survey> editSurvey(@PathVariable String _id, @RequestBody Survey aSurvey){
    ObjectId objectId = new ObjectId(_id);
    surveyService.saveSurvey(objectId, aSurvey);
    return ResponseEntity.ok(aSurvey);
}
```

## 6. POST /new-survey

This endpoint allows creating a new survey. It takes the survey data in the request body and saves it in the database. Upon successful save, it returns the saved survey.
```java
@PostMapping("/new-survey")
public ResponseEntity<Survey> createSurvey(@RequestBody Survey aSurvey){
    surveyService.newSurvey(aSurvey);
    return ResponseEntity.ok(aSurvey);   
}
```

## 7. DELETE /delete-survey/{_id}

This endpoint allows deleting a survey. It takes the survey ID as a path variable and deletes the survey with the given ID. It doesn't return anything.
```java
@DeleteMapping("/delete-survey/{_id}")
public void deleteSurvey(@PathVariable String _id){
    ObjectId objectId = new ObjectId(_id);
    surveyService.deleteSurveyByID(objectId);
}
```