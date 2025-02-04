package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Restaurant;
import com.truongbuii.food_delivery.model.response.RestaurantResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RestaurantMapper {

    RestaurantResponse toRestaurantResponse(Restaurant restaurant);
}
