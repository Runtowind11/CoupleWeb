-- Add missing DELETE policy for admin_login_logs

DROP POLICY IF EXISTS "Authenticated users can delete login logs" ON public.admin_login_logs;
CREATE POLICY "Authenticated users can delete login logs"
  ON public.admin_login_logs
  FOR DELETE
  TO authenticated
  USING (true);
