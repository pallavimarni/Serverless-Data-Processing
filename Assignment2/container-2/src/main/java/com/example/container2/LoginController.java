package com.example.container2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    // Endpoint for user login
    @PostMapping
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        // Validate login using the loginService
        boolean loginSuccess = loginService.validateLogin(loginDTO);

        // Check the login result and return appropriate response
        if (loginSuccess) {
            return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        } else {
            return ResponseEntity.ok().body("{\"message\": \"Login failed\"}");
        }
    }
}
