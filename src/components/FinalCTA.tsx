import React from 'react';
import { MessageCircle, LayoutGrid } from 'lucide-react';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

interface FinalCTAProps {
  onExploreProjects: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreProjects }) => {
  return (
    <section
      id="contato"
      aria-label="Contato e orçamento de projetos"
      className="w-full relative overflow-hidden bg-gradient-to-r from-[#0a1128] via-[#0d1633] to-[#090e1f] border-y border-blue-900/40 py-16 sm:py-20 shadow-2xl shadow-blue-950/40"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute -right-10 -top-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12">
          
          {/* Left Column: Heading & Text */}
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2.5 block">
              VAMOS CONVERSAR?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Tem um projeto em mente?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300/90 leading-relaxed font-normal">
              Vamos transformar sua ideia em um site profissional, moderno e pensado para gerar resultados para o seu negócio.
            </p>
          </div>

          {/* Right Column: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
            <a
              id="cta-whatsapp-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-200 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Falar no WhatsApp →</span>
            </a>

            <button
              id="cta-projects-btn"
              onClick={onExploreProjects}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#090e1c]/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm sm:text-base border border-slate-700/80 hover:border-blue-500/50 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <LayoutGrid className="w-5 h-5 text-blue-400" />
              <span>Ver meus projetos</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
