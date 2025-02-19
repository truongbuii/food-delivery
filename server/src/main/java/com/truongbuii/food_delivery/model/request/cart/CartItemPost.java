package com.truongbuii.food_delivery.model.request.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CartItemPost(
        @NotNull(message = "Food ID is required")
        Long foodId,
        @NotNull(message = "Quantity is required")
        @Min(1)
        Integer quantity,
        List<SelectedAddon> selectedAddons
) {
}
