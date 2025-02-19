package com.truongbuii.food_delivery.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.truongbuii.food_delivery.model.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT c FROM CartItem c WHERE c.userId = ?1 AND c.foodId = ?2 AND c.selectedAddons = ?3")
    Optional<CartItem> findByCustomerIdAndProductIdAndAddons(Long userId, Long foodId, JsonNode selectedAddons);

    List<CartItem> findAllByUserId(Long userId);
}
