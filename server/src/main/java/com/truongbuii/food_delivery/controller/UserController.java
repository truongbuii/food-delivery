package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.UserSignUpRequest;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<UserResponse> signUp(
            @Valid
            @RequestBody UserSignUpRequest userSignUpRequest
    ) {
        UserResponse userResponse = userService.signUp(userSignUpRequest);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("")
    public ResponseEntity<?> getUser() {
        return ResponseEntity.ok("ok");
    }
}
