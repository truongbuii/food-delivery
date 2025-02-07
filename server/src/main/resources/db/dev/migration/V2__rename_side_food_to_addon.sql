ALTER TABLE side_food RENAME TO addon;

ALTER TABLE food_side_food RENAME TO food_addon;

ALTER TABLE food_addon RENAME COLUMN side_food_id TO addon_id;

ALTER TABLE food_addon DROP CONSTRAINT fk_side_food;
ALTER TABLE food_addon ADD CONSTRAINT fk_addon FOREIGN KEY (addon_id) REFERENCES addon(id);
