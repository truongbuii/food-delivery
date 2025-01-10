package com.truongbuii.food_delivery.model.request;

import jakarta.validation.constraints.NotNull;

public record UserEmailPatch(
        @NotNull(message = "Email is required")
        String email,
        @NotNull(message = "Otp is required")
        String otp
) {
}
