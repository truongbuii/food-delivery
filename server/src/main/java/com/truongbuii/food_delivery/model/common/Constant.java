package com.truongbuii.food_delivery.model.common;

import org.springframework.beans.factory.annotation.Value;

public final class Constant {
    @Value("${client-url}")
    public static String CLIENT_URL;

    public static final class ErrorCode {
        // Common error
        public static final String ERR_INTERNAL_SERVER_ERROR = "Oops! Some things went wrong";
        public static final String ERR_UNAUTHENTICATED = "You need to login!";
        public static final String ERR_UNAUTHORIZED = "Sorry! You don't have permission";
        public static final String ERR_TOKEN_EXPIRED = "Your session has expired. Please login again";
        public static final String ERR_TOKEN_INVALID = "Your session has expired. Please login again";

        // User error
        public static final String ERR_USER_NOT_FOUND = "We couldn't find your account";
        public static final String ERR_USER_DUPLICATE = "This email is already taken";
        public static final String ERR_USER_INVALID_CREDENTIALS = "Email or password is incorrect";
        public static final String ERR_USER_INVALID_OTP = "Your OTP is invalid";
    }

    public static final class Cookie {
        public static final String COOKIE_REFRESH_TOKEN_NAME = "FD_REFRESH_TOKEN";
        public static final boolean COOKIE_SECURE = true;
        public static final boolean COOKIE_HTTP_ONLY = true;
        public static final int COOKIE_MAX_AGE = 30 * 24 * 60 * 60;
        public static final String COOKIE_PATH = "/";
    }

    public static final class Notification {
        public static final String NOTIFICATION_OTP_SUBJECT = "Welcome to Food Delivery";
        public static final String NOTIFICATION_FORGOT_PASSWORD_SUBJECT = "Welcome to Food Delivery";
        public static final String NOTIFICATION_SENDER_NAME = "Food Delivery";
    }

    public static final class Redis {
        public static final String REDIS_OTP_PREFIX = "otp:";
        public static final String REDIS_BLACKLIST_TAG = "blacklist";
    }

    public static final class Kafka {
        public static final String KAFKA_TOPIC_OTP = "otp-notification";
        public static final String KAFKA_TOPIC_FORGOT_PASSWORD = "forgot-password-notification";
        public static final String KAFKA_OTP_GROUP_ID = "otp-notification-group";
    }
}
