package com.truongbuii.food_delivery.model.request;

public record OtpNotification(
        String recipient,
        String subject,
        String content) {
}
