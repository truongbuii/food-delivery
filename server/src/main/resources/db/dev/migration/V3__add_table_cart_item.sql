CREATE TABLE cart_item
(
    user_id    BIGSERIAL NOT NULL,
    food_id    BIGSERIAL NOT NULL,
    quantity   INTEGER   NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_cart_item PRIMARY KEY (user_id, food_id)
);