package com.truongbuii.food_delivery.model.request.category;

import com.truongbuii.food_delivery.utils.ValidFileSize;
import com.truongbuii.food_delivery.utils.ValidFileType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record CategoryPost(
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
        String name,
        @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp", "image/jpg"},
                message = "File type not allowed. Allowed types are: JPEG, JPG, PNG, WEBP")
        @ValidFileSize(message = "File size must be less than 10MB")
        MultipartFile image
) {
}
