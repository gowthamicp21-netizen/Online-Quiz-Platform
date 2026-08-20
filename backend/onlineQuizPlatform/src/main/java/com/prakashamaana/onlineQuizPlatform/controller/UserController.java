package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Role;
import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.model.dto.UserLoginInfo;
import com.prakashamaana.onlineQuizPlatform.service.JwtService;
import com.prakashamaana.onlineQuizPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        System.out.println("1. Inside register controller");

        user.setUser_role(Role.STUDENT);

        System.out.println("2. Before calling userService.register()");

        userService.register(user);

        System.out.println("3. After calling userService.register()");

        return new ResponseEntity<>(
                "User registered successfully",
                HttpStatus.OK
        );
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginInfo user){

        Authentication authentication=authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(user.user_email(),user.user_password()));
        if(authentication.isAuthenticated()){
            UserDetails userDetails =
                    (UserDetails) authentication.getPrincipal();

            return jwtService.generateToken(userDetails);
        }
        return "Failure";
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody UserLoginInfo user){
        userService.forgotPassword(user);
        return new ResponseEntity<>("Password reset successful",HttpStatus.OK);
    }
}
