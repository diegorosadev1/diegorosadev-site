import React from 'react';
import {
  MessageCircle,
  ArrowRight,
  Zap,
  Search,
  Palette,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

import { SiteHeroContent } from '../types';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

// Imagem fixa do Hero — carregada diretamente do projeto,
// sem depender do Supabase.
import heroDiego from '../assets/hero-diego.webp';
import Me from '../assets/images/me.png';

interface HeroProps {
  content?: SiteHeroContent;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  onExploreProjects,
}) => {
  const badge = content?.badge || 'DESENVOLVIMENTO WEB';

  const title =
    content?.title || 'Sites que ajudam empresas a';

  const highlightText =
    content?.highlightText || 'vender mais.';

  const description =
    content?.description ||
    'Desenvolvo sites profissionais que fortalecem sua marca, aumentam a confiança dos clientes e transformam visitantes em oportunidades.';

  const buttonProjectsText =
    content?.buttonProjectsText || 'Ver meus projetos';

  const buttonWhatsappText =
    content?.buttonWhatsappText || 'Falar no WhatsApp';

  return (
    <section
      id="inicio"
      className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden bg-[#06080e]"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-16 left-1/4 w-[28rem] h-[28rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-28 right-10 w-[34rem] h-[34rem] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* =========================================================
              LEFT COLUMN
          ========================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 sm:space-y-7 z-10">

            {/* Eyebrow / Tag */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-blue-500 rounded-full" />

              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.25em] text-slate-400">
                {badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-black text-white tracking-tight leading-[1.08]">
              Sites que ajudam
              <br />
              empresas a
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#c084fc] drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                {highlightText}
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-slate-300/85 max-w-xl leading-relaxed font-normal">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">

              {/* Projects */}
              <button
                id="hero-cta-projects"
                onClick={onExploreProjects}
                className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066ff] via-[#4338ca] to-[#9333ea] hover:brightness-110 text-white font-semibold text-sm sm:text-base shadow-[0_0_28px_rgba(79,70,229,0.45)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] transition-all duration-200 cursor-pointer group"
              >
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />

                <span>
                  {buttonProjectsText}
                </span>
              </button>

              {/* WhatsApp */}
              <a
                id="hero-cta-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#080d19]/90 hover:bg-slate-800/90 text-slate-100 font-medium text-sm sm:text-base border border-slate-700/80 hover:border-slate-500 transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />

                <span>
                  {buttonWhatsappText}
                </span>
              </a>

            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN — HERO IMAGE
          ========================================================== */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center mt-6 lg:mt-0">

            {/* Ambient backlight */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-indigo-600/15 to-purple-600/10 blur-2xl rounded-full pointer-events-none" />

            {/* Photo Container */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/4.2] sm:aspect-[4/3.8] lg:aspect-[4/3.6] overflow-hidden">

              <img
                src={Me}
                alt="Diego Rosa - Engenheiro de Software"
                className="w-full h-full object-cover object-top filter contrast-[1.04]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {/* Seamless Dark Edge Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-transparent opacity-95" />

              <div className="absolute inset-0 bg-gradient-to-r from-[#06080e] via-transparent to-transparent opacity-85" />

              <div className="absolute inset-0 bg-gradient-to-l from-[#06080e]/40 via-transparent to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-b from-[#06080e]/50 via-transparent to-transparent" />

            </div>

            {/* =====================================================
                FLOATING SIGNATURE
            ====================================================== */}
            <div className="absolute top-2 right-2 sm:right-6 z-20 flex flex-col items-start select-none">

              {/* Handwritten Diego Rosa */}
              <div className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] rotate-[-3deg]">
                Diego Rosa
              </div>

              {/* Curved brush underline */}
              <svg
                className="w-24 sm:w-28 h-2.5 sm:h-3 text-cyan-400 -mt-1 ml-auto"
                viewBox="0 0 100 12"
                fill="none"
              >
                <path
                  d="M2 9C28 2 72 2 98 9"
                  stroke="url(#hero-sig-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="hero-sig-gradient"
                    x1="2"
                    y1="9"
                    x2="98"
                    y2="9"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stopColor="#38bdf8"
                    />

                    <stop
                      offset="1"
                      stopColor="#c084fc"
                    />
                  </linearGradient>
                </defs>
              </svg>

              {/* Stacked uppercase statement */}
              <div className="flex flex-col items-start mt-3 sm:mt-4 text-left">

                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.22em] uppercase leading-snug">
                  IDEIAS
                </span>

                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.22em] uppercase leading-snug">
                  EM CÓDIGO,
                </span>

                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.22em] uppercase leading-snug">
                  RESULTADOS
                </span>

                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.22em] uppercase leading-snug">
                  NA INTERNET.
                </span>

                <div className="w-5 sm:w-6 h-[2px] bg-cyan-400 mt-2 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

              </div>

            </div>
          </div>
        </div>

        {/* =========================================================
            FEATURES
        ========================================================== */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-800/40">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">

            {/* 1. Performance */}
            <div className="flex items-center gap-3.5 group">

              <div className="w-12 h-12 rounded-2xl bg-[#090f20]/90 border border-blue-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex-shrink-0">
                <Zap className="w-5 h-5 text-purple-400 fill-purple-400/20" />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base">
                  Performance
                </span>

                <span className="text-xs text-slate-400 leading-snug mt-0.5">
                  Sites rápidos e otimizados para qualquer dispositivo.
                </span>
              </div>

            </div>

            {/* 2. SEO */}
            <div className="flex items-center gap-3.5 group">

              <div className="w-12 h-12 rounded-2xl bg-[#090f20]/90 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex-shrink-0">
                <Search className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base">
                  SEO
                </span>

                <span className="text-xs text-slate-400 leading-snug mt-0.5">
                  Estrutura preparada para ser encontrada no Google.
                </span>
              </div>

            </div>

            {/* 3. Design Personalizado */}
            <div className="flex items-center gap-3.5 group">

              <div className="w-12 h-12 rounded-2xl bg-[#090f20]/90 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex-shrink-0">
                <Palette className="w-5 h-5 text-blue-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base">
                  Design Personalizado
                </span>

                <span className="text-xs text-slate-400 leading-snug mt-0.5">
                  Comunicação visual que reforça a identidade da sua marca.
                </span>
              </div>

            </div>

            {/* 4. Responsividade */}
            <div className="flex items-center gap-3.5 group">

              <div className="w-12 h-12 rounded-2xl bg-[#090f20]/90 border border-blue-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex-shrink-0">
                <Smartphone className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base">
                  Responsividade
                </span>

                <span className="text-xs text-slate-400 leading-snug mt-0.5">
                  Experiência consistente em celular, tablet e desktop.
                </span>
              </div>

            </div>

            {/* 5. Suporte Contínuo */}
            <div className="flex items-center gap-3.5 group">

              <div className="w-12 h-12 rounded-2xl bg-[#090f20]/90 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base">
                  Suporte Contínuo
                </span>

                <span className="text-xs text-slate-400 leading-snug mt-0.5">
                  Acompanhamento após a publicação do site.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* =========================================================
            BOTTOM NEON LINE
        ========================================================== */}
        <div className="relative mt-8 overflow-hidden h-6 pointer-events-none">

          <svg
            className="w-full h-12 -mt-4 opacity-50"
            viewBox="0 0 1200 40"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 38 Q 600 2, 1200 38"
              stroke="url(#bottom-wave-glow)"
              strokeWidth="1.5"
            />

            <defs>
              <linearGradient
                id="bottom-wave-glow"
                x1="0"
                y1="20"
                x2="1200"
                y2="20"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor="#3b82f6"
                  stopOpacity="0.1"
                />

                <stop
                  offset="0.5"
                  stopColor="#6366f1"
                  stopOpacity="0.8"
                />

                <stop
                  offset="1"
                  stopColor="#a855f7"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
          </svg>

        </div>

      </div>
    </section>
  );
};