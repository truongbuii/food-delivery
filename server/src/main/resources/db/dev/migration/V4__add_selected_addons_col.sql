ALTER TABLE cart_item
    ADD COLUMN selected_addons JSONB DEFAULT '[]';
