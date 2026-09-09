-- migrate:up

ALTER TABLE receipt ADD COLUMN receipt_id SERIAL PRIMARY KEY ;


-- migrate:down

