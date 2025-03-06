package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.RestaurantReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Modifying
    @Query("UPDATE Restaurant r SET " +
            "r.totalReviews = r.totalReviews + 1, " +
            "r.totalStars = ROUND((r.totalStars * r.totalReviews + :rating) / (r.totalReviews + 1), 1) " +
            "WHERE r.id = :restaurantId")
    void updateRestaurantRating(@Param("restaurantId") Long restaurantId, @Param("rating") int rating);

    @Modifying
    @Query("UPDATE Restaurant r SET " +
            "r.totalReviews = r.totalReviews - 1, " +
            "r.totalStars = ROUND((SELECT COALESCE(AVG(rr.rating), 0) FROM RestaurantReview rr WHERE rr.restaurantId = " +
            ":restaurantId), 1) " +
            "WHERE r.id = :restaurantId")
    void updateRestaurantRatingAfterDelete(@Param("restaurantId") Long restaurantId);

    @Modifying
    @Query("UPDATE Restaurant r SET " +
            "r.totalStars = (SELECT COALESCE(ROUND(AVG(rr.rating), 1), 0) FROM RestaurantReview rr WHERE rr.restaurantId = :restaurantId) " +
            "WHERE r.id = :restaurantId")
    void updateRestaurantRatingAfterEdit(@Param("restaurantId") Long restaurantId);

}
