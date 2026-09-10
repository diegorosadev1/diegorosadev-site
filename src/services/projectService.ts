import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Project, TechItem, FeatureItem, ResultMetric, ProjectScreenshot } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../data/projects';

const LOCAL_PROJECTS_KEY = 'diego_rosa_projects_store_v4';

// Helper to get local projects with fallback to initial seed
const getLocalProjectsStore = (): Project[] => {
  const stored = localStorage.getItem(LOCAL_PROJECTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }

  // Initialize with initial projects
  const initialized: Project[] = INITIAL_PROJECTS.map((p, index) => ({
    ...p,
    published: p.published !== undefined ? p.published : (p.status !== 'in_development'),
    featured: p.featured !== undefined ? p.featured : (index < 6),
    displayOrder: p.displayOrder ?? (index + 1),
    status: p.status || (p.published === false ? 'in_development' : 'published'),
    category: p.category || p.segment,
    thumbnailUrl: p.thumbnailUrl || p.image,
    logoUrl: p.logo,
    heroDesktopUrl: p.heroDesktopUrl || p.image,
    heroMobileUrl: p.heroMobileUrl || p.image,
    showContext: true,
    showProblems: true,
    showSolutions: true,
    showHighlights: true,
    showResults: Boolean(p.results && p.results.length > 0),
    showGallery: false,
  }));

  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(initialized));
  return initialized;
};

const saveLocalProjectsStore = (projects: Project[]) => {
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
};

