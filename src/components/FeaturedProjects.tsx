import React from 'react';
import {
  ArrowRight,
  Car,
  LayoutGrid,
  Zap,
  Users,
  Cloud,
} from 'lucide-react';
import { Project } from '../types';
import { useFeaturedProjects } from '../hooks/useFeaturedProjects';

interface FeaturedProjectsProps {
  projects?: Project[];
  onSelectProject: (slug: string) => void;
  onViewAllProjects?: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects: propProjects,
  onSelectProject,
  onViewAllProjects,
}) => {
  const { projects: hookProjects, isLoading } = useFeaturedProjects(6);
  const featuredProjects =
    propProjects && propProjects.length > 0 ? propProjects.slice(0, 6) : hookProjects;

  const getCardConfig = (slug: string, index: number) => {
    switch (slug) {
      case 'auto-shopping':
        return {
          categoryLabel: 'WEBSITE',
          categoryIcon: <Car className="w-3 h-3 text-[#38bdf8]" />,
          categoryBadgeClass:
            'bg-[#050b18]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
          cardBorderClass:
            'border-blue-500/40 hover:border-blue-400 shadow-[0_0_24px_rgba(56,189,248,0.12)]',
          techs: ['React', 'TypeScript', 'Vite', 'Supabase'],
        };
      case 'mohave-motors':
        return {
          categoryLabel: 'LANDING PAGE',
          categoryIcon: <Car className="w-3 h-3 text-sky-400" />,
          categoryBadgeClass:
            'bg-[#090e1c]/90 border-sky-400/40 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
          cardBorderClass:
            'border-slate-700/80 hover:border-sky-400/60 shadow-[0_0_24px_rgba(56,189,248,0.08)]',
          techs: ['React', 'TypeScript', 'Vite', 'Tailwind'],
        };
      case 'canaa-motors':
        return {
          categoryLabel: 'PLATAFORMA',
          categoryIcon: <LayoutGrid className="w-3 h-3 text-amber-400" />,
          categoryBadgeClass:
            'bg-[#181105]/90 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          cardBorderClass:
            'border-amber-500/45 hover:border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.15)]',
          techs: ['React', 'TypeScript', 'Vite', 'Supabase'],
        };
      case 'bruno-fitness':
        return {
          categoryLabel: 'LANDING PAGE',
          categoryIcon: <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400/20" />,
          categoryBadgeClass:
            'bg-[#181504]/90 border-yellow-400/50 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.25)]',
          cardBorderClass:
            'border-yellow-400/50 hover:border-yellow-300 shadow-[0_0_24px_rgba(234,179,8,0.18)]',
          techs: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
        };
      case 'team-bg':
        return {
          categoryLabel: 'LANDING PAGE',
          categoryIcon: <Users className="w-3 h-3 text-blue-400" />,
          categoryBadgeClass:
            'bg-[#060e22]/90 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)]',
          cardBorderClass:
            'border-blue-500/45 hover:border-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.15)]',
          techs: ['React', 'TypeScript', 'Vite', 'Supabase'],
        };
      case 'gotracker':
      default:
        return {
          categoryLabel: 'SAAS',
          categoryIcon: <Cloud className="w-3 h-3 text-purple-400" />,
          categoryBadgeClass:
            'bg-[#140822]/90 border-purple-400/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]',
          cardBorderClass:
            'border-purple-500/45 hover:border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.16)]',
          techs: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
        };
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
          <svg className="w-3 h-3 text-[#a855f7]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 2L3 14h7v8l10.5-12h-7l3-8z" />
          </svg>
        );
      case 'Tailwind':
        return (
          <svg className="w-3 h-3 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7.9.3 1.6 1 2.3 1.7C14.2 12.2 15.6 13.5 19 13.5c3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-.9-.3-1.6-1-2.3-1.7C16.8 7.3 15.4 6 12 6zM5 13.5c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.9-2.3 4.7-1.7.9.3 1.6 1 2.3 1.7 1.2 1.2 2.6 2.5 6 2.5 3.3 0 5.3-1.7 6-5-1.3 1.7-2.9 2.3-4.7 1.7-.9-.3-1.6-1-2.3-1.7-1.2-1.2-2.6-2.5-6-2.5z" />
          </svg>
        );
      case 'Supabase':
        return (
          <svg className="w-3 h-3 text-[#3ecf8e]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.362 9.354H12V.3a.3.3 0 0 0-.535-.205L.235 13.626a.3.3 0 0 0 .23.498H12v9.576a.3.3 0 0 0 .535.205l11.23-13.531a.3.3 0 0 0-.23-.498z" />
          </svg>
        );
      default:
        return <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />;
    }
  };

  return (
    <section id="projetos" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Luzes ambientes de fundo */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-cyan-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Superior: 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16">
          
          {/* Lado Esquerdo */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-6 h-[2px] bg-[#38bdf8] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                MEUS PROJETOS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Projetos em{' '}
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                destaque.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300/85 leading-relaxed max-w-xl">
              Alguns dos projetos que desenvolvi e que melhor representam minha experiência, habilidades e o tipo de solução que entrego.
            </p>
          </div>

          {/* Lado Direito (com divisor vertical em desktop) */}
          <div className="lg:col-span-5 lg:border-l lg:border-cyan-500/30 lg:pl-10 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              Cada projeto foi pensado para atender às necessidades específicas de cada cliente, com foco em performance, experiência do usuário e resultados reais.
            </p>

            <div>
              <a
                href="/projetos"
                onClick={(e) => {
                  e.preventDefault();
                  if (onViewAllProjects) {
                    onViewAllProjects();
                  } else {
                    document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38bdf8] hover:text-white transition-colors group cursor-pointer"
              >
                <span>Ver todos os projetos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* 6 Cards Grid (2 Linhas de 3 Cards) */}
        {isLoading && featuredProjects.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            Carregando projetos em destaque...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {featuredProjects.map((project: Project, index: number) => {
              const config = getCardConfig(project.slug, index);

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.slug}`}
                  onClick={() => onSelectProject(project.slug)}
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
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 ${config.categoryBadgeClass}`}
                        >
                          {config.categoryIcon}
                          <span>{config.categoryLabel}</span>
                        </span>
                      </div>
                    </div>

                    {/* Título do Projeto */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors leading-snug">
                      {project.name}
                    </h3>

                    {/* Descrição */}
                    <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mb-4 min-h-[38px] line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Rodapé do Card: Tech Stack Pills + 'Ver projeto ->' */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                    {/* Tags Tecnológicas */}
                    <div className="flex flex-wrap items-center gap-1.5">
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

                    {/* Link 'Ver projeto ->' */}
                    <span className="text-xs font-semibold text-[#38bdf8] group-hover:text-white flex items-center gap-1 shrink-0 transition-colors">
                      <span>Ver projeto</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
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

