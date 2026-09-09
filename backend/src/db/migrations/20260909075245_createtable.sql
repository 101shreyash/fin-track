-- migrate:up

CREATE TABLE receipt (userid INT NOT NULL REFERENCES users(userid) , finance_id INT NOT NULL REFERENCES userfinance(finance_id) , receipt_img_url TEXT );


-- migrate:down

DROP TABLE receipt;
