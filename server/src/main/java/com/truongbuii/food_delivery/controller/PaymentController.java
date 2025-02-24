package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.payment.PaymentPost;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment/vnpay")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createPayment(
            @RequestBody PaymentPost paymentPost,
            HttpServletRequest request
    ) {
        try {
            String paymentUrl = paymentService.createPayment(paymentPost, request);
            return ResponseEntity.ok(ApiResponse.<String>builder().data(paymentUrl).build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder().message(e.getMessage()).build());
        }
    }

    @GetMapping("/callback")
    public ResponseEntity<ApiResponse<String>> vnpayCallback(
            @RequestParam Map<String, String> queryParams,
            HttpServletRequest request
    ) {
        String result = paymentService.vnpayCallback(queryParams, request);
        return ResponseEntity.ok(ApiResponse.<String>builder().data(result).build());
    }
}
