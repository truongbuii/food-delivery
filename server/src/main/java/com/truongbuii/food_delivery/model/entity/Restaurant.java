package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
