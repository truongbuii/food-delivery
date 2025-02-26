package com.truongbuii.food_delivery.model.response;

import com.truongbuii.food_delivery.model.enums.OrderStatus;
import com.truongbuii.food_delivery.model.enums.PaymentMethod;
import com.truongbuii.food_delivery.model.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponse {
    private Long id;
    private String restaurantName;
    private String restaurantImage;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private int numberItem;
    private String orderAddress;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private float discount;
    private LocalDateTime updatedAt;
    private List<OrderItemResponse> orderItems;
}
