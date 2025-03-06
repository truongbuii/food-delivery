package com.truongbuii.food_delivery.model.request.food;

public record FoodReviewPost(
        Long foodId,
        int rating,
        String comment
) {
}
