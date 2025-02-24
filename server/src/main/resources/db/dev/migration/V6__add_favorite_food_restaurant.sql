CREATE TABLE favorite_food
(
    user_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, food_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food (id) ON DELETE CASCADE
);


CREATE TABLE favorite_restaurant
(
    user_id       BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, restaurant_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant (id) ON DELETE CASCADE
);
