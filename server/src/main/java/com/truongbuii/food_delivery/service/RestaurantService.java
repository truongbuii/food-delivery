package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.CategoryMapper;
import com.truongbuii.food_delivery.mapper.RestaurantMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Category;
import com.truongbuii.food_delivery.model.entity.Restaurant;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPatch;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPost;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantPut;
import com.truongbuii.food_delivery.model.response.CategoryIdNameResponse;
import com.truongbuii.food_delivery.model.response.RestaurantResponse;
import com.truongbuii.food_delivery.repository.RestaurantRepository;
import com.truongbuii.food_delivery.utils.GeneratorUtils;
import com.truongbuii.food_delivery.utils.validateUtils;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final MediaService mediaService;
    private final CategoryMapper categoryMapper;
    private final CategoryService categoryService;
    private final RestaurantMapper restaurantMapper;
    private final RestaurantRepository restaurantRepository;

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_RESTAURANT_NOT_FOUND));
    }

    public List<RestaurantResponse> getAll() {
        List<Restaurant> restaurants = restaurantRepository.findAllByParams();

        return restaurants.stream()
                .map(restaurant -> {
                    Set<CategoryIdNameResponse> categories = restaurant.getCategories()
                            .stream()
                            .map(categoryMapper::toCategoryIdNameResponse)
                            .collect(Collectors.toSet());

                    RestaurantResponse restaurantResponse = restaurantMapper.toRestaurantResponse(restaurant);
                    restaurantResponse.setCategories(categories);
                    return restaurantResponse;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public RestaurantResponse create(RestaurantPost restaurantPost) {
        validateRestaurant(restaurantPost.getName(), null);
        String avatarUrl = "";
        String coverUrl = "";
        Set<Category> categories = categoryService.checkCategoryIdExist(restaurantPost.getCategoryIds());

        Restaurant restaurant = new Restaurant();
        if (restaurantPost.getAvatar() != null && !restaurantPost.getAvatar().isEmpty()) {
            avatarUrl = mediaService.uploadImage(
                    restaurantPost.getAvatar(),
                    MediaFolder.RESTAURANT.getFolderName()
            );
        }
        if (restaurantPost.getCover() != null && !restaurantPost.getCover().isEmpty()) {
            coverUrl = mediaService.uploadImage(
                    restaurantPost.getCover(),
                    MediaFolder.RESTAURANT.getFolderName()
            );
        }
        // Initialize restaurant
        restaurant.setTotalStars(0F);
        restaurant.setTotalReviews(0);
        restaurant.setCoverUrl(coverUrl);
        restaurant.setAvatarUrl(avatarUrl);
        restaurant.setCategories(categories);
        restaurant.setHasBanned(Boolean.FALSE);
        restaurant.setHasFeatured(Boolean.FALSE);
        restaurant.setVerifiedBadge(Boolean.FALSE);
        restaurant.setName(restaurantPost.getName());
        restaurant.setAddress(restaurantPost.getAddress());
        restaurant.setOpeningHour(restaurantPost.getOpeningHour());
        restaurant.setClosingHour(restaurantPost.getClosingHour());
        restaurant.setFreeDelivery(restaurantPost.getFreeDelivery());
        restaurant.setSlug(GeneratorUtils.convertToSlug(restaurantPost.getName()));

        restaurantRepository.save(restaurant);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    @Transactional
    public RestaurantResponse update(RestaurantPut restaurantPut) {
        validateRestaurant(restaurantPut.getName(), restaurantPut.getId());
        Restaurant restaurant = getRestaurantById(restaurantPut.getId());
        if (restaurantPut.getAvatar() != null && !restaurantPut.getAvatar().isEmpty()) {
            if (restaurant.getAvatarUrl() != null) {
                mediaService.deleteImage(
                        restaurant.getAvatarUrl(),
                        MediaFolder.RESTAURANT.getFolderName()
                );
            }
            String avatarUrl = mediaService.uploadImage(
                    restaurantPut.getAvatar(),
                    MediaFolder.RESTAURANT.getFolderName()
            );
            restaurant.setAvatarUrl(avatarUrl);
        }
        if (restaurantPut.getCover() != null && !restaurantPut.getCover().isEmpty()) {
            if (restaurant.getCoverUrl() != null) {
                mediaService.deleteImage(
                        restaurant.getCoverUrl(),
                        MediaFolder.RESTAURANT.getFolderName()
                );
            }
            String coverUrl = mediaService.uploadImage(
                    restaurantPut.getCover(),
                    MediaFolder.RESTAURANT.getFolderName()
            );
            restaurant.setCoverUrl(coverUrl);
        }
        if (StringUtils.isNotBlank(restaurantPut.getName()) && !restaurantPut.getName().equals(restaurant.getName())) {
            restaurant.setName(restaurantPut.getName());
            restaurant.setSlug(GeneratorUtils.convertToSlug(restaurantPut.getName()));
        }
        validateUtils.checkAndUpdateField(restaurant::setAddress, restaurantPut.getAddress(), restaurant.getAddress());
        validateUtils.checkAndUpdateField(restaurant::setOpeningHour, restaurantPut.getOpeningHour(), restaurant.getOpeningHour());
        validateUtils.checkAndUpdateField(restaurant::setClosingHour, restaurantPut.getClosingHour(), restaurant.getClosingHour());
        validateUtils.checkAndUpdateField(restaurant::setFreeDelivery, restaurantPut.getFreeDelivery(), restaurant.isFreeDelivery());

        /*
         * Filter categories to add and remove
         * Example: currentCategories: [1, 2, 3] -> newCategories: [2, 3, 4]
         * categoriesToAdd: [4] -> remove categories in newCategories that are already in currentCategories
         * same with categoriesToRemove: [1]
         */
        if (!CollectionUtils.isEmpty(restaurantPut.getCategoryIds())) {
            Set<Category> newCategories = categoryService.checkCategoryIdExist(restaurantPut.getCategoryIds());
            Set<Category> currentCategories = restaurant.getCategories();

            Set<Category> categoriesToAdd = new HashSet<>(newCategories);
            categoriesToAdd.removeAll(currentCategories);

            Set<Category> categoriesToRemove = new HashSet<>(currentCategories);
            categoriesToRemove.removeAll(newCategories);

            currentCategories.addAll(categoriesToAdd);
            currentCategories.removeAll(categoriesToRemove);

            restaurant.setCategories(currentCategories);
        }
        restaurantRepository.save(restaurant);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    public RestaurantResponse updateBadge(RestaurantPatch restaurantPatch) {
        Restaurant restaurant = getRestaurantById(restaurantPatch.id());
        restaurant.setVerifiedBadge(restaurantPatch.booleanValue());
        restaurantRepository.save(restaurant);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    public RestaurantResponse disable(RestaurantPatch restaurantPatch) {
        Restaurant restaurant = getRestaurantById(restaurantPatch.id());
        restaurant.setHasBanned(restaurantPatch.booleanValue());
        restaurantRepository.save(restaurant);
        return restaurantMapper.toRestaurantResponse(restaurant);
    }

    private void validateRestaurant(String name, Long id) {
        if (isRestaurantExist(name, id)) {
            throw new DuplicateResourceException(ErrorCode.ERR_RESTAURANT_DUPLICATE);
        }
    }

    private boolean isRestaurantExist(String name, Long id) {
        return restaurantRepository.findExistByName(name, id) != null;
    }

}
