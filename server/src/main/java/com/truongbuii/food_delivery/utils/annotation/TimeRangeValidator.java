package com.truongbuii.food_delivery.utils.annotation;

import com.truongbuii.food_delivery.model.request.restaurant.ActivityHour;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TimeRangeValidator implements ConstraintValidator<TimeRangeConstraint, ActivityHour> {
    private String message;

    @Override
    public void initialize(TimeRangeConstraint constraintAnnotation) {
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(ActivityHour activityHour, ConstraintValidatorContext constraintValidatorContext) {
        if (activityHour.getOpeningHour() == null || activityHour.getClosingHour() == null) {
            return false;
        }
        constraintValidatorContext.disableDefaultConstraintViolation();
        constraintValidatorContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        return activityHour.getOpeningHour().isBefore(activityHour.getClosingHour());
    }
}
