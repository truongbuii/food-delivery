package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.RestaurantMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.RestaurantReview;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantReviewPost;
import com.truongbuii.food_delivery.model.request.restaurant.RestaurantReviewPut;
import com.truongbuii.food_delivery.model.response.RestaurantReviewResponse;
import com.truongbuii.food_delivery.repository.OrderRepository;
import com.truongbuii.food_delivery.repository.RestaurantReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantReviewService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final RestaurantMapper restaurantMapper;
    private final RestaurantReviewRepository restaurantReviewRepository;

    public List<RestaurantReviewResponse> getReviews(Long restaurantId) {
        List<RestaurantReview> restaurantReviews = restaurantReviewRepository.findByRestaurantId(restaurantId);
        return restaurantReviews.stream()
                .map(restaurantMapper::toRestaurantReviewResponse)
                .toList();
    }

    public RestaurantReviewResponse createReview(Long userId, RestaurantReviewPost restaurantReviewPost) {
        validateReview(userId, restaurantReviewPost.restaurantId());
        User user = userService.getUserById(userId);
        RestaurantReview restaurantReview = restaurantMapper.toRestaurantReview(restaurantReviewPost, user);
        restaurantReviewRepository.save(restaurantReview);
        return restaurantMapper.toRestaurantReviewResponse(restaurantReview);
    }

    public RestaurantReviewResponse editReview(Long userId, RestaurantReviewPut restaurantReviewPut) {
        User user = userService.getUserById(userId);
        RestaurantReview restaurantReview = restaurantReviewRepository
                .findByIdAndUserId(restaurantReviewPut.reviewId(), user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_REVIEW_NOT_FOUND));
        restaurantReview.setRating(restaurantReviewPut.rating());
        restaurantReview.setComment(restaurantReviewPut.comment());
        restaurantReviewRepository.save(restaurantReview);
        return restaurantMapper.toRestaurantReviewResponse(restaurantReview);
    }

    public void deleteReview(Long userId, Long reviewId) {
        User user = userService.getUserById(userId);
        RestaurantReview restaurantReview = restaurantReviewRepository
                .findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_REVIEW_NOT_FOUND));
        restaurantReviewRepository.delete(restaurantReview);
    }

    private void validateReview(Long userId, Long restaurantId) {
        if (!checkUserCanReview(userId, restaurantId)) {
            throw new ResourceNotFoundException(ErrorCode.ERR_USER_CANNOT_REVIEW);
        }
        if (checkUserHadReviewed(userId, restaurantId)) {
            throw new ResourceNotFoundException(ErrorCode.ERR_USER_HAD_REVIEWED);
        }
    }

    private boolean checkUserCanReview(Long userId, Long restaurantId) {
        return orderRepository.existsCompletedOrder(userId, restaurantId);
    }

    private boolean checkUserHadReviewed(Long userId, Long restaurantId) {
        return restaurantReviewRepository.checkExistsByUserIdAndRestaurantId(userId, restaurantId);
    }
}
