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

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    public List<Category> getAllByIdIn(List<Integer> categoryIds) {
        return categoryRepository.findByIdIn(categoryIds);
    }


    /*
     * Retrieves a list of Category from categoryIds.
     * Extracts existing categoryIds into a Set and filters out the not found categoryIds.
     * Throws 404 Error if there are not found categoryIds.
     */
    public Set<Category> checkCategoryIdExist(List<Integer> categoryIds) {
        List<Category> categories = getAllByIdIn(categoryIds);
        Set<Integer> existingCategoryIds = categories.stream()
                .map(Category::getId)
                .collect(Collectors.toSet());
        List<Integer> notFoundCategoryIds = categoryIds.stream()
                .filter(id -> !existingCategoryIds.contains(id))
                .toList();

        if (!notFoundCategoryIds.isEmpty()) {
            throw new ResourceNotFoundException(ErrorCode.ERR_CATEGORY_NOT_FOUND);
        }

        return new HashSet<>(categories);
    }

    @Transactional
    public CategoryResponse create(CategoryPost categoryPost) {
        validateCategory(categoryPost.name(), null);
        String imageUrl = "";
        Category category = new Category();
        if (categoryPost.image() != null && !categoryPost.image().isEmpty()) {
            imageUrl = mediaService.uploadImage(
                    categoryPost.image(),
                    MediaFolder.CATEGORY.getFolderName()
            );
        }
        category.setImageUrl(imageUrl);
        category.setName(categoryPost.name());
        category.setSlug(GeneratorUtils.convertToSlug(categoryPost.name()));

        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    @Transactional
    public CategoryResponse update(CategoryPut categoryPut) {
        validateCategory(categoryPut.name(), categoryPut.id());
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

    private void validateCategory(String name, Integer id) {
        if (isNameExist(name, id)) {
            throw new DuplicateResourceException(ErrorCode.ERR_CATEGORY_DUPLICATE);
        }
    }

    private boolean isNameExist(String name, Integer id) {
        return categoryRepository.findExistByName(name, id) != null;
    }
}
