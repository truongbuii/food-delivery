package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FavoriteRestaurant.FavoriteRestaurantId.class)
public class FavoriteRestaurant {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FavoriteRestaurantId implements Serializable {
        private Long user;
        private Long restaurant;
    }
}
