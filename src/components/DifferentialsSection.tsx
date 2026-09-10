import React from 'react';
import {
  Code2,
  Zap,
  Search,
  Rocket,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { DIFFERENTIALS } from '../data/servicesAndProcess';

export const DifferentialsSection: React.FC = () => {
  const getCardTheme = (number?: string) => {
    switch (number) {
      case '01':
        return {
          textColor: 'text-[#38bdf8]',
          badgeClass:
            'bg-gradient-to-br from-blue-500/25 via-blue-600/15 to-blue-950/40 border border-blue-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]',
          hoverBorder: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
          arrowColor: 'text-[#38bdf8]',
          iconColor: 'text-[#38bdf8]',
        };
      case '02':
        return {
          textColor: 'text-[#c084fc]',
          badgeClass:
            'bg-gradient-to-br from-purple-500/25 via-purple-600/15 to-purple-950/40 border border-purple-400/40 shadow-[0_0_20px_rgba(192,132,252,0.25)]',
          hoverBorder: 'hover:border-purple-500/50 hover:shadow-purple-500/5',
          arrowColor: 'text-[#c084fc]',
          iconColor: 'text-[#c084fc]',
        };
      case '03':
        return {
          textColor: 'text-[#38bdf8]',
          badgeClass:
            'bg-gradient-to-br from-sky-500/25 via-sky-600/15 to-cyan-950/40 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]',
          hoverBorder: 'hover:border-sky-500/50 hover:shadow-sky-500/5',
          arrowColor: 'text-[#38bdf8]',
          iconColor: 'text-[#38bdf8]',
        };
      case '04':
      default:
        return {
          textColor: 'text-[#2dd4bf]',
          badgeClass:
            'bg-gradient-to-br from-teal-500/25 via-emerald-600/15 to-teal-950/40 border border-teal-400/40 shadow-[0_0_20px_rgba(45,212,191,0.25)]',
          hoverBorder: 'hover:border-teal-500/50 hover:shadow-teal-500/5',
          arrowColor: 'text-[#2dd4bf]',
          iconColor: 'text-[#2dd4bf]',
        };
    }
  };

  const renderCardIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Rocket':
        return <Rocket className={`w-5 h-5 ${colorClass}`} />;
      case 'Zap':
        return <Zap className={`w-5 h-5 ${colorClass}`} />;
      case 'Search':
        return <Search className={`w-5 h-5 ${colorClass}`} />;
      case 'Code2':
      default:
        return <Code2 className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <section id="diferenciais" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: DIFERENCIAIS + Título + Subtítulo */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-6 h-[2px] bg-[#38bdf8] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                DIFERENCIAIS
              </span>
            </div>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              Mais do que um <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                site bonito.
              </span>
            </h2>

            {/* Parágrafo de Apoio */}
            <p className="text-base sm:text-lg text-slate-300/95 leading-relaxed">
              Seu site precisa representar bem sua empresa, transmitir confiança e transformar visitantes em oportunidades.
            </p>
          </div>

          {/* Coluna Direita: Grade de 4 Cards (2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {DIFFERENTIALS.map((item) => {
              const theme = getCardTheme(item.number);
              return (
                <div
                  key={item.number || item.title}
                  className={`group relative rounded-2xl p-5 sm:p-6 bg-[#090d1a]/85 backdrop-blur-sm border border-slate-800/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.hoverBorder} flex flex-col justify-between`}
                >
                  <div>
                    {/* Header do Card: Ícone com brilho e Número/Título */}
                    <div className="flex items-start gap-3.5 mb-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme.badgeClass} relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                      >
                        {renderCardIcon(item.icon, theme.iconColor)}
                      </div>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <span
                          className={`block text-xs font-bold tracking-wider mb-1 ${theme.textColor}`}
                        >
                          {item.number}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Seta indicativa no canto inferior direito */}
                  <div className="flex justify-end items-center pt-3.5 mt-2">
                    <ArrowRight
                      className={`w-4 h-4 ${theme.arrowColor} transition-transform duration-300 group-hover:translate-x-1.5`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bloco horizontal complementar: Suporte contínuo */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-800/80">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#070b16]/75 backdrop-blur-sm border border-slate-800/85 hover:border-sky-500/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-white">
                    Suporte contínuo
                  </h4>
                  <span className="text-[11px] font-semibold text-[#38bdf8] bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                    Cuidado após a publicação
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Depois da publicação, continuo cuidando do seu site com manutenção, atualizações, correções e melhorias para mantê-lo seguro, rápido e funcionando.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

