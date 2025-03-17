package com.truongbuii.food_delivery.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.request.order.OrderStatusPatch;
import com.truongbuii.food_delivery.model.request.order.ReOrderPost;
import com.truongbuii.food_delivery.model.response.*;
import com.truongbuii.food_delivery.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/my-orders")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(
            @AuthenticationPrincipal User principal
    ) {
        var orders = orderService.getMyOrders(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<OrderResponse>>builder().data(orders).build());
    }

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<CheckoutResponse>> createOrder(
            @AuthenticationPrincipal User principal,
            @RequestBody OrderPost orderPost,
            HttpServletRequest request
    ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        var orderResponse = orderService.create(principal.getId(), orderPost, request);
        return ResponseEntity.ok(ApiResponse.<CheckoutResponse>builder().data(orderResponse).build());
    }

    @GetMapping("/payment/callback")
    public void vnpayCallback(
            @RequestParam Map<String, String> queryParams,
            HttpServletResponse response
    ) throws IOException {
        Long orderId = orderService.OrderPaymentCallBack(queryParams);
        response.sendRedirect("http://localhost:3000/order/" + orderId);
    }

    @PostMapping("/re-order")
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> reOrder(
            @AuthenticationPrincipal User principal,
            @RequestBody ReOrderPost reOrderPost
    ) {
        var orderResponse = orderService.reOrder(principal.getId(), reOrderPost);
        return ResponseEntity.ok(ApiResponse.<List<CartItemResponse>>builder().data(orderResponse).build());
    }

    @PatchMapping("/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @RequestBody OrderStatusPatch orderStatusPatch
    ) {
        var order = orderService.updateStatus(orderStatusPatch);
        return ResponseEntity.ok(ApiResponse.<Order>builder().data(order).build());
    }

    @GetMapping("/order-detail")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderDetail(
            @RequestParam Long orderId
    ) {
        var order = orderService.getOrderDetail(orderId);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder().data(order).build());
    }

    @GetMapping("/order-item-by-order")
    public ResponseEntity<ApiResponse<List<OrderItemResponse>>> getOrderItemByOrder(
            @RequestParam Long orderId
    ) {
        var orderItems = orderService.getOrderItemByOrderId(orderId);
        return ResponseEntity.ok(ApiResponse.<List<OrderItemResponse>>builder().data(orderItems).build());
    }

    @PostMapping("/auto-update-status")
    public void cronJob() {
        orderService.cronJobUpdateOrderStatus();
    }
}
