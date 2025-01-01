package com.truongbuii.food_delivery.model.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
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
