package com.truongbuii.food_delivery.model.request.payment;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PaymentPost(
        String bankCode,
        @NotNull
        BigDecimal amount
) {
}
