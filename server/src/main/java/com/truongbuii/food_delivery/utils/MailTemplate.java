package com.truongbuii.food_delivery.utils;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.BodyParam;
import org.springframework.beans.factory.annotation.Value;

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

    private static String templateBodyEmailForgotPassword(String otp, BodyParam param) {
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
                "<p>Thank you for joining our platform. Please click on the following link to reset your password: " +
                "<strong><a href=\"" + Constant.CLIENT_URL + "/change-password?email=" + param.email() +
                "&otp=" + otp + "\">" + "Link" +
                "</a></strong>.</p>" +
                "<p>This link will expire in 15 minutes.</p>" +
                "<p>Best regards,<br>Food Delivery Team</p>" +
                "</body>" +
                "</html>";
    }
}
