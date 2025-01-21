package com.truongbuii.food_delivery.model.request.auth;

import lombok.Builder;

@Builder
public record SendEmail(
        BodyParam to,
        String subject,
        String htmlContent) {
}
