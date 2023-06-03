package com.parlayanyildizlar.ices4hudemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parlayanyildizlar.ices4hudemo.model.Answer;
import com.parlayanyildizlar.ices4hudemo.model.Survey;
import com.parlayanyildizlar.ices4hudemo.model.SurveyStatistics;
import com.parlayanyildizlar.ices4hudemo.repository.SurveyRepository;
import com.parlayanyildizlar.ices4hudemo.repository.AnswerRepository; 


@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public Survey newSurvey(Survey survey){
        Survey savedSurvey = surveyRepository.save(survey);
        savedSurvey.setSurveyID(savedSurvey.get_id().toHexString());
        return surveyRepository.save(savedSurvey);
    }

    public List<Survey> getAllSurveys(){
        return surveyRepository.findAll();
    }

    public Optional<Survey> singleSurvey(ObjectId _id){
        return surveyRepository.findById(_id);
    }

    public Survey getSurveyById(ObjectId _id){
        Optional<Survey> surveyOptional = surveyRepository.findById(_id);
        if(surveyOptional.isPresent()){
            return surveyOptional.get();
        }else{
            return null;
        }
    }

    public List<Survey> getAllSurveysByInstructorEmail(String instructorEmail){
        List<Survey> surveys = new ArrayList<Survey>();
        List<Survey> allSurveys = surveyRepository.findAll();
        for (int i = 0; i < allSurveys.size(); i++) {
            if(allSurveys.get(i).getCreatedBy().equals(instructorEmail)){
                surveys.add(allSurveys.get(i));
            }
        }
        return surveys;
    }

    public void saveSurvey(ObjectId _id, Survey updateSurvey){
        Optional<Survey> surveyOptional= surveyRepository.findById(_id);
        if(surveyOptional.isPresent()){
            Survey survey = surveyOptional.get();
            survey.setQuestions(updateSurvey.getQuestions());
            surveyRepository.save(survey);
        }else{
            surveyRepository.save(updateSurvey);
        }
    }

    public void deleteSurveyByID(ObjectId _id){
        surveyRepository.deleteById(_id);
    }

    public SurveyStatistics getSurveyStats(ObjectId surveyId) {
        // Fetch the Survey document
        Optional<Survey> surveyOptional = surveyRepository.findById(surveyId);
        if(!surveyOptional.isPresent()){
            //todo: throw exception
        }

        Survey survey = surveyOptional.get();

        // Fetch all the Answer documents associated with this survey
        List<Answer> answers = answerRepository.findAllBySurveyId(surveyId.toString());

        // Initialize statistics for this survey
        SurveyStatistics statistics = new SurveyStatistics(surveyId.toString());

        // For each Answer document
        for (Answer answer : answers) {
            // For each individual answer in the Answer document
            List<String> individualAnswers = answer.getAnswers();
            for (int i = 0; i < individualAnswers.size(); i++) {
                // Get the corresponding question
                String question = survey.getQuestions().get(i).getQuestionText();
                // Increment the count of this answer in the statistics
                statistics.addAnswer(question, individualAnswers.get(i));
            }
        }

        return statistics;
    }

    
}
