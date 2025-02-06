package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.mapper.DeliveryAddressMapper;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.DeliverAddress;
import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.request.address.DeliverAddressPost;
import com.truongbuii.food_delivery.model.request.address.DeliverAddressPut;
import com.truongbuii.food_delivery.model.response.DeliverAddressResponse;
import com.truongbuii.food_delivery.repository.DeliverAddressRepository;
import com.truongbuii.food_delivery.utils.validateUtils;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DeliverAddressService {
    private final UserService userService;
    private final DeliveryAddressMapper deliverAddressMapper;
    private final DeliverAddressRepository deliverAddressRepository;

    public List<DeliverAddressResponse> getAllByUserId(Long userId) {
        User user = userService.getUserById(userId);
        List<DeliverAddress> deliverAddresses = deliverAddressRepository.findAllByUserId(user.getId());
        return deliverAddresses
                .stream()
                .map(deliverAddressMapper::toDeliverAddressResponse)
                .toList();
    }

    public DeliverAddressResponse getById(Long deliverAddressId) {
        DeliverAddress deliverAddress = deliverAddressRepository
                .findById(deliverAddressId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_DELIVER_ADDRESS_NOT_FOUND));
        return deliverAddressMapper.toDeliverAddressResponse(deliverAddress);
    }

    public DeliverAddressResponse create(DeliverAddressPost deliverAddressPost) {
        User user = userService.getUserById(deliverAddressPost.userId());
        validateDeliverAddressName(deliverAddressPost.name());
        DeliverAddress deliverAddress = deliverAddressMapper.toDeliverAddress(deliverAddressPost);
        deliverAddress.setUser(user);
        deliverAddressRepository.save(deliverAddress);
        return deliverAddressMapper.toDeliverAddressResponse(deliverAddress);
    }

    public DeliverAddressResponse update(DeliverAddressPut deliverAddressPut) {
        DeliverAddress deliverAddress = deliverAddressRepository
                .findById(deliverAddressPut.id())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_DELIVER_ADDRESS_NOT_FOUND));
        if (StringUtils.isNotBlank(deliverAddressPut.name())) {
            validateDeliverAddressName(deliverAddressPut.name());
            deliverAddress.setName(deliverAddressPut.name());
        }
        validateUtils.checkAndUpdateField(
                deliverAddress::setPhoneNumber,
                deliverAddressPut.phoneNumber(),
                deliverAddress.getPhoneNumber()
        );
        validateUtils.checkAndUpdateField(deliverAddress::setCity, deliverAddressPut.city(), deliverAddress.getCity());
        validateUtils.checkAndUpdateField(deliverAddress::setState, deliverAddressPut.state(), deliverAddress.getState());
        validateUtils.checkAndUpdateField(deliverAddress::setStreet, deliverAddressPut.street(), deliverAddress.getStreet());

        deliverAddressRepository.save(deliverAddress);
        return deliverAddressMapper.toDeliverAddressResponse(deliverAddress);
    }

    public void delete(Long deliverAddressId) {
        DeliverAddress deliverAddress = deliverAddressRepository
                .findById(deliverAddressId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_DELIVER_ADDRESS_NOT_FOUND));
        deliverAddressRepository.delete(deliverAddress);
    }

    private void validateDeliverAddressName(String deliverAddressName) {
        if (StringUtils.isNotBlank(deliverAddressName)) {
            Optional<DeliverAddress> deliverAddress = deliverAddressRepository.findByName(deliverAddressName);
            if (deliverAddress.isPresent()) {
                throw new DuplicateResourceException(ErrorCode.ERR_DELIVER_ADDRESS_NAME_DUPLICATE);
            }
        }
    }

}
