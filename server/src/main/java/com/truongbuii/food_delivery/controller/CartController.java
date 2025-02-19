package com.truongbuii.food_delivery.controller;


import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.cart.CartItemPost;
import com.truongbuii.food_delivery.model.request.cart.CartItemPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.CartItemResponse;
import com.truongbuii.food_delivery.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> get(
            @AuthenticationPrincipal User principal
    ) {
        var cartItems = cartService.getAll(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<CartItemResponse>>builder().data(cartItems).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartItemResponse>> post(
            @Valid
            @AuthenticationPrincipal User principal,
            @RequestBody CartItemPost cartItemPost
    ) {
        var cartItem = cartService.create(principal.getId(), cartItemPost);
        return ResponseEntity.ok(ApiResponse.<CartItemResponse>builder().data(cartItem).build());
    }

    @PatchMapping()
    public ResponseEntity<ApiResponse<CartItemResponse>> patch(
            @Valid
            @RequestBody CartItemPut cartItemPut
    ) {
        var cartItem = cartService.update(cartItemPut);
        return ResponseEntity.ok(ApiResponse.<CartItemResponse>builder().data(cartItem).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id
    ) {
        cartService.delete(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
}
