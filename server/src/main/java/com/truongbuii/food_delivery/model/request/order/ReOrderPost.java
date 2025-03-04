package com.truongbuii.food_delivery.model.request.order;

import jakarta.validation.constraints.NotNull;

public record ReOrderPost(
        @NotNull(message = "Order id is required")
        Long orderId
) {
}
