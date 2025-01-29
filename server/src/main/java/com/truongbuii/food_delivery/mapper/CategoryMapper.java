package com.truongbuii.food_delivery.mapper;

import com.truongbuii.food_delivery.model.entity.Category;
import com.truongbuii.food_delivery.model.response.CategoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponse toCategoryResponse(Category category);
}
