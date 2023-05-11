package com.parlayanyildizlar.ices4hudemo.repository;

import java.util.Optional;
import com.parlayanyildizlar.ices4hudemo.model.Survey;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends MongoRepository<Survey, ObjectId>{

}
