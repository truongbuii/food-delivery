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

    public String createPayment(
            HttpServletRequest request,
            String bank_code,
            BigDecimal amount,
            String orderKey
    ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        Map<String, String> vnpParams = paymentConfig.VNPayConfig();
        vnpParams.put("vnp_Amount", String.valueOf(amount.multiply(BigDecimal.valueOf(100))));
        if (bank_code != null && !bank_code.isEmpty()) {
            vnpParams.put("vnp_BankCode", bank_code);
        } else {
            vnpParams.put("vnp_BankCode", "NCB");
        }
        vnpParams.put("vnp_IpAddr", VNPayUtils.getClientIp(request));
        vnpParams.put("vnp_TxnRef", orderKey);
        String queryUrl = VNPayUtils.createQueryUrl(vnpParams, paymentConfig.getVnp_HashSecret());

        return paymentConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

}
