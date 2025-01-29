package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.category.CategoryPost;
import com.truongbuii.food_delivery.model.request.category.CategoryPut;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.model.response.CategoryResponse;
import com.truongbuii.food_delivery.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAll() {
        var list = categoryService.getAll();
        return ResponseEntity.ok(ApiResponse.<List<CategoryResponse>>builder().data(list).build());
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<CategoryResponse>> post(
            @Valid
            @ModelAttribute CategoryPost categoryPost
    ) {
        var categoryResponse = categoryService.create(categoryPost);
        return ResponseEntity.ok(ApiResponse.<CategoryResponse>builder().data(categoryResponse).build());
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<CategoryResponse>> put(
            @Valid
            @ModelAttribute CategoryPut categoryPut
    ) {
        var categoryResponse = categoryService.update(categoryPut);
        return ResponseEntity.ok(ApiResponse.<CategoryResponse>builder().data(categoryResponse).build());
    }
}
