package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.AccessTokenPost;
import com.truongbuii.food_delivery.model.request.AuthSignIn;
import com.truongbuii.food_delivery.model.request.AuthSignUp;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse<UserResponse>> signUp(
            @Valid
            @RequestBody AuthSignUp authSignUp,
            HttpServletResponse response
    ) {
        UserResponse userResponse = authenticationService.signUp(authSignUp, response);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userResponse).build());
    }

    @PostMapping("/sign-in")
    public ResponseEntity<ApiResponse<UserResponse>> signIn(
            @Valid
            @RequestBody AuthSignIn authSignIn,
            HttpServletResponse response

    ) {
        UserResponse userResponse = authenticationService.signIn(authSignIn, response);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userResponse).build());
    }

    @PostMapping("/refresh-access-token")
    public ResponseEntity<ApiResponse<AccessTokenPost>> newAccessToken(
            @CookieValue(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME) AccessTokenPost accessTokenPost
    ) {
        AccessTokenPost accessToken = authenticationService.refreshAccessToken(accessTokenPost);
        return ResponseEntity.ok(ApiResponse.<AccessTokenPost>builder().data(accessToken).build());
    }
}
