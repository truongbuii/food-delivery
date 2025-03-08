package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Restaurant;
import com.truongbuii.food_delivery.model.entity.RestaurantReview;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantReviewPost;
import com.truongbuii.food_delivery.model.response.RestaurantResponse;
import com.truongbuii.food_delivery.model.response.RestaurantReviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Mapper(componentModel = "spring")
public interface RestaurantMapper {

    RestaurantResponse toRestaurantResponse(Restaurant restaurant);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.fullName", target = "userName")
    @Mapping(source = "user.avatarUrl", target = "userImage")
    RestaurantReview toRestaurantReview(RestaurantReviewPost restaurantReviewPost, User user);

    @Mapping(source = "restaurantReview.updatedAt", target = "updatedAt", qualifiedByName = "formatDate")
    RestaurantReviewResponse toRestaurantReviewResponse(RestaurantReview restaurantReview);

    @Named("formatDate")
    default String formatDate(LocalDateTime date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM, yyyy", Locale.ENGLISH);
        return date.format(formatter);
    }
}
