package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.Addon;
import com.truongbuii.food_delivery.model.request.addon.AddonPost;
import com.truongbuii.food_delivery.model.request.addon.AddonPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.service.AddonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/addon")
public class AddonController {
    private final AddonService addonService;

    @PostMapping
    public ResponseEntity<ApiResponse<Addon>> post(
            @Valid
            @ModelAttribute AddonPost addonPost
    ) {
        var addon = addonService.create(addonPost);
        return ResponseEntity.ok(ApiResponse.<Addon>builder().data(addon).build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Addon>> put(
            @Valid
            @ModelAttribute AddonPut addonPut
    ) {
        var addon = addonService.update(addonPut);
        return ResponseEntity.ok(ApiResponse.<Addon>builder().data(addon).build());
    }
}