export const projectService = {
  /**
   * Fetch all published projects ordered by display_order
   */
  async getPublishedProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      return local
        .filter((p) => p.published !== false && p.status !== 'in_development')
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        // Graceful fallback to initial seed
        return getLocalProjectsStore().filter((p) => p.published !== false && p.status !== 'in_development');
      }

      return data.map(this.mapSupabaseRowToProject);
    } catch {
      return getLocalProjectsStore().filter((p) => p.published !== false && p.status !== 'in_development');
    }
  },

  /**
   * Fetch projects currently in development
   */
  async getInDevelopmentProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      return local
        .filter((p) => p.status === 'in_development' || p.published === false)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .eq('published', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return getLocalProjectsStore()
          .filter((p) => p.status === 'in_development' || p.published === false)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      }

      return data.map(this.mapSupabaseRowToProject);
    } catch {
      return getLocalProjectsStore()
        .filter((p) => p.status === 'in_development' || p.published === false)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
  },

  /**
   * Fetch all portfolio projects configured to appear publicly (published and preview/in_development)
   */
  async getAllPortfolioProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      return [...local].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return [...getLocalProjectsStore()].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      }

      return data.map(this.mapSupabaseRowToProject);
    } catch {
      return [...getLocalProjectsStore()].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
  },

  /**
   * Fetch published + featured projects for Home (ordered by display_order, max 6)
   */
  async getFeaturedProjects(limit = 6): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      return local
        .filter((p) => p.published !== false && p.featured === true && p.status !== 'in_development')
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('display_order', { ascending: true })
        .limit(limit);

      if (error || !data || data.length === 0) {
        const local = getLocalProjectsStore();
        return local
          .filter((p) => p.published !== false && p.featured === true && p.status !== 'in_development')
          .slice(0, limit);
      }

      return data.map(this.mapSupabaseRowToProject);
    } catch {
      return getLocalProjectsStore()
        .filter((p) => p.published !== false && p.featured === true && p.status !== 'in_development')
        .slice(0, limit);
    }
  },

  /**
   * Fetch project by slug with all joined case study relations
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      const found = local.find((p) => p.slug === slug);
      return found || null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) {
        const local = getLocalProjectsStore();
        return local.find((p) => p.slug === slug) || null;
      }

      return this.mapSupabaseRowToProject(data);
    } catch {
      const local = getLocalProjectsStore();
      return local.find((p) => p.slug === slug) || null;
    }
  },

  /**
   * Fetch all projects for Admin with status, search and category filters
   */
  async getAllAdminProjects(options?: {
    search?: string;
    filter?: 'todos' | 'publicados' | 'rascunhos' | 'destaques';
  }): Promise<Project[]> {
    let projects: Project[] = [];

    if (!isSupabaseConfigured()) {
      projects = getLocalProjectsStore();
    } else {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            project_problems (*),
            project_solutions (*),
            project_highlights (*),
            project_results (*),
            project_images (*),
            project_technologies (
              technologies (*)
            )
          `)
          .order('display_order', { ascending: true });

        if (error || !data || data.length === 0) {
          projects = getLocalProjectsStore();
        } else {
          projects = data.map(this.mapSupabaseRowToProject);
        }
      } catch {
        projects = getLocalProjectsStore();
      }
    }

    // Apply filter
    if (options?.filter === 'publicados') {
      projects = projects.filter((p) => p.published === true);
    } else if (options?.filter === 'rascunhos') {
      projects = projects.filter((p) => p.published === false);
    } else if (options?.filter === 'destaques') {
      projects = projects.filter((p) => p.featured === true);
    }

    // Apply search
    if (options?.search?.trim()) {
      const q = options.search.toLowerCase().trim();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.segment.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    return projects;
  },

  /**
   * Fetch project by ID for Admin editor
   */
  async getAdminProjectById(id: string): Promise<Project | null> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      return local.find((p) => p.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_problems (*),
          project_solutions (*),
          project_highlights (*),
          project_results (*),
          project_images (*),
          project_technologies (
            technologies (*)
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        const local = getLocalProjectsStore();
        return local.find((p) => p.id === id) || null;
      }

      return this.mapSupabaseRowToProject(data);
    } catch {
      const local = getLocalProjectsStore();
      return local.find((p) => p.id === id) || null;
    }
  },

  /**
   * Save or Update a Project with its complete Case Study sections
   */
  async saveProject(project: Partial<Project>): Promise<Project> {
    const isEdit = Boolean(project.id && !project.id.startsWith('temp-'));
    const projectId = isEdit ? project.id! : `proj-${Date.now()}`;

    // Normalize project data
    const normalized: Project = {
      id: projectId,
      slug:
        project.slug ||
        project.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') ||
        `projeto-${Date.now()}`,
      name: project.name || 'Novo Projeto',
      segment: project.segment || project.category || 'Geral',
      category: project.category || project.segment || 'Geral',
      shortDescription: project.shortDescription || '',
      heroSummary: project.heroSummary || project.description || '',
      description: project.description || project.heroSummary || '',
      image: project.image || project.thumbnailUrl || '/images/auto-shopping.jpg',
      thumbnailUrl: project.thumbnailUrl || project.image || '',
      logoUrl: project.logoUrl || project.logo || '',
      logo: project.logo || project.logoUrl || '',
      heroDesktopUrl: project.heroDesktopUrl || project.thumbnailUrl || project.image || '',
      heroMobileUrl: project.heroMobileUrl || project.thumbnailUrl || project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      published: project.published ?? false,
      featured: project.featured ?? false,
      displayOrder: project.displayOrder ?? 0,
      showContext: project.showContext ?? true,
      showProblems: project.showProblems ?? true,
      showSolutions: project.showSolutions ?? true,
      showHighlights: project.showHighlights ?? true,
      showResults: project.showResults ?? true,
      showGallery: project.showGallery ?? true,
      context: project.context || {
        title: '',
        description: '',
        image: '',
      },
      problems: project.problems || [],
      problemItems: project.problemItems || [],
      solutions: project.solutions || [],
      solutionItems: project.solutionItems || [],
      features: project.features || [],
      highlights: project.highlights || [],
      results: project.results || [],
      resultsTitle: project.resultsTitle || 'Resultados Alcançados',
      resultsDescription: project.resultsDescription || '',
      techStack: project.techStack || [],
      technologies: project.technologies || project.techStack || [],
      screenshots: project.screenshots || project.gallery || [],
      gallery: project.gallery || project.screenshots || [],
      updatedAt: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      let updated: Project[];
      if (isEdit) {
        updated = local.map((p) => (p.id === projectId ? normalized : p));
      } else {
        updated = [normalized, ...local];
      }
      saveLocalProjectsStore(updated);
      return normalized;
    }

    try {
      const projectPayload = {
        name: normalized.name,
        slug: normalized.slug,
        category: normalized.segment,
        short_description: normalized.shortDescription,
        description: normalized.heroSummary,
        logo_url: normalized.logoUrl || null,
        thumbnail_url: normalized.thumbnailUrl || null,
        hero_desktop_url: normalized.heroDesktopUrl || null,
        hero_mobile_url: normalized.heroMobileUrl || null,
        context_title: normalized.context?.title || null,
        context_description: normalized.context?.description || null,
        context_image_url: normalized.context?.image || null,
        results_title: normalized.resultsTitle || null,
        results_description: normalized.resultsDescription || null,
        live_url: normalized.liveUrl || null,
        github_url: normalized.githubUrl || null,
        published: normalized.published ?? false,
        featured: normalized.featured ?? false,
        display_order: normalized.displayOrder ?? 0,
        show_context: normalized.showContext ?? true,
        show_problems: normalized.showProblems ?? true,
        show_solutions: normalized.showSolutions ?? true,
        show_highlights: normalized.showHighlights ?? true,
        show_results: normalized.showResults ?? true,
        show_gallery: normalized.showGallery ?? true,
        updated_at: new Date().toISOString(),
      };

      let savedId = projectId;

      if (isEdit) {
        const { error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', projectId);
        if (error) throw new Error(error.message);
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert(projectPayload)
          .select('id')
          .single();
        if (error || !data) throw new Error(error?.message || 'Falha ao salvar projeto');
        savedId = data.id;
        normalized.id = savedId;
      }

      // Sync Problems
      await supabase.from('project_problems').delete().eq('project_id', savedId);
      const problemsToInsert =
        normalized.problemItems && normalized.problemItems.length > 0
          ? normalized.problemItems.map((p, idx) => ({
              project_id: savedId,
              title: p.title,
              description: p.description || null,
              display_order: idx + 1,
            }))
          : normalized.problems.map((title, idx) => ({
              project_id: savedId,
              title,
              description: null,
              display_order: idx + 1,
            }));
      if (problemsToInsert.length > 0) {
        await supabase.from('project_problems').insert(problemsToInsert);
      }

      // Sync Solutions
      await supabase.from('project_solutions').delete().eq('project_id', savedId);
      const solutionsToInsert =
        normalized.solutionItems && normalized.solutionItems.length > 0
          ? normalized.solutionItems.map((s, idx) => ({
              project_id: savedId,
              title: s.title,
              description: s.description || null,
              display_order: idx + 1,
            }))
          : normalized.solutions.map((title, idx) => ({
              project_id: savedId,
              title,
              description: null,
              display_order: idx + 1,
            }));
      if (solutionsToInsert.length > 0) {
        await supabase.from('project_solutions').insert(solutionsToInsert);
      }

      // Sync Highlights
      await supabase.from('project_highlights').delete().eq('project_id', savedId);
      const highlightsToInsert = (normalized.highlights || normalized.features || []).map(
        (h, idx) => ({
          project_id: savedId,
          title: h.title,
          description: h.description || null,
          image_url: (h as any).imageUrl || null,
          display_order: idx + 1,
        })
      );
      if (highlightsToInsert.length > 0) {
        await supabase.from('project_highlights').insert(highlightsToInsert);
      }

      // Sync Results
      await supabase.from('project_results').delete().eq('project_id', savedId);
      const resultsToInsert = (normalized.results || []).map((r, idx) => ({
        project_id: savedId,
        value: r.value,
        label: r.label,
        icon_name: r.iconName || null,
        display_order: idx + 1,
      }));
      if (resultsToInsert.length > 0) {
        await supabase.from('project_results').insert(resultsToInsert);
      }

      // Sync Gallery / Screenshots
      await supabase.from('project_images').delete().eq('project_id', savedId);
      const imagesToInsert = (normalized.gallery || normalized.screenshots || []).map(
        (img, idx) => ({
          project_id: savedId,
          url: img.url || img.image,
          alt: img.alt || img.title || null,
          caption: img.caption || null,
          display_order: idx + 1,
        })
      );
      if (imagesToInsert.length > 0) {
        await supabase.from('project_images').insert(imagesToInsert);
      }

      return normalized;
    } catch (err: any) {
      console.warn('Error saving project to Supabase, fallback to localStorage:', err);
      const local = getLocalProjectsStore();
      const updated = isEdit
        ? local.map((p) => (p.id === projectId ? normalized : p))
        : [normalized, ...local];
      saveLocalProjectsStore(updated);
      return normalized;
    }
  },

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      const updated = local.filter((p) => p.id !== id);
      saveLocalProjectsStore(updated);
      return;
    }

    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error('Error deleting project from Supabase:', err);
      const local = getLocalProjectsStore();
      const updated = local.filter((p) => p.id !== id);
      saveLocalProjectsStore(updated);
    }
  },

  /**
   * Toggle published state
   */
  async togglePublish(id: string, published: boolean): Promise<void> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      const updated = local.map((p) => (p.id === id ? { ...p, published } : p));
      saveLocalProjectsStore(updated);
      return;
    }

    try {
      await supabase.from('projects').update({ published }).eq('id', id);
    } catch {
      const local = getLocalProjectsStore();
      const updated = local.map((p) => (p.id === id ? { ...p, published } : p));
      saveLocalProjectsStore(updated);
    }
  },

  /**
   * Toggle featured state
   */
  async toggleFeatured(id: string, featured: boolean): Promise<void> {
    if (!isSupabaseConfigured()) {
      const local = getLocalProjectsStore();
      const updated = local.map((p) => (p.id === id ? { ...p, featured } : p));
      saveLocalProjectsStore(updated);
      return;
    }

    try {
      await supabase.from('projects').update({ featured }).eq('id', id);
    } catch {
      const local = getLocalProjectsStore();
      const updated = local.map((p) => (p.id === id ? { ...p, featured } : p));
      saveLocalProjectsStore(updated);
    }
  },

  /**
   * Helper to map Supabase database record to unified Project model
   */
  mapSupabaseRowToProject(row: any): Project {
    const problems = (row.project_problems || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((p: any) => p.title);

    const problemItems = (row.project_problems || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description || undefined,
        displayOrder: p.display_order,
      }));

    const solutions = (row.project_solutions || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((s: any) => s.title);

    const solutionItems = (row.project_solutions || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description || undefined,
        displayOrder: s.display_order,
      }));

    const features: FeatureItem[] = (row.project_highlights || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((h: any) => ({
        title: h.title,
        description: h.description || '',
        imageUrl: h.image_url || undefined,
        displayOrder: h.display_order,
      }));

    const results: ResultMetric[] = (row.project_results || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((r: any) => ({
        value: r.value,
        label: r.label,
        iconName: r.icon_name || undefined,
        displayOrder: r.display_order,
      }));

    const gallery: ProjectScreenshot[] = (row.project_images || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((img: any) => ({
        id: img.id,
        image: img.url,
        url: img.url,
        title: img.alt || undefined,
        alt: img.alt || undefined,
        caption: img.caption || undefined,
        displayOrder: img.display_order,
      }));

    const techStack: TechItem[] = (row.project_technologies || [])
      .map((pt: any) => pt.technologies)
      .filter(Boolean)
      .map((t: any) => ({
        name: t.name,
        subtitle: t.subtitle || 'Tecnologia',
      }));

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      segment: row.category,
      category: row.category,
      shortDescription: row.short_description,
      heroSummary: row.description || row.short_description,
      description: row.description || row.short_description,
      image: row.thumbnail_url || row.hero_desktop_url || '/images/auto-shopping.jpg',
      thumbnailUrl: row.thumbnail_url || undefined,
      logoUrl: row.logo_url || undefined,
      logo: row.logo_url || undefined,
      heroDesktopUrl: row.hero_desktop_url || row.thumbnail_url || undefined,
      heroMobileUrl: row.hero_mobile_url || row.thumbnail_url || undefined,
      liveUrl: row.live_url || '',
      githubUrl: row.github_url || undefined,
      published: row.published,
      featured: row.featured,
      displayOrder: row.display_order,
      showContext: row.show_context !== false,
      showProblems: row.show_problems !== false,
      showSolutions: row.show_solutions !== false,
      showHighlights: row.show_highlights !== false,
      showResults: row.show_results !== false,
      showGallery: row.show_gallery !== false,
      context: {
        title: row.context_title || '',
        description: row.context_description || '',
        image: row.context_image_url || undefined,
      },
      problems,
      problemItems,
      solutions,
      solutionItems,
      features,
      highlights: features,
      results,
      resultsTitle: row.results_title || 'Resultados Alcançados',
      resultsDescription: row.results_description || undefined,
      techStack: techStack.length > 0 ? techStack : [{ name: 'React', subtitle: 'Frontend' }],
      technologies: techStack.length > 0 ? techStack : [{ name: 'React', subtitle: 'Frontend' }],
      screenshots: gallery,
      gallery,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  },
};
