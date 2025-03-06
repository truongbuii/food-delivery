package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.FoodReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodReviewRepository extends JpaRepository<FoodReview, Long> {

    @Query("SELECT CASE WHEN EXISTS (SELECT 1 FROM FoodReview fr " +
            "WHERE fr.userId = :userId AND fr.foodId = :foodId) " +
            "THEN TRUE ELSE FALSE END")
    boolean checkExistsByUserIdAndFoodId(Long userId, Long foodId);

    @Query("SELECT fr FROM FoodReview fr WHERE fr.id = :aLong AND fr.userId = :userId")
    Optional<FoodReview> findByIdAndUserId(Long aLong, Long userId);

    @Modifying
    @Query("UPDATE Food f SET " +
            "f.totalReviews = f.totalReviews + 1, " +
            "f.totalStars = ROUND((f.totalStars * f.totalReviews + :rating) / (f.totalReviews + 1), 1) " +
            "WHERE f.id = :foodId")
    void updateFoodRating(@Param("foodId") Long foodId, @Param("rating") int rating);

    @Modifying
    @Query("UPDATE Food f SET " +
            "f.totalReviews = f.totalReviews - 1, " +
            "f.totalStars = ROUND((SELECT COALESCE(AVG(fr.rating), 0) FROM FoodReview fr WHERE fr.foodId = " +
            ":foodId), 1) " +
            "WHERE f.id = :foodId")
    void updateFoodRatingAfterDelete(@Param("foodId") Long foodId);

    @Modifying
    @Query("UPDATE Food f SET " +
            "f.totalStars = (SELECT COALESCE(ROUND(AVG(fr.rating), 1), 0) FROM FoodReview fr WHERE fr.foodId = " +
            ":foodId) " +
            "WHERE f.id = :foodId")
    void updateFoodRatingAfterEdit(@Param("foodId") Long foodId);

    List<FoodReview> findByFoodId(Long foodId);
}
