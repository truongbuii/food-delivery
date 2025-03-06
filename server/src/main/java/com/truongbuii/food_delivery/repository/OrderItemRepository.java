package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM OrderItem oi WHERE oi.order.id = :orderId")
    void deleteByOrderId(Long orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :id")
    List<OrderItem> findByOrderId(Long id);

    @Query("SELECT CASE WHEN EXISTS (SELECT 1 FROM OrderItem oi " +
            "WHERE oi.order.id = :id AND oi.foodId = :foodId) THEN TRUE ELSE FALSE END")
    boolean existsByOrderIdAndFoodId(Long id, Long foodId);
}
