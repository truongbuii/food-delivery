package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantReview extends BaseEntity<Long> {
    private Long restaurantId;
    private Long userId;
    private String userName;
    private String userImage;
    private int rating;
    private String comment;
}
