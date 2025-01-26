package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.DeliverAddress;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.address.DeliverAddressPost;
import com.truongbuii.food_delivery.model.response.DeliverAddressResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.context.annotation.Primary;

@Primary
@Mapper(componentModel = "spring")
public interface DeliveryAddressMapper {
    @Mapping(target = "userId", source = "userId", qualifiedByName = "mapUserId")
    DeliverAddress toDeliverAddress(DeliverAddressPost deliverAddressPost);
    
    @Mapping(target = "deliveryAddress", expression = "java(deliverAddress.getStreet() + \" \" + deliverAddress.getCity() + \" \" + deliverAddress.getState())")
    DeliverAddressResponse toDeliverAddressResponse(DeliverAddress deliverAddress);

    @Named("mapUserId")
    default User mapUserId(Long userId) {
        User user = new User();
        user.setId(userId);
        return user;
    }
}
