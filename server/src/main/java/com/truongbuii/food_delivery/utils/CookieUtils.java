package com.truongbuii.food_delivery.utils;

import com.truongbuii.food_delivery.model.common.Constant;
import jakarta.servlet.http.Cookie;

public class CookieUtils {
    public static Cookie createCookie(String refreshToken) {
        /*
         * Set refresh token to cookie header
         * And access token to response body for client to store
         */
        Cookie cookie = new Cookie(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME, refreshToken);
        cookie.setSecure(Constant.Cookie.COOKIE_SECURE);
        cookie.setHttpOnly(Constant.Cookie.COOKIE_HTTP_ONLY);
        cookie.setPath(Constant.Cookie.COOKIE_PATH);
        cookie.setMaxAge(Constant.Cookie.COOKIE_MAX_AGE);
        return cookie;
    }

    public static Cookie deleteCookie(String name) {
        /*
         * Remove cookie from header
         */
        Cookie cookie = new Cookie(name, null);
        cookie.setSecure(Constant.Cookie.COOKIE_SECURE);
        cookie.setHttpOnly(Constant.Cookie.COOKIE_HTTP_ONLY);
        cookie.setPath(Constant.Cookie.COOKIE_PATH);
        cookie.setMaxAge(0);
        return cookie;
    }
}
