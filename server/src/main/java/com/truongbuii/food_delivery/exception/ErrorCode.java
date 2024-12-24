package com.truongbuii.food_delivery.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class ErrorCode {

    // Common error
    public static final String ERR_INTERNAL_SERVER_ERROR = "Oops! Some things went wrong";
    public static final String ERR_UNAUTHENTICATED = "You need to login!";
    public static final String ERR_UNAUTHORIZED = "Sorry! You don't have permission";
    public static final String ERR_TOKEN_EXPIRED = "Your session has expired. Please login again";
    public static final String ERR_TOKEN_INVALID = "Session is invalid. Please log in again";

    // User error
    public static final String ERR_USER_NOT_FOUND = "We couldn't find your account";
    public static final String ERR_USER_DUPLICATE = "This email is already taken";
    public static final String ERR_USER_INVALID_CREDENTIALS = "Email or password is incorrect";
}
