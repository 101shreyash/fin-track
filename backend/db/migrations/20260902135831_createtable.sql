-- migrate:up

CREATE TYPE todays_month AS ENUM (
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december');


CREATE TYPE default_currency AS ENUM ('USD' , 'AUD' , 'INR' , 'NPR' , 'EUR' , 'CAD');

CREATE TABLE users (userid SERIAL PRIMARY KEY , username TEXT NOT NULL UNIQUE , full_name TEXT NOT NULL DEFAULT 'fullname' ,  hash_password TEXT NOT NULL , currency_type default_currency  NOT NULL DEFAULT 'USD' , joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );

CREATE TABLE userfinance (userid INT NOT NULL REFERENCES users(userid) , finance_id SERIAL PRIMARY KEY , day_income INT NOT NULL DEFAULT 0 , day_expenses INT NOT NULL DEFAULT 0 , day_summary INT NOT NULL DEFAULT 0 , spent_at VARCHAR (50) NOT NULL DEFAULT 'Personal Use' , note TEXT  , todays_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL , finance_month todays_month NOT NULL);

-- migrate:down

DROP TABLE userfinance;
DROP TABLE users;
DROP TYPE todays_month;
DROP TYPE default_currency;