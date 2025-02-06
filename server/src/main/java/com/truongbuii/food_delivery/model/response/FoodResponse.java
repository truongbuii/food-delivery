package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FoodResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private BigDecimal price;
    private String description;
    private String ingredient;
    private Float totalStars;
    private Integer totalReviews;
    private String slug;
    private Long restaurantId;
}
