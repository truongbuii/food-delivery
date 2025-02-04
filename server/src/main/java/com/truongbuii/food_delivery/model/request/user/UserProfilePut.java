package com.truongbuii.food_delivery.model.request.user;

import com.truongbuii.food_delivery.utils.annotation.ValidFileSize;
import com.truongbuii.food_delivery.utils.annotation.ValidFileType;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record UserProfilePut(
        @Email(message = "Invalid email address")
        @NotBlank(message = "Email is required")
        String email,
        @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
        String fullName,
        @Pattern(
                regexp = "^\\+?[1-9]\\d{0,3}[-.\\s]?\\(?\\d{1,5}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
                message = "Invalid phone number format"
        )
        String phoneNumber,
        @Past(message = "Date of birth must be in the past")
        LocalDate dob,
        @ValidFileType(allowedTypes = {"image/jpeg", "image/png", "image/webp"},
                message = "File type not allowed. Allowed types are: JPEG, PNG, WEBP")
        @ValidFileSize(message = "File size must be less than 10MB")
        MultipartFile avatar
) {
}
