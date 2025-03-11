package com.truongbuii.food_delivery.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.truongbuii.food_delivery.model.enums.OrderStatus;
import com.truongbuii.food_delivery.model.enums.PaymentMethod;
import com.truongbuii.food_delivery.model.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderResponse {
    private Long id;
    private Long restaurantId;
    private String restaurantName;
    private String restaurantImage;
    private String restaurantSlug;
    private boolean verifiedBadge;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private int numberItem;
    private String orderAddress;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private float discount;
    private String updatedAt;
}
