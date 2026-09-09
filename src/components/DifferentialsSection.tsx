import React from 'react';
import {
  Code2,
  Zap,
  Cloud,
  Search,
  Smartphone,
  Shield,
  Rocket,
  Star,
  ArrowRight,
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
        return {
          textColor: 'text-[#2dd4bf]',
          badgeClass:
            'bg-gradient-to-br from-teal-500/25 via-emerald-600/15 to-teal-950/40 border border-teal-400/40 shadow-[0_0_20px_rgba(45,212,191,0.25)]',
          hoverBorder: 'hover:border-teal-500/50 hover:shadow-teal-500/5',
          arrowColor: 'text-[#2dd4bf]',
          iconColor: 'text-[#2dd4bf]',
        };
      case '05':
        return {
          textColor: 'text-[#c084fc]',
          badgeClass:
            'bg-gradient-to-br from-violet-500/25 via-purple-600/15 to-violet-950/40 border border-violet-400/40 shadow-[0_0_20px_rgba(192,132,252,0.25)]',
          hoverBorder: 'hover:border-violet-500/50 hover:shadow-violet-500/5',
          arrowColor: 'text-[#c084fc]',
          iconColor: 'text-[#c084fc]',
        };
      case '06':
      default:
        return {
          textColor: 'text-[#60a5fa]',
          badgeClass:
            'bg-gradient-to-br from-blue-600/25 via-indigo-600/15 to-blue-950/40 border border-blue-400/40 shadow-[0_0_20px_rgba(96,165,250,0.25)]',
          hoverBorder: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
          arrowColor: 'text-[#60a5fa]',
          iconColor: 'text-[#60a5fa]',
        };
    }
  };

  const renderCardIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className={`w-5 h-5 ${colorClass}`} />;
      case 'Zap':
        return <Zap className={`w-5 h-5 ${colorClass}`} />;
      case 'Cloud':
        return <Cloud className={`w-5 h-5 ${colorClass}`} />;
      case 'Search':
        return <Search className={`w-5 h-5 ${colorClass}`} />;
      case 'Smartphone':
        return <Smartphone className={`w-5 h-5 ${colorClass}`} />;
      case 'Shield':
        return <Shield className={`w-5 h-5 ${colorClass}`} />;
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Coluna Esquerda: Informações, Métricas e Assinatura */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
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

              {/* Parágrafos de Apoio */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-4">
                Entrego soluções completas, focadas no que realmente importa: resultado, performance e crescimento do seu negócio.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Do planejamento à manutenção, você tem um parceiro que entende de tecnologia, negócios e experiência do usuário.
              </p>

              {/* Barra de Métricas / Estatísticas */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-7 sm:pt-8 mt-7 sm:mt-8 border-t border-slate-800/80">
                {/* 1. Experiência */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1 text-[#38bdf8]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    +5 anos
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    de experiência
                  </span>
                </div>

                {/* 2. Projetos Entregues */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1 text-[#38bdf8]">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    +10
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    projetos entregues
                  </span>
                </div>

                {/* 3. Foco no resultado */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1 text-[#38bdf8]">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    100%
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    foco no resultado
                  </span>
                </div>
              </div>

              {/* Assinatura estilizada Diego Rosa com traço dinâmico */}
              <div className="pt-8 sm:pt-10 flex flex-col items-start select-none">
                <span className="font-['Caveat'] text-4xl sm:text-5xl font-bold tracking-wide text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.25)] transform -rotate-2">
                  Diego Rosa
                </span>
                <svg
                  className="w-32 sm:w-36 h-3.5 -mt-1 text-[#38bdf8]/80"
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

          {/* Coluna Direita: Grade de 6 Cards */}
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
      </div>
    </section>
  );
};

