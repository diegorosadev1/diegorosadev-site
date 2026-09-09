import React from 'react';
import heroWorkstationImg from '../../assets/images/hero_developer_workstation_1788981117881.jpg';

export const ProjectHero: React.FC = () => {
  return (
    <section
      id="projects-hero"
      aria-label="Apresentação dos Projetos"
      className="relative w-full pt-32 sm:pt-36 pb-12 sm:pb-16 overflow-hidden bg-[#07090e]"
    >
      {/* Background Subtle Ambient Glow (Blue/Purple) */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Label & Description */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Meus Projetos
              </span>
            </div>

            {/* Main Title with highlighted expression */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.15]">
              Projetos que{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                geram resultados.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-300/80 leading-relaxed max-w-xl">
              Conheça alguns dos sites e landing pages que já desenvolvi.
              Cada projeto foi pensado para atender às necessidades específicas
              de cada cliente, com foco em performance, experiência do usuário
              e conversão.
            </p>
          </div>

          {/* Right Column: Workstation visual + Decorative Handwritten Note */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            
            {/* Handwritten Decorative Callout on Top-Right with Arrow */}
            <div className="absolute -top-6 sm:-top-8 right-4 sm:right-8 flex flex-col items-end z-20 pointer-events-none">
              <span className="font-['Caveat'] text-lg sm:text-2xl text-slate-200 tracking-wide rotate-[-3deg] text-right leading-tight select-none">
                Cada projeto<br />é um novo desafio.
              </span>
              {/* Refined Hand-drawn curved arrow pointing down-left toward laptop */}
              <svg
                width="46"
                height="42"
                viewBox="0 0 54 48"
                fill="none"
                className="text-slate-300 mt-0.5 mr-3 rotate-[-4deg]"
                aria-hidden="true"
              >
                <path
                  d="M44 4C36 18 20 28 8 36M8 36L18 34M8 36L14 26"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Workstation Laptop Mockup with Ambient Seamless Fade */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-blue-950/20 bg-[#080d19]">
              <img
                src={heroWorkstationImg}
                alt="Ambiente de desenvolvimento profissional"
                className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-cover object-center"
              />

              {/* Edge Gradient Mask for seamless blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/70 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/40 via-transparent to-transparent" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
