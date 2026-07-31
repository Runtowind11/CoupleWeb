-- ============================================
-- Buckets
-- music: homepage background music uploaded from admin
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('music', 'music', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Read policies (anyone can read public music)
-- ============================================

DROP POLICY IF EXISTS "Anyone can read music" ON storage.objects;
CREATE POLICY "Anyone can read music"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'music');

-- ============================================
-- Upload / delete policies (authenticated admins)
-- ============================================

DROP POLICY IF EXISTS "Authenticated users can upload music" ON storage.objects;
CREATE POLICY "Authenticated users can upload music"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'music');

DROP POLICY IF EXISTS "Authenticated users can delete music" ON storage.objects;
CREATE POLICY "Authenticated users can delete music"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'music');
