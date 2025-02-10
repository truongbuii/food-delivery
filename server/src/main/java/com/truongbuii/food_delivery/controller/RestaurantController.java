package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPatch;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPost;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.RestaurantResponse;
import com.truongbuii.food_delivery.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getAll(
            @RequestParam(required = false) Integer categoryId
    ) {
        var restaurant = restaurantService.getAllByParams(categoryId);
        return ResponseEntity.ok(ApiResponse.<List<RestaurantResponse>>builder().data(restaurant).build());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<RestaurantResponse>> getBySlug(
            @PathVariable String slug
    ) {
        var restaurant = restaurantService.getRestaurantBySlug(slug);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RestaurantResponse>> post(
            @Valid
            @ModelAttribute RestaurantPost restaurantPost
    ) {
        var restaurant = restaurantService.create(restaurantPost);
        return ResponseEntity.ok(ApiResponse.<RestaurantResponse>builder().data(restaurant).build());
    }

    @PutMapping
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

}
