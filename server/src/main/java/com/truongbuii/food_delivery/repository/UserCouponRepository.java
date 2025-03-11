package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.UserCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserCouponRepository extends JpaRepository<UserCoupon, UUID> {
    Optional<UserCoupon> findByCouponIdAndUserId(UUID couponId, Long userId);
}
