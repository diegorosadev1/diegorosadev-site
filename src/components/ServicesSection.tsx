import React from 'react';
import {
  Globe,
  Zap,
  Search,
  Wrench,
  Layers,
  PenTool,
  ShieldCheck,
  ArrowRight,
  Shield,
  Image as ImageIcon,
  Code2,
} from 'lucide-react';
import { SERVICES } from '../data/servicesAndProcess';

export const ServicesSection: React.FC = () => {
  const getCardTheme = (id: string, index: number) => {
    switch (index) {
      case 0:
        return {
          number: '01',
          accentColor: 'text-[#38bdf8]',
          badgeGlow:
            'bg-gradient-to-br from-blue-500/25 via-blue-600/15 to-blue-950/40 border border-blue-400/50 shadow-[0_0_24px_rgba(56,189,248,0.3)]',
          hoverBorder: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
          arrowColor: 'text-[#38bdf8]',
          mockupBorder: 'border-blue-500/30',
          mockupBg: 'bg-[#081026]/90',
        };
      case 1:
        return {
          number: '02',
          accentColor: 'text-[#c084fc]',
          badgeGlow:
            'bg-gradient-to-br from-purple-500/25 via-purple-600/15 to-purple-950/40 border border-purple-400/50 shadow-[0_0_24px_rgba(192,132,252,0.3)]',
          hoverBorder: 'hover:border-purple-500/50 hover:shadow-purple-500/5',
          arrowColor: 'text-[#c084fc]',
          mockupBorder: 'border-purple-500/30',
          mockupBg: 'bg-[#150a26]/90',
        };
      case 2:
        return {
          number: '03',
          accentColor: 'text-[#2dd4bf]',
          badgeGlow:
            'bg-gradient-to-br from-teal-500/25 via-emerald-600/15 to-teal-950/40 border border-teal-400/50 shadow-[0_0_24px_rgba(45,212,191,0.3)]',
          hoverBorder: 'hover:border-teal-500/50 hover:shadow-teal-500/5',
          arrowColor: 'text-[#2dd4bf]',
          mockupBorder: 'border-teal-500/30',
          mockupBg: 'bg-[#06181b]/90',
        };
      case 3:
      default:
        return {
          number: '04',
          accentColor: 'text-[#e879f9]',
          badgeGlow:
            'bg-gradient-to-br from-fuchsia-500/25 via-purple-600/15 to-pink-950/40 border border-fuchsia-400/50 shadow-[0_0_24px_rgba(232,121,249,0.3)]',
          hoverBorder: 'hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/5',
          arrowColor: 'text-[#e879f9]',
          mockupBorder: 'border-fuchsia-500/30',
          mockupBg: 'bg-[#1a0822]/90',
        };
    }
  };

  const renderServiceIcon = (index: number, accentColor: string) => {
    switch (index) {
      case 0:
        return <Globe className={`w-6 h-6 ${accentColor}`} />;
      case 1:
        return <Zap className={`w-6 h-6 ${accentColor}`} />;
      case 2:
        return <Search className={`w-6 h-6 ${accentColor}`} />;
      case 3:
      default:
        return <Wrench className={`w-6 h-6 ${accentColor}`} />;
    }
  };

  const renderCardMockup = (index: number) => {
    switch (index) {
      case 0:
        // Mockup 1: Websites & Plataformas
        return (
          <div className="w-28 h-20 rounded-xl bg-[#081126] border border-blue-500/30 p-2 shadow-lg relative overflow-hidden group-hover:border-blue-400/50 transition-colors">
            {/* Header dots */}
            <div className="flex items-center gap-1 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            </div>
            {/* Content preview */}
            <div className="flex gap-1.5">
              <div className="w-11 h-10 rounded-md bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-[#38bdf8]" />
              </div>
              <div className="flex-1 space-y-1 pt-1">
                <div className="w-full h-1.5 rounded bg-blue-400/40" />
                <div className="w-3/4 h-1.5 rounded bg-slate-700/80" />
                <div className="w-1/2 h-1.5 rounded bg-slate-800" />
              </div>
            </div>
            <div className="mt-1.5 w-full h-1 rounded bg-slate-800/80" />
          </div>
        );
      case 1:
        // Mockup 2: Landing Pages
        return (
          <div className="w-28 h-20 rounded-xl bg-[#150a26] border border-purple-500/30 p-2 shadow-lg relative overflow-hidden group-hover:border-purple-400/50 transition-colors">
            {/* Header dots */}
            <div className="flex items-center gap-1 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            </div>
            {/* Hero banner preview */}
            <div className="w-full h-7 rounded bg-purple-500/15 border border-purple-400/30 flex items-center justify-center mb-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#c084fc]" />
            </div>
            {/* CTA button pill preview */}
            <div className="w-12 h-2.5 rounded-full bg-purple-500/35 border border-purple-400/50 mx-auto shadow-[0_0_8px_rgba(192,132,252,0.3)]" />
          </div>
        );
      case 2:
        // Mockup 3: SEO e Visibilidade
        return (
          <div className="w-28 h-20 rounded-xl bg-[#06181b] border border-teal-500/30 p-2 shadow-lg relative overflow-hidden group-hover:border-teal-400/50 transition-colors">
            {/* Header dots */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
              </div>
            </div>
            {/* Search query & rank bars */}
            <div className="space-y-1 pl-1">
              <div className="flex gap-1 items-center">
                <span className="w-3 h-1 rounded bg-teal-400/60" />
                <span className="w-8 h-1 rounded bg-emerald-400/60" />
              </div>
              <div className="flex gap-1 items-center pl-2">
                <span className="w-9 h-1 rounded bg-cyan-400/50" />
              </div>
              <div className="flex gap-1 items-center pl-2">
                <span className="w-6 h-1 rounded bg-teal-300/40" />
              </div>
            </div>
            {/* Floating Search badge */}
            <div className="absolute -bottom-1 -right-1 w-9 h-8 rounded-lg bg-teal-950/90 border border-teal-400/50 flex items-center justify-center shadow-[0_0_12px_rgba(45,212,191,0.3)]">
              <Search className="w-4 h-4 text-[#2dd4bf]" />
            </div>
          </div>
        );
      case 3:
      default:
        // Mockup 4: Evolução & Suporte
        return (
          <div className="w-28 h-20 rounded-xl bg-[#1b0824] border border-fuchsia-500/30 p-2 shadow-lg relative overflow-hidden group-hover:border-fuchsia-400/50 transition-colors">
            {/* Header dots */}
            <div className="flex items-center gap-1 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            </div>
            {/* Trend sparkline preview */}
            <div className="w-full h-7 flex items-end px-1 pb-1">
              <svg
                className="w-12 h-6 text-[#e879f9]"
                viewBox="0 0 48 24"
                fill="none"
              >
                <path
                  d="M2 18L14 12L24 16L34 6L46 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Floating Shield badge */}
            <div className="absolute -bottom-1 -right-1 w-9 h-8 rounded-lg bg-fuchsia-950/90 border border-fuchsia-400/50 flex items-center justify-center shadow-[0_0_12px_rgba(232,121,249,0.3)]">
              <Shield className="w-4 h-4 text-[#e879f9]" />
            </div>
          </div>
        );
    }
  };

  return (
    <section id="servicos" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute -top-20 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Superior: 2 Colunas (Título + Proposta / Badges) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16">
          
          {/* Lado Esquerdo do Header */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2px] bg-[#38bdf8] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                O QUE EU FAÇO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Sites pensados para o <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                seu negócio.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300/85 leading-relaxed max-w-xl">
              Desenvolvo sites profissionais pensados para fortalecer sua marca, gerar confiança e transformar visitantes em oportunidades.
            </p>
          </div>

          {/* Lado Direito do Header (com divisor vertical em desktop) */}
          <div className="lg:col-span-6 lg:border-l lg:border-cyan-500/30 lg:pl-10 space-y-5">
            {/* Bloco explicativo com ícone Layers */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-400/40 flex items-center justify-center shrink-0 text-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                Da ideia à publicação, cuido de todo o processo para entregar um site profissional, rápido e preparado para o seu negócio.
              </p>
            </div>

            {/* 4 Mini Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a1124]/70 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-5 h-5 rounded bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                  <Code2 className="w-3 h-3" />
                </div>
                <span className="leading-tight">Engenharia de Software</span>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a1124]/70 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-5 h-5 rounded bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                  <PenTool className="w-3 h-3" />
                </div>
                <span className="leading-tight">Design Moderno</span>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a1124]/70 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-5 h-5 rounded bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                  <Zap className="w-3 h-3" />
                </div>
                <span className="leading-tight">Performance</span>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a1124]/70 border border-slate-800 text-[11px] text-slate-300">
                <div className="w-5 h-5 rounded bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-[#38bdf8] shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span className="leading-tight">Soluções Reais</span>
              </div>
            </div>
          </div>

        </div>

        {/* Grade de 4 Cards (Sem 'Saiba mais', com seta sutil no canto inferior direito) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, index) => {
            const theme = getCardTheme(service.id, index);

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`group relative rounded-2xl p-6 bg-[#070b16]/90 backdrop-blur-sm border border-slate-800/85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${theme.hoverBorder} flex flex-col justify-between`}
              >
                <div>
                  {/* Número superior com linha (Ex: 01 ——) */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold tracking-wider ${theme.accentColor}`}>
                      {theme.number}
                    </span>
                    <span className={`w-6 h-[2px] ${theme.accentColor} opacity-75`} />
                  </div>

                  {/* Top: Ícone com brilho Neon + Mockup ilustrativo */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Badge do Ícone */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme.badgeGlow} relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                    >
                      {renderServiceIcon(index, theme.accentColor)}
                    </div>

                    {/* Mini Mockup Visual */}
                    {renderCardMockup(index)}
                  </div>

                  {/* Título do Serviço */}
                  <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Rodapé do Card: apenas a seta sutil (sem 'Saiba mais' conforme solicitado) */}
                <div className="flex justify-end items-center pt-5 mt-4 border-t border-slate-800/40">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900/40 border border-slate-800/70 group-hover:border-${theme.accentColor} transition-all duration-300`}
                  >
                    <ArrowRight
                      className={`w-4 h-4 ${theme.arrowColor} transition-transform duration-300 group-hover:translate-x-1`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
};

