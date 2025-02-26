package com.truongbuii.food_delivery.model.entity;

import com.truongbuii.food_delivery.model.enums.OrderStatus;
import com.truongbuii.food_delivery.model.enums.PaymentMethod;
import com.truongbuii.food_delivery.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.math.BigDecimal;

@Entity
@Table(name = "\"order\"")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order extends BaseEntity<Long> {
    private Long userId;
    private Long restaurantId;
    private BigDecimal totalPrice;
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private int numberItem;
    private String orderAddress;
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private PaymentMethod paymentMethod;
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    private float discount;
}
