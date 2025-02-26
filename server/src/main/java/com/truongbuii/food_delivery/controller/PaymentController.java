package com.truongbuii.food_delivery.controller;

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

    @GetMapping("/callback")
    public ResponseEntity<ApiResponse<String>> vnpayCallback(
            @RequestParam Map<String, String> queryParams,
            HttpServletRequest request
    ) {
        String result = paymentService.vnpayCallback(queryParams, request);
        return ResponseEntity.ok(ApiResponse.<String>builder().data(result).build());
    }
}
