package com.truongbuii.food_delivery.model.request.media;

import com.truongbuii.food_delivery.utils.ValidFileSize;
import com.truongbuii.food_delivery.utils.ValidFileType;
import org.springframework.web.multipart.MultipartFile;

public record MediaPost(
        @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp"},
                message = "File type not allowed. Allowed types are: JPEG, PNG, WEBP")
        @ValidFileSize(message = "File size must be less than 10MB")
        MultipartFile file,
        String folderName
) {
}
