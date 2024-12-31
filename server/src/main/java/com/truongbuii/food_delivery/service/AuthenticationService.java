package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.InvalidOtpException;
import com.truongbuii.food_delivery.exception.InvalidTokenException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.*;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import com.truongbuii.food_delivery.security.JwtService;
import com.truongbuii.food_delivery.utils.CookieUtils;
import com.truongbuii.food_delivery.utils.OtpGenerator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
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
import java.util.concurrent.TimeUnit;

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
    private final RedisTemplate<String, Object> redisTemplate;


    @Transactional
    public UserResponse signUp(AuthSignUp authSignUp, HttpServletResponse response) {
        Optional<User> userOptional = userRepository.findByEmail(authSignUp.email());
        if (userOptional.isPresent()) {
            throw new DuplicateResourceException(Constant.ErrorCode.ERR_USER_DUPLICATE);
        }
        User user = userMapper.toUser(authSignUp);
        user.setPassword(passwordEncoder.encode(authSignUp.password()));
        userRepository.save(user);

        handleSendNotificationProcess(
                authSignUp.email(),
                Constant.Kafka.KAFKA_TOPIC_OTP,
                Constant.Notification.NOTIFICATION_OTP_SUBJECT
        );
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

        Cookie cookie = CookieUtils.createCookie(refreshToken);
        response.addCookie(cookie);

        UserResponse userResponse = userMapper.toUserResponse(user);
        userResponse.setAccessToken(accessToken);
        return userResponse;
    }

    public TokenPost refreshAccessToken(TokenPost tokenPost) {
        /*
         * RT get from cookie header
         * Extract user email from access token and load user details
         * Check if access token is valid => if not, throw exception
         * Generate new access token
         */
        String userEmail = jwtService.extractUsername(tokenPost.token());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        boolean isTokenValid = jwtService.isTokenValid(tokenPost.token(), userDetails);
        if (!isTokenValid) {
            log.error("Failed to refresh access token: {} is invalid", tokenPost.token());
            throw new InvalidTokenException(Constant.ErrorCode.ERR_TOKEN_INVALID);
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.ErrorCode.ERR_USER_NOT_FOUND));
        return new TokenPost(jwtService.generateToken(user));
    }

    public void signOut(TokenPost tokenPost, HttpServletResponse response) {
        String userEmail = jwtService.extractUsername(tokenPost.token());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        boolean isTokenValid = jwtService.isTokenValid(tokenPost.token(), userDetails);
        if (!isTokenValid) {
            log.error("Failed to sign out: {} is invalid", tokenPost.token());
            throw new InvalidTokenException(Constant.ErrorCode.ERR_TOKEN_INVALID);
        }
        /* // BLACKLIST TOKEN //
         *
         *  Set token to blacklist with TTL is the time remaining until token expiration
         *  Token will be automatically removed from blacklist when it expires
         *  Remove token from cookie header
         */
        long tokenExpiration = jwtService.extractExpiration(tokenPost.token()).getTime() - System.currentTimeMillis();
        redisTemplate.opsForValue().set(
                tokenPost.token(),
                Constant.Redis.REDIS_BLACKLIST_TAG,
                tokenExpiration, TimeUnit.MILLISECONDS);
        response.addCookie(CookieUtils.deleteCookie(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME));
    }

    public void checkUserExist(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(Constant.ErrorCode.ERR_USER_NOT_FOUND));
    }

    public void sendOtp(EmailPost emailPost) {
        checkUserExist(emailPost.email());
        handleSendNotificationProcess(
                emailPost.email(),
                Constant.Kafka.KAFKA_TOPIC_OTP,
                Constant.Notification.NOTIFICATION_OTP_SUBJECT);
    }

    public void forgotPassword(EmailPost emailPost) {
        checkUserExist(emailPost.email());
        handleSendNotificationProcess(
                emailPost.email(),
                Constant.Kafka.KAFKA_TOPIC_FORGOT_PASSWORD,
                Constant.Notification.NOTIFICATION_FORGOT_PASSWORD_SUBJECT);
    }

    public void changePassword(ChangePasswordPatch changePasswordPatch) {
        User user = userRepository.findByEmail(changePasswordPatch.email())
                .orElseThrow(() -> new ResourceNotFoundException(Constant.ErrorCode.ERR_USER_NOT_FOUND));
        // Check OTP request with otp in Redis
        String redisOtpKey = Constant.Redis.REDIS_OTP_PREFIX + changePasswordPatch.email();
        String redisOtp = (String) redisTemplate.opsForValue().get(redisOtpKey);
        if (redisOtp != null && !redisOtp.trim().equals(changePasswordPatch.otp().trim())) {
            throw new InvalidOtpException(Constant.ErrorCode.ERR_USER_INVALID_OTP);
        }
        user.setPassword(passwordEncoder.encode(changePasswordPatch.password()));
        userRepository.save(user);
        // Remove OTP from Redis
        redisTemplate.delete(redisOtpKey);
    }

    private void handleSendNotificationProcess(String email, String topic, String subject) {
        // Generate OTP and save to Redis with expiration time
        String OTP = OtpGenerator.generateOtp();
        String redisOtpKey = Constant.Redis.REDIS_OTP_PREFIX + email;
        redisTemplate.opsForValue().set(redisOtpKey, OTP, 15, TimeUnit.MINUTES);

        OtpNotification otpNotification = new OtpNotification(email, subject, OTP);
        kafkaTemplate.send(topic, otpNotification);
    }
}
