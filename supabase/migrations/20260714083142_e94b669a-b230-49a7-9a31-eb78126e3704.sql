
-- ============ ENQUIRIES ============
ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS reference_number text NOT NULL DEFAULT ('ENQ-' || to_char(now(), 'YYMMDD') || '-' || upper(substr(gen_random_uuid()::text, 1, 6))),
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS pincode text,
  ADD COLUMN IF NOT EXISTS gst_number text,
  ADD COLUMN IF NOT EXISTS expected_order_date date,
  ADD COLUMN IF NOT EXISTS monthly_requirement text,
  ADD COLUMN IF NOT EXISTS consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS source_page text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS follow_up_date date,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'enquiries_status_check') THEN
    ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_status_check
      CHECK (status IN ('new','contacted','specification_shared','quote_sent','follow_up_required','negotiation','converted','lost','spam'));
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Refresh enquiry insert policy to require consent
DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(phone) BETWEEN 5 AND 30
    AND (message IS NULL OR char_length(message) <= 2000)
    AND consent = true
  );

-- Admin read/update on enquiries
DROP POLICY IF EXISTS "Admins can view all enquiries" ON public.enquiries;
CREATE POLICY "Admins can view all enquiries" ON public.enquiries
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update enquiries" ON public.enquiries;
CREATE POLICY "Admins can update enquiries" ON public.enquiries
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

GRANT SELECT, UPDATE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

-- ============ ORDERS (bulk requirements) ============
ALTER TABLE public.orders ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN status TYPE text USING status::text;
UPDATE public.orders SET status = 'requirement_received' WHERE status = 'new' OR status IS NULL;
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'requirement_received';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_status_check') THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_status_check
      CHECK (status IN ('requirement_received','under_review','price_confirmed','awaiting_payment','confirmed','packed','dispatched','delivered','cancelled'));
  END IF;
END $$;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS pincode text,
  ADD COLUMN IF NOT EXISTS gst_number text,
  ADD COLUMN IF NOT EXISTS po_reference text,
  ADD COLUMN IF NOT EXISTS required_delivery_date date,
  ADD COLUMN IF NOT EXISTS consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS source_page text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS follow_up_date date,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS bags integer;

DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can submit a bulk requirement" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(customer_name) BETWEEN 1 AND 120
    AND char_length(phone) BETWEEN 5 AND 30
    AND char_length(product_slug) BETWEEN 1 AND 120
    AND char_length(product_name) BETWEEN 1 AND 200
    AND quantity > 0 AND quantity <= 100000
    AND (notes IS NULL OR char_length(notes) <= 2000)
    AND consent = true
  );

-- Drop old order_status enum if now unused
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    BEGIN
      DROP TYPE public.order_status;
    EXCEPTION WHEN dependent_objects_still_exist THEN
      NULL;
    END;
  END IF;
END $$;

-- ============ SUBMISSION LOG (rate limiting) ============
CREATE TABLE IF NOT EXISTS public.submission_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  form_type text NOT NULL,
  content_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.submission_log TO anon, authenticated;
GRANT ALL ON public.submission_log TO service_role;

ALTER TABLE public.submission_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert submission log" ON public.submission_log;
CREATE POLICY "Anyone can insert submission log" ON public.submission_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS submission_log_ip_created ON public.submission_log(ip_address, created_at DESC);
