package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.model.dto.UserLoginInfo;
import com.prakashamaana.onlineQuizPlatform.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;


    public void register(User user) {
        userRepo.save(user);
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
