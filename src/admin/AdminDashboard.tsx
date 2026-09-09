import React, { useEffect, useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Sparkles,
  FileText,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  Database,
  Globe,
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getAllAdminProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error loading dashboard projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const totalPublished = projects.filter((p) => p.published).length;
  const totalFeatured = projects.filter((p) => p.published && p.featured).length;
  const totalDrafts = projects.filter((p) => !p.published).length;
  const categories = Array.from(new Set(projects.map((p) => p.segment || p.category))).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Banner & Greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Administrativo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gerencie o catálogo de projetos, mídias e conteúdos dinâmicos do seu portfólio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/projetos/novo')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Novo Projeto</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isSupabaseConfigured()
                ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-400'
                : 'bg-amber-950/60 border border-amber-800 text-amber-400'
            }`}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Status da Conexão Supabase</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isSupabaseConfigured()
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {isSupabaseConfigured() ? 'Conectado em Produção' : 'Modo Preview / Local'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isSupabaseConfigured()
                ? 'Banco de dados PostgreSQL, Auth e Storage ativos e operacionais.'
                : 'Configurações de variáveis de ambiente ainda não detectadas. Operando com armazenamento local sincronizado.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/admin/configuracoes')}
          className="self-start sm:self-auto text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
        >
          Ver configurações →
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Publicados */}
        <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Projetos Ativos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {isLoading ? '...' : totalPublished}
          </div>
          <div className="text-[11px] text-slate-400">Visíveis publicamente no site</div>
        </div>

        {/* Card 2: Destaques na Home */}
        <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Destaques Home</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {isLoading ? '...' : `${totalFeatured}/6`}
          </div>
          <div className="text-[11px] text-slate-400">Limitado a 6 projetos principais</div>
        </div>

        {/* Card 3: Rascunhos */}
        <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Rascunhos</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {isLoading ? '...' : totalDrafts}
          </div>
          <div className="text-[11px] text-slate-400">Em preparação / Não publicados</div>
        </div>

        {/* Card 4: Categorias */}
        <div className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Segmentos</span>
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {isLoading ? '...' : categories}
          </div>
          <div className="text-[11px] text-slate-400">Categorias catalogadas</div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('/admin/projetos')}
          className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800 hover:border-slate-700 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <FolderGit2 className="w-5 h-5 text-blue-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <div className="text-sm font-bold text-white">Gerenciar Todos os Projetos</div>
          <div className="text-xs text-slate-400 mt-1">
            Visualizar tabela, editar ordem, status de publicação e destaques.
          </div>
        </button>

        <button
          onClick={() => onNavigate('/admin/conteudo')}
          className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800 hover:border-slate-700 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <div className="text-sm font-bold text-white">Editar Conteúdos do Site</div>
          <div className="text-xs text-slate-400 mt-1">
            Textos do Hero, seção Sobre, fotos, serviços e dados de contato.
          </div>
        </button>

        <button
          onClick={() => onNavigate('/')}
          className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800 hover:border-slate-700 text-left transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <ExternalLink className="w-5 h-5 text-emerald-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <div className="text-sm font-bold text-white">Visualizar Site Público</div>
          <div className="text-xs text-slate-400 mt-1">
            Conferir como as alterações estão sendo apresentadas aos visitantes.
          </div>
        </button>
      </div>

      {/* Recent Projects Table */}
      <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Projetos Recentes</h2>
            <p className="text-xs text-slate-400 mt-0.5">Últimos projetos cadastrados e ativos</p>
          </div>
          <button
            onClick={() => onNavigate('/admin/projetos')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            Ver todos ({projects.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Projeto</th>
                <th className="py-3 px-3">Categoria</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Destaque</th>
                <th className="py-3 px-3">Ordem</th>
                <th className="py-3 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-3 font-medium text-white flex items-center gap-3">
                    <img
                      src={project.image || project.thumbnailUrl}
                      alt={project.name}
                      className="w-10 h-7 rounded object-cover bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="truncate block font-bold">{project.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">/{project.slug}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 text-[10px]">
                      {project.segment || project.category}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {project.published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        Rascunho
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {project.featured ? (
                      <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Sim
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Não</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">
                    #{project.displayOrder || 0}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate(`/admin/projetos/${project.id}`)}
                      className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
