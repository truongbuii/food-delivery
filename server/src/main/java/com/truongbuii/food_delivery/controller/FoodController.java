package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.food.FoodPost;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    @PostMapping
    public ResponseEntity<ApiResponse<FoodResponse>> create(
            @Valid
            @ModelAttribute FoodPost foodPost
    ) {
        var foodResponse = foodService.create(foodPost);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder().data(foodResponse).build());
    }
}
