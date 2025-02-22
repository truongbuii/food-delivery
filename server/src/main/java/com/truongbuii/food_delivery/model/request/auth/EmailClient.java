package com.truongbuii.food_delivery.model.request.auth;

import lombok.Builder;

import java.util.List;

@Builder
public record EmailClient(
        BodyParam sender,
        List<BodyParam> to,
        String subject,
        String htmlContent
) {
}

