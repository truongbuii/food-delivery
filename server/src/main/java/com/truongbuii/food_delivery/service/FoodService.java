package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.FoodMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Addon;
import com.truongbuii.food_delivery.model.entity.Category;
import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.entity.Restaurant;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.food.FoodPost;
import com.truongbuii.food_delivery.model.request.food.FoodPut;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.repository.FoodRepository;
import com.truongbuii.food_delivery.utils.GeneratorUtils;
import com.truongbuii.food_delivery.utils.validateUtils;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {
    private final FoodMapper foodMapper;
    private final MediaService mediaService;
    private final AddonService addonService;
    private final FoodRepository foodRepository;
    private final CategoryService categoryService;
    private final RestaurantService restaurantService;

    public Food getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_FOOD_NOT_FOUND));
    }

    public FoodResponse getFoodBySlug(String slug) {
        Food food = foodRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_FOOD_NOT_FOUND));
        return foodMapper.toFoodResponse(food);
    }

    public List<FoodResponse> getAll() {
        List<Food> foods = foodRepository.findAll();

        return foods.stream()
                .map(foodMapper::toFoodResponse)
                .collect(Collectors.toList());
    }

    public List<FoodResponse> getAllByParams(String restaurantSlug, Integer categoryId) {
        return foodRepository.findAllByParams(categoryId, restaurantSlug).stream()
                .map(foodMapper::toFoodResponse)
                .collect(Collectors.toList());
    }

    public List<FoodResponse> getFeaturedFoodByRestaurantSlug(String restaurantSlug) {
        List<Food> foods = foodRepository.findFeaturedByRestaurantSlug(restaurantSlug);

        return foods.stream()
                .map(foodMapper::toFoodResponse)
                .collect(Collectors.toList());
    }

    public FoodResponse create(FoodPost foodPost) {
        Restaurant restaurant = restaurantService.getRestaurantById(foodPost.restaurantId());
        Category category = categoryService.getCategoryById(foodPost.categoryId());
        Set<Addon> addons = addonService.checkAddonIdExist(foodPost.addonIds());
        validateFood(foodPost.name(), null, restaurant, foodPost.categoryId());
        String imageUrl = "";

        Food food = new Food();
        food.setAddons(addons);
        food.setTotalStars(0F);
        food.setTotalReviews(0);
        food.setCategory(category);
        food.setRestaurant(restaurant);
        food.setName(foodPost.name());
        food.setPrice(foodPost.price());
        food.setIngredient(foodPost.ingredient());
        food.setDescription(foodPost.description());
        food.setSlug(GeneratorUtils.convertToSlug(foodPost.name()));

        if (foodPost.image() != null && !foodPost.image().isEmpty()) {
            imageUrl = mediaService.uploadImage(
                    foodPost.image(),
                    MediaFolder.FOOD.getFolderName()
            );
            food.setImageUrl(imageUrl);
        }

        foodRepository.save(food);
        return foodMapper.toFoodResponse(food);
    }

    public FoodResponse update(FoodPut foodPut) {
        Restaurant restaurant = restaurantService.getRestaurantById(foodPut.restaurantId());
        Food food = getFoodById(foodPut.id());
        validateFood(foodPut.name(), foodPut.id(), restaurant, foodPut.categoryId());

        if (foodPut.categoryId() != null && !food.getCategory().getId().equals(foodPut.categoryId())) {
            Category category = categoryService.getCategoryById(foodPut.categoryId());
            food.setCategory(category);
        }
        if (foodPut.image() != null && !foodPut.image().isEmpty()) {
            if (food.getImageUrl() != null) {
                mediaService.deleteImage(
                        food.getImageUrl(),
                        MediaFolder.FOOD.getFolderName()
                );
            }
            String imageUrl = mediaService.uploadImage(
                    foodPut.image(),
                    MediaFolder.FOOD.getFolderName()
            );
            food.setImageUrl(imageUrl);
        }
        if (StringUtils.isNotBlank(foodPut.name()) && !food.getName().equals(foodPut.name())) {
            food.setName(foodPut.name());
            food.setSlug(GeneratorUtils.convertToSlug(foodPut.name()));
        }
        validateUtils.checkAndUpdateField(food::setName, foodPut.name(), food.getName());
        validateUtils.checkAndUpdateField(food::setPrice, foodPut.price(), food.getPrice());
        validateUtils.checkAndUpdateField(food::setIngredient, foodPut.ingredient(), food.getIngredient());
        validateUtils.checkAndUpdateField(food::setDescription, foodPut.description(), food.getDescription());

        /*
         * Same as restaurantService.update() method
         */
        if (!CollectionUtils.isEmpty(foodPut.addonIds())) {
            Set<Addon> newAddons = addonService.checkAddonIdExist(foodPut.addonIds());
            Set<Addon> currentAddons = food.getAddons();

            Set<Addon> addonsToAdd = new HashSet<>(newAddons);
            addonsToAdd.removeAll(currentAddons);

            Set<Addon> addonsToRemove = new HashSet<>(currentAddons);
            addonsToRemove.removeAll(newAddons);

            currentAddons.addAll(addonsToAdd);
            currentAddons.removeAll(addonsToRemove);

            food.setAddons(currentAddons);
        }

        foodRepository.save(food);
        return foodMapper.toFoodResponse(food);
    }

    private void validateFood(String name, Long foodId, Restaurant restaurant, Integer categoryId) {
        if (isFoodExist(name, foodId, restaurant.getId())) {
            throw new DuplicateResourceException(ErrorCode.ERR_FOOD_DUPLICATE);
        }
        checkCategoryInRestaurant(categoryId, restaurant);
    }

    private boolean isFoodExist(String name, Long foodId, Long restaurantId) {
        return foodRepository.findExistByName(name, foodId, restaurantId) != null;
    }

    private void checkCategoryInRestaurant(Integer categoryId, Restaurant restaurant) {
        if (restaurant.getCategories().stream().noneMatch(c -> c.getId().equals(categoryId))) {
            throw new ResourceNotFoundException(ErrorCode.ERR_CATEGORY_NOT_MATCH);
        }
    }
}
