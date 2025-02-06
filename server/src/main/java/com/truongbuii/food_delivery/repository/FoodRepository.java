package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("SELECT f from Food f WHERE f.name = ?1 AND (?2 IS NULL OR f.id != ?2) AND f.restaurant.id = ?3")
    Food findExistByName(String name, Long foodId, Long restaurantId);
}
