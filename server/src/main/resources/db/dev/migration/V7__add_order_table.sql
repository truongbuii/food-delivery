DROP TYPE IF EXISTS order_status CASCADE;
CREATE TYPE order_status AS ENUM ('PENDING', 'CANCELLED', 'REFUND', 'SHIPPING', 'DELIVERED');
DROP TYPE IF EXISTS payment_method CASCADE;
CREATE TYPE payment_method AS ENUM ('COD', 'VNPAY');
DROP TYPE IF EXISTS payment_status CASCADE;
CREATE TYPE payment_status AS ENUM ('PENDING', 'CANCELLED', 'REFUND', 'PAID');

CREATE TABLE "order" (
    id BIGSERIAL PRIMARY KEY,
    user_id     BIGSERIAL NOT NULL,
    restaurant_id BIGSERIAL NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    status      order_status,
    number_item  INTEGER CHECK (number_item >= 0),
    order_address VARCHAR(255),
    payment_method payment_method,
    payment_status payment_status,
    discount FLOAT CHECK (discount >= 0.0),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGSERIAL NOT NULL,
    food_id BIGSERIAL NOT NULL,
    food_name VARCHAR(150) NOT NULL,
    food_image VARCHAR(255) NOT NULL,
    quantity INTEGER CHECK (quantity >= 0),
    food_price NUMERIC(10, 2) NOT NULL CHECK (food_price >= 0),
    food_addons JSONB DEFAULT '[]',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES "order"(id)
);