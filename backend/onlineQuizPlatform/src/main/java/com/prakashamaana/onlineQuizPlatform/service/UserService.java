package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.model.dto.UserLoginInfo;
import com.prakashamaana.onlineQuizPlatform.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(10);


    public void register(User user) {

        System.out.println("4. Inside UserService.register()");

        System.out.println("Name: " + user.getUser_name());
        System.out.println("Email: " + user.getUser_email());
        System.out.println("Role: " + user.getUser_role());

        user.setUser_password(
                encoder.encode(user.getUser_password())
        );

        System.out.println("5. Password encoded");

        User savedUser = userRepo.save(user);

        System.out.println("6. User saved, ID = " + savedUser.getUser_id());
    }

    public boolean login(UserLoginInfo user) {
        boolean login=false;
        Optional<User> usr=userRepo.findByEmail(user.user_email());
       if(usr.isPresent() && usr.get().getUser_email().equals(user.user_email()) && usr.get().getUser_password().equals(user.user_password())){
           login=true;
       }

        return login;
    }

    public void forgotPassword(UserLoginInfo user) {
        Optional<User> usr=userRepo.findByEmail(user.user_email());
        usr.get().setUser_password(user.user_password());
        userRepo.save(usr.get());
    }
}
