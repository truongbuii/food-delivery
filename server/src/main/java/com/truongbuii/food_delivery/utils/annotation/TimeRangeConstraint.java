package com.truongbuii.food_delivery.utils.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy = TimeRangeValidator.class)
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface TimeRangeConstraint {
    String message() default "Closing hour must be after opening hour";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
