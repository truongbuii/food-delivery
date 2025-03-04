package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.food.FoodPost;
import com.truongbuii.food_delivery.model.request.food.FoodPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getAll(
            @AuthenticationPrincipal User principal
    ) {
        var foodResponses = foodService.getAll(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(foodResponses).build());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<FoodResponse>> getFoodBySlug(
            @AuthenticationPrincipal User principal,
            @PathVariable String slug
    ) {
        var foodResponse = foodService.getFoodBySlug(principal.getId(), slug);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder().data(foodResponse).build());
    }

    @GetMapping("/featured/{restaurantSlug}")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getFeaturedFoodByRestaurantId(
            @PathVariable String restaurantSlug
    ) {
        var foodResponses = foodService.getFeaturedFoodByRestaurantSlug(restaurantSlug);
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(foodResponses).build());
    }

    @GetMapping("/by-params")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getFoodsByParams(
            @AuthenticationPrincipal User principal,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String restaurantSlug,
            @RequestParam(required = false) Float rating,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "false") Boolean popular,
            @RequestParam(required = false, defaultValue = "false") Boolean sortAsc,
            @RequestParam(required = false, defaultValue = "0") BigDecimal minPrice,
            @RequestParam(required = false, defaultValue = "200") BigDecimal maxPrice
    ) {
        var foodResponses = foodService.getAllByParams(
                principal.getId(), restaurantSlug, categoryId, rating, keyword, popular, sortAsc, minPrice, maxPrice);
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

    @PutMapping("/favorite")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> favoriteFood(
            @AuthenticationPrincipal User principal,
            @RequestParam Long foodId
    ) {
        var list = foodService.ToggleFoodToFavorite(principal.getId(), foodId);
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(list).build());
    }

    @GetMapping("/my-favorite")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getMyFavorite(
            @AuthenticationPrincipal User principal
    ) {
        var list = foodService.getFavoriteFoods(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(list).build());
    }
}
