-- migrate:up


ALTER TABLE userfinance DROP COLUMN note;
ALTER TABLE receipt RENAME TO userinfo;

ALTER TABLE userinfo ADD COLUMN notes TEXT ;
ALTER TABLE userinfo ADD COLUMN note_id SERIAL ;

-- migrate:down

