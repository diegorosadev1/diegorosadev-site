import React from 'react';
import {
  ArrowRight,
  ExternalLink,
  Car,
  Dumbbell,
  Cpu,
  Building2,
  Atom,
  Code2,
  Flame,
  Database,
  Cloud,
  Crown,
  Compass,
  Navigation,
  ShoppingBag,
  Activity,
  Layers,
} from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: { name: string; subtitle?: string }[];
  slug: string;
  externalUrl?: string;
  logo?: string;
  onSelectProject: (slug: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  description,
  image,
  technologies,
  slug,
  externalUrl,
  logo,
  onSelectProject,
}) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'automotivo':
        return <Car className="w-3.5 h-3.5 text-blue-400" />;
      case 'esportes':
      case 'fitness':
        return <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />;
      case 'tecnologia':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'institucional':
        return <Building2 className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const getTechIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'react':
        return <Atom className="w-3 h-3 text-cyan-400" />;
      case 'typescript':
        return <Code2 className="w-3 h-3 text-blue-400" />;
      case 'next.js':
        return <Cloud className="w-3 h-3 text-slate-200" />;
      case 'vite':
        return <Flame className="w-3 h-3 text-purple-400" />;
      case 'supabase':
      case 'firebase':
        return <Database className="w-3 h-3 text-emerald-400" />;
      case 'vercel':
        return <Cloud className="w-3 h-3 text-slate-200" />;
      case 'stripe':
        return <Layers className="w-3 h-3 text-indigo-400" />;
      default:
        return <Code2 className="w-3 h-3 text-slate-400" />;
    }
  };

  const getLogoIcon = (logoKey?: string, projectTitle?: string) => {
    switch (logoKey) {
      case 'crown':
        return <Crown className="w-4 h-4 text-amber-400" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-cyan-400" />;
      case 'dumbbell':
        return <Dumbbell className="w-4 h-4 text-red-400" />;
      case 'navigation':
        return <Navigation className="w-4 h-4 text-emerald-400" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'building-2':
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-4 h-4 text-teal-400" />;
      case 'activity':
        return <Activity className="w-4 h-4 text-rose-400" />;
      case 'car-front':
        return <Car className="w-4 h-4 text-blue-400" />;
      default: {
        const initials = (projectTitle || 'PR')
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();
        return <span className="text-xs font-bold text-white">{initials}</span>;
      }
    }
  };

  const handleCardClick = () => {
    onSelectProject(slug);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      onSelectProject(slug);
    }
  };

  return (
    <div
      id={`project-card-${slug}`}
      onClick={handleCardClick}
      className="group bg-[#0a0f1d] hover:bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/40 rounded-2xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-blue-950/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Screenshot / Image Preview */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={`Screenshot do projeto ${title}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Ambient Bottom Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-black/30 pointer-events-none" />

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#070b16]/80 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5 shadow-sm">
          {getCategoryIcon(category)}
          <span>{category}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        
        {/* Project Header: Logo + Title + Category */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-center shrink-0 shadow-inner group-hover:border-blue-500/30 transition-colors">
            {getLogoIcon(logo, title)}
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate group-hover:text-blue-300 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {category}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3.5 mb-4 line-clamp-3 min-h-[3.6rem]">
          {description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1424] border border-slate-800/90 text-[11px] font-medium text-slate-300"
            >
              {getTechIcon(tech.name)}
              <span>{tech.name}</span>
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-400 group-hover:text-blue-300 group-hover:gap-2 transition-all">
            <span>Ver projeto</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>

          <button
            type="button"
            onClick={handleExternalClick}
            aria-label={`Acessar link externo de ${title}`}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
