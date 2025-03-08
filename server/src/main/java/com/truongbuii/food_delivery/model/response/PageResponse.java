package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageResponse<T> {
    private T values;
    private boolean hasNext;
}
