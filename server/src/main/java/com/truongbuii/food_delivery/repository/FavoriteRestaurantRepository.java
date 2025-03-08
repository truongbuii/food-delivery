package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.FavoriteRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface FavoriteRestaurantRepository extends JpaRepository<FavoriteRestaurant, FavoriteRestaurant.FavoriteRestaurantId> {

    Optional<FavoriteRestaurant> findByUserIdAndRestaurantId(Long userId, Long restaurantId);

    Set<FavoriteRestaurant> findByUserId(Long userId);

    @Query("SELECT fr FROM FavoriteRestaurant fr WHERE fr.user.id = :userId AND fr.restaurant.id IN :restaurantIds")
    List<FavoriteRestaurant> findByUserIdAndRestaurantIdIn(
            @Param("userId") Long userId,
            @Param("restaurantIds") List<Long> restaurantIds
    );
}
