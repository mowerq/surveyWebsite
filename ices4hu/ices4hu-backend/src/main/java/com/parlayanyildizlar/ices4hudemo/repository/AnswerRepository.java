package com.parlayanyildizlar.ices4hudemo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.parlayanyildizlar.ices4hudemo.model.Answer;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {
    List<Answer> findAllBySurveyId(String surveyId);
}
