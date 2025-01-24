package com.truongbuii.food_delivery.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MediaFolder {
    USER("users"),
    RESTAURANT("restaurants"),
    FOOD("foods"),
    CATEGORY("categories");

    private final String folderName;
}
