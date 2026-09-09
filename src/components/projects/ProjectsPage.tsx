import React, { useState, useMemo, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { ProjectHero } from './ProjectHero';
import { ProjectFilters } from './ProjectFilters';
import { ProjectGrid } from './ProjectGrid';
import { ProjectsCTA } from './ProjectsCTA';

interface ProjectsPageProps {
  onSelectProject: (slug: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const { projects, isLoading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter projects by category and search query in real-time
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category check
      const seg = (project.segment || project.category || '').toLowerCase();
      const matchCategory =
        selectedCategory === 'todos' ||
        seg === selectedCategory.toLowerCase() ||
        (selectedCategory === 'esportes' && seg === 'fitness');

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
    });
  }, [projects, selectedCategory, searchQuery]);

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
            totalProjectsCount={projects.length}
            filteredCount={filteredProjects.length}
          />

          {/* Project Cards Grid */}
          {isLoading && projects.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              Carregando catálogo de projetos...
            </div>
          ) : (
            <ProjectGrid
              projects={filteredProjects}
              onSelectProject={onSelectProject}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>
      </section>

      {/* 3. Full-width Call to Action Section */}
      <ProjectsCTA onScrollToTop={handleScrollToGrid} />
    </div>
  );
};
