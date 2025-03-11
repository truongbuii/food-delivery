package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.CouponMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Coupon;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.entity.UserCoupon;
import com.truongbuii.food_delivery.model.request.coupon.CouponApply;
import com.truongbuii.food_delivery.model.request.coupon.CouponPost;
import com.truongbuii.food_delivery.model.response.CouponResponse;
import com.truongbuii.food_delivery.repository.CouponRepository;
import com.truongbuii.food_delivery.repository.UserCouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponMapper couponMapper;
    private final CouponRepository couponRepository;
    private final UserCouponRepository userCouponRepository;
    private final UserService userService;

    public Coupon create(CouponPost couponPost) {
        validateCoupon(couponPost);
        Coupon coupon = couponMapper.toCoupon(couponPost);
        return couponRepository.save(coupon);
    }

    public Coupon getCouponByCode(String code) {
        return couponRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_COUPON_NOT_EXISTED));
    }

    public CouponResponse getCouponDiscountValue(CouponApply couponApply) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Coupon coupon = couponRepository.findByCode(couponApply.code())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_COUPON_NOT_EXISTED));
        Optional<UserCoupon> userCoupon = userCouponRepository.findByCouponIdAndUserId(coupon.getId(), user.getId());
        if (userCoupon.isPresent()) {
            throw new AppException(ErrorCode.ERR_COUPON_USED_BY_USER);
        }

        if (coupon.getUsageCount() >= coupon.getUsageLimit()) {
            throw new AppException(ErrorCode.ERR_COUPON_EXHAUSTED);
        }
        Instant now = Instant.now();
        if (coupon.getEndDate().isBefore(now)) {
            throw new AppException(ErrorCode.ERR_COUPON_EXPIRED);
        }
        if (couponApply.subtotal().compareTo(coupon.getMinOrderValue()) < 0) {
            throw new AppException(ErrorCode.ERR_COUPON_MIN_ORDER_VALUE);
        }
        BigDecimal discountAmount = BigDecimal.ZERO;
        switch (coupon.getDiscountType()) {
            case PERCENTAGE:
                discountAmount = coupon.getDiscountValue()
                        .multiply(couponApply.subtotal())
                        .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
                if (discountAmount.compareTo(coupon.getMaxDiscount()) > 0) {
                    discountAmount = coupon.getMaxDiscount();
                }
                break;
            case AMOUNT:
                discountAmount = coupon.getDiscountValue();
                break;
        }
        CouponResponse couponResponse = couponMapper.toCouponResponse(coupon);
        couponResponse.setDiscountAmount(discountAmount);
        return couponResponse;
    }

    public UserCoupon createUserCoupon(Coupon coupon, Long userId) {
        UserCoupon userCoupon = UserCoupon.builder()
                .couponId(coupon.getId())
                .userId(userId)
                .usedAt(Instant.now())
                .build();
        return userCouponRepository.save(userCoupon);
    }

    private void validateCoupon(CouponPost couponPost) {
        if (isCouponCodeExist(couponPost.code())) {
            throw new DuplicateResourceException(ErrorCode.ERR_COUPON_EXISTED);
        }
    }

    private boolean isCouponCodeExist(String code) {
        return couponRepository.findByCode(code).isPresent();
    }
}
