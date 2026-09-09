import React from 'react';
import { MessageCircle, ArrowUp, ArrowUpToLine } from 'lucide-react';
import { WHATSAPP_URL } from '../../data/servicesAndProcess';

interface ProjectsCTAProps {
  onScrollToProjects?: () => void;
}

export const ProjectsCTA: React.FC<ProjectsCTAProps> = ({ onScrollToProjects }) => {
  const handleScrollToGrid = () => {
    if (onScrollToProjects) {
      onScrollToProjects();
    } else {
      const el = document.getElementById('projects-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="projects-cta"
      aria-label="Vamos conversar sobre seu projeto"
      className="relative w-full py-14 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-r from-[#060b18] via-[#081026] to-[#060b18] border-t border-slate-800/90 border-b border-slate-900 shadow-2xl"
    >
      {/* Subtle ambient lighting and curved decorative waves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Modern subtle wave/line accents in the background */}
      <svg
        className="absolute right-0 top-0 h-full w-1/2 opacity-25 pointer-events-none"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 400C250 350 450 150 800 50"
          stroke="url(#cta-line-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M100 400C320 320 520 120 800 120"
          stroke="url(#cta-line-gradient)"
          strokeWidth="1.5"
        />
        <path
          d="M200 400C400 300 600 80 800 200"
          stroke="url(#cta-line-gradient)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <defs>
          <linearGradient id="cta-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12">
          
          {/* Left Text */}
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block">
              Vamos conversar?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Tem um projeto em mente?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300/85 leading-relaxed font-normal">
              Vamos transformar sua ideia em um site profissional, moderno e feito sob medida para o seu negócio.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0 w-full sm:w-auto">
            <a
              id="projects-cta-whatsapp-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Falar no WhatsApp</span>
            </a>

            <button
              type="button"
              id="projects-cta-explore-btn"
              onClick={handleScrollToGrid}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white bg-[#090f1f]/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer shadow-sm"
            >
              <ArrowUp className="w-4 h-4 text-slate-300" />
              <span>Ver meus projetos</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

