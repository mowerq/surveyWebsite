package com.parlayanyildizlar.ices4hudemo.repository;

import com.parlayanyildizlar.ices4hudemo.model.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByEmail(String email);

    List<User> findAll();

    Optional<User> findByFirstName(String firstName);

    void deleteByEmail(String email);

}

