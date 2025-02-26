package com.truongbuii.food_delivery.model.request.order;

import com.truongbuii.food_delivery.model.enums.PaymentMethod;

import java.math.BigDecimal;

public record OrderPost(
        String bankCode,
        PaymentMethod paymentMethod,
        String orderAddress,
        float discount,
        BigDecimal totalPrice,
        int numberItem
) {
}
