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

    // Category error
    public static final String ERR_CATEGORY_DUPLICATE = "This category name is already taken";
    public static final String ERR_CATEGORY_NOT_FOUND = "This category is not found";

    // Restaurant error
    public static final String ERR_RESTAURANT_DUPLICATE = "This restaurant name is already taken";
    public static final String ERR_RESTAURANT_NOT_FOUND = "This restaurant is not found";

    // Food error
    public static final String ERR_FOOD_DUPLICATE = "This food is existed in this restaurant";
    public static final String ERR_FOOD_NOT_FOUND = "This food is not found";
    public static final String ERR_CATEGORY_NOT_MATCH = "This category is not matched with this restaurant";


    // Addon error
    public static final String ERR_ADDON_DUPLICATE = "This addon name is existed";
    public static final String ERR_ADDON_NOT_FOUND = "This addon is not found";
}
