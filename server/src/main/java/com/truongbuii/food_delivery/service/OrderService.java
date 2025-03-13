package com.truongbuii.food_delivery.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.truongbuii.food_delivery.config.PaymentConfig;
import com.truongbuii.food_delivery.exception.AppException;
import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.OrderMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.*;
import com.truongbuii.food_delivery.model.enums.OrderStatus;
import com.truongbuii.food_delivery.model.enums.PaymentMethod;
import com.truongbuii.food_delivery.model.enums.PaymentStatus;
import com.truongbuii.food_delivery.model.request.cart.CartItemPost;
import com.truongbuii.food_delivery.model.request.cart.SelectedAddon;
import com.truongbuii.food_delivery.model.request.order.OrderPost;
import com.truongbuii.food_delivery.model.request.order.OrderStatusPatch;
import com.truongbuii.food_delivery.model.request.order.ReOrderPost;
import com.truongbuii.food_delivery.model.response.CartItemResponse;
import com.truongbuii.food_delivery.model.response.CheckoutResponse;
import com.truongbuii.food_delivery.model.response.OrderItemResponse;
import com.truongbuii.food_delivery.model.response.OrderResponse;
import com.truongbuii.food_delivery.repository.AddonRepository;
import com.truongbuii.food_delivery.repository.OrderItemRepository;
import com.truongbuii.food_delivery.repository.OrderRepository;
import com.truongbuii.food_delivery.utils.VNPayUtils;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderMapper orderMapper;
    private final UserService userService;
    private final CartService cartService;
    private final FoodService foodService;
    private final ObjectMapper objectMapper;
    private final PaymentConfig paymentConfig;
    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final AddonRepository addonRepository;
    private final RestaurantService restaurantService;
    private final OrderItemRepository orderItemRepository;
    private final CouponService couponService;

    public List<OrderResponse> getMyOrders(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(order -> {
                    Long restaurantId = order.getRestaurantId();
                    Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
                    return orderMapper.toOrderResponse(order, restaurant);
                })
                .toList();
    }

    @Transactional
    public CheckoutResponse create(Long userId, OrderPost orderPost, HttpServletRequest request) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        User user = userService.getUserById(userId);
        List<CartItemResponse> cartItems = cartService.getAll(userId);
        Food _food = foodService.getFoodById(cartItems.getFirst().getFoodId());
        Restaurant restaurant = _food.getRestaurant();

        Optional<Order> pendingOrder = orderRepository.findByUserIdAndStatus(userId, OrderStatus.PENDING);
        if (pendingOrder.isPresent()) {
            throw new DuplicateResourceException(ErrorCode.ERR_ORDER_PENDING);
        }

        Order order = orderMapper.toOrder(orderPost);
        order.setUserId(user.getId());
        order.setRestaurantId(restaurant.getId());

        if (orderPost.paymentMethod().equals(PaymentMethod.VNPAY)) {
            order.setStatus(OrderStatus.PENDING);
            order.setPaymentStatus(PaymentStatus.PENDING);
        } else {
            order.setStatus(OrderStatus.SHIPPING);
            order.setPaymentStatus(PaymentStatus.PENDING);
            cartService.deleteAll(userId);
        }
        if (StringUtils.isNotBlank(orderPost.code()) && !orderPost.code().isEmpty()) {
            Coupon coupon = couponService.getCouponByCode(orderPost.code());
            order.setDiscount(coupon.getDiscountValue().floatValue());
            couponService.createUserCoupon(coupon, userId);
        }
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
        CheckoutResponse checkoutResponse = new CheckoutResponse();
        if (orderPost.paymentMethod().equals(PaymentMethod.VNPAY)) {
            checkoutResponse.setPaymentMethod(PaymentMethod.VNPAY);
            checkoutResponse.setValue(paymentService.createPayment(request, order.getTotalPrice(), order.getId()));
        } else {
            checkoutResponse.setPaymentMethod(PaymentMethod.COD);
            checkoutResponse.setValue(order.getId().toString());
        }
        return checkoutResponse;
    }

    @Transactional
    public List<CartItemResponse> reOrder(Long userId, ReOrderPost reOrderPost) {
        Order order = orderRepository.findById(reOrderPost.orderId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));

        List<CartItemResponse> cartItems = cartService.getAll(userId);
        if (!cartItems.isEmpty()) {
            cartService.deleteAll(userId);
        }
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getId());
        orderItems.forEach(orderItem -> {
            List<SelectedAddon> addons = convertJsonToList(orderItem.getFoodAddons());
            List<SelectedAddon> validAddons = addons.stream()
                    .map(addon -> addonRepository.findById(addon.id()).isPresent() ? addon : null)
                    .filter(Objects::nonNull)
                    .toList();
            CartItemPost cartItemPost = new CartItemPost(
                    orderItem.getFoodId(),
                    orderItem.getQuantity(),
                    validAddons
            );
            cartService.create(userId, cartItemPost);
        });
        return cartService.getAll(userId);
    }

    @Transactional
    public Long OrderPaymentCallBack(Map<String, String> queryParams) {
        try {
            String vnpResponseCode = queryParams.get("vnp_ResponseCode");
            String orderKey = queryParams.get("vnp_TxnRef");
            String secureHash = queryParams.get("vnp_SecureHash");
            boolean isValid = VNPayUtils.isValidSignature(queryParams, paymentConfig.getVnp_HashSecret(), secureHash);
            if (!isValid) {
                throw new AppException(ErrorCode.ERR_PAYMENT_INVALID_SIGNATURE);
            }
            Order order = orderRepository.findById(Long.parseLong(orderKey))
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));
            if (vnpResponseCode.equals("00")) {
                order.setPaymentStatus(PaymentStatus.PAID);
                order.setStatus(OrderStatus.SHIPPING);
                orderRepository.save(order);
                cartService.deleteAll(order.getUserId());
            } else {
                order.setStatus(OrderStatus.CANCELLED);
                order.setPaymentStatus(PaymentStatus.CANCELLED);
                orderRepository.save(order);
            }
            return order.getId();
        } catch (Exception e) {
            throw new AppException(e.getMessage());
        }
    }

    public OrderResponse getOrderDetail(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));
        Restaurant restaurant = restaurantService.getRestaurantById(order.getRestaurantId());
        return orderMapper.toOrderResponse(order, restaurant);
    }

    public List<OrderItemResponse> getOrderItemByOrderId(Long orderId) {
        return orderRepository.findAllByOrderId(orderId)
                .stream()
                .map(orderMapper::toOrderItemResponse)
                .toList();
    }

    public Order updateStatus(OrderStatusPatch orderStatusPatch) {
        Order order = orderRepository.findById(orderStatusPatch.orderId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ORDER_NOT_FOUND));
        order.setStatus(orderStatusPatch.status());
        orderRepository.save(order);
        return order;
    }

    private List<SelectedAddon> convertJsonToList(JsonNode jsonNode) {
        try {
            return objectMapper.readValue(objectMapper.writeValueAsString(jsonNode),
                    new TypeReference<List<SelectedAddon>>() {
                    });
        } catch (Exception e) {
            throw new AppException(e.getMessage());
        }
    }

}
