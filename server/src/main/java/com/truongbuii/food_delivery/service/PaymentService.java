package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.config.PaymentConfig;
import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.request.payment.PaymentPost;
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

    public String createPayment(PaymentPost paymentPost, HttpServletRequest request) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String bank_code = paymentPost.bankCode();
        BigDecimal amount = paymentPost.amount().multiply(BigDecimal.valueOf(100));
        Map<String, String> vnpParams = paymentConfig.VNPayConfig();
        vnpParams.put("vnp_Amount", String.valueOf(amount));
        if (bank_code != null && !bank_code.isEmpty()) {
            vnpParams.put("vnp_BankCode", bank_code);
        } else {
            vnpParams.put("vnp_BankCode", "NCB");
        }
        vnpParams.put("vnp_IpAddr", VNPayUtils.getClientIp(request));
        String queryUrl = VNPayUtils.createQueryUrl(vnpParams, paymentConfig.getVnp_HashSecret());

        return paymentConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

    public String vnpayCallback(Map<String, String> queryParams, HttpServletRequest request) {
        try {
            String vnpResponseCode = queryParams.get("vnp_ResponseCode");
            String txnRef = queryParams.get("vnp_TxnRef");
            String secureHash = queryParams.get("vnp_SecureHash");
            boolean isValid = VNPayUtils.isValidSignature(queryParams, paymentConfig.getVnp_HashSecret(), secureHash);
            if (!isValid) {
                throw new AppException(ErrorCode.ERR_PAYMENT_INVALID_SIGNATURE);
            }

            if (vnpResponseCode.equals("00")) {
                return "Payment success";
            } else {
                return "Payment failed";
            }
        } catch (Exception e) {
            throw new AppException(e.getMessage());
        }

    }
}
