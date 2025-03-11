package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Coupon;
import com.truongbuii.food_delivery.model.request.coupon.CouponPost;
import com.truongbuii.food_delivery.model.response.CouponResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CouponMapper {
    Coupon toCoupon(CouponPost couponPost);

    CouponResponse toCouponResponse(Coupon coupon);
}
