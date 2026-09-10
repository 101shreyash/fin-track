-- migrate:up


ALTER TABLE public.userfinance
DROP CONSTRAINT userfinance_userid_fkey;

ALTER TABLE public.userfinance
ADD CONSTRAINT userfinance_userid_fkey
FOREIGN KEY (userid)
REFERENCES public.users(userid)
ON DELETE CASCADE;


ALTER TABLE public.receipt
DROP CONSTRAINT receipt_finance_id_fkey;

ALTER TABLE public.receipt
ADD CONSTRAINT receipt_finance_id_fkey
FOREIGN KEY (finance_id)
REFERENCES public.userfinance(finance_id)
ON DELETE CASCADE;

-- migrate:down

