package com.parlayanyildizlar.ices4hudemo.controller;

import com.parlayanyildizlar.ices4hudemo.model.Feedback;
import com.parlayanyildizlar.ices4hudemo.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback submittedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(submittedFeedback);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> allFeedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<List<Feedback>>(allFeedbacks ,HttpStatus.OK);
    }
}
