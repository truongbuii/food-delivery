package com.truongbuii.food_delivery.model.request;

public record NotificationEmail(
        String recipient,
        String subject,
        String content) {
}
