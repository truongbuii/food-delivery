package com.truongbuii.food_delivery.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliverAddressResponse {
    private Long id;
    private String name;
    private String phoneNumber;
    private String deliveryAddress;
}
