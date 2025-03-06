CREATE TABLE restaurant_review
(
    id            BIGSERIAL PRIMARY KEY,
    restaurant_id BIGSERIAL    NOT NULL,
    user_id       BIGSERIAL    NOT NULL,
    user_name     VARCHAR(100) NOT NULL,
    user_image    VARCHAR(255),
    rating        INTEGER      NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment       TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food_review
(
    id         BIGSERIAL PRIMARY KEY,
    food_id    BIGSERIAL    NOT NULL,
    user_id    BIGSERIAL    NOT NULL,
    user_name  VARCHAR(100) NOT NULL,
    user_image VARCHAR(255),
    rating     INTEGER      NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);