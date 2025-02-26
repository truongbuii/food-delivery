package com.truongbuii.food_delivery.model.response;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemResponse {
    private Long id;
    private Long foodId;
    private String foodName;
    private String foodImage;
    private int quantity;
    private BigDecimal foodPrice;
    private JsonNode foodAddons;
}
