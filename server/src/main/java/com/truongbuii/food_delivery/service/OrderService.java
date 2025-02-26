package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.config.PaymentConfig;
import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.OrderMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.*;
import com.truongbuii.food_delivery.model.enums.OrderStatus;
import com.truongbuii.food_delivery.model.enums.PaymentStatus;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.request.order.OrderStatusPatch;
import com.truongbuii.food_delivery.model.response.CartItemResponse;
import com.truongbuii.food_delivery.repository.OrderItemRepository;
import com.truongbuii.food_delivery.repository.OrderRepository;
import com.truongbuii.food_delivery.utils.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderMapper orderMapper;
    private final UserService userService;
    private final CartService cartService;
    private final FoodService foodService;
    private final PaymentConfig paymentConfig;
    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public String create(Long userId, OrderPost orderPost, HttpServletRequest request) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        User user = userService.getUserById(userId);
        List<CartItemResponse> cartItems = cartService.getAll(userId);
        Food _food = foodService.getFoodById(cartItems.getFirst().getFoodId());
        Restaurant restaurant = _food.getRestaurant();

        Order order = orderMapper.toOrder(orderPost);
        order.setUserId(user.getId());
        order.setRestaurantId(restaurant.getId());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        orderRepository.save(order);

        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem ->
                        OrderItem.builder()
                                .foodId(cartItem.getFoodId())
                                .foodName(cartItem.getFoodName())
                                .foodImage(cartItem.getFoodImageUrl())
                                .quantity(cartItem.getQuantity())
                                .foodPrice(cartItem.getFoodPrice())
                                .foodAddons(cartItem.getSelectedAddons())
                                .order(order)
                                .build()
                )
                .toList();
        orderItemRepository.saveAll(orderItems);
        return paymentService.createPayment(request, orderPost.bankCode(), order.getTotalPrice(), order.getId());
    }

    @Transactional
    public void updatePaymentStatus(Map<String, String> queryParams) {
        try {
            String vnpResponseCode = queryParams.get("vnp_ResponseCode");
            String orderId = queryParams.get("vnp_TxnRef");
            String secureHash = queryParams.get("vnp_SecureHash");

            Order order = orderRepository.findById(Long.valueOf(orderId))
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));
            boolean isValid = VNPayUtils.isValidSignature(queryParams, paymentConfig.getVnp_HashSecret(), secureHash);
            if (!isValid) {
                throw new AppException(ErrorCode.ERR_PAYMENT_INVALID_SIGNATURE);
            }
            if (vnpResponseCode.equals("00")) {
                order.setPaymentStatus(PaymentStatus.PAID);
                order.setStatus(OrderStatus.SHIPPING);
            } else {
                order.setPaymentStatus(PaymentStatus.CANCELLED);
            }
            orderRepository.save(order);
        } catch (Exception e) {
            throw new AppException(e.getMessage());
        }
    }

    public Order updateStatus(OrderStatusPatch orderStatusPatch) {
        Order order = orderRepository.findById(orderStatusPatch.orderId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));
        order.setStatus(orderStatusPatch.status());
        orderRepository.save(order);
        return order;
    }
}
