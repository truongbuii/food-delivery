package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity<Integer> {
    private String name;
    private String imageUrl;
    private String slug;
}
