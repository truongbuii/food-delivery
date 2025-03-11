package com.truongbuii.food_delivery.model.request.coupon;

import com.truongbuii.food_delivery.model.enums.DiscountType;

import java.math.BigDecimal;
import java.time.Instant;

public record CouponPost(
        String code,
        DiscountType discountType,
        BigDecimal discountValue,
        BigDecimal minOrderValue,
        BigDecimal maxDiscount,
        Instant startDate,
        Instant endDate,
        Integer usageLimit
) {
}
