package com.truongbuii.food_delivery.controller;

import com.truongbuii.food_delivery.model.request.media.MediaPost;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import com.truongbuii.food_delivery.service.MediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {
    private final MediaService mediaService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> post(
            @Valid
            @ModelAttribute MediaPost mediaPost
    ) {
        String url = mediaService.uploadImage(mediaPost);
        return ResponseEntity.ok(ApiResponse.<String>builder().data(url).build());
    }
}
