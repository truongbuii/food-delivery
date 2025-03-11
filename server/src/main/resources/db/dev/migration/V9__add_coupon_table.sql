CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'AMOUNT');

CREATE TABLE coupon
(
    id              UUID PRIMARY KEY,
    code            VARCHAR(50) UNIQUE NOT NULL,
    discount_type   discount_type,
    discount_value  NUMERIC NOT NULL,
    min_order_value NUMERIC DEFAULT 0,
    max_discount    NUMERIC DEFAULT NULL,
    start_date      TIMESTAMP NOT NULL,
    end_date        TIMESTAMP NOT NULL,
    usage_limit     INT DEFAULT NULL,
    usage_count     INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_coupon
(
    id        UUID PRIMARY KEY,
    user_id   BIGSERIAL NOT NULL,
    coupon_id UUID      NOT NULL,
    used_at   TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, coupon_id)
);