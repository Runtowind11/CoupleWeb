-- ============================================
-- Storage buckets & policies
-- ============================================

-- ============================================
-- Buckets
-- photos: gallery images
-- posts-images: images embedded in blog posts
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true),
       ('posts-images', 'posts-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Read policies (anyone can view public images)
-- ============================================

DROP POLICY IF EXISTS "Anyone can read photos" ON storage.objects;
CREATE POLICY "Anyone can read photos"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Anyone can read posts-images" ON storage.objects;
CREATE POLICY "Anyone can read posts-images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'posts-images');

-- ============================================
-- Upload / delete policies (authenticated admins)
-- ============================================

DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "Authenticated users can delete photos" ON storage.objects;
CREATE POLICY "Authenticated users can delete photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Authenticated users can upload posts-images" ON storage.objects;
CREATE POLICY "Authenticated users can upload posts-images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'posts-images');

DROP POLICY IF EXISTS "Authenticated users can delete posts-images" ON storage.objects;
CREATE POLICY "Authenticated users can delete posts-images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'posts-images');
