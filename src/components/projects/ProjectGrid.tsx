import React from 'react';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { SearchX, RotateCcw } from 'lucide-react';

export interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  skeletonCount?: number;
  onSelectProject?: (slug: string) => void;
  onResetFilters?: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  isLoading,
  skeletonCount = 6,
  onSelectProject,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProjectCardSkeleton key={`skeleton-grid-${i}`} variant="catalog" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div
        id="projects-empty-state"
        className="w-full py-16 px-4 text-center rounded-2xl bg-[#0a0f1d] border border-slate-800/80 flex flex-col items-center justify-center space-y-4 my-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <SearchX className="w-7 h-7" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h4 className="text-base font-semibold text-white">Nenhum projeto encontrado</h4>
          <p className="text-xs sm:text-sm text-slate-400">
            Não encontramos nenhum projeto com os termos pesquisados. Tente ajustar os filtros ou a busca.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md shadow-blue-600/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ver todos os projetos</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id="projects-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fadeIn"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id || project.slug}
          title={project.name}
          category={project.category || project.segment}
          description={project.shortDescription}
          image={project.image}
          technologies={project.techStack || project.technologies || []}
          slug={project.slug}
          externalUrl={project.liveUrl || project.url}
          logo={project.logo || project.logoUrl}
          status={project.status || (project.published === false ? 'in_development' : 'published')}
          isProfessionalExperience={project.isProfessionalExperience}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
};
