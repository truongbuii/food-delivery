package com.truongbuii.food_delivery.model.request.restaurant;

public record RestaurantReviewPost(
        Long restaurantId,
        int rating,
        String comment
) {
}
