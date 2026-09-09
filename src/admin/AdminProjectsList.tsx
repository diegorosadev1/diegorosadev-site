import React, { useEffect, useState } from 'react';
import {
  PlusCircle,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types';

interface AdminProjectsListProps {
  onNavigate: (path: string) => void;
}

export const AdminProjectsList: React.FC<AdminProjectsListProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'todos' | 'publicados' | 'rascunhos' | 'destaques'>('todos');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectService.getAllAdminProjects({
        search: searchTerm,
        filter,
      });
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [searchTerm, filter]);

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await projectService.togglePublish(id, !current);
    showToast(`Projeto ${!current ? 'publicado' : 'despublicado'} com sucesso!`);
    loadProjects();
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await projectService.toggleFeatured(id, !current);
    showToast(`Projeto ${!current ? 'adicionado aos destaques' : 'removido dos destaques'} da Home!`);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    await projectService.deleteProject(id);
    setDeleteConfirmId(null);
    showToast('Projeto excluído com sucesso.');
    loadProjects();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0c101c] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Confirmar Exclusão</h3>
            </div>
            <p className="text-xs text-slate-300">
              Tem certeza que deseja excluir permanentemente este projeto e todos os seus dados
              associados (problemas, soluções, destaques e imagens)?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs text-white bg-rose-600 hover:bg-rose-500 font-semibold shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                Sim, Excluir Projeto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projetos Cadastrados
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gerencie status de publicação, destaques na tela inicial e dados de case study.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/projetos/novo')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Cadastrar Novo Projeto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090d18] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['todos', 'publicados', 'rascunhos', 'destaques'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab === 'todos'
                ? 'Todos'
                : tab === 'publicados'
                ? 'Publicados'
                : tab === 'rascunhos'
                ? 'Rascunhos'
                : 'Destaques Home'}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou categoria..."
            className="w-full pl-9 pr-3 py-2 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold bg-slate-900/40">
                <th className="py-3.5 px-4">Capa & Nome</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Destaque Home</th>
                <th className="py-3.5 px-4">Ordem</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Carregando projetos...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Nenhum projeto encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/20 transition-colors">
                    {/* Capa & Nome */}
                    <td className="py-3 px-4 font-medium text-white flex items-center gap-3">
                      <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                        <img
                          src={project.thumbnailUrl || project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-white truncate block text-sm">
                          {project.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono truncate block">
                          /{project.slug}
                        </span>
                      </div>
                    </td>

                    {/* Categoria */}
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80 text-[10px] font-medium">
                        {project.segment || project.category}
                      </span>
                    </td>

                    {/* Publicado Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(project.id, Boolean(project.published))}
                        title="Clique para alternar publicação"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          project.published
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/80 hover:bg-emerald-900/60'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {project.published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Publicado</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Rascunho</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Destaque Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleFeatured(project.id, Boolean(project.featured))}
                        title="Clique para alternar destaque na Home"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          project.featured
                            ? 'bg-amber-950/70 text-amber-400 border border-amber-800/80 hover:bg-amber-900/60'
                            : 'bg-slate-800/60 text-slate-500 border border-slate-800 hover:text-slate-300'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{project.featured ? 'Destacado (Home)' : 'Padrão'}</span>
                      </button>
                    </td>

                    {/* Ordem */}
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      #{project.displayOrder || 0}
                    </td>

                    {/* Ações */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Public */}
                        <button
                          onClick={() => onNavigate(`/projetos/${project.slug}`)}
                          title="Visualizar página pública do projeto"
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => onNavigate(`/admin/projetos/${project.id}`)}
                          title="Editar projeto"
                          className="p-1.5 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-950/40 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          title="Excluir projeto"
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
