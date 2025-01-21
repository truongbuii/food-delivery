package com.truongbuii.food_delivery.model.request.auth;

public record NotificationEmail(
        String recipient,
        String subject,
        String content) {
}
