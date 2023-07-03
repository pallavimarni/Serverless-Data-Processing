package com.example.container2;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.ExecutionException;

@SpringBootTest
class Container2ApplicationTests {

    @Autowired
    LoginService loginService;

    @Test
    void loginSuccess() throws ExecutionException, InterruptedException {
        boolean result = loginService.validateLogin(new LoginDTO("pal@gmail.com","red"));
        Assertions.assertTrue(result);
    }

    @Test
    void loginIncorrectPassword() throws ExecutionException, InterruptedException {
        boolean result = loginService.validateLogin(new LoginDTO("pal@gmail.com","halifax"));
        Assertions.assertFalse(result);
    }

}
