package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.InvalidTokenException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.AccessTokenPost;
import com.truongbuii.food_delivery.model.request.AuthSignIn;
import com.truongbuii.food_delivery.model.request.AuthSignUp;
import com.truongbuii.food_delivery.model.request.OtpNotification;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import com.truongbuii.food_delivery.security.JwtService;
import com.truongbuii.food_delivery.utils.OtpGenerator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public UserResponse signUp(AuthSignUp authSignUp, HttpServletResponse response) {
        Optional<User> existingUser = userRepository.findByEmail(authSignUp.email());
        if (existingUser.isPresent()) {
            log.error("Failed to sign up: Email: {} existed", authSignUp.email());
            throw new DuplicateResourceException(Constant.ErrorCode.ERR_USER_DUPLICATE);
        }
        User user = userMapper.toUser(authSignUp);
        user.setPassword(passwordEncoder.encode(authSignUp.password()));
        userRepository.save(user);

        OtpNotification otpNotification = new OtpNotification(
                user.getEmail(),
                Constant.Notification.NOTIFICATION_OTP_SUBJECT,
                OtpGenerator.generateOtp()
        );
        kafkaTemplate.send(Constant.Kafka.KAFKA_TOPIC_OTP, otpNotification);
        return generateUserResponse(user, response);
    }

    public UserResponse signIn(AuthSignIn authSignIn, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authSignIn.email(),
                        authSignIn.password()
                )
        );
        User principal = (User) authentication.getPrincipal();
        return generateUserResponse(principal, response);
    }

    private UserResponse generateUserResponse(User user, HttpServletResponse response) {
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        /*
         * Set refresh token to cookie header
         * And access token to response body for client to store
         */
        Cookie cookie = new Cookie(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME, refreshToken);
        cookie.setSecure(Constant.Cookie.COOKIE_SECURE);
        cookie.setHttpOnly(Constant.Cookie.COOKIE_HTTP_ONLY);
        cookie.setPath(Constant.Cookie.COOKIE_PATH);
        cookie.setMaxAge(Constant.Cookie.COOKIE_MAX_AGE);
        response.addCookie(cookie);

        UserResponse userResponse = userMapper.toUserResponse(user);
        userResponse.setAccessToken(accessToken);
        return userResponse;
    }


    public AccessTokenPost refreshAccessToken(AccessTokenPost accessTokenPost) {
        /*
         * RT get from cookie header
         * Extract user email from access token and load user details
         * Check if access token is valid => if not, throw exception
         * Generate new access token
         */
        String userEmail = jwtService.extractUsername(accessTokenPost.token());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        boolean isTokenValid = jwtService.isTokenValid(accessTokenPost.token(), userDetails);
        if (!isTokenValid) {
            log.error("Failed to refresh access token: {} is invalid", accessTokenPost.token());
            throw new InvalidTokenException(Constant.ErrorCode.ERR_TOKEN_INVALID);
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.ErrorCode.ERR_USER_NOT_FOUND));
        return new AccessTokenPost(jwtService.generateToken(user));
    }
}
