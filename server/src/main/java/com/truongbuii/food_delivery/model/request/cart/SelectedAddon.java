package com.truongbuii.food_delivery.model.request.cart;

import java.math.BigDecimal;

public record SelectedAddon(
        Long id,
        String name,
        BigDecimal price
) {
}
