package com.truongbuii.food_delivery.model.request.restaurant;

import com.truongbuii.food_delivery.utils.annotation.TimeRangeConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@TimeRangeConstraint
public class ActivityHour {
    @NotNull(message = "Opening hour is required")
    private LocalTime openingHour;
    @NotNull(message = "Closing hour is required")
    private LocalTime closingHour;
}
