package com.parlayanyildizlar.ices4hudemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String processLoginForm(@RequestParam("username") String username,
                                    @RequestParam("password") String password) {
        // TODO: Implement login logic
        return "redirect:/";
    }
}