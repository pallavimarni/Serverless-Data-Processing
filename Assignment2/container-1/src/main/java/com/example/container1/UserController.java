package com.example.container1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    // Endpoint for registering a new user
    @PostMapping("/reg")
    public  ResponseEntity<String> saveUser (@RequestBody User user) {
        try {
            // Save the user using the userService
            return ResponseEntity.ok(userService.saveUser(user).toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}


