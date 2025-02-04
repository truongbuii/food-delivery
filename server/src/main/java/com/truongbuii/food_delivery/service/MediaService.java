package com.truongbuii.food_delivery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.truongbuii.food_delivery.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {
    private final Cloudinary cloudinary;

    /*
     * CompletableFuture is used to perform asynchronous tasks in Java.
     * Increase upload image performance by uploading multiple images at the same time.
     * If the image upload fails, the method will retry up to 3 times before giving up.
     */
    @Async
    public String uploadImage(MultipartFile image, String folderName) {
        int maxRetries = 3;
        int attempt = 0;

        while (attempt <= maxRetries) {
            try {
                log.info("Upload {} ", image.getContentType());
                HashMap<Object, Object> options = new HashMap<>();
                options.put("folder", folderName);
                Map<?, ?> uploaded = cloudinary.uploader().upload(image.getBytes(), options);
                String publicId = (String) uploaded.get("public_id");
                return cloudinary
                        .url()
                        .transformation(new Transformation().fetchFormat("auto").quality("auto"))
                        .secure(true)
                        .generate(publicId);
            } catch (Exception e) {
                log.error("Error uploading image: {}", e.getMessage());
                attempt++;
                if (attempt >= maxRetries) {
                    log.error("Max retries reached for image: {}", image.getOriginalFilename());
                    throw new AppException("Failed to upload image after " + maxRetries + " attempts.");
                }
                try {
                    Thread.sleep(500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new AppException("Thread was interrupted during upload retry");
                }
            }
        }
        throw new AppException("Error uploading image");
    }

    public void deleteImage(String url, String folderName) {
        try {
            String publicId = url.substring(url.lastIndexOf("/") + 1);
            cloudinary.uploader().destroy(folderName + "/" + publicId, new HashMap<>());
        } catch (Exception e) {
            throw new AppException(e.getMessage());
        }
    }
}
