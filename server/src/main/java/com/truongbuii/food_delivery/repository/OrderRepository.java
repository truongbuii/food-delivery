package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByUserIdAndStatus(Long userId, OrderStatus status);

    List<Order> findByUserId(Long userId);

    @Query("SELECT CASE WHEN EXISTS (SELECT 1 FROM Order o " +
            "WHERE o.userId = :userId AND o.restaurantId = :restaurantId AND o.status = 'DELIVERED') " +
            "THEN TRUE ELSE FALSE END")
    Boolean existsCompletedOrder(
            @Param("userId") Long userId,
            @Param("restaurantId") Long restaurantId
    );
}
