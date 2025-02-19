package com.truongbuii.food_delivery.model.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem extends BaseEntity<Long> {

    private Long userId;

    private Long foodId;

    private int quantity;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "selected_addons", columnDefinition = "jsonb")
    private JsonNode selectedAddons;

}
