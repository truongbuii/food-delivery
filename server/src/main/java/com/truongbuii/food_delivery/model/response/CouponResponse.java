package com.truongbuii.food_delivery.model.response;

import com.truongbuii.food_delivery.model.enums.DiscountType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Setter
@Getter
public class CouponResponse {
    private UUID id;
    private String code;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private BigDecimal minOrderValue;
    private BigDecimal maxDiscount;
    private BigDecimal discountAmount;
}
