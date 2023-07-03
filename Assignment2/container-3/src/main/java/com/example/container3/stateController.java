package com.example.container3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping
public class stateController {

    @Autowired
    private stateService stateService;

    // Retrieves a list of online users.
    @GetMapping("/online")
    public List<String> getOnlineUsers() throws ExecutionException, InterruptedException {
        return stateService.getOnlineUsers();
    }

    // Logs out a user by updating their state to "offline".
    @PostMapping("/logout")
    public String logoutUser(@RequestBody LogoutDTO logoutDTO) {
        String email = logoutDTO.getEmail();
        try {
            stateService.updateStateToOffline(email);
            return "Logout successful";
        } catch (ExecutionException | InterruptedException e) {
            return "Logout failed";
        }
    }
}
