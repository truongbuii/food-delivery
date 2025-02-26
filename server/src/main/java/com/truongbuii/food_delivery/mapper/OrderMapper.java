package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.entity.OrderItem;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.response.OrderItemResponse;
import com.truongbuii.food_delivery.model.response.OrderResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(OrderPost orderPost);

    OrderResponse toOrderResponse(Order order);

    OrderItemResponse toOrderItemResponse(OrderItem orderItem);
}
