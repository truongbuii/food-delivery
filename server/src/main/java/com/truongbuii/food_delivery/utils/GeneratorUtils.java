package com.truongbuii.food_delivery.utils;

import java.util.Random;
import java.util.UUID;

public class GeneratorUtils {
    public static String generateOtp() {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }

    public static String generateStateToken() {
        return UUID.randomUUID().toString();
    }
}
