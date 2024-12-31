package com.truongbuii.food_delivery.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailPost(
        @Email(message = "Invalid email address")
        @NotBlank(message = "Email is required")
        String email
) {
}
