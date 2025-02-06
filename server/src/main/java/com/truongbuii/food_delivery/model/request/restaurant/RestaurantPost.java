package com.truongbuii.food_delivery.model.request.restaurant;

import com.truongbuii.food_delivery.utils.annotation.NotEmptyFile;
import com.truongbuii.food_delivery.utils.annotation.ValidFileSize;
import com.truongbuii.food_delivery.utils.annotation.ValidFileType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class RestaurantPost extends ActivityHour {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
    @NotBlank(message = "Address is required")
    private String address;
    @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp", "image/jpg"},
            message = "File type not allowed. Allowed types are: JPEG, JPG, PNG, WEBP")
    @ValidFileSize(message = "File size must be less than 10MB")
    @NotEmptyFile(message = "Avatar is required")
    private MultipartFile avatar;
    @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp", "image/jpg"},
            message = "File type not allowed. Allowed types are: JPEG, JPG, PNG, WEBP")
    @ValidFileSize(message = "File size must be less than 10MB")
    @NotEmptyFile(message = "Cover is required")
    private MultipartFile cover;
    @NotNull(message = "Free delivery status is required")
    Boolean freeDelivery;
    @NotNull(message = "Categories is required")
    private List<Integer> categoryIds;
}
