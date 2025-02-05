package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(
            name = "restaurant_category",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();
}
