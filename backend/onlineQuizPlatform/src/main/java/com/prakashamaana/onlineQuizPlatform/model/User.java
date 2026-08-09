package com.prakashamaana.onlineQuizPlatform.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;


    private String user_name;

    @Column(nullable = false, unique = true)
    private String user_email;

    @Column(nullable = false)
    private String user_password;

    @Enumerated(EnumType.STRING)
    private Role user_role;


}