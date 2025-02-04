package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class RestaurantResponse {
    private Long id;
    private String name;
    private String address;
    private String avatarUrl;
    private String coverUrl;
    private boolean verifiedBadge;
    private boolean freeDelivery;
    private LocalTime openingHour;
    private LocalTime closingHour;
    private Float totalStars;
    private Integer totalReviews;
    private boolean hasBanned;
    private boolean hasFeatured;
    private String slug;
}
