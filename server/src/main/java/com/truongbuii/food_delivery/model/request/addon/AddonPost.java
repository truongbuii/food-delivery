package com.truongbuii.food_delivery.model.request.addon;

import com.truongbuii.food_delivery.utils.annotation.NotEmptyFile;
import com.truongbuii.food_delivery.utils.annotation.ValidFileSize;
import com.truongbuii.food_delivery.utils.annotation.ValidFileType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record AddonPost(
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 50, message = "Name must be between 2 and 50 characters")
        String name,
        @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp", "image/jpg"},
                message = "File type not allowed. Allowed types are: JPEG, JPG, PNG, WEBP")
        @ValidFileSize(message = "File size must be less than 10MB")
        @NotEmptyFile(message = "Avatar is required")
        MultipartFile image,
        @NotNull(message = "Price is required")
        BigDecimal price
) {
}
