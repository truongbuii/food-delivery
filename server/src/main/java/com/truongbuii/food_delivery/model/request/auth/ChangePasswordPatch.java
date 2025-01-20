package com.truongbuii.food_delivery.model.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChangePasswordPatch(
        @NotNull(message = "Otp is required")
        String otp,
        @Email(message = "Invalid email address")
        @NotBlank(message = "Email is required")
        String email,
        @NotBlank(message = "Password is required")
        String password
) {

}
