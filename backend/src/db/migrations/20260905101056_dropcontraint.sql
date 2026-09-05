-- migrate:up

ALTER TABLE userfinance ALTER COLUMN day_income DROP NOT NULL;
ALTER TABLE userfinance ALTER COLUMN day_expenses DROP NOT NULL;
ALTER TABLE userfinance ALTER COLUMN spent_at DROP NOT NULL;


-- migrate:down

