package com.truongbuii.food_delivery.model.request.food;

public record FoodReviewPut(
        Long reviewId,
        int rating,
        String comment
) {
}
