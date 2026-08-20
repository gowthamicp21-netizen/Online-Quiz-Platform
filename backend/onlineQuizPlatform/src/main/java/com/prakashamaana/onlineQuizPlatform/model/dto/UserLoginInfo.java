package com.prakashamaana.onlineQuizPlatform.model.dto;


import com.prakashamaana.onlineQuizPlatform.model.Role;
import lombok.Data;


public record UserLoginInfo(String user_email, String user_password) {
}
