package com.truongbuii.food_delivery.model.request.user;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UserProfilePut(
        @Email(message = "Invalid email address")
        @NotBlank(message = "Email is required")
        String email,
        @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
        String fullName,
        @Pattern(
                regexp = "^\\+?[1-9]\\d{0,2}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
                message = "Invalid phone number format"
        )
        String phoneNumber,
        @Past(message = "Date of birth must be in the past")
        LocalDate dob,
        String avatarUrl
) {
}
