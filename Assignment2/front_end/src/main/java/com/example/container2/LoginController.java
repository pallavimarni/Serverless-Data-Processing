package com.example.container2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public String login(@RequestBody LoginDTO loginDTO) throws ExecutionException, InterruptedException {
        boolean loginSuccess = loginService.validateLogin(loginDTO);
        if (loginSuccess) {
            return "Login successful";
        } else {
            return "Login failed";
        }
    }
}
