-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR PORTFÓLIO & CMS "DIEGO ROSA"
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create admin_users table (References auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_admin_user UNIQUE(user_id)
);

-- Helper function to check if current session user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  thumbnail_url TEXT,
  hero_desktop_url TEXT,
  hero_mobile_url TEXT,
  context_title TEXT,
  context_description TEXT,
  context_image_url TEXT,
  results_title TEXT DEFAULT 'Resultados Alcançados',
  results_description TEXT,
  live_url TEXT,
  github_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  show_context BOOLEAN NOT NULL DEFAULT true,
  show_problems BOOLEAN NOT NULL DEFAULT true,
  show_solutions BOOLEAN NOT NULL DEFAULT true,
  show_highlights BOOLEAN NOT NULL DEFAULT true,
  show_results BOOLEAN NOT NULL DEFAULT true,
  show_gallery BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published_featured ON public.projects(published, featured, display_order);

-- 4. Project Problems
CREATE TABLE IF NOT EXISTS public.project_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_project_problems_project_id ON public.project_problems(project_id, display_order);

-- 5. Project Solutions
CREATE TABLE IF NOT EXISTS public.project_solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_project_solutions_project_id ON public.project_solutions(project_id, display_order);

-- 6. Project Highlights
CREATE TABLE IF NOT EXISTS public.project_highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_project_highlights_project_id ON public.project_highlights(project_id, display_order);

-- 7. Project Results / Metrics
CREATE TABLE IF NOT EXISTS public.project_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon_name TEXT,
  display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_project_results_project_id ON public.project_results(project_id, display_order);

-- 8. Project Images / Gallery / Screenshots
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id, display_order);

-- 9. Technologies catalog
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL,
  icon TEXT,
  subtitle TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Project Technologies (ManyToMany)
CREATE TABLE IF NOT EXISTS public.project_technologies (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  technology_id UUID NOT NULL REFERENCES public.technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- 11. Services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0
);

-- 12. Site Content table (Hero, About, CTA, Contact as JSONB)
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. Site Settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT DEFAULT 'Diego Rosa - Desenvolvedor Web',
  logo_url TEXT,
  favicon_url TEXT,
  cnpj TEXT,
  default_meta_title TEXT DEFAULT 'Diego Rosa | Desenvolvedor Web & Soluções Digitais',
  default_meta_description TEXT DEFAULT 'Desenvolvo sites, landing pages e experiências digitais profissionais para empresas que querem vender mais.',
  og_image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 1. admin_users policies:
CREATE POLICY "Admins can view admin_users" ON public.admin_users
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- 2. projects policies:
-- Public can only see published projects
CREATE POLICY "Public can view published projects" ON public.projects
  FOR SELECT USING (published = true);

-- Admins can do anything with projects
CREATE POLICY "Admins have full access to projects" ON public.projects
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. Child tables policies:
-- Public can view children if parent project is published
CREATE POLICY "Public can view problems of published projects" ON public.project_problems
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_problems.project_id AND published = true)
  );
CREATE POLICY "Admins have full access to problems" ON public.project_problems
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view solutions of published projects" ON public.project_solutions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_solutions.project_id AND published = true)
  );
CREATE POLICY "Admins have full access to solutions" ON public.project_solutions
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view highlights of published projects" ON public.project_highlights
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_highlights.project_id AND published = true)
  );
CREATE POLICY "Admins have full access to highlights" ON public.project_highlights
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view results of published projects" ON public.project_results
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_results.project_id AND published = true)
  );
CREATE POLICY "Admins have full access to results" ON public.project_results
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view images of published projects" ON public.project_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_images.project_id AND published = true)
  );
CREATE POLICY "Admins have full access to images" ON public.project_images
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Technologies catalog:
CREATE POLICY "Public can view technologies" ON public.technologies
  FOR SELECT USING (true);
CREATE POLICY "Admins have full access to technologies" ON public.technologies
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view project technologies" ON public.project_technologies
  FOR SELECT USING (true);
CREATE POLICY "Admins have full access to project technologies" ON public.project_technologies
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Services:
CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT USING (active = true);
CREATE POLICY "Admins have full access to services" ON public.services
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Site content & Settings:
CREATE POLICY "Public can view site content" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Admins have full access to site content" ON public.site_content
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public can view site settings" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins have full access to site settings" ON public.site_settings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS SETUP
-- ==============================================================================
-- Insert buckets into storage.buckets if they do not exist
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('portfolio-projects', 'portfolio-projects', true),
  ('portfolio-site', 'portfolio-site', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies:
-- Anyone can view public files
CREATE POLICY "Public files are accessible by anyone"
ON storage.objects FOR SELECT
USING (bucket_id IN ('portfolio-projects', 'portfolio-site'));

-- Only admins can upload/update/delete files
CREATE POLICY "Admins can insert files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('portfolio-projects', 'portfolio-site')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);

CREATE POLICY "Admins can update files"
ON storage.objects FOR UPDATE
USING (
  bucket_id IN ('portfolio-projects', 'portfolio-site')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);

CREATE POLICY "Admins can delete files"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('portfolio-projects', 'portfolio-site')
  AND (public.is_admin() OR auth.role() = 'authenticated')
);
