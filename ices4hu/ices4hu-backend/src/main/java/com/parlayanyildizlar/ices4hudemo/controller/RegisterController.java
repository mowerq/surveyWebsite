package com.parlayanyildizlar.ices4hudemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegisterController {

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping("/register")
    public String processRegistrationForm(@RequestParam("username") String username,
                                    @RequestParam("password") String password) {
        // TODO: Implement registration logic
        return "redirect:/login";
    }
}