-- migrate:up


ALTER TABLE userinfo ADD COLUMN finance_month TEXT NOT NULL ;

-- migrate:down

