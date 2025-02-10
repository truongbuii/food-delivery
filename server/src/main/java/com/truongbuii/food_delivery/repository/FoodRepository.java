package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("SELECT f from Food f WHERE f.name = ?1 AND (?2 IS NULL OR f.id != ?2) AND f.restaurant.id = ?3")
    Food findExistByName(String name, Long foodId, Long restaurantId);

    Optional<Food> findBySlug(String slug);

    @Query("SELECT f from Food f WHERE f.restaurant.slug = ?1")
    List<Food> findFeaturedByRestaurantSlug(String restaurantSlug);

    @Query("SELECT f FROM Food f WHERE" +
            " (:restaurantSlug IS NULL OR f.restaurant.slug = :restaurantSlug) " +
            " AND (:categoryId IS NULL OR f.category.id = :categoryId)")
    List<Food> findAllByParams(
            @Param("categoryId") Integer categoryId,
            @Param("restaurantSlug") String restaurantSlug
    );
}
