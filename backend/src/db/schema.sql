\restrict dbmate

-- Dumped from database version 17.9 (Debian 17.9-0+deb13u1)
-- Dumped by pg_dump version 17.9 (Debian 17.9-0+deb13u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: default_currency; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.default_currency AS ENUM (
    'USD',
    'AUD',
    'INR',
    'NPR',
    'EUR',
    'CAD'
);


--
-- Name: todays_month; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.todays_month AS ENUM (
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
    'december'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: receipt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receipt (
    userid integer NOT NULL,
    finance_id integer NOT NULL,
    receipt_img_url text,
    receipt_id integer NOT NULL
);


--
-- Name: receipt_receipt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.receipt_receipt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: receipt_receipt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.receipt_receipt_id_seq OWNED BY public.receipt.receipt_id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: userfinance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.userfinance (
    userid integer NOT NULL,
    finance_id integer NOT NULL,
    day_income integer DEFAULT 0,
    day_expenses integer DEFAULT 0,
    spent_at character varying(50) DEFAULT 'Personal Use'::character varying,
    note text,
    todays_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    finance_month public.todays_month NOT NULL,
    gained_at character varying(50) DEFAULT 'Usual Paychecks'::character varying NOT NULL
);


--
-- Name: userfinance_finance_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.userfinance_finance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userfinance_finance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.userfinance_finance_id_seq OWNED BY public.userfinance.finance_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username text NOT NULL,
    full_name text DEFAULT 'fullname'::text NOT NULL,
    hash_password text NOT NULL,
    currency_type public.default_currency DEFAULT 'USD'::public.default_currency NOT NULL,
    joined_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: receipt receipt_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receipt ALTER COLUMN receipt_id SET DEFAULT nextval('public.receipt_receipt_id_seq'::regclass);


--
-- Name: userfinance finance_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.userfinance ALTER COLUMN finance_id SET DEFAULT nextval('public.userfinance_finance_id_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Name: receipt receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receipt
    ADD CONSTRAINT receipt_pkey PRIMARY KEY (receipt_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: userfinance userfinance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.userfinance
    ADD CONSTRAINT userfinance_pkey PRIMARY KEY (finance_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: receipt receipt_finance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receipt
    ADD CONSTRAINT receipt_finance_id_fkey FOREIGN KEY (finance_id) REFERENCES public.userfinance(finance_id);


--
-- Name: receipt receipt_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receipt
    ADD CONSTRAINT receipt_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- Name: userfinance userfinance_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.userfinance
    ADD CONSTRAINT userfinance_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260902135831'),
    ('20260905092301'),
    ('20260905101056'),
    ('20260905125635'),
    ('20260909075245'),
    ('20260909080051');
