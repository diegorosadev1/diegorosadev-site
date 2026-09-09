import React from 'react';
import { MessageCircle, ArrowRight, Layout, Layers, ShoppingBag, ShieldCheck } from 'lucide-react';
import { SiteHeroContent } from '../types';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

interface HeroProps {
  content?: SiteHeroContent;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onExploreProjects }) => {
  const badge = content?.badge || 'Desenvolvedor Web';
  const title = content?.title || 'Sites que ajudam empresas a';
  const highlightText = content?.highlightText || 'vender mais.';
  const description =
    content?.description ||
    'Desenvolvo sites, landing pages e experiências digitais profissionais para empresas que querem fortalecer sua presença online e transformar visitantes em oportunidades.';
  const buttonProjectsText = content?.buttonProjectsText || 'Ver meus projetos';
  const buttonWhatsappText = content?.buttonWhatsappText || 'Falar no WhatsApp';
  const imageDesktop = content?.imageDesktopUrl || '/images/diego-rosa.jpg';
  const imageMobile = content?.imageMobileUrl || content?.imageDesktopUrl || '/images/diego-rosa.jpg';
  const handwrittenNote = content?.handwrittenNote || 'Seu projeto em boas mãos!';

  return (
    <section
      id="inicio"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-radial-ambient"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-800/60 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              {title}{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                {highlightText}
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-xl leading-relaxed font-normal">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                id="hero-cta-projects"
                onClick={onExploreProjects}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-200 cursor-pointer group"
              >
                <span>{buttonProjectsText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-cta-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0e1322] hover:bg-slate-800/90 text-slate-200 hover:text-white font-medium text-sm sm:text-base border border-slate-700/80 hover:border-blue-500/50 transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{buttonWhatsappText}</span>
              </a>
            </div>

            {/* Quick Services Row */}
            <div className="pt-4 border-t border-slate-800/60 w-full">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4 text-blue-400" />
                  <span>Sites institucionais</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Landing Pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                  <span>E-commerce</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Manutenção e Suporte</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Diego Rosa Professional Photo */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Handwritten callout script */}
            <div className="absolute -top-6 right-6 sm:right-12 z-20 hidden sm:block rotate-[-4deg] pointer-events-none">
              <span className="font-script text-2xl sm:text-3xl text-slate-200 drop-shadow-md">
                {handwrittenNote}
              </span>
              <svg
                className="w-8 h-8 text-blue-400/80 ml-auto -mt-1 transform rotate-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            {/* Radial glow background around image */}
            <div className="relative w-full max-w-md aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-blue-500/20 via-slate-800/30 to-transparent shadow-2xl">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0c101a]">
                <picture>
                  <source media="(min-width: 640px)" srcSet={imageDesktop} />
                  <img
                    src={imageMobile}
                    alt="Diego Rosa - Desenvolvedor Web e Soluções Digitais"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                </picture>

                {/* Smooth dark vignette mask to integrate seamlessly with page */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/40 via-transparent to-[#07090e]/30" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
