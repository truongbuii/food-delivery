package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.food.FoodPost;
import com.truongbuii.food_delivery.model.request.food.FoodPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getAll() {
        var foodResponses = foodService.getAll();
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(foodResponses).build());
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<FoodResponse>> create(
            @Valid
            @ModelAttribute FoodPost foodPost
    ) {
        var foodResponse = foodService.create(foodPost);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder().data(foodResponse).build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<FoodResponse>> update(
            @Valid
            @ModelAttribute FoodPut foodPut
    ) {
        var foodResponse = foodService.update(foodPut);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder().data(foodResponse).build());
    }
}
