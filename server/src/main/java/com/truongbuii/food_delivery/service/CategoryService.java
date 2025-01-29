package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.CategoryMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Category;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.category.CategoryPost;
import com.truongbuii.food_delivery.model.request.category.CategoryPut;
import com.truongbuii.food_delivery.model.response.CategoryResponse;
import com.truongbuii.food_delivery.repository.CategoryRepository;
import com.truongbuii.food_delivery.utils.GeneratorUtils;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final MediaService mediaService;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAll() {
        return categoryRepository
                .findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    @Transactional
    public CategoryResponse create(CategoryPost categoryPost) {
        validateDuplicateName(categoryPost.name(), null);
        String slug = GeneratorUtils.convertToSlug(categoryPost.name());
        Category category = new Category();
        category.setName(categoryPost.name());
        category.setSlug(slug);
        String imageUrl = mediaService.uploadImage(
                categoryPost.image(),
                MediaFolder.CATEGORY.getFolderName()
        );
        category.setImageUrl(imageUrl);
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    @Transactional
    public CategoryResponse update(CategoryPut categoryPut) {
        validateDuplicateName(categoryPut.name(), categoryPut.id());
        Category category = categoryRepository
                .findById(categoryPut.id())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_CATEGORY_NOT_FOUND));
        if (StringUtils.isNotBlank(categoryPut.name()) && !category.getName().equals(categoryPut.name())) {
            category.setName(categoryPut.name());
            String slug = GeneratorUtils.convertToSlug(categoryPut.name());
            category.setSlug(slug);
        }
        if (!categoryPut.image().isEmpty()) {
            if (category.getImageUrl() != null) {
                mediaService.deleteImage(
                        category.getImageUrl(),
                        MediaFolder.CATEGORY.getFolderName()
                );
            }
            String imageUrl = mediaService.uploadImage(
                    categoryPut.image(),
                    MediaFolder.CATEGORY.getFolderName()
            );
            category.setImageUrl(imageUrl);
        }
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    private void validateDuplicateName(String name, Integer id) {
        if (isNameExist(name, id)) {
            throw new DuplicateResourceException(ErrorCode.ERR_CATEGORY_DUPLICATE);
        }
    }

    private boolean isNameExist(String name, Integer id) {
        return categoryRepository.findExistByName(name, id) != null;
    }
}
