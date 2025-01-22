package com.truongbuii.food_delivery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.truongbuii.food_delivery.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {
    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile image, String folderName) {
        try {
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
            throw new AppException(e.getMessage());
        }
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
