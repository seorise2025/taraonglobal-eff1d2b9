
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  city TEXT,
  state TEXT,
  product_needed TEXT,
  quantity TEXT,
  buyer_type TEXT,
  message TEXT
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(phone) BETWEEN 5 AND 30
    AND (message IS NULL OR char_length(message) <= 2000)
  );
