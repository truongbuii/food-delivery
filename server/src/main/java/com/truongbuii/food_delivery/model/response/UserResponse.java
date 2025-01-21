package com.truongbuii.food_delivery.model.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    Long id;
    String email;
    boolean emailVerified;
    String fullName;
    String phoneNumber;
    String dob;
    String avatarUrl;
    boolean userActive;
    String role;
    String accessToken;
}
