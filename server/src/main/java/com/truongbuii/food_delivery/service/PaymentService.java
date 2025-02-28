package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.config.PaymentConfig;
import com.truongbuii.food_delivery.utils.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentConfig paymentConfig;
    private static final BigDecimal USD_TO_VND_RATE = BigDecimal.valueOf(24000);

    public String createPayment(
            HttpServletRequest request,
            BigDecimal amount,
            String orderKey
    ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        Map<String, String> vnpParams = paymentConfig.VNPayConfig();
        BigDecimal amountInVND = amount.multiply(USD_TO_VND_RATE).multiply(BigDecimal.valueOf(100));
        vnpParams.put("vnp_Amount", amountInVND.toBigInteger().toString());
        vnpParams.put("vnp_IpAddr", VNPayUtils.getClientIp(request));
        vnpParams.put("vnp_TxnRef", orderKey);
        String queryUrl = VNPayUtils.createQueryUrl(vnpParams, paymentConfig.getVnp_HashSecret());

        return paymentConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

}
