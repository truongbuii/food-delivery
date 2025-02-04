package com.truongbuii.food_delivery.model.request.restaurant;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record RestaurantPatch(
        @NotNull(message = "Id is required")
        Long id,
        @JsonProperty(required = true)
        boolean booleanValue
) {

}
