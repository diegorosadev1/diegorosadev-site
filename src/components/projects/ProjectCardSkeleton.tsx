import React from 'react';

export interface ProjectCardSkeletonProps {
  variant?: 'featured' | 'catalog';
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({
  variant = 'featured',
}) => {
  if (variant === 'featured') {
    return (
      <div
        className="relative bg-[#060a16]/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex flex-col justify-between skeleton-shimmer overflow-hidden"
        aria-hidden="true"
      >
        <div>
          {/* Área da imagem/capa */}
          <div className="relative aspect-[16/9.5] rounded-xl overflow-hidden mb-4 bg-slate-950/80 border border-slate-800/80">
            <div className="w-full h-full bg-slate-900/90 animate-pulse" />

            {/* Badge de categoria flutuante no topo esquerdo */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              <div className="h-5 sm:h-6 w-24 sm:w-28 rounded-full bg-slate-800/80 border border-slate-700/50 animate-pulse" />
            </div>

            {/* Ícone de link externo flutuante no topo direito */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-slate-900/80 border border-white/5 animate-pulse" />
          </div>

          {/* Título */}
          <div className="h-6 w-3/4 bg-slate-800/80 rounded-lg mb-2.5 animate-pulse" />

          {/* Descrição */}
          <div className="space-y-2 mb-4 min-h-[38px]">
            <div className="h-3.5 w-full bg-slate-800/60 rounded animate-pulse" />
            <div className="h-3.5 w-4/5 bg-slate-800/60 rounded animate-pulse" />
          </div>

          {/* Badges de Tecnologias */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <div className="h-5 sm:h-6 w-16 rounded-md bg-[#0a1122] border border-slate-800/90 animate-pulse" />
            <div className="h-5 sm:h-6 w-20 rounded-md bg-[#0a1122] border border-slate-800/90 animate-pulse" />
            <div className="h-5 sm:h-6 w-14 rounded-md bg-[#0a1122] border border-slate-800/90 animate-pulse" />
            <div className="h-5 sm:h-6 w-16 rounded-md bg-[#0a1122] border border-slate-800/90 animate-pulse" />
          </div>
        </div>

        {/* Botão "Visitar site" no rodapé */}
        <div className="pt-4 border-t border-slate-800/60">
          <div className="w-full h-10 rounded-xl bg-slate-800/70 border border-slate-700/40 animate-pulse flex items-center justify-center gap-2">
            <div className="w-20 h-3.5 bg-slate-700/60 rounded animate-pulse" />
            <div className="w-3.5 h-3.5 bg-slate-700/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Catalog variant (compatível com os cards da página de projetos / ProjectGrid)
  return (
    <div
      className="bg-[#0a0f1d] border border-slate-800/90 rounded-2xl overflow-hidden shadow-lg shadow-black/40 flex flex-col justify-between skeleton-shimmer"
      aria-hidden="true"
    >
      <div>
        {/* Área da imagem/capa */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/90">
          <div className="w-full h-full bg-slate-900/90 animate-pulse" />

          {/* Badge de categoria flutuante no topo esquerdo */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <div className="h-5 sm:h-6 w-24 sm:w-28 rounded-full bg-[#070b16]/80 border border-white/10 animate-pulse" />
          </div>

          {/* Ícone de link externo flutuante no topo direito */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-slate-900/80 border border-white/5 animate-pulse" />
        </div>

        {/* Conteúdo do Card */}
        <div className="p-5 sm:p-6 pb-2">
          {/* Header do projeto: Logo + Título + Categoria */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800/90 shrink-0 animate-pulse" />
            <div className="flex-1 space-y-1.5">
              <div className="h-5 w-3/4 bg-slate-800/80 rounded animate-pulse" />
              <div className="h-3 w-1/3 bg-slate-800/50 rounded animate-pulse" />
            </div>
          </div>

          {/* Descrição */}
          <div className="mt-3.5 mb-4 space-y-2 min-h-[3.6rem]">
            <div className="h-3.5 w-full bg-slate-800/60 rounded animate-pulse" />
            <div className="h-3.5 w-11/12 bg-slate-800/60 rounded animate-pulse" />
            <div className="h-3.5 w-2/3 bg-slate-800/60 rounded animate-pulse" />
          </div>

          {/* Badges de Tecnologias */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-6 w-16 rounded-lg bg-[#0d1424] border border-slate-800/90 animate-pulse" />
            <div className="h-6 w-20 rounded-lg bg-[#0d1424] border border-slate-800/90 animate-pulse" />
            <div className="h-6 w-16 rounded-lg bg-[#0d1424] border border-slate-800/90 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Botão "Visitar site" no rodapé */}
      <div className="p-5 sm:p-6 pt-3 border-t border-slate-800/80">
        <div className="w-full h-10 rounded-xl bg-slate-800/70 border border-slate-700/40 animate-pulse flex items-center justify-center gap-2">
          <div className="w-20 h-3.5 bg-slate-700/60 rounded animate-pulse" />
          <div className="w-3.5 h-3.5 bg-slate-700/60 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
