package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.UserSignUpRequest;
import com.truongbuii.food_delivery.model.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserSignUpRequest userSignUpRequest);

    UserResponse toUserResponse(User user);
}
