package com.parlayanyildizlar.ices4hudemo.service;

import com.parlayanyildizlar.ices4hudemo.model.Answer;
import com.parlayanyildizlar.ices4hudemo.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> getAllAnswers(){
        return answerRepository.findAll();
    }
}
