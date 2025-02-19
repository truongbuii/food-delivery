package com.truongbuii.food_delivery.model.response;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemResponse {
    private Long id;
    private Long userId;
    private Long foodId;
    private String foodName;
    private String foodImageUrl;
    private double foodPrice;
    private int quantity;
    private JsonNode selectedAddons;
}
