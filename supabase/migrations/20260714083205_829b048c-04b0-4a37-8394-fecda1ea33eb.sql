
DROP POLICY IF EXISTS "Anyone can insert submission log" ON public.submission_log;
CREATE POLICY "Anyone can insert submission log" ON public.submission_log
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(ip_address) BETWEEN 1 AND 64
    AND char_length(form_type) BETWEEN 1 AND 32
    AND (content_hash IS NULL OR char_length(content_hash) <= 128)
  );
