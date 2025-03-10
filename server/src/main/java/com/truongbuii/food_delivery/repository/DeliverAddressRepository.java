package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.DeliverAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliverAddressRepository extends JpaRepository<DeliverAddress, Long> {
    @Query("SELECT da FROM DeliverAddress da WHERE da.name = :name AND da.user.id = :userId")
    Optional<DeliverAddress> findByNameAndUserId(String name, Long userId);

    List<DeliverAddress> findAllByUserId(Long userId);
}
