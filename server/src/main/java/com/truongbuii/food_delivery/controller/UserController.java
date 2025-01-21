package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<UserResponse>> get(
            @AuthenticationPrincipal User principal
    ) {
        UserResponse me = userService.get(principal.getId());
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(me).build());
    }
}
