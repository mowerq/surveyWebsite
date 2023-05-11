package com.parlayanyildizlar.ices4hudemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parlayanyildizlar.ices4hudemo.service.SurveyService;
import com.parlayanyildizlar.ices4hudemo.model.Survey;

@RestController
@RequestMapping("/survey")
public class SurveyController {
    
    @Autowired
    private SurveyService surveyService;

    @GetMapping("/surveys")
    public ResponseEntity<List<Survey>> showSurveys(){
        return new ResponseEntity<List<Survey>>(surveyService.getAllSurveys() ,HttpStatus.OK);
    }
}
