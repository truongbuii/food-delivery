package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.request.auth.*;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
    public ResponseEntity<ApiResponse<TokenPost>> newAccessToken(
            @CookieValue(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME) TokenPost tokenPost
    ) {
        TokenPost accessToken = authenticationService.refreshAccessToken(tokenPost);
        return ResponseEntity.ok(ApiResponse.<TokenPost>builder().data(accessToken).build());
    }

    @PostMapping("/sign-out")
    public ResponseEntity<ApiResponse<?>> signOut(
            @CookieValue(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME) TokenPost tokenPost,
            HttpServletResponse response
    ) {
        authenticationService.signOut(tokenPost, response);
        return ResponseEntity.ok(ApiResponse.builder().build());
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<?>> sendOtp(
            @Valid
            @RequestBody EmailPost emailPost
    ) {
        authenticationService.sendOtp(emailPost);
        return ResponseEntity.ok(ApiResponse.builder().build());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<?>> resetPassword(
            @Valid
            @RequestBody EmailPost emailPost
    ) {
        authenticationService.forgotPassword(emailPost);
        return ResponseEntity.ok(ApiResponse.<Object>builder().build());
    }

    @PatchMapping("/change-password")
    public ResponseEntity<ApiResponse<?>> changePassword(
            @Valid
            @RequestBody ChangePasswordPatch changePasswordPatch
    ) {
        authenticationService.changePassword(changePasswordPatch);
        return ResponseEntity.ok(ApiResponse.<Object>builder().build());
    }

    @PatchMapping("/verification-email")
    public ResponseEntity<ApiResponse<UserResponse>> verificationEmail(
            @Valid
            @RequestBody UserEmailPatch userEmailPatch
    ) {
        UserResponse userResponse = authenticationService.verificationEmail(userEmailPatch);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userResponse).build());
    }

    @PatchMapping("/set-phone-number")
    public ResponseEntity<ApiResponse<UserResponse>> setPhoneNumber(
            @Valid
            @RequestBody UserPhonePatch userPhonePatch
    ) {
        UserResponse userResponse = authenticationService.setPhoneNumber(userPhonePatch);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userResponse).build());
    }

    @GetMapping("/social-login")
    public ResponseEntity<ApiResponse<String>> socialLogin(
            @RequestParam("provider_type") String providerType
    ) {
        String url = authenticationService.generateSocialLoginUrl(providerType);
        return ResponseEntity.ok(ApiResponse.<String>builder().data(url).build());
    }

    @GetMapping("/social-callback")
    public ResponseEntity<ApiResponse<UserResponse>> callbackSocialLogin(
            @RequestParam("code") String code,
            @RequestParam("provider_type") String providerType,
            HttpServletResponse response
    ) throws IOException {
        UserResponse userInfo = authenticationService.authenticateSocialLogin(code, providerType, response);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder().data(userInfo).build());
    }
}
