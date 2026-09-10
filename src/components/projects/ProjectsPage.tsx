import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Project } from '../../types';
import { projectService } from '../../services/projectService';
import { ProjectHero } from './ProjectHero';
import { ProjectFilters } from './ProjectFilters';
import { ProjectGrid } from './ProjectGrid';
import { ProjectsCTA } from './ProjectsCTA';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { Clock, RotateCcw, AlertCircle } from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject?: (slug: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectService.getAllPortfolioProjects();
      setAllProjects(data);
    } catch (err: any) {
      console.error('Erro ao carregar catálogo de projetos:', err);
      setError(err?.message || 'Erro ao carregar o catálogo de projetos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadData();
  }, [loadData]);

  const filterProjectItem = (project: Project) => {
    // 1. Category check
    const seg = (project.segment || project.category || '').toLowerCase();
    const name = project.name.toLowerCase();
    const slug = project.slug.toLowerCase();

    let matchCategory = selectedCategory === 'todos';

    if (!matchCategory) {
      if (selectedCategory === 'automotivo') {
        matchCategory =
          seg.includes('auto') ||
          slug.includes('motors') ||
          slug.includes('shopping') ||
          slug.includes('shineray') ||
          name.includes('auto') ||
          name.includes('motors') ||
          name.includes('shineray');
      } else if (selectedCategory === 'esportes') {
        matchCategory =
          seg.includes('esporte') ||
          seg.includes('fitness') ||
          slug.includes('bg') ||
          slug.includes('protocolo') ||
          slug.includes('trainer') ||
          name.includes('bg') ||
          name.includes('protocolo') ||
          name.includes('trainer');
      } else if (selectedCategory === 'tecnologia') {
        matchCategory =
          seg.includes('tecnologia') ||
          seg.includes('saas') ||
          slug.includes('tracker') ||
          slug.includes('synvia') ||
          slug.includes('mobiis') ||
          name.includes('tracker') ||
          name.includes('synvia') ||
          name.includes('mobiis');
      } else if (selectedCategory === 'institucional') {
        matchCategory =
          seg.includes('institucional') ||
          slug.includes('synvia') ||
          slug.includes('mobiis') ||
          name.includes('synvia') ||
          name.includes('mobiis');
      } else {
        matchCategory = seg === selectedCategory.toLowerCase();
      }
    }

    if (!matchCategory) return false;

    // 2. Search query check
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const inName = project.name.toLowerCase().includes(q);
    const inDescription = (project.shortDescription || '').toLowerCase().includes(q);
    const inSegment = seg.includes(q);
    const inTech = (project.techStack || project.technologies || []).some((t) =>
      t.name.toLowerCase().includes(q)
    );

    return inName || inDescription || inSegment || inTech;
  };

  // Filter all projects in portfolio
  const filteredProjects = useMemo(() => {
    return allProjects.filter(filterProjectItem);
  }, [allProjects, selectedCategory, searchQuery]);

  const filteredTotalCount = filteredProjects.length;

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
  };

  const handleScrollToGrid = () => {
    const el = document.getElementById('projects-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="projects-page-container" className="w-full min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      {/* 1. Hero Section */}
      <ProjectHero />

      {/* 2. Main Projects Content Area */}
      <section
        id="projects-grid-section"
        aria-label="Catálogo de Projetos"
        className="w-full relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          {/* Filter Bar (Categories + Realtime Search) */}
          <ProjectFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {error ? (
            <div className="py-16 px-6 rounded-2xl bg-[#0a0f1d]/80 border border-red-500/20 max-w-md mx-auto text-center my-6">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3 opacity-90" />
              <p className="text-sm font-medium text-slate-200 mb-1">
                Não foi possível carregar os projetos.
              </p>
              <p className="text-xs text-slate-400 mb-4">
                {error}
              </p>
              <button
                type="button"
                onClick={() => loadData()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tentar novamente</span>
              </button>
            </div>
          ) : isLoading ? (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="h-4 w-44 bg-slate-800/80 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={`skeleton-catalog-${i}`} variant="catalog" />
                ))}
              </div>
            </div>
          ) : filteredTotalCount === 0 ? (
            <div
              id="projects-empty-state"
              className="w-full py-16 px-4 text-center rounded-2xl bg-[#0a0f1d] border border-slate-800/80 flex flex-col items-center justify-center space-y-4 my-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="text-base font-semibold text-white">Nenhum projeto encontrado</h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Não encontramos nenhum projeto com os filtros atuais. Tente ajustar os termos de busca ou selecionar outra categoria.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md shadow-blue-600/20"
              >
                Ver todos os projetos
              </button>
            </div>
          ) : (
            <div className="space-y-16 animate-fadeIn">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    PROJETOS NO PORTFÓLIO ({filteredProjects.length})
                  </span>
                </div>

                <ProjectGrid
                  projects={filteredProjects}
                  onSelectProject={onSelectProject}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Full-width Call to Action Section */}
      <ProjectsCTA onScrollToTop={handleScrollToGrid} />
    </div>
  );
};
