package com.truongbuii.food_delivery.model.request.coupon;

import java.math.BigDecimal;

public record CouponApply(
        String code,
        BigDecimal subtotal
) {
}
