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
  status?: 'published' | 'in_development';
  isProfessionalExperience?: boolean;
  onSelectProject?: (slug: string) => void;
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
  status,
  isProfessionalExperience,
}) => {
  const isUnpublished = status === 'in_development';

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
      case 'site institucional':
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
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      id={`project-card-${slug}`}
      onClick={handleCardClick}
      className="group bg-[#0a0f1d] hover:bg-[#0c1324] border border-slate-800/90 hover:border-blue-500/40 rounded-2xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-blue-950/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
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

          {/* Floating Category & Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <div className="px-2.5 py-1 rounded-full bg-[#070b16]/80 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5 shadow-sm">
              {getCategoryIcon(category)}
              <span>{category}</span>
            </div>

            {isUnpublished && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>EM DESENVOLVIMENTO</span>
              </span>
            )}

            {isProfessionalExperience && (
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[9px] font-semibold text-slate-300 uppercase tracking-wider">
                Experiência Profissional
              </span>
            )}
          </div>

          {/* Floating External Link Icon button in top-right */}
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Acessar site de ${title}`}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-blue-600/90 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-5 sm:p-6 pb-2">
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
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
          )}
        </div>
      </div>

      {/* Main Action Button in Card Footer */}
      <div className="p-5 sm:p-6 pt-3 border-t border-slate-800/80">
        {isUnpublished ? (
          <a
            href={externalUrl || '#'}
            target={externalUrl ? '_blank' : undefined}
            rel={externalUrl ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (!externalUrl) e.preventDefault();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 group/btn cursor-pointer"
          >
            <span>Ver preview</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-slate-400 group-hover/btn:text-white" />
          </a>
        ) : (
          <a
            href={externalUrl || '#'}
            target={externalUrl ? '_blank' : undefined}
            rel={externalUrl ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (!externalUrl) e.preventDefault();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group/btn cursor-pointer"
          >
            <span>Visitar site</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
};
