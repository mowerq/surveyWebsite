package com.parlayanyildizlar.ices4hudemo.controller;

import com.parlayanyildizlar.ices4hudemo.model.User;
import com.parlayanyildizlar.ices4hudemo.service.UserService;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> showUsers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/name/{firstName}")
    public ResponseEntity<Optional<User>> getUserByFirstName(@PathVariable String firstName) {
        return new ResponseEntity<>(userService.getUserByFirstName(firstName), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteUserByEmail(@PathVariable String email) {
        userService.deleteUserByEmail(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<User>> selectUser(@PathVariable String email) {
        return new ResponseEntity<Optional<User>>(userService.singleUser(email), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {
        User registeredUser = userService.registerUser(newUser);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginUser) {
        String email = loginUser.getEmail();
        String password = loginUser.getPassword();
        User authenticatedUser = userService.authenticateUser(email, password);
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/ban/{email}")
    public ResponseEntity<User> banUser(@PathVariable String email) {
        Optional<User> userOptional = userService.singleUser(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setIsBanned(true);
            userService.saveUser(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/{email}/enroll/{lectureCode}")
    public ResponseEntity<Void> enrollLecture(@PathVariable String email, @PathVariable String lectureCode) {
        userService.enrollLecture(email, lectureCode);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{email}/enrolledLectures")
    public ResponseEntity<List<String>> getEnrolledLectures(@PathVariable String email) {
        Optional<User> userOptional = userService.singleUser(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user.getEnrolledLectures());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    @PostMapping("/{email}/complete-survey/{surveyId}")
    public ResponseEntity<Void> completeSurvey(@PathVariable String email, @PathVariable String surveyId) {
        userService.addCompletedSurvey(email, new String(surveyId));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{email}/completed-surveys")
    public ResponseEntity<List<String>> getCompletedSurveys(@PathVariable String email) {
        Optional<User> userOptional = userService.singleUser(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user.getCompletedSurveys());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{email}/update")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User user) {
        Optional<User> userOptional = userService.singleUser(email);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setFirstName(user.getFirstName());
            userToUpdate.setLastName(user.getLastName());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setPhoneNumber(user.getPhoneNumber());
            userService.saveUser(userToUpdate);
            return ResponseEntity.ok(userToUpdate);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
