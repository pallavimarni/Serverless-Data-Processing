package com.example.container1;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.ExecutionException;

@SpringBootTest
class Container1ApplicationTests {

    @Autowired
    UserService userService;

    @Test
    void registrationSuccess() throws ExecutionException, InterruptedException {
        boolean result = userService.saveUser(new User("pallavi","pal@gmail.com","red","halifax"));
        Assertions.assertTrue(result);
    }

    @Test
    void registrationMissingFields() throws ExecutionException, InterruptedException {
        boolean result = userService.saveUser(new User("","pal@gmail.com","red","halifax"));
        Assertions.assertFalse(result);
    }

}
