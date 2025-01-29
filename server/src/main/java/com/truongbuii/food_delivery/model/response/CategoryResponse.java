package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse {
    private Integer id;
    private String name;
    private String imageUrl;
    private String slug;
}
