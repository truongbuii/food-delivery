package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT r from Restaurant r WHERE r.name = ?1 AND (?2 IS NULL OR r.id != ?2)")
    Restaurant findExistByName(String name, Long id);

    Optional<Restaurant> findBySlug(String slug);

    @Query("SELECT r from Restaurant r join r.categories c WHERE r.hasBanned = false" +
            " AND (:categoryId IS NULL OR c.id = :categoryId)")
    List<Restaurant> findAllByParams(
            @Param("categoryId") Integer categoryId
    );


}
