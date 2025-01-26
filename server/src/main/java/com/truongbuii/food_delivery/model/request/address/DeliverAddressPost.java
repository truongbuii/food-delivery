package com.truongbuii.food_delivery.model.request.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DeliverAddressPost(
        @NotNull(message = "User ID is required")
        Long userId,
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
        String name,
        @NotBlank(message = "Phone number is required")
        @Pattern(
                regexp = "^\\+?[1-9]\\d{0,2}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
                message = "Invalid phone number format"
        )
        String phoneNumber,
        @NotBlank(message = "State is required")
        String state,
        @NotBlank(message = "City is required")
        String city,
        @NotBlank(message = "Street is required")
        String street
) {
}
