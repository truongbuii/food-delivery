package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.auth.AuthSignUp;
import com.truongbuii.food_delivery.model.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(AuthSignUp authSignUp);

    UserResponse toUserResponse(User user);
}
