import React from 'react';
import {
  Briefcase,
  Rocket,
  Users,
  Crosshair,
  ArrowRight,
  Code2,
  Database,
} from 'lucide-react';
import { WHATSAPP_URL } from '../data/servicesAndProcess';
import { SiteAboutContent } from '../types';

interface AboutSectionProps {
  content?: SiteAboutContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const label = content?.label || 'Sobre mim';
  const title = content?.title || 'Prazer, sou o Diego.';
  const defaultP1 =
    'Desenvolvo sites profissionais que fortalecem sua marca, geram confiança e transformam visitantes em oportunidades.';
  const defaultP2 =
    'Meu trabalho combina design, performance, SEO e tecnologia para criar experiências digitais profissionais, rápidas e pensadas para o seu negócio.';

  const p1 =
    content?.paragraph1 &&
    !content.paragraph1.includes('Trabalho com desenvolvimento de sites e experiências digitais, unindo')
      ? content.paragraph1
      : defaultP1;
  const p2 =
    content?.paragraph2 &&
    !content.paragraph2.includes('Meu foco é transformar ideias em soluções digitais bem estruturadas')
      ? content.paragraph2
      : defaultP2;
  const photo = content?.photoUrl || '/images/diego-rosa.jpg';
  const expRaw = content?.experienceYears || '5+';
  const exp = expRaw.replace(/anos/gi, '').trim() || '5+';
  const projectsCount = content?.projectsCount || '10+';
  const segments = content?.segmentsCount || '5+';

