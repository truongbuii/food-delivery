package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.entity.FoodReview;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.food.FoodReviewPost;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.model.response.FoodReviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Mapper(componentModel = "spring")
public interface FoodMapper {

    @Mapping(target = "restaurantId", source = "restaurant.id")
    FoodResponse toFoodResponse(Food food);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.fullName", target = "userName")
    @Mapping(source = "user.avatarUrl", target = "userImage")
    FoodReview toFoodReview(FoodReviewPost foodReviewPost, User user);

    @Mapping(source = "foodReview.updatedAt", target = "updatedAt", qualifiedByName = "formatDate")
    FoodReviewResponse toFoodReviewResponse(FoodReview foodReview);

    @Named("formatDate")
    default String formatDate(LocalDateTime date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM, yyyy", Locale.ENGLISH);
        return date.format(formatter);
    }
}
