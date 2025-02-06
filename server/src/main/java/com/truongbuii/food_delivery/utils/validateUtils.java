package com.truongbuii.food_delivery.utils;

import java.util.function.Consumer;

public class validateUtils {

    public static <T> void checkAndUpdateField(
            Consumer<T> setter,
            T newValue,
            T oldValue
    ) {
        if (newValue != null && !newValue.equals(oldValue)) {
            setter.accept(newValue);
        }
    }
}
