package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationController {
    private final MailService mailService;

//    @KafkaListener(topics = Constant.Kafka.KAFKA_TOPIC_OTP, groupId = Constant.Kafka.KAFKA_OTP_GROUP_ID)
//    public void listenOtpNotification(NotificationEmail notificationEmail) {
//        log.info("Received OTP notification: {}", notificationEmail);
//        mailService.sendEmail(
//                SendEmail.builder()
//                        .to(BodyParam.builder().email(notificationEmail.recipient()).build())
//                        .subject(notificationEmail.subject())
//                        .htmlContent(notificationEmail.content())
//                        .build(),
//                MailTemplate.templateBodyEmailOTP(notificationEmail.content())
//        );
//    }
//
//    @KafkaListener(topics = Constant.Kafka.KAFKA_TOPIC_FORGOT_PASSWORD, groupId = Constant.Kafka.KAFKA_FORGOT_PASSWORD_GROUP_ID)
//    public void listenForgotPasswordNotification(NotificationEmail notificationEmail) {
//        log.info("Received email notification: {}", notificationEmail);
//        mailService.sendEmail(
//                SendEmail.builder()
//                        .to(BodyParam.builder().email(notificationEmail.recipient()).build())
//                        .subject(notificationEmail.subject())
//                        .htmlContent(notificationEmail.content())
//                        .build(),
//                MailTemplate.templateBodyEmailForgotPassword(notificationEmail.content(), BodyParam.builder().email(notificationEmail.recipient()).build())
//        );
//    }
}
