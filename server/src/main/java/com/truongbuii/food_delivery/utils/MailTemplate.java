package com.truongbuii.food_delivery.utils;

public class MailTemplate {
    public static String templateBodyEmailOTP(String otp) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; }" +
                "h2 { color: #4CAF50; }" +
                "p { font-size: 16px; }" +
                "strong { color: #FF5722; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<h2>Welcome to Food Delivery!</h2>" +
                "<p>Dear Customer,</p>" +
                "<p>Thank you for joining our platform. Your verification code is <strong>" + otp + "</strong>.</p>" +
                "<p>This code will expire in 15 minutes.</p>" +
                "<p>Best regards,<br>Food Delivery Team</p>" +
                "</body>" +
                "</html>";
    }
}
