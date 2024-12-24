package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ErrorCode;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.UserSignUpRequest;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import com.truongbuii.food_delivery.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public UserResponse signUp(UserSignUpRequest userSignUpRequest) {
        Optional<User> existingUser = userRepository.findByEmail(userSignUpRequest.email());
        if (existingUser.isPresent()) {
            log.error("Failed to sign up: User with email: {} existed", userSignUpRequest.email());
            throw new DuplicateResourceException(ErrorCode.ERR_USER_DUPLICATE);
        }

        User user = userMapper.toUser(userSignUpRequest);
        user.setPassword(passwordEncoder.encode(userSignUpRequest.password()));
        userRepository.save(user);
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        log.info(accessToken);
        log.info(refreshToken);
        return userMapper.toUserResponse(user);
    }
}
