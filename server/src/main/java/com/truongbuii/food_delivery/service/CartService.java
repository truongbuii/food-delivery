package com.truongbuii.food_delivery.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.CartItemMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.CartItem;
import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.request.cart.CartItemPost;
import com.truongbuii.food_delivery.model.request.cart.CartItemPut;
import com.truongbuii.food_delivery.model.response.CartItemResponse;
import com.truongbuii.food_delivery.model.response.UserResponse;
import com.truongbuii.food_delivery.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserService userService;
    private final FoodService foodService;
    private final ObjectMapper objectMapper;
    private final CartItemMapper cartItemMapper;
    private final CartItemRepository cartItemRepository;

    public List<CartItemResponse> getAll(Long userId) {
        UserResponse user = userService.getById(userId);
        List<CartItem> cartItems = cartItemRepository.findAllByUserId(user.getId());
        return cartItems.stream()
                .map(
                        cartItem -> {
                            Food food = foodService.getFoodById(cartItem.getFoodId());
                            return cartItemMapper.toCartItemResponse(cartItem, food);
                        }
                )
                .collect(Collectors.toList());
    }

    @Transactional
    public CartItemResponse create(Long userId, CartItemPost cartItemPost) {
        validateFood(cartItemPost.foodId(), userId);
        UserResponse user = userService.getById(userId);
        Food food = foodService.getFoodById(cartItemPost.foodId());

        JsonNode addonsJson = objectMapper.valueToTree(cartItemPost.selectedAddons());
        // If cart item already exists with same food and addons, increase quantity
        Optional<CartItem> existingCartItem = cartItemRepository.findByCustomerIdAndProductIdAndAddons(
                user.getId(),
                cartItemPost.foodId(),
                addonsJson
        );

        CartItem cartItem;
        if (existingCartItem.isPresent()) {
            CartItem _cartItem = existingCartItem.get();
            _cartItem.setQuantity(_cartItem.getQuantity() + cartItemPost.quantity());
            cartItemRepository.save(_cartItem);
            cartItem = _cartItem;
        } else {
            CartItem newCartItem = CartItem.builder()
                    .userId(user.getId())
                    .foodId(cartItemPost.foodId())
                    .quantity(cartItemPost.quantity())
                    .selectedAddons(addonsJson)
                    .build();
            cartItem = cartItemRepository.save(newCartItem);
        }

        return cartItemMapper.toCartItemResponse(cartItem, food);
    }

    @Transactional
    public CartItemResponse update(CartItemPut cartItemPut) {
        validateFood(cartItemPut.foodId(), null);
        CartItem cartItem = cartItemRepository.findById(cartItemPut.cartItemId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_CART_ITEM_NOT_FOUND));
        cartItem.setQuantity(cartItemPut.quantity());
        cartItemRepository.save(cartItem);
        Food food = foodService.getFoodById(cartItem.getFoodId());
        return cartItemMapper.toCartItemResponse(cartItem, food);
    }

    @Transactional
    public void delete(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_CART_ITEM_NOT_FOUND));
        cartItemRepository.delete(cartItem);
    }

    private void validateFood(Long foodId, Long userId) {
        if (!foodService.existFoodById(foodId)) {
            throw new ResourceNotFoundException(ErrorCode.ERR_FOOD_NOT_FOUND);
        }
        if (userId != null) {
            isFoodFromSameRestaurant(userId, foodId);
        }
    }

    private void isFoodFromSameRestaurant(Long userId, Long foodId) {
        List<CartItemResponse> cartItems = getAll(userId);
        if (cartItems.isEmpty()) {
            return;
        }
        Food firstFood = foodService.getFoodById(cartItems.getFirst().getFoodId());
        Long currentRestaurantId = firstFood.getRestaurant().getId();
        Food newFood = foodService.getFoodById(foodId);
        Long newRestaurantId = newFood.getRestaurant().getId();
        if (!newRestaurantId.equals(currentRestaurantId)) {
            throw new ResourceNotFoundException(ErrorCode.ERR_FOOD_NOT_FROM_SAME_RESTAURANT);
        }
    }
}
