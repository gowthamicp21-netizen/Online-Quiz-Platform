package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<User> user=userRepo.findByEmail(userEmail);
        if(user.isEmpty()){
            System.out.println("User not found");
            throw new UsernameNotFoundException(userEmail);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.get().getUser_email())
                .password(user.get().getUser_password())
                .authorities(String.valueOf(user.get().getUser_role()))
                .build();
    }
}
