package com.truongbuii.food_delivery.model.request.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemPut(
        @NotNull(message = "Cart item ID is required")
        Long cartItemId,
        @NotNull(message = "Food ID is required")
        Long foodId,
        @NotNull(message = "Quantity is required")
        @Min(1)
        Integer quantity
) {
}
