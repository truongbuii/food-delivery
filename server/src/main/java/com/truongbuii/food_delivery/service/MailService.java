package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.BodyParam;
import com.truongbuii.food_delivery.model.request.EmailClient;
import com.truongbuii.food_delivery.model.request.SendEmail;
import com.truongbuii.food_delivery.utils.MailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MailService {
    @Value("${application.brevo.api-key}")
    private String API_KEY;
    @Value("${application.brevo.api-url}")
    private String API_URL;
    @Value("${application.brevo.sender-mail}")
    private String SENDER_MAIL;

    private final WebClient webClient;

    public void sendEmail(SendEmail sendEmail) {
        EmailClient emailClient = EmailClient.builder()
                .sender(
                        BodyParam.builder()
                                .email(SENDER_MAIL)
                                .name(Constant.Notification.NOTIFICATION_SENDER_NAME)
                                .build()
                )
                .to(List.of(sendEmail.to()))
                .subject(sendEmail.subject())
                .htmlContent(MailTemplate.templateBodyEmailOTP(sendEmail.htmlContent()))
                .build();
        try {
            webClient.post()
                    .uri(API_URL)
                    .header("api-key", API_KEY)
                    .bodyValue(emailClient)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
