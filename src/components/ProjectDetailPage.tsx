import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  MinusCircle,
  Clock,
  TrendingUp,
  Smartphone,
  Shield,
  Layers,
  Filter,
  Car,
  Sliders,
  MessageCircle,
  LayoutGrid,
  Zap,
  Star,
  ThumbsUp,
  Smile,
  Atom,
  Code,
  Flame,
  Database,
  Cloud,
  BarChart3,
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  // Find next project in list for quick browsing
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = currentIndex !== -1 ? PROJECTS[(currentIndex + 1) % PROJECTS.length] : null;

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-5 h-5 text-blue-400" />;
      case 'Filter':
        return <Filter className="w-5 h-5 text-indigo-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-blue-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const getResultIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-400" />;
      case 'ThumbsUp':
        return <ThumbsUp className="w-5 h-5 text-blue-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-emerald-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
    }
  };

  const getTechIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'react':
        return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'typescript':
        return <Code className="w-5 h-5 text-blue-400" />;
      case 'vite':
        return <Flame className="w-5 h-5 text-purple-400" />;
      case 'supabase':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'vercel':
        return <Cloud className="w-5 h-5 text-white" />;
      case 'google analytics':
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default:
        return <Code className="w-5 h-5 text-blue-400" />;
    }
  };

  // Safe collections
  const techStack = project.techStack || project.technologies || [];
  const problems = project.problems || [];
  const solutions = project.solutions || [];
  const features = project.highlights || project.features || [];
  const gallery = project.gallery || project.screenshots || [];
  const results = project.results || [];

  const heroDesktop = project.heroDesktopUrl || project.thumbnailUrl || project.image;
  const heroMobile = project.heroMobileUrl || project.thumbnailUrl || project.image;

  // Visibility flags
  const hasContext = project.showContext !== false && Boolean(project.context?.title || project.context?.description);
  const hasProblems = project.showProblems !== false && problems.length > 0;
  const hasSolutions = project.showSolutions !== false && solutions.length > 0;
  const hasHighlights = project.showHighlights !== false && features.length > 0;
  const hasGallery = project.showGallery !== false && gallery.length > 0;
  const hasResults = project.showResults !== false && results.length > 0;

  return (
    <article className="min-h-screen pt-28 pb-0 bg-[#07090e] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation Button */}
        <div className="mb-8">
          <button
            id="back-to-projects-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para projetos</span>
          </button>
        </div>

        {/* 1. Project Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 sm:mb-20">
          
          {/* Left Hero Info */}
          <div className="lg:col-span-6 space-y-6">
            {/* Segment Badge */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {project.segment || project.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.name}
            </h1>

            {/* Hero Summary */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed">
              {project.heroSummary || project.description || project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visitar site</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0d1220] hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Ver no GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Hero Device Mockup Representation (Responsive Picture + Mockups) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Laptop Mockup Frame */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 sm:p-3 shadow-2xl shadow-blue-950/50">
                {/* Screen top bar */}
                <div className="h-5 bg-[#0a0e18] rounded-t-lg flex items-center px-3 gap-1.5 border-b border-slate-800/80">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] font-mono text-slate-500 ml-2 truncate">
                    {project.slug}.com.br
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-b-lg bg-[#0c101a]">
                  <picture>
                    <source media="(min-width: 640px)" srcSet={heroDesktop} />
                    <img
                      src={heroMobile}
                      alt={`${project.name} Desktop Preview`}
                      className="w-full h-full object-cover object-top"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Smartphone Mockup Overlap (Right bottom) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 w-36 sm:w-48 aspect-[9/18] rounded-[24px] border-4 border-slate-800 bg-slate-950 p-1.5 shadow-2xl shadow-black hidden sm:block">
                <div className="w-full h-full rounded-[18px] overflow-hidden relative bg-slate-900">
                  <img
                    src={heroMobile}
                    alt={`${project.name} Mobile Preview`}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Smartphone top pill speaker */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. Tech Stack Pill Bar (Full Screen Width) */}
      {techStack.length > 0 && (
        <section
          aria-label="Tecnologias principais do projeto"
          className="w-full bg-[#0a0e19] border-y border-slate-800/80 py-6 sm:py-8 mb-16 sm:mb-20 relative z-20 shadow-lg shadow-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-center shrink-0 shadow-inner">
                    {getTechIcon(tech.name)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      {tech.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {tech.subtitle || 'Tecnologia'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. Context Section */}
        {hasContext && project.context && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
                  Contexto
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {project.context.title || 'O Desafio do Cliente'}
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed">
                  {project.context.description}
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-slate-800/80 shadow-xl bg-slate-900 aspect-video relative">
                  <img
                    src={project.context.image || heroDesktop}
                    alt={project.context.title || project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Problem vs Solution Cards */}
        {(hasProblems || hasSolutions) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Card 1: O Problema */}
            {hasProblems && (
              <div className="rounded-2xl bg-[#0c101a] border border-slate-800/80 p-7 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center">
                    <MinusCircle className="w-5 h-5 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    O problema
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {problems.map((prob, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300/80">
                      <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Card 2: A Solução */}
            {hasSolutions && (
              <div className="rounded-2xl bg-[#0c101a] border border-blue-900/40 p-7 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-800/50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    A solução
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {solutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300/90">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 5. Destaques do Projeto (Features list & Gallery) */}
        {(hasHighlights || hasGallery) && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Features List */}
              {hasHighlights && (
                <div className={`${hasGallery ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-6`}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                      Destaques do projeto
                    </h2>
                    <p className="text-sm text-slate-400">
                      Uma experiência completa, do primeiro clique ao contato com a empresa.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/80 hover:border-blue-500/40 transition-colors flex items-start gap-3.5"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-950/40 border border-blue-800/40 flex items-center justify-center shrink-0 mt-0.5">
                          {getFeatureIcon(feature.iconName)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Column: Screenshot Gallery Presentation */}
              {hasGallery && (
                <div className={`${hasHighlights ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0c101a] p-3 shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900">
                      <img
                        src={gallery[0]?.image || gallery[0]?.url || heroDesktop}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {gallery.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {gallery.slice(1).map((s, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden border border-slate-800/80 bg-[#0c101a] p-2"
                        >
                          <img
                            src={s.image || s.url}
                            alt={s.title || s.alt || `Screenshot ${index + 2}`}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          {s.title && (
                            <div className="p-2 text-xs text-slate-400 font-medium">
                              {s.title}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 6. Resultados / Impacto (Full Screen Width matching Image 2) */}
      {hasResults && (
        <section
          id="resultados"
          aria-label="Resultados e métricas do projeto"
          className="w-full bg-[#080d1a] border-y border-slate-800/80 py-12 sm:py-16 relative overflow-hidden"
        >
          {/* Left side contextual image fading smoothly into dark background */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-80 xl:w-96 overflow-hidden pointer-events-none">
            <img
              src={project.context?.image || heroDesktop}
              alt=""
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080d1a]/80 to-[#080d1a]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-[#080d1a]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left/Center Column: Text */}
              <div className="lg:col-span-7 lg:pl-16 xl:pl-20 space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
                  Resultados
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {project.resultsTitle || 'Mais visibilidade, mais contatos, mais negócios.'}
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed max-w-xl">
                  {project.resultsDescription ||
                    `Com o novo site, o ${project.name} ganhou uma presença digital mais forte, melhorou a experiência dos usuários e aumentou o volume de contatos via WhatsApp.`}
                </p>
              </div>

              {/* Right Column: Stacked Metrics in clean rows */}
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                {results.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-inner"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center shrink-0 shadow-sm">
                      {getResultIcon(res.iconName)}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {res.value}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 font-medium">
                        {res.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 7. Bottom Next Project Navigator & Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#0a0e19] border border-slate-800/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Gostou deste case?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Vamos construir algo incrível para sua empresa?
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>

            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject.slug)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Próximo Projeto</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
