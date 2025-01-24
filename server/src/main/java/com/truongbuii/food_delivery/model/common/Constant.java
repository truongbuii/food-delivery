package com.truongbuii.food_delivery.model.common;

public final class Constant {
    public static final class Cookie {
        public static final String COOKIE_REFRESH_TOKEN_NAME = "__fd_rft";
        public static final boolean COOKIE_SECURE = true;
        public static final boolean COOKIE_HTTP_ONLY = true;
        public static final int COOKIE_MAX_AGE = 30 * 24 * 60 * 60;
        public static final String COOKIE_PATH = "/";
    }

    public static final class Notification {
        public static final String NOTIFICATION_OTP_SUBJECT = "Welcome to Food Delivery";
        public static final String NOTIFICATION_FORGOT_PASSWORD_SUBJECT = "Reset your Food Delivery account password";
        public static final String NOTIFICATION_SENDER_NAME = "Food Delivery";
    }

    public static final class Redis {
        public static final String REDIS_OTP_PREFIX = "user:otp:";
        public static final String REDIS_BLACKLIST_TAG = "user:blacklist";
    }

    public static final class Kafka {
        public static final String KAFKA_TOPIC_OTP = "otp";
        public static final String KAFKA_TOPIC_FORGOT_PASSWORD = "fg-pwd";
        public static final String KAFKA_OTP_GROUP_ID = "otp-group";
        public static final String KAFKA_FORGOT_PASSWORD_GROUP_ID = "fg-pwd-group";
    }
    
}
