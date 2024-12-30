package com.truongbuii.food_delivery.utils;

import java.util.Random;

public class OtpGenerator {
    public static String generateOtp() {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }
}
