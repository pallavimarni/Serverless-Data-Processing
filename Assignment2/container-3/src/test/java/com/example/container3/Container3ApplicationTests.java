package com.example.container3;

import com.example.container3.LogoutDTO;
import com.example.container3.stateService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.concurrent.ExecutionException;

@SpringBootTest
class Container3ApplicationTests {

    @Autowired
    stateService stateService;

    @Test
    void testLogout() throws ExecutionException, InterruptedException {

        String email = "test@example.com";
        LogoutDTO logoutDTO = new LogoutDTO(email);

        Boolean result = stateService.updateStateToOffline(email);
        Assertions.assertTrue(result);
    }


}

