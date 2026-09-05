-- migrate:up

ALTER TABLE userfinance DROP COLUMN day_summary;

-- migrate:down

