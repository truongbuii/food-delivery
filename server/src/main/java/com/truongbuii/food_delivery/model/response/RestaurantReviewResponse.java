package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantReviewResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String userImage;
    private int rating;
    private String comment;
    private String updatedAt;
}
