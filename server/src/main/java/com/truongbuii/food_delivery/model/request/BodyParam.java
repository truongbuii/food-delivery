package com.truongbuii.food_delivery.model.request;

import lombok.Builder;

@Builder
public record BodyParam(
        String email,
        String name
) {
}
