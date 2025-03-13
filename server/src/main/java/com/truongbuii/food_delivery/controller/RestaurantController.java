package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.restaurant.*;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.PageResponse;
import com.truongbuii.food_delivery.model.response.RestaurantResponse;
import com.truongbuii.food_delivery.model.response.RestaurantReviewResponse;
import com.truongbuii.food_delivery.service.RestaurantReviewService;
import com.truongbuii.food_delivery.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final RestaurantReviewService restaurantReviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<List<RestaurantResponse>>>> getAll(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Float rating,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "false") Boolean freeDelivery,
            @RequestParam(required = false, defaultValue = "false") Boolean popular,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User principal
    ) {
        var restaurant = restaurantService.getAllByParams(
                rating, keyword, popular, categoryId, freeDelivery, page, size, principal.getId());
        return ResponseEntity.ok(ApiResponse.<PageResponse<List<RestaurantResponse>>>builder().data(restaurant).build());
    }

    @GetMapping("/all/featured")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getAllFeatured(
            @AuthenticationPrincipal User principal
    ) {
        var restaurant = restaurantService.getAllFeaturedRestaurants(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<RestaurantResponse>>builder().data(restaurant).build());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<RestaurantResponse>> getBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal User principal
    ) {
        var restaurant = restaurantService.getRestaurantBySlug(principal.getId(), slug);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PostMapping("/internal")
    public ResponseEntity<ApiResponse<RestaurantResponse>> post(
            @Valid
            @ModelAttribute RestaurantPost restaurantPost
    ) {
        var restaurant = restaurantService.create(restaurantPost);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PutMapping("/internal")
    public ResponseEntity<ApiResponse<RestaurantResponse>> put(
            @Valid
            @ModelAttribute RestaurantPut restaurantPut
    ) {
        var restaurant = restaurantService.update(restaurantPut);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PatchMapping("/internal/badge")
    public ResponseEntity<ApiResponse<RestaurantResponse>> patch(
            @Valid
            @RequestBody RestaurantPatch restaurantPatch
    ) {
        var restaurant = restaurantService.updateBadge(restaurantPatch);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PatchMapping("/internal/disable")
    public ResponseEntity<ApiResponse<RestaurantResponse>> disable(
            @Valid
            @RequestBody RestaurantPatch restaurantPatch
    ) {
        var restaurant = restaurantService.disable(restaurantPatch);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PutMapping("/favorite")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> favorite(
            @AuthenticationPrincipal User principal,
            @RequestParam Long restaurantId
    ) {
        var restaurant = restaurantService.ToggleFavorite(principal.getId(), restaurantId);
        return ResponseEntity.ok(ApiResponse.<List<RestaurantResponse>>builder().data(restaurant).build());
    }

    @GetMapping("/my-favorite")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> myFavorite(
            @AuthenticationPrincipal User principal
    ) {
        var restaurant = restaurantService.getFavoriteRestaurants(principal.getId());
        return ResponseEntity.ok(ApiResponse.<List<RestaurantResponse>>builder().data(restaurant).build());
    }

    @GetMapping("/featured-restaurants")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getFeaturedRestaurants() {
        var restaurant = restaurantService.getFeaturedRestaurants();
        return ResponseEntity.ok(ApiResponse.<List<RestaurantResponse>>builder().data(restaurant).build());
    }

    @PostMapping("/review")
    public ResponseEntity<ApiResponse<RestaurantReviewResponse>> rating(
            @AuthenticationPrincipal User principal,
            @RequestBody RestaurantReviewPost restaurantReviewPost
    ) {
        var restaurant = restaurantReviewService.createReview(principal.getId(), restaurantReviewPost);
        return ResponseEntity.ok(ApiResponse.<RestaurantReviewResponse>builder().data(restaurant).build());
    }

    @PutMapping("/edit-review")
    public ResponseEntity<ApiResponse<RestaurantReviewResponse>> editReview(
            @AuthenticationPrincipal User principal,
            @RequestBody RestaurantReviewPut restaurantReviewPut
    ) {
        var restaurant = restaurantReviewService.editReview(principal.getId(), restaurantReviewPut);
        return ResponseEntity.ok(ApiResponse.<RestaurantReviewResponse>builder().data(restaurant).build());
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<List<RestaurantReviewResponse>>> getReviews(
            @RequestParam String restaurantSlug
    ) {
        var restaurant = restaurantReviewService.getReviews(restaurantSlug);
        return ResponseEntity.ok(ApiResponse.<List<RestaurantReviewResponse>>builder().data(restaurant).build());
    }

    @DeleteMapping("/delete-review")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @AuthenticationPrincipal User principal,
            @RequestParam Long reviewId
    ) {
        restaurantReviewService.deleteReview(principal.getId(), reviewId);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }
}
