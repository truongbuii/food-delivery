package com.truongbuii.food_delivery.repository;

import com.truongbuii.food_delivery.model.entity.FavoriteFood;
import com.truongbuii.food_delivery.model.entity.Food;
import com.truongbuii.food_delivery.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface FavoriteFoodRepository extends JpaRepository<FavoriteFood, FavoriteFood.FavoriteFoodId> {
    Optional<FavoriteFood> findByUserIdAndFoodId(Long userId, Long foodId);

    void deleteByUserAndFood(User user, Food food);

    Set<FavoriteFood> findByUserId(Long userId);

    @Query("SELECT ff FROM FavoriteFood ff WHERE ff.user.id = :userId AND ff.food.id IN :foodIds")
    List<FavoriteFood> findByUserIdAndFoodIdIn(
            @Param("userId") Long userId,
            @Param("foodIds") List<Long> foodIds
    );
}
