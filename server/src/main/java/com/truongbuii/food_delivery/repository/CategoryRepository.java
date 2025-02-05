package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.name = ?1 AND (?2 IS NULL OR c.id != ?2)")
    Category findExistByName(String name, Integer id);

    @Query("SELECT c FROM Category c WHERE c.id IN :categoryIds")
    List<Category> findByIdIn(@Param("categoryIds") List<Integer> categoryIds);
}
