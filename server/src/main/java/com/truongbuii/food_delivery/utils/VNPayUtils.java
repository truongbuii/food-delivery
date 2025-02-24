package com.truongbuii.food_delivery.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Slf4j
public class VNPayUtils {
    public static String createQueryUrl(
            Map<String, String> params,
            String hashSecret
    ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        Map<String, String> sortedParams = new TreeMap<>(params);

        StringBuilder data = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                data.append(URLEncoder.encode(entry.getKey(), "UTF-8")).append("=")
                        .append(URLEncoder.encode(entry.getValue(), "UTF-8")).append("&");
            }
        }

        String queryString = data.toString();
        if (!queryString.isEmpty()) {
            queryString = queryString.substring(0, queryString.length() - 1);
        }
        String secureHash = hmacSHA512(hashSecret, queryString);

        return queryString + "&vnp_SecureHash=" + secureHash;
    }

    public static boolean isValidSignature(
            Map<String, String> queryParams,
            String hashSecret, String providedHash
    ) throws NoSuchAlgorithmException, InvalidKeyException {
        Map<String, String> sortedParams = new TreeMap<>(queryParams);
        sortedParams.remove("vnp_SecureHash");

        StringBuilder data = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                data.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8)).append("=")
                        .append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8)).append("&");
            }
        }
        if (!data.isEmpty()) {
            data.setLength(data.length() - 1);
        }
        String generatedHash = hmacSHA512(hashSecret, data.toString());
        log.info("Generated Hash: {}", generatedHash);
        log.info("Provided Hash: {}", providedHash);
        return generatedHash.equals(providedHash);
    }

    private static String hmacSHA512(String key, String data) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac sha512Hmac = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        sha512Hmac.init(secretKey);
        byte[] hashBytes = sha512Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        return HexFormat.of().formatHex(hashBytes).toLowerCase();
    }

    public static String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }
}
