package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.CartItem;
import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.response.CartItemResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(source = "cartItem.id", target = "id")
    @Mapping(source = "food.id", target = "foodId")
    @Mapping(source = "food.name", target = "foodName")
    @Mapping(source = "food.imageUrl", target = "foodImageUrl")
    @Mapping(source = "food.price", target = "foodPrice")
    CartItemResponse toCartItemResponse(CartItem cartItem, Food food);
}
