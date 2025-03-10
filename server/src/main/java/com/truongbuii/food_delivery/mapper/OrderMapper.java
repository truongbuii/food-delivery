package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.entity.OrderItem;
import com.truongbuii.food_delivery.model.entity.Restaurant;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.response.OrderItemResponse;
import com.truongbuii.food_delivery.model.response.OrderResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(OrderPost orderPost);

    @Mapping(source = "order.id", target = "id")
    @Mapping(source = "restaurant.id", target = "restaurantId")
    @Mapping(source = "restaurant.name", target = "restaurantName")
    @Mapping(source = "restaurant.avatarUrl", target = "restaurantImage")
    @Mapping(source = "order.updatedAt", target = "updatedAt", qualifiedByName = "formatDate")
    OrderResponse toOrderResponse(Order order, Restaurant restaurant);

    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    @Named("formatDate")
    default String formatDate(LocalDateTime date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM, HH.mm", Locale.ENGLISH);
        return date.format(formatter);
    }
}
