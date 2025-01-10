package com.truongbuii.food_delivery.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AppException extends RuntimeException {
    public AppException(String message) {
        super(message);
    }
}
