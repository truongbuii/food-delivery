package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.DeliverAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliverAddressRepository extends JpaRepository<DeliverAddress, Long> {
    Optional<DeliverAddress> findByName(String name);

    List<DeliverAddress> findAllByUserId(Long userId);
}
