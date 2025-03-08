package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.FoodMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.entity.FoodReview;
import com.truongbuii.food_delivery.model.entity.Order;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.food.FoodReviewPost;
import com.truongbuii.food_delivery.model.request.food.FoodReviewPut;
import com.truongbuii.food_delivery.model.response.FoodResponse;
import com.truongbuii.food_delivery.model.response.FoodReviewResponse;
import com.truongbuii.food_delivery.repository.FoodReviewRepository;
import com.truongbuii.food_delivery.repository.OrderItemRepository;
import com.truongbuii.food_delivery.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodReviewService {
    private final FoodMapper foodMapper;
    private final UserService userService;
    private final FoodService foodService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final FoodReviewRepository foodReviewRepository;

    public List<FoodReviewResponse> getReviews(String foodSlug) {
        FoodResponse food = foodService.getFoodBySlug(foodSlug);
        List<FoodReview> foodReviews = foodReviewRepository.findByFoodId(food.getId());
        return foodReviews.stream()
                .map(foodMapper::toFoodReviewResponse)
                .toList();
    }

    @Transactional
    public FoodReviewResponse createReview(Long userId, FoodReviewPost foodReviewPost) {
        validateReview(userId, foodReviewPost.foodId());
        User user = userService.getUserById(userId);
        Food food = foodService.getFoodById(foodReviewPost.foodId());
        FoodReview foodReview = foodMapper.toFoodReview(foodReviewPost, user);
        foodReviewRepository.save(foodReview);
        foodReviewRepository.updateFoodRating(food.getId(), foodReview.getRating());
        return foodMapper.toFoodReviewResponse(foodReview);
    }

    @Transactional
    public FoodReviewResponse editReview(Long userId, FoodReviewPut foodReviewPut) {
        User user = userService.getUserById(userId);
        FoodReview foodReview = (foodReviewRepository)
                .findByIdAndUserId(foodReviewPut.reviewId(), user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_REVIEW_NOT_FOUND));
        foodReview.setRating(foodReviewPut.rating());
        foodReview.setComment(foodReviewPut.comment());
        foodReviewRepository.save(foodReview);
        foodReviewRepository.updateFoodRatingAfterEdit(foodReview.getFoodId());
        return foodMapper.toFoodReviewResponse(foodReview);
    }

    @Transactional
    public void deleteReview(Long userId, Long reviewId) {
        User user = userService.getUserById(userId);
        FoodReview foodReview = foodReviewRepository
                .findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_REVIEW_NOT_FOUND));
        Food food = foodService.getFoodById(foodReview.getFoodId());
        foodReviewRepository.delete(foodReview);
        foodReviewRepository.updateFoodRatingAfterDelete(food.getId());
    }

    private void validateReview(Long userId, Long foodId) {
        if (!checkUserCanReview(userId, foodId)) {
            throw new AppException(ErrorCode.ERR_USER_CANNOT_REVIEW);
        }
        if (checkUserHasReviewed(userId, foodId)) {
            throw new AppException(ErrorCode.ERR_USER_HAD_REVIEWED_FOOD);
        }
    }

    private boolean checkUserCanReview(Long userId, Long foodId) {
        List<Order> orders = orderRepository.findDeliveredOrderByUserId(userId);
        if (orders.isEmpty()) {
            throw new AppException(ErrorCode.ERR_USER_CANNOT_REVIEW);
        }
        for (Order order : orders) {
            if (orderItemRepository.existsByOrderIdAndFoodId(order.getId(), foodId)) {
                return true;
            }
        }
        return false;
    }

    private boolean checkUserHasReviewed(Long userId, Long foodId) {
        return foodReviewRepository.checkExistsByUserIdAndFoodId(userId, foodId);
    }
}
