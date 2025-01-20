package com.truongbuii.food_delivery.model.response;


import lombok.Data;

@Data
public class UserResponse {
    Long id;
    String email;
    boolean emailVerified;
    String fullName;
    String phoneNumber;
    String dob;
    String avatarUrl;
    boolean isActive;
    String role;
    String accessToken;
}
