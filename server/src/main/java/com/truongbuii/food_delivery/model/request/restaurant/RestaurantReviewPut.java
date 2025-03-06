package com.truongbuii.food_delivery.model.request.restaurant;

public record RestaurantReviewPut(
        Long reviewId,
        int rating,
        String comment
) {
}
