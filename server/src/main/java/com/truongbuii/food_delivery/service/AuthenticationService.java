package com.truongbuii.food_delivery.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.truongbuii.food_delivery.exception.*;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.auth.*;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import com.truongbuii.food_delivery.security.JwtService;
import com.truongbuii.food_delivery.utils.CookieUtils;
import com.truongbuii.food_delivery.utils.GeneratorUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
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

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.provider.google.authorization-uri}")
    private String googleAuthUri;

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String googleUserInfoUri;


    @Transactional
    public UserResponse signUp(AuthSignUp authSignUp, HttpServletResponse response) {
        Optional<User> userOptional = userRepository.findByEmail(authSignUp.email());
        if (userOptional.isPresent()) {
            throw new DuplicateResourceException(ErrorCode.ERR_USER_DUPLICATE);
        }
        User user = userMapper.toUser(authSignUp);
        user.setPassword(passwordEncoder.encode(authSignUp.password()));
        user.setEmailVerified(Boolean.FALSE);
        user.setUserActive(Boolean.TRUE);
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

    /*
     * Get refresh token from client's cookie and check if it is valid
     * If valid, generate new access token and return to client
     */
    public TokenPost refreshAccessToken(TokenPost tokenPost) {
        String userEmail = jwtService.extractUsername(tokenPost.token());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        boolean isTokenValid = jwtService.isTokenValid(tokenPost.token(), userDetails);
        if (!isTokenValid) {
            log.error("Failed to refresh access token: {} is invalid", tokenPost.token());
            throw new InvalidTokenException(ErrorCode.ERR_TOKEN_INVALID);
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
        return new TokenPost(jwtService.generateToken(user));
    }

    /*
     *  When sign out:
     *  1. Add token to Redis BlackList with TTL is the time remaining until token expiration
     *  2. Delete refresh token from client's cookie
     *  => Token in BlackList can't be used anymore.
     */
    public void signOut(TokenPost tokenPost, HttpServletResponse response) {
        String userEmail = jwtService.extractUsername(tokenPost.token());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        boolean isTokenValid = jwtService.isTokenValid(tokenPost.token(), userDetails);
        if (!isTokenValid) {
            log.error("Failed to sign out: {} is invalid", tokenPost.token());
            throw new InvalidTokenException(ErrorCode.ERR_TOKEN_INVALID);
        }

        long tokenExpiration = jwtService.extractExpiration(tokenPost.token()).getTime() - System.currentTimeMillis();
        redisTemplate.opsForValue().set(
                tokenPost.token(),
                Constant.Redis.REDIS_BLACKLIST_TAG,
                tokenExpiration, TimeUnit.MILLISECONDS);
        response.addCookie(CookieUtils.deleteCookie(Constant.Cookie.COOKIE_REFRESH_TOKEN_NAME));
    }

    private void checkUserExist(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
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
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
        // Compare OTP request with otp in Redis
        String redisOtpKey = Constant.Redis.REDIS_OTP_PREFIX + changePasswordPatch.email();
        String redisOtp = (String) redisTemplate.opsForValue().get(redisOtpKey);
        if (redisOtp != null && !redisOtp.trim().equals(changePasswordPatch.otp().trim())) {
            throw new InvalidOtpException(ErrorCode.ERR_USER_INVALID_OTP);
        }
        user.setPassword(passwordEncoder.encode(changePasswordPatch.password()));
        userRepository.save(user);
        // Remove OTP from Redis
        redisTemplate.delete(redisOtpKey);
    }

    public UserResponse verificationEmail(UserEmailPatch userEmailPatch) {
        // Compare OTP request with otp in Redis
        String redisOtpKey = Constant.Redis.REDIS_OTP_PREFIX + userEmailPatch.email();
        String redisOtp = (String) redisTemplate.opsForValue().get(redisOtpKey);
        if (redisOtp == null || !redisOtp.trim().equals(userEmailPatch.otp().trim())) {
            throw new InvalidOtpException(ErrorCode.ERR_USER_INVALID_OTP);
        }
        User user = userRepository.findByEmail(userEmailPatch.email())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
        user.setEmailVerified(true);
        userRepository.save(user);
        // Remove OTP from Redis
        redisTemplate.delete(redisOtpKey);
        return userMapper.toUserResponse(user);
    }

    public UserResponse setPhoneNumber(UserPhonePatch userPhonePatch) {
        User user = userRepository.findByEmail(userPhonePatch.email())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
        user.setPhoneNumber(userPhonePatch.phoneNumber());
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    /*
     * This method constructs the URL for social login based on the provider type (e.g., Google, Facebook).
     * It generates the URL to redirect the user to the provider's login page for authentication.
     */
    public String generateSocialLoginUrl(String providerType) {
        String clientId;
        String redirectUri; // Redirect URI after user authenticated
        String authUri; // URL API from provider to authenticate user

        switch (providerType.toUpperCase()) {
            case "GOOGLE":
                clientId = googleClientId;
                redirectUri = googleRedirectUri;
                authUri = googleAuthUri;
                break;
            case "FACEBOOK":
                throw new AppException(ErrorCode.ERR_PROVIDER_NOT_SUPPORTED);
            default:
                throw new AppException(ErrorCode.ERR_INTERNAL_SERVER_ERROR);
        }
        redirectUri = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
        String state = GeneratorUtils.generateStateToken(); // Generate a state parameter for security
        String scope = URLEncoder.encode("openid profile email", StandardCharsets.UTF_8);
        return String.format("%s?client_id=%s&redirect_uri=%s&state=%s&scope=%s&response_type=code",
                authUri, clientId, redirectUri, state, scope);
    }

    /*
     * This method handles the authentication for social login by exchanging the authorization code
     * for an access token from the provider (e.g., Google).
     * It retrieves the user's information from the provider's API and either finds an existing user or creates a new
     * user based on the email.
     * Finally, return user with tokens to client.
     */
    public UserResponse authenticateSocialLogin(String code, String providerType, HttpServletResponse response) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        String oauthAccessToken;

        switch (providerType.toUpperCase()) {
            case "GOOGLE":
                oauthAccessToken = new GoogleAuthorizationCodeTokenRequest(
                        new NetHttpTransport(), new GsonFactory(),
                        googleClientId,
                        googleClientSecret,
                        code,
                        googleRedirectUri
                ).execute().getAccessToken();

                restTemplate.getInterceptors().add((request, body, execution) -> {
                    request.getHeaders().setBearerAuth(oauthAccessToken);
                    return execution.execute(request, body);
                });

                Map<String, Object> userInfo = new ObjectMapper()
                        .readValue(
                                restTemplate.getForEntity(googleUserInfoUri, String.class).getBody(),
                                new TypeReference<>() {
                                }
                        );
                String email = (String) userInfo.get("email");
                Optional<User> existingUser = userRepository.findByEmail(email);
                if (existingUser.isPresent()) {
                    return generateUserResponse(existingUser.get(), response);
                }

                User newUser = new User();
                newUser.setEmail(email);
                newUser.setPassword("");
                newUser.setUserActive(true);
                newUser.setEmailVerified(true);
                newUser.setGoogleId(userInfo.get("sub").toString());
                newUser.setFullName(userInfo.get("name").toString());
                newUser.setAvatarUrl(userInfo.get("picture").toString());

                userRepository.save(newUser);
                return generateUserResponse(newUser, response);
            case "FACEBOOK":
                throw new ResourceNotFoundException(ErrorCode.ERR_PROVIDER_NOT_SUPPORTED);
            default:
                throw new AppException(ErrorCode.ERR_INTERNAL_SERVER_ERROR);
        }
    }

    private void handleSendNotificationProcess(String email, String topic, String subject) {
        // Generate OTP and save to Redis with expiration time
        String OTP = GeneratorUtils.generateOtp();
        String redisOtpKey = Constant.Redis.REDIS_OTP_PREFIX + email;
        redisTemplate.opsForValue().set(redisOtpKey, OTP, 15, TimeUnit.MINUTES);

        NotificationEmail notificationEmail = new NotificationEmail(email, subject, OTP);
        kafkaTemplate.send(topic, notificationEmail);
    }
}
