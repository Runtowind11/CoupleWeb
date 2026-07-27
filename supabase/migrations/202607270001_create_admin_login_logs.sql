-- ============================================
-- Table: public.admin_login_logs
-- Records login timestamps for non-primary admins
-- ============================================

CREATE TABLE IF NOT EXISTS public.admin_login_logs (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  logged_in_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_login_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all login logs
DROP POLICY IF EXISTS "Authenticated users can read login logs" ON public.admin_login_logs;
CREATE POLICY "Authenticated users can read login logs"
  ON public.admin_login_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert login logs
DROP POLICY IF EXISTS "Authenticated users can insert login logs" ON public.admin_login_logs;
CREATE POLICY "Authenticated users can insert login logs"
  ON public.admin_login_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
