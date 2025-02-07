package com.truongbuii.food_delivery.model.response;

import com.truongbuii.food_delivery.model.entity.Addon;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

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

    Set<Addon> addons;
}
