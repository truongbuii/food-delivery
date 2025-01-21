package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserResponse get(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
    }
}
