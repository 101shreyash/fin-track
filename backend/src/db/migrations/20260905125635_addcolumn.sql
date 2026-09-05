-- migrate:up


ALTER TABLE userfinance ADD COLUMN gained_at VARCHAR (50) NOT NULL DEFAULT 'Usual Paychecks'

-- migrate:down

