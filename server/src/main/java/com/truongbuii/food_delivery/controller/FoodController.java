package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.food.FoodPost;
import com.truongbuii.food_delivery.model.request.food.FoodPut;
import com.truongbuii.food_delivery.model.request.food.FoodReviewPost;
import com.truongbuii.food_delivery.model.request.food.FoodReviewPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.model.response.FoodReviewResponse;
import com.truongbuii.food_delivery.model.response.PageResponse;
import com.truongbuii.food_delivery.service.FoodReviewService;
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
    private final FoodReviewService foodReviewService;

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
            @PathVariable String restaurantSlug,
            @AuthenticationPrincipal User principal
    ) {
        var foodResponses = foodService.getFeaturedFoodByRestaurantSlug(principal.getId(), restaurantSlug);
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(foodResponses).build());
    }

    @GetMapping("/all/featured")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getAllFeatured() {
        var foodResponses = foodService.getFeaturedFood();
        return ResponseEntity.ok(ApiResponse.<List<FoodResponse>>builder().data(foodResponses).build());
    }

    @GetMapping("/by-params")
    public ResponseEntity<ApiResponse<PageResponse<List<FoodResponse>>>> getFoodsByParams(
            @AuthenticationPrincipal User principal,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String restaurantSlug,
            @RequestParam(required = false) Float rating,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "false") Boolean popular,
            @RequestParam(required = false, defaultValue = "false") Boolean sortAsc,
            @RequestParam(required = false, defaultValue = "0") BigDecimal minPrice,
            @RequestParam(required = false, defaultValue = "200") BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        var foodResponses = foodService.getAllByParams(
                principal.getId(), restaurantSlug, categoryId, rating, keyword, popular, sortAsc, minPrice, maxPrice, page, size);
        return ResponseEntity.ok(ApiResponse.<PageResponse<List<FoodResponse>>>builder().data(foodResponses).build());
    }

    @PostMapping("/internal")
    public ResponseEntity<ApiResponse<FoodResponse>> create(
            @Valid
            @ModelAttribute FoodPost foodPost
    ) {
        var foodResponse = foodService.create(foodPost);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder().data(foodResponse).build());
    }

    @PutMapping("/internal")
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

    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<List<FoodReviewResponse>>> getReviews(
            @RequestParam String foodSlug
    ) {
        var list = foodReviewService.getReviews(foodSlug);
        return ResponseEntity.ok(ApiResponse.<List<FoodReviewResponse>>builder().data(list).build());
    }

    @PostMapping("/review")
    public ResponseEntity<ApiResponse<FoodReviewResponse>> createReview(
            @AuthenticationPrincipal User principal,
            @RequestBody FoodReviewPost foodReviewPost
    ) {
        var review = foodReviewService.createReview(principal.getId(), foodReviewPost);
        return ResponseEntity.ok(ApiResponse.<FoodReviewResponse>builder().data(review).build());
    }

    @PutMapping("/edit-review")
    public ResponseEntity<ApiResponse<FoodReviewResponse>> editReview(
            @AuthenticationPrincipal User principal,
            @RequestBody FoodReviewPut foodReviewPut
    ) {
        var review = foodReviewService.editReview(principal.getId(), foodReviewPut);
        return ResponseEntity.ok(ApiResponse.<FoodReviewResponse>builder().data(review).build());
    }

    @DeleteMapping("/delete-review")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @AuthenticationPrincipal User principal,
            @RequestParam Long reviewId
    ) {
        foodReviewService.deleteReview(principal.getId(), reviewId);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
}
