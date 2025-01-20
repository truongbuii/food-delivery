package com.truongbuii.food_delivery.model.request.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UserPhonePatch(
        @NotNull(message = "Phone is required")
        @Pattern(
                regexp = "^\\+?[1-9]\\d{0,2}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
                message = "Invalid phone number format"
        )
        String phoneNumber,
        @NotNull(message = "Email is required")
        String email
) {
}
