package com.truongbuii.food_delivery.model.request;

import lombok.Builder;

@Builder
public record SendEmail(
        BodyParam to,
        String subject,
        String htmlContent) {
}