  return (
    <section
      id="sobre"
      className="py-20 sm:py-28 relative bg-[#030714] border-y border-blue-950/60 overflow-hidden"
    >
      {/* Luz ambiente de fundo para contraste sutil e sofisticado */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* Coluna 1: Foto com estética Cyber (chamfer nos cantos e badge) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Anotação manuscrita no topo esquerdo */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20 pointer-events-none select-none">
                <div className="font-['Caveat'] text-lg sm:text-xl text-[#38bdf8] font-bold leading-[1.1] -rotate-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  <div>Código</div>
                  <div className="pl-2">ideias</div>
                  <div className="pl-4">resultados</div>
                </div>
              </div>

              {/* Moldura com corte chanfrado (Top-Left e Bottom-Right) */}
              <div
                className="p-[2px] bg-gradient-to-br from-[#38bdf8] via-blue-700/40 to-[#38bdf8]/70 shadow-[0_0_35px_rgba(56,189,248,0.2)]"
                style={{
                  clipPath:
                    'polygon(36px 0%, 100% 0%, 100% calc(100% - 36px), calc(100% - 36px) 100%, 0% 100%, 0% 36px)',
                }}
              >
                <div
                  className="w-full aspect-[4/5] bg-[#070e22] relative overflow-hidden group"
                  style={{
                    clipPath:
                      'polygon(35px 0%, 100% 0%, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0% 100%, 0% 35px)',
                  }}
                >
                  <img
                    src={"https://media.licdn.com/dms/image/v2/D4D03AQGkog7BTbBiGw/profile-displayphoto-scale_400_400/B4DZ5bQwCBHAAg-/0/1779647580925?e=1790812800&v=beta&t=KMlLiAGXMkJrqVDN8vIcbCeW0a7-M2gfTJFXKlNZoFU"}
                    alt="Diego Rosa - Engenheiro de Software"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradiente escuro inferior para legibilidade do badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-[#030714]/30 to-transparent pointer-events-none" />

                  {/* Badge flutuante sobre a foto */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#060c1d]/90 backdrop-blur-md border border-blue-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
                    <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-400/50 flex items-center justify-center text-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.3)] shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm tracking-tight leading-snug">
                        Engenheiro de Software
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        Sites profissionais
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna 2: Bio, Tech Stack & Assinatura */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Tag / Eyebrow com linha horizontal */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                {label.toUpperCase()}
              </span>
              <span className="w-16 sm:w-20 h-[2px] bg-blue-500/50 rounded-full" />
            </div>

            {/* Título com destaque gradiente */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.15] mb-3">
              Prazer, sou o <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Diego.
              </span>
            </h2>

            {/* Subtítulo profissional */}
            <h3 className="text-sm sm:text-base font-semibold text-white/95 leading-snug mb-3">
              Engenheiro de Software e desenvolvedor de soluções digitais.
            </h3>

            {/* Parágrafos de apresentação */}
            <div className="space-y-2.5 text-slate-300/85 text-xs sm:text-sm leading-relaxed mb-5">
              <p>{p1}</p>
              <p className="text-slate-400">{p2}</p>
            </div>

            {/* Pílula horizontal com Tech Stack */}
            <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 rounded-full bg-[#070e22]/90 border border-slate-800/90 shadow-inner mb-6 w-fit">
              {/* React */}
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                <span className="text-[#38bdf8] text-sm leading-none font-bold">⚛</span>
                <span>React</span>
              </div>
              {/* TypeScript */}
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                <span className="w-3.5 h-3.5 rounded bg-blue-600 text-[9px] font-bold text-white flex items-center justify-center">
                  TS
                </span>
                <span>TypeScript</span>
              </div>
              {/* Node.js */}
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                <span className="text-emerald-400 text-xs">⬢</span>
                <span>Node.js</span>
              </div>
              {/* PostgreSQL */}
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>PostgreSQL</span>
              </div>
              {/* Vercel */}
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span>Vercel</span>
              </div>
            </div>



          </div>

          {/* Coluna 3: Cards de Estatísticas Fatuais */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 sm:gap-4">
            
            {/* Card 1: 5+ anos trabalhando com tecnologia */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-[#070e22]/80 backdrop-blur-sm border border-slate-800/85 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-3.5 hover:-translate-y-0.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-500/25 to-blue-950/50 border border-blue-400/40 text-[#38bdf8] shadow-[0_0_18px_rgba(56,189,248,0.25)]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {exp}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 leading-snug mt-0.5">
                  anos trabalhando com tecnologia
                </div>
              </div>
            </div>

            {/* Card 2: 10+ projetos entregues */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-[#070e22]/80 backdrop-blur-sm border border-slate-800/85 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-3.5 hover:-translate-y-0.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-purple-500/25 to-purple-950/50 border border-purple-400/40 text-[#c084fc] shadow-[0_0_18px_rgba(192,132,252,0.25)]">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {projectsCount}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 leading-snug mt-0.5">
                  projetos entregues
                </div>
              </div>
            </div>

            {/* Card 3: 5+ segmentos atendidos */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-[#070e22]/80 backdrop-blur-sm border border-slate-800/85 hover:border-teal-500/50 transition-all duration-300 flex items-center gap-3.5 hover:-translate-y-0.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-teal-500/25 to-teal-950/50 border border-teal-400/40 text-[#2dd4bf] shadow-[0_0_18px_rgba(45,212,191,0.25)]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {segments}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 leading-snug mt-0.5">
                  segmentos atendidos
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Barra Inferior: Tecnologia · Estratégia · Resultado + CTA */}
        <div className="pt-8 sm:pt-10 mt-12 sm:mt-16 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Lado Esquerdo */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
            <Crosshair className="w-4 h-4 text-[#38bdf8]" />
            <span>TECNOLOGIA</span>
            <span className="text-slate-600">•</span>
            <span>ESTRATÉGIA</span>
            <span className="text-slate-600">•</span>
            <span>RESULTADO</span>
          </div>

          {/* Lado Direito */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#38bdf8] hover:text-white transition-colors"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-[#38bdf8]/60 group-hover:w-16 transition-all duration-300" />
            <span>VAMOS CONSTRUIR ALGO INCRÍVEL</span>
            <ArrowRight className="w-4 h-4 text-[#38bdf8] group-hover:translate-x-1.5 transition-transform" />
          </a>

        </div>

      </div>
    </section>
  );
};

