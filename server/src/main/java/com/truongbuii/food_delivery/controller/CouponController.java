package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.Coupon;
import com.truongbuii.food_delivery.model.request.coupon.CouponApply;
import com.truongbuii.food_delivery.model.request.coupon.CouponPost;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.CouponResponse;
import com.truongbuii.food_delivery.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/coupon")
public class CouponController {
    private final CouponService couponService;

    @PostMapping("/internal/create")
    public ResponseEntity<ApiResponse<Coupon>> createCoupon(
            @RequestBody CouponPost couponPost
    ) {
        var coupon = couponService.create(couponPost);
        return ResponseEntity.ok(ApiResponse.<Coupon>builder().data(coupon).build());
    }

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<CouponResponse>> getCouponDiscountValue(
            @RequestBody CouponApply couponApply
    ) {
        var coupon = couponService.getCouponDiscountValue(couponApply);
        return ResponseEntity.ok(ApiResponse.<CouponResponse>builder().data(coupon).build());
    }
}
