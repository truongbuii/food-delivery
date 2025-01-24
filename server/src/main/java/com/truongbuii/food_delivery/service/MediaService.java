package com.truongbuii.food_delivery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.media.MediaPost;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {
    private final Cloudinary cloudinary;

    public String uploadImage(MediaPost mediaPost) {
        // check folder name
        Arrays.stream(MediaFolder.values())
                .filter(folder -> folder.getFolderName().equals(mediaPost.folderName()))
                .findAny()
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_MEDIA_FOLDER_NOT_FOUND));
        try {
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder", mediaPost.folderName());
            Map<?, ?> uploaded = cloudinary.uploader().upload(mediaPost.file().getBytes(), options);
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
