package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment/vnpay")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

}
