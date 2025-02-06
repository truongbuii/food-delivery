package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FoodMapper {

    @Mapping(target = "restaurantId", source = "restaurant.id")
    FoodResponse toFoodResponse(Food food);
}
