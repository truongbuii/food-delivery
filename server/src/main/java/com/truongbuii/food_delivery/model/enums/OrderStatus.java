package com.truongbuii.food_delivery.model.enums;

import lombok.Getter;

@Getter
public enum OrderStatus {
    PENDING("PENDING"),
    SHIPPING("SHIPPING"),
    DELIVERED("DELIVERED"),
    REFUND("REFUND"),
    CANCELLED("CANCELLED");

    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }

}
