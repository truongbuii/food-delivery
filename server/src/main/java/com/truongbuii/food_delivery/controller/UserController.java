package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.UserSignUpRequest;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse<UserResponse>> signUp(
            @Valid
            @RequestBody UserSignUpRequest userSignUpRequest
    ) {
        UserResponse userResponse = userService.signUp(userSignUpRequest);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userResponse).build());
    }
}
