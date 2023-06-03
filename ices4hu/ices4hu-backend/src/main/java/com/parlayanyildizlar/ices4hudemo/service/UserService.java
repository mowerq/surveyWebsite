package com.parlayanyildizlar.ices4hudemo.service;

import com.parlayanyildizlar.ices4hudemo.model.User;
import com.parlayanyildizlar.ices4hudemo.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        // Perform any registration logic here (e.g., password hashing)
        return userRepository.save(user);
    }

    public Optional<User> singleUser(String email) {
        return userRepository.findByEmail(email);
    }

    // Authenticate a user
    public User authenticateUser(String email, String password) {
        // Perform authentication logic here (e.g., password verification)
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return userOptional.get();
        }

        return null;
    }

    public void enrollLecture(String email, String lectureCode) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getEnrolledLectures().add(lectureCode);
            userRepository.save(user);
        }
    }

    // Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    // Get a user by first name
    public Optional<User> getUserByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName);
    }

    // Update a user
    public void updateUser(ObjectId id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());

        }
    }

    // Save a user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Delete a user by ID
    public void deleteUserById(ObjectId id) {
        userRepository.deleteById(id);
    }

    // Delete a user by email
    public void deleteUserByEmail(String email) {
        userRepository.deleteByEmail(email);
    }

    // Store completed surveys
    public void addCompletedSurvey(String email, String surveyId) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getCompletedSurveys().add(surveyId);
            userRepository.save(user);
        }
    }

}
