CREATE TYPE user_role AS ENUM ('ADMIN', 'CUSTOMER', 'RESTAURANT_OWNER', 'DELIVERY_DRIVER');

CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    password VARCHAR(128) NOT NULL DEFAULT '',
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    dob DATE,
    avatar_url VARCHAR(255),
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    is_active BOOLEAN DEFAULT TRUE,
    google_id VARCHAR(128) UNIQUE,
    facebook_id VARCHAR(128) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_address (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    slug VARCHAR(255)
);

CREATE TABLE restaurant (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    cover_url VARCHAR(255),
    verified_badge BOOLEAN DEFAULT FALSE,
    free_delivery BOOLEAN NOT NULL,
    opening_hour TIME NOT NULL,
    closing_hour TIME NOT NULL CHECK (closing_hour > opening_hour),
    total_stars FLOAT DEFAULT 0.0 CHECK (total_stars >= 0.0),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
    slug VARCHAR(255),
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurant_category (
    restaurant_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (restaurant_id, category_id)
);

CREATE TABLE food (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    description VARCHAR(255),
    ingredient VARCHAR(50),
    total_stars FLOAT DEFAULT 0.0 CHECK (total_stars >= 0.0),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
    restaurant_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    slug VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE side_food (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    restaurant_id BIGINT NOT NULL
);

CREATE TABLE food_side_food (
    food_id BIGINT NOT NULL,
    side_food_id BIGINT NOT NULL,
    PRIMARY KEY(food_id, side_food_id)
);

ALTER TABLE IF EXISTS user_address
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE IF EXISTS restaurant_category
    ADD CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);

ALTER TABLE IF EXISTS restaurant_category
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE IF EXISTS food
    ADD CONSTRAINT fk_food_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);

ALTER TABLE IF EXISTS food
    ADD CONSTRAINT fk_food_category FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE IF EXISTS side_food
    ADD CONSTRAINT fk_side_food_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(id);

ALTER TABLE IF EXISTS food_side_food
    ADD CONSTRAINT fk_food FOREIGN KEY (food_id) REFERENCES food(id);

ALTER TABLE IF EXISTS food_side_food
    ADD CONSTRAINT fk_side_food FOREIGN KEY (side_food_id) REFERENCES side_food(id);

CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_user_address_user_id ON user_address(user_id);
CREATE INDEX idx_food_name ON food(name);
CREATE INDEX idx_restaurant_name ON restaurant(name);
CREATE INDEX idx_category_slug ON category(slug);