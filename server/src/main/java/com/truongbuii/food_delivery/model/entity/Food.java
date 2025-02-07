package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food extends BaseEntity<Long> {
    private String name;
    private String imageUrl;
    private BigDecimal price;
    private String description;
    private String ingredient;
    private Float totalStars;
    private Integer totalReviews;
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "food_addon",
            joinColumns = @JoinColumn(name = "food_id"),
            inverseJoinColumns = @JoinColumn(name = "addon_id")
    )
    private Set<Addon> addons;
}
