ALTER TABLE cart_item DROP CONSTRAINT pk_cart_item;

CREATE INDEX idx_cart_item_user_food ON cart_item (user_id, food_id);

ALTER TABLE cart_item ADD COLUMN id BIGSERIAL PRIMARY KEY;
