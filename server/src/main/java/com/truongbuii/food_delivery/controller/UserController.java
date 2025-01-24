package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.user.UserProfilePut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> get(
            @AuthenticationPrincipal User principal
    ) {
        UserResponse me = userService.getById(principal.getId());
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(me).build());
    }

    @PutMapping(value = "/me")
    public ResponseEntity<ApiResponse<UserResponse>> put(
            @Valid
            @RequestBody UserProfilePut userProfilePut
    ) {
        UserResponse me = userService.put(userProfilePut);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(me).build());
    }
}
