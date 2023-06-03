package com.parlayanyildizlar.ices4hudemo.repository;

import com.parlayanyildizlar.ices4hudemo.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
}
