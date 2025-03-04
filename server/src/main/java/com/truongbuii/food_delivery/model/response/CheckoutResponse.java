package com.truongbuii.food_delivery.model.response;

import com.truongbuii.food_delivery.model.enums.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutResponse {
    private PaymentMethod paymentMethod;
    private String value;
}
