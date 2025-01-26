package com.truongbuii.food_delivery.model.common;

public class ErrorCode {
    public static final String ERR_INTERNAL_SERVER_ERROR = "Oops! Some things went wrong";
    public static final String ERR_UNAUTHENTICATED = "You need to login!";
    public static final String ERR_UNAUTHORIZED = "Sorry! You don't have permission";
    public static final String ERR_TOKEN_EXPIRED = "Your session has expired. Please login again";
    public static final String ERR_TOKEN_INVALID = "Session is invalid. Please log in again";
    public static final String ERR_PROVIDER_NOT_SUPPORTED = "This provider is not supported";

    // User error
    public static final String ERR_USER_INVALID_OTP = "Your OTP is invalid";
    public static final String ERR_USER_NOT_FOUND = "We couldn't find your email";
    public static final String ERR_USER_DUPLICATE = "This email is already taken";
    public static final String ERR_USER_INVALID_CREDENTIALS = "Email or password is incorrect";

    // Deliver address error
    public static final String ERR_DELIVER_ADDRESS_NAME_DUPLICATE = "This address name is existed";
    public static final String ERR_DELIVER_ADDRESS_NOT_FOUND = "This address is not found";
}
