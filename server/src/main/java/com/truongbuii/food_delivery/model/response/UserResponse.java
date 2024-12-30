package com.truongbuii.food_delivery.model.response;


import lombok.Data;

@Data
public class UserResponse {
    Long id;
    String email;
    Boolean emailVerified;
    String fullName;
    String phoneNumber;
    String dob;
    String avatarUrl;
    Boolean isActive;
    String role;
    String accessToken;
}
