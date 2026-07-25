-- ============================================
-- Enable RLS on all tables & create policies
-- ============================================

-- ============================================
-- Table: public.admins
-- ============================================

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view their own record" ON public.admins;
CREATE POLICY "Admins can view their own record"
  ON public.admins
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- ============================================
-- Table: public.pending_approvals
-- ============================================

ALTER TABLE public.pending_approvals ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including unauthenticated users) to read approved approvals
DROP POLICY IF EXISTS "Anyone can read approved approvals" ON public.pending_approvals;
CREATE POLICY "Anyone can read approved approvals"
  ON public.pending_approvals
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Allow authenticated admins to read all pending approvals
DROP POLICY IF EXISTS "Authenticated users can read all approvals" ON public.pending_approvals;
CREATE POLICY "Authenticated users can read all approvals"
  ON public.pending_approvals
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated admins to insert approvals
DROP POLICY IF EXISTS "Authenticated users can insert approvals" ON public.pending_approvals;
CREATE POLICY "Authenticated users can insert approvals"
  ON public.pending_approvals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated admins to update approvals
DROP POLICY IF EXISTS "Authenticated users can update approvals" ON public.pending_approvals;
CREATE POLICY "Authenticated users can update approvals"
  ON public.pending_approvals
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated admins to delete approvals
DROP POLICY IF EXISTS "Authenticated users can delete approvals" ON public.pending_approvals;
CREATE POLICY "Authenticated users can delete approvals"
  ON public.pending_approvals
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Table: public.photos
-- ============================================

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view photos (public gallery)
DROP POLICY IF EXISTS "Anyone can view photos" ON public.photos;
CREATE POLICY "Anyone can view photos"
  ON public.photos
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated admins to insert photos
DROP POLICY IF EXISTS "Authenticated users can insert photos" ON public.photos;
CREATE POLICY "Authenticated users can insert photos"
  ON public.photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated admins to delete photos
DROP POLICY IF EXISTS "Authenticated users can delete photos" ON public.photos;
CREATE POLICY "Authenticated users can delete photos"
  ON public.photos
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Table: public.posts
-- ============================================

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view published posts (public blog)
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.posts;
CREATE POLICY "Anyone can view published posts"
  ON public.posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users to view all posts (dashboard)
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON public.posts;
CREATE POLICY "Authenticated users can view all posts"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated admins to insert posts
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.posts;
CREATE POLICY "Authenticated users can insert posts"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated admins to update posts
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.posts;
CREATE POLICY "Authenticated users can update posts"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated admins to delete posts
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.posts;
CREATE POLICY "Authenticated users can delete posts"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (true);
