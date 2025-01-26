package com.truongbuii.food_delivery.model.request.address;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DeliverAddressPut(
        @NotNull(message = "Id is required")
        Long id,
        @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
        String name,
        @Pattern(
                regexp = "^\\+?[1-9]\\d{0,2}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
                message = "Invalid phone number format"
        )
        String phoneNumber,
        String state,
        String city,
        String street
) {
}
