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

    public static String convertToSlug(String input) {
        return input.toLowerCase().replaceAll(" ", "-");
    }

    public static String generateRandomNums(int length) {
        Random random = new Random();
        String chars = "0123456789";
        StringBuilder result = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            result.append(chars.charAt(random.nextInt(chars.length())));
        }
        return result.toString();
    }
    
}
