package com.truongbuii.food_delivery.model.request.order;

import com.truongbuii.food_delivery.model.enums.OrderStatus;

public record OrderStatusPatch(
        Long orderId,
        OrderStatus status
) {
}
