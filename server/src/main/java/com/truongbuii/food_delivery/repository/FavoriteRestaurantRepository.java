package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.FavoriteRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface FavoriteRestaurantRepository extends JpaRepository<FavoriteRestaurant, FavoriteRestaurant.FavoriteRestaurantId> {

    Optional<FavoriteRestaurant> findByUserIdAndRestaurantId(Long userId, Long restaurantId);

    Set<FavoriteRestaurant> findByUserId(Long userId);
}
