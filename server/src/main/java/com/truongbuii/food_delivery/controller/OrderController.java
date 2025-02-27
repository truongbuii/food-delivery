package com.truongbuii.food_delivery.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.request.order.OrderStatusPatch;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<String>> createOrder(
            @AuthenticationPrincipal User principal,
            @RequestBody OrderPost orderPost,
            HttpServletRequest request
    ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        var orderResponse = orderService.create(principal.getId(), orderPost, request);
        return ResponseEntity.ok(ApiResponse.<String>builder().data(orderResponse).build());
    }

    @GetMapping("/payment/callback")
    public ResponseEntity<ApiResponse<Void>> vnpayCallback(
            @RequestParam Map<String, String> queryParams
    ) {
        orderService.updatePaymentStatus(queryParams);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @PatchMapping("/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @RequestBody OrderStatusPatch orderStatusPatch
    ) {
        var order = orderService.updateStatus(orderStatusPatch);
        return ResponseEntity.ok(ApiResponse.<Order>builder().data(order).build());
    }

}
