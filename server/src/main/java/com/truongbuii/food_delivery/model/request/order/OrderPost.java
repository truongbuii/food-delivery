package com.truongbuii.food_delivery.model.request.order;

import com.truongbuii.food_delivery.model.enums.PaymentMethod;

import java.math.BigDecimal;

public record OrderPost(
        PaymentMethod paymentMethod,
        String orderAddress,
        String code,
        BigDecimal totalPrice,
        int numberItem
) {
}
