package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.RestaurantReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface RestaurantReviewRepository extends JpaRepository<RestaurantReview, Long> {
    @Query("SELECT CASE WHEN EXISTS (SELECT 1 FROM RestaurantReview rr " +
            "WHERE rr.userId = :userId AND rr.restaurantId = :restaurantId) " +
            "THEN TRUE ELSE FALSE END")
    boolean checkExistsByUserIdAndRestaurantId(Long userId, Long restaurantId);

    @Query("SELECT rr FROM RestaurantReview rr WHERE rr.id = :aLong AND rr.userId = :userId")
    Optional<RestaurantReview> findByIdAndUserId(Long aLong, Long userId);

    List<RestaurantReview> findByRestaurantId(Long restaurantId);
}
