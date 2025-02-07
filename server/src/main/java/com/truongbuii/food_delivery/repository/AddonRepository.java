package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Addon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddonRepository extends JpaRepository<Addon, Long> {
    @Query("SELECT a FROM Addon a WHERE a.name = ?1 AND (?2 IS NULL OR a.id != ?2)")
    Addon findExistByName(String name, Long id);

    @Query("SELECT a FROM Addon a WHERE a.id IN :addonIds")
    List<Addon> findByIdIn(List<Long> addonIds);
}
