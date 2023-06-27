package com.example.container1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping
public class UserController {

    @Autowired
    UserService userService;

@PostMapping("/users")
    public String saveUser (@RequestBody User user) throws ExecutionException, InterruptedException {
    return userService.saveUser(user);
}

}
