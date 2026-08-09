package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Role;
import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.model.dto.UserLoginInfo;
import com.prakashamaana.onlineQuizPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        user.setUser_role(Role.STUDENT);
        userService.register(user);
        return new ResponseEntity<>("User registerd successfully", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginInfo user){

        boolean login=userService.login(user);

        if(login){
            return new ResponseEntity<>("Login successful",HttpStatus.OK);
        }
        return new ResponseEntity<>("Login failed",HttpStatus.BAD_REQUEST);

    }

    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody UserLoginInfo user){
        userService.forgotPassword(user);
        return new ResponseEntity<>("Password reset successful",HttpStatus.OK);
    }
}
