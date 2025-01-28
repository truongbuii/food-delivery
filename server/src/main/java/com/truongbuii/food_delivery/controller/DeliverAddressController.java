package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.address.DeliverAddressPost;
import com.truongbuii.food_delivery.model.request.address.DeliverAddressPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.DeliverAddressResponse;
import com.truongbuii.food_delivery.service.DeliverAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deliver-address")
@RequiredArgsConstructor
public class DeliverAddressController {
    private final DeliverAddressService deliverAddressService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<DeliverAddressResponse>>> getAll(
            @RequestBody Long userId
    ) {
        var deliverAddress = deliverAddressService.getAllByUserId(userId);
        return ResponseEntity.ok(ApiResponse.<List<DeliverAddressResponse>>builder().data(deliverAddress).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<DeliverAddressResponse>> get(
            @RequestBody Long addressId
    ) {
        var deliverAddress = deliverAddressService.getById(addressId);
        return ResponseEntity.ok(ApiResponse.<DeliverAddressResponse>builder().data(deliverAddress).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DeliverAddressResponse>> post(
            @Valid
            @RequestBody DeliverAddressPost deliverAddressPost
    ) {
        var deliverAddress = deliverAddressService.post(deliverAddressPost);
        return ResponseEntity.ok(ApiResponse.<DeliverAddressResponse>builder().data(deliverAddress).build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<DeliverAddressResponse>> put(
            @Valid
            @RequestBody DeliverAddressPut deliverAddressPut
    ) {
        var deliverAddress = deliverAddressService.put(deliverAddressPut);
        return ResponseEntity.ok(ApiResponse.<DeliverAddressResponse>builder().data(deliverAddress).build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> delete(
            @RequestBody Long deliverAddressId
    ) {
        deliverAddressService.delete(deliverAddressId);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
}
