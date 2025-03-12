package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT DISTINCT r FROM Restaurant r LEFT JOIN r.categories c " +
            "WHERE r.hasBanned = false " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:rating IS NULL OR r.totalStars >= :rating) " +
            "AND (:keyword IS NULL OR :keyword = '' OR r.name ILIKE CONCAT('%', :keyword, '%')) " +
            "AND (:freeDelivery IS NULL OR :freeDelivery = FALSE OR r.freeDelivery = TRUE) " +
            "AND (:popular IS NOT TRUE OR r.hasFeatured = TRUE)" +
            "ORDER BY r.id ASC")
    Page<Restaurant> findAllByParams(
            @Param("rating") Float rating,
            @Param("keyword") String keyword,
            @Param("popular") Boolean popular,
            @Param("categoryId") Integer categoryId,
            @Param("freeDelivery") Boolean freeDelivery,
            Pageable pageable
    );


    List<Restaurant> findAllByHasFeatured(Boolean aTrue);
}
