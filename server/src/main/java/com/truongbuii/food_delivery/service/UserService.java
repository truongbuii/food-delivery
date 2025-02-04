package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.UserMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.user.UserProfilePut;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.UserRepository;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MediaService mediaService;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
    }

    public UserResponse getById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_USER_NOT_FOUND));
    }

    @Transactional
    public UserResponse put(UserProfilePut userProfilePut) {
        User user = getByEmail(userProfilePut.email());

        if (StringUtils.isNotBlank(userProfilePut.fullName()) && !userProfilePut.fullName().equals(user.getFullName())) {
            user.setFullName(userProfilePut.fullName());
        }
        if (userProfilePut.dob() != null && !userProfilePut.dob().equals(user.getDob())) {
            user.setDob(userProfilePut.dob());
        }
        if (userProfilePut.avatar() != null && !userProfilePut.avatar().isEmpty()) {
            // Remove old avatar if exists
            if (user.getAvatarUrl() != null) {
                mediaService.deleteImage(
                        user.getAvatarUrl(),
                        MediaFolder.USER.getFolderName()
                );
            }
            String avatarUrl = mediaService.uploadImage(
                    userProfilePut.avatar(),
                    MediaFolder.USER.getFolderName()
            );
            user.setAvatarUrl(avatarUrl);
        }
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

}
