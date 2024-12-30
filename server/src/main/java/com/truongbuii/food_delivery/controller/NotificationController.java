package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.BodyParam;
import com.truongbuii.food_delivery.model.request.OtpNotification;
import com.truongbuii.food_delivery.model.request.SendEmail;
import com.truongbuii.food_delivery.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationController {
    private final MailService mailService;

    @KafkaListener(topics = Constant.Kafka.KAFKA_TOPIC_OTP, groupId = Constant.Kafka.KAFKA_OTP_GROUP_ID)
    public void listenOtpNotification(OtpNotification otpNotification) {
        log.info("Received OTP notification: {}", otpNotification);
        mailService.sendEmail(SendEmail.builder()
                .to(BodyParam.builder()
                        .email(otpNotification.recipient())
                        .build())
                .subject(otpNotification.subject())
                .htmlContent(otpNotification.content())
                .build());
    }
}
