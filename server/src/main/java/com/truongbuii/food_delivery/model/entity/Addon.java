package com.truongbuii.food_delivery.model.entity;

import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Addon extends BaseEntity<Long> {
    private String name;
    private String imageUrl;
    private BigDecimal price;
}
