package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.auth.BodyParam;
import com.truongbuii.food_delivery.model.request.auth.EmailClient;
import com.truongbuii.food_delivery.model.request.auth.SendEmail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

    private final JavaMailSender mailSender;

    public void sendEmailBrevo(SendEmail sendEmail, String htmlContent) {
        EmailClient emailClient = EmailClient.builder()
                .sender(
                        BodyParam.builder()
                                .email(SENDER_MAIL)
                                .name(Constant.Notification.NOTIFICATION_SENDER_NAME)
                                .build()
                )
                .to(List.of(sendEmail.to()))
                .subject(sendEmail.subject())
                .htmlContent(htmlContent)
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

    private void sendEmail(SendEmail sendEmail, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
        helper.setText(htmlContent, true);
        helper.setTo(String.valueOf(sendEmail.to()));
        helper.setSubject(sendEmail.subject());
        helper.setFrom(SENDER_MAIL);
        mailSender.send(message);
    }

}
