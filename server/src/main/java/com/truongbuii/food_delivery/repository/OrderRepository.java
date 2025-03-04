package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByUserIdAndStatus(Long userId, OrderStatus status);

    List<Order> findByUserId(Long userId);
}
