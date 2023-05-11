package com.parlayanyildizlar.ices4hudemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.parlayanyildizlar.ices4hudemo.model.Survey;
import com.parlayanyildizlar.ices4hudemo.repository.SurveyRepository;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    public Survey newSurvey(Survey survey){
        return surveyRepository.save(survey);
    }

    public List<Survey> getAllSurveys(){
        return surveyRepository.findAll();
    }

    public Optional<Survey> singleSurvey(ObjectId surveyID){
        return surveyRepository.findById(surveyID);
    }

    public List<Survey> getAllSurveysByInstructorID(ObjectId instructorID){
        List<Survey> surveys = new ArrayList<Survey>();
        List<Survey> allSurveys = surveyRepository.findAll();
        for (int i = 0; i < allSurveys.size(); i++) {
            if(allSurveys.get(i).getCreatedBy().equals(instructorID)){
                surveys.add(allSurveys.get(i));
            }
        }
        return surveys;
    }

    public void updateSurvey(ObjectId surveyID, Survey updateSurvey){
        Optional<Survey> surveyOptional= surveyRepository.findById(surveyID);

        if(surveyOptional.isPresent()){
            Survey survey = surveyOptional.get();
            survey.setQuestions(updateSurvey.getQuestions());
        }
    }

    public void deleteSurveyByID(ObjectId surveyID){
        surveyRepository.deleteById(surveyID);
    }
    
}
