package com.parlayanyildizlar.ices4hudemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parlayanyildizlar.ices4hudemo.service.SurveyService;
import com.parlayanyildizlar.ices4hudemo.model.Survey;
import com.parlayanyildizlar.ices4hudemo.model.SurveyStatistics;
import com.parlayanyildizlar.ices4hudemo.model.Answer;
import com.parlayanyildizlar.ices4hudemo.service.AnswerService;

@RestController
@RequestMapping("/survey")
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {
    
    @Autowired
    private SurveyService surveyService;

    @Autowired
    private AnswerService answerService;

    @PostMapping("/submit-answer")
    public ResponseEntity<Answer> submitAnswer(@RequestBody Answer answer){
        Answer savedAnswer = answerService.saveAnswer(answer);
        return ResponseEntity.ok(savedAnswer);
    }

    @GetMapping("/survey-stats/{surveyId}")
    public ResponseEntity<SurveyStatistics> getSurveyStats(@PathVariable String surveyId){
        ObjectId objectId = new ObjectId(surveyId);
        SurveyStatistics statistics = surveyService.getSurveyStats(objectId);
        return ResponseEntity.ok(statistics);
    }
    
    @GetMapping("/survey-stats-surveys/{userEmail}")
    public ResponseEntity<List<Survey>> showSurveysForSurveyStats(@PathVariable String userEmail){
        List<Answer> allAnswers = answerService.getAllAnswers();
        List<Survey> allSurveys = surveyService.getAllSurveys();
        List<Survey> wantedSurveys = new ArrayList<Survey>();
        for (int i = 0; i < allSurveys.size(); i++) {
            System.out.println(allAnswers.get(i));
            if (allSurveys.get(i).getCreatedBy().equals(userEmail)) {
                System.out.println();
                for (int j = 0; j < allAnswers.size(); j++) {
                    System.out.println(allAnswers.get(j).getSurveyId()+" - "+allSurveys.get(i).getSurveyID());
                    if (allAnswers.get(j).getSurveyId().equals(allSurveys.get(i).getSurveyID())) {
                        wantedSurveys.add(allSurveys.get(i));
                        break;
                    }
                }
            }
        }
        return new ResponseEntity<List<Survey>>(wantedSurveys ,HttpStatus.OK);
    }

    
    @GetMapping("/surveys")
    public ResponseEntity<List<Survey>> showSurveys(){
        List<Survey> allSurveys = surveyService.getAllSurveys();
        return new ResponseEntity<List<Survey>>(allSurveys ,HttpStatus.OK);
    }

    @GetMapping("/survey/{_id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable String _id){
        ObjectId objectId = new ObjectId(_id);
        Survey survey = surveyService.getSurveyById(objectId);
        return ResponseEntity.ok(survey);
    }

    @PutMapping("/edit-survey/{_id}")
    public ResponseEntity<Survey> editSurvey(@PathVariable String _id, @RequestBody Survey aSurvey){
        ObjectId objectId = new ObjectId(_id);
        surveyService.saveSurvey(objectId, aSurvey);
        return ResponseEntity.ok(aSurvey);
    }

    @PostMapping("/new-survey")
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey aSurvey){
        surveyService.newSurvey(aSurvey);
        return ResponseEntity.ok(aSurvey);
        
    }

    @DeleteMapping("/delete-survey/{_id}")
    public void deleteSurvey(@PathVariable String _id){
        ObjectId objectId = new ObjectId(_id);
        surveyService.deleteSurveyByID(objectId);
    }
}
