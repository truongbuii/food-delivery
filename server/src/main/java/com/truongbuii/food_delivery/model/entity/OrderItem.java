package com.truongbuii.food_delivery.model.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem extends BaseEntity<Long> {
    private Long foodId;
    private String foodName;
    private String foodImage;
    private int quantity;
    private BigDecimal foodPrice;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "food_addons", columnDefinition = "jsonb")
    private JsonNode foodAddons;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
