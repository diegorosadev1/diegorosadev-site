import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Car,
  Dumbbell,
  Building2,
  Navigation,
  LayoutGrid,
  Cloud,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { Project } from '../types';
import { useFeaturedProjects } from '../hooks/useFeaturedProjects';
import { ProjectCardSkeleton } from './projects/ProjectCardSkeleton';

interface FeaturedProjectsProps {
  projects?: Project[];
  onSelectProject?: (slug: string) => void;
  onViewAllProjects?: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects: propProjects,
  onViewAllProjects,
}) => {
  const { projects: hookProjects, isLoading, error, refetch } = useFeaturedProjects(6);
  const featuredProjects =
    propProjects && propProjects.length > 0 ? propProjects.slice(0, 6) : hookProjects;

  const getCardConfig = (slug: string, project: Project) => {
    switch (slug) {
      case 'synvia':
        return {
          categoryLabel: 'SITE INSTITUCIONAL',
          categoryIcon: <Building2 className="w-3 h-3 text-[#38bdf8]" />,
          isProfessional: true,
          categoryBadgeClass:
            'bg-[#050b18]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
          cardBorderClass:
            'border-blue-500/40 hover:border-blue-400 shadow-[0_0_24px_rgba(56,189,248,0.12)]',
          techs: ['React', 'TypeScript', 'Tailwind', 'Vite'],
        };
      case 'auto-shopping':
        return {
          categoryLabel: 'WEBSITE',
          categoryIcon: <Car className="w-3 h-3 text-[#38bdf8]" />,
          isProfessional: false,
          categoryBadgeClass:
            'bg-[#050b18]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
          cardBorderClass:
            'border-blue-500/40 hover:border-blue-400 shadow-[0_0_24px_rgba(56,189,248,0.12)]',
          techs: ['React', 'TypeScript', 'Vite', 'Supabase'],
        };
      case 'canaa-motors':
        return {
          categoryLabel: 'WEBSITE',
          categoryIcon: <Car className="w-3 h-3 text-amber-400" />,
          isProfessional: false,
          categoryBadgeClass:
            'bg-[#181105]/90 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          cardBorderClass:
            'border-amber-500/45 hover:border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.15)]',
          techs: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        };
      case 'avance-motors':
        return {
          categoryLabel: 'WEBSITE',
          categoryIcon: <Car className="w-3 h-3 text-cyan-400" />,
          isProfessional: false,
          categoryBadgeClass:
            'bg-[#04141d]/90 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
          cardBorderClass:
            'border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.12)]',
          techs: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        };
      case 'team-bg':
        return {
          categoryLabel: 'LANDING PAGE',
          categoryIcon: <Dumbbell className="w-3 h-3 text-blue-400" />,
          isProfessional: false,
          categoryBadgeClass:
            'bg-[#060e22]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
          cardBorderClass:
            'border-blue-500/45 hover:border-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.15)]',
          techs: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        };
      case 'gotracker':
        return {
          categoryLabel: 'LANDING PAGE',
          categoryIcon: <Navigation className="w-3 h-3 text-purple-400" />,
          isProfessional: false,
          categoryBadgeClass:
            'bg-[#140822]/90 border-purple-400/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
          cardBorderClass:
            'border-purple-500/45 hover:border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.16)]',
          techs: ['React', 'TypeScript', 'Tailwind', 'Vite'],
        };
      default: {
        const cat = (project.segment || project.category || 'WEBSITE').toUpperCase();
        return {
          categoryLabel: cat,
          categoryIcon: <LayoutGrid className="w-3 h-3 text-[#38bdf8]" />,
          isProfessional: Boolean(project.isProfessionalExperience),
          categoryBadgeClass:
            'bg-[#050b18]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
          cardBorderClass:
            'border-slate-800 hover:border-blue-400/60 shadow-[0_0_24px_rgba(56,189,248,0.1)]',
          techs: (project.techStack || []).map((t) => t.name).slice(0, 4),
        };
      }
    }
  };

  const renderTechIcon = (tech: string) => {
    switch (tech) {
      case 'React':
        return (
          <svg className="w-3 h-3 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.4" />
            <circle cx="12" cy="12" r="2.2" />
          </svg>
        );
      case 'TypeScript':
        return (
          <span className="w-3 h-3 rounded-[2px] bg-[#3178c6] text-[8px] font-extrabold text-white flex items-center justify-center leading-none">
            TS
          </span>
        );
      case 'Vite':
        return (
          <span className="text-yellow-400 text-[10px] leading-none">⚡</span>
        );
      case 'Supabase':
        return (
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
        );
      case 'Tailwind':
      case 'Tailwind CSS':
        return (
          <span className="text-[#38bdf8] text-[10px] font-bold leading-none">≈</span>
        );
      default:
        return <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />;
    }
  };

  return (
    <section
      id="projetos"
      className="relative py-20 sm:py-28 bg-[#040711] overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Tag Pill com Ponto Pulsante */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081026] border border-blue-500/30 text-xs font-semibold text-[#38bdf8] mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]" />
            </span>
            <span>PORTFÓLIO SELECIONADO</span>
          </div>

          {/* Título Principal */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Projetos em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-blue-400 to-indigo-300">
              destaque
            </span>
          </h2>

          {/* Texto descritivo solicitado pelo usuário */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Conheça alguns dos projetos que já desenvolvi para diferentes negócios. Cada site foi pensado para fortalecer a marca, melhorar a experiência do cliente e gerar novas oportunidades.
          </p>
        </div>

        {/* Grid de 6 Projetos */}
        {error && featuredProjects.length === 0 ? (
          <div className="py-12 px-6 rounded-2xl bg-[#0a0f1d]/80 border border-red-500/20 max-w-md mx-auto text-center my-6">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3 opacity-90" />
            <p className="text-sm font-medium text-slate-200 mb-1">
              Não foi possível carregar os projetos em destaque.
            </p>
            <p className="text-xs text-slate-400 mb-4">
              {error}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tentar novamente</span>
            </button>
          </div>
        ) : isLoading && featuredProjects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={`skeleton-featured-${i}`} variant="featured" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fadeIn">
            {featuredProjects.slice(0, 6).map((project) => {
              const config = getCardConfig(project.slug, project);
              const targetUrl = project.liveUrl || (project as any).url;

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.slug}`}
                  onClick={() => {
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={`group relative bg-[#060a16]/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${config.cardBorderClass}`}
                >
                  <div>
                    {/* Visual Preview Box */}
                    <div className="relative aspect-[16/9.5] rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800/80">
                      <img
                        src={project.heroDesktopUrl || project.thumbnailUrl || project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Overlay sutil inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a16]/70 via-transparent to-transparent pointer-events-none" />

                      {/* Pill da Categoria no topo esquerdo da imagem */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        <span
                          className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 ${config.categoryBadgeClass}`}
                        >
                          {config.categoryIcon}
                          <span>{config.categoryLabel}</span>
                        </span>

                        {config.isProfessional && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[9px] font-semibold text-slate-300 uppercase tracking-wider">
                            Experiência Profissional
                          </span>
                        )}
                      </div>

                      {/* External Link Icon flutuante no topo direito */}
                      {targetUrl && (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Acessar site de ${project.name}`}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-blue-600/90 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Título do Projeto */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors leading-snug">
                      {project.name}
                    </h3>

                    {/* Descrição */}
                    <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mb-4 min-h-[38px] line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {config.techs.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0a1122] border border-slate-800/90 text-[11px] font-medium text-slate-300"
                        >
                          {renderTechIcon(tech)}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rodapé do Card: Botão Principal 'Visitar site →' */}
                  <div className="pt-4 border-t border-slate-800/60">
                    {targetUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group/btn"
                      >
                        <span>Visitar site</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    ) : (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
                        <span>Em breve</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Botão Ver todos os projetos */}
        {onViewAllProjects && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0a1122] hover:bg-[#0f1b36] border border-slate-700/80 hover:border-[#38bdf8]/60 text-sm font-semibold text-white hover:text-[#38bdf8] shadow-lg shadow-black/40 hover:shadow-[#38bdf8]/10 transition-all duration-300 cursor-pointer group"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Rodapé da Seção: = TECNOLOGIA / PERFORMANCE / RESULTADOS + Assinatura Diego Rosa */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Lado Esquerdo: Tagline */}
          <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-[0.25em]">
            <div className="flex flex-col gap-1 text-[#38bdf8]">
              <span className="w-5 h-[2px] bg-[#38bdf8] rounded-full" />
              <span className="w-5 h-[2px] bg-[#38bdf8] rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <span>TECNOLOGIA</span>
              <span className="text-slate-600">/</span>
              <span>PERFORMANCE</span>
              <span className="text-slate-600">/</span>
              <span>RESULTADOS</span>
            </div>
          </div>

          {/* Lado Direito: Assinatura estilizada Diego Rosa */}
          <div className="flex flex-col items-center sm:items-end select-none">
            <span className="font-['Caveat'] text-3xl sm:text-4xl font-bold tracking-wide text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.25)] transform -rotate-2">
              Diego Rosa
            </span>
            <svg
              className="w-28 sm:w-32 h-3 -mt-1 text-[#38bdf8]/80"
              viewBox="0 0 140 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 9C40 2.5 90 2 138 6.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};
