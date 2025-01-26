package com.truongbuii.food_delivery.model.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String email;
    private boolean emailVerified;
    private String fullName;
    private String phoneNumber;
    private String dob;
    private String avatarUrl;
    private boolean userActive;
    private String role;
    private String accessToken;
}
