import React, { useState, useEffect } from 'react';
import {
  Save,
  Check,
  Upload,
  Layers,
  User,
  Sparkles,
  MessageSquare,
  Plus,
  Trash2,
  Phone,
} from 'lucide-react';
import {
  SiteHeroContent,
  SiteAboutContent,
  SiteCtaContent,
  SiteContactContent,
  ServiceItem,
} from '../types';
import {
  contentService,
  DEFAULT_HERO_CONTENT,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CTA_CONTENT,
  DEFAULT_CONTACT_CONTENT,
} from '../services/contentService';
import { serviceService } from '../services/serviceService';
import { storageService } from '../services/storageService';

export const AdminContentEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'cta' | 'contact'>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // States
  const [hero, setHero] = useState<SiteHeroContent>(DEFAULT_HERO_CONTENT);
  const [about, setAbout] = useState<SiteAboutContent>(DEFAULT_ABOUT_CONTENT);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [cta, setCta] = useState<SiteCtaContent>(DEFAULT_CTA_CONTENT);
  const [contact, setContact] = useState<SiteContactContent>(DEFAULT_CONTACT_CONTENT);

  // Service modal / editing
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const [h, a, c, ct, s] = await Promise.all([
        contentService.getSectionContent<SiteHeroContent>('hero', DEFAULT_HERO_CONTENT),
        contentService.getSectionContent<SiteAboutContent>('about', DEFAULT_ABOUT_CONTENT),
        contentService.getSectionContent<SiteCtaContent>('cta', DEFAULT_CTA_CONTENT),
        contentService.getSectionContent<SiteContactContent>('contact', DEFAULT_CONTACT_CONTENT),
        serviceService.getAllServices(),
      ]);
      setHero(h);
      setAbout(a);
      setCta(c);
      setContact(ct);
      setServices(s);
    };
    loadContent();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      if (activeTab === 'hero') {
        await contentService.saveSectionContent('hero', hero);
      } else if (activeTab === 'about') {
        await contentService.saveSectionContent('about', about);
      } else if (activeTab === 'cta') {
        await contentService.saveSectionContent('cta', cta);
      } else if (activeTab === 'contact') {
        await contentService.saveSectionContent('contact', contact);
      }
      showToast('Conteúdo salvo com sucesso!');
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar conteúdo.');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload photo handler for site content (stored in portfolio-site bucket)
  const handleUploadPhoto = async (file: File, target: 'heroDesktop' | 'heroMobile' | 'aboutPhoto') => {
    try {
      const result = await storageService.uploadImage(file, 'portfolio-site', 'general');
      if (target === 'heroDesktop') {
        setHero({ ...hero, imageDesktopUrl: result.url });
      } else if (target === 'heroMobile') {
        setHero({ ...hero, imageMobileUrl: result.url });
      } else if (target === 'aboutPhoto') {
        setAbout({ ...about, photoUrl: result.url });
      }
      showToast('Imagem carregada com sucesso!');
    } catch (err: any) {
      alert(err.message || 'Erro no upload da imagem.');
    }
  };

  // Service actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title?.trim()) return;
    const saved = await serviceService.saveService(editingService);
    const updated = await serviceService.getAllServices();
    setServices(updated);
    setEditingService(null);
    showToast('Serviço atualizado com sucesso!');
  };

  const handleDeleteService = async (id: string) => {
    await serviceService.deleteService(id);
    const updated = await serviceService.getAllServices();
    setServices(updated);
    showToast('Serviço removido.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Conteúdo Geral do Site
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerencie textos do Hero, biografia Sobre, catálogo de serviços e informações de contato.
          </p>
        </div>

        {activeTab !== 'services' && (
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Hero (Início)</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Sobre Mim</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'services'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Serviços</span>
        </button>

        <button
          onClick={() => setActiveTab('cta')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'cta'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chamada (CTA)</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contato & Redes</span>
        </button>
      </div>

      {/* TAB 1: HERO */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Textos Principais do Hero
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Badge Superior
                </label>
                <input
                  type="text"
                  value={hero.badge}
                  onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Texto em Destaque (Gradiente)
                </label>
                <input
                  type="text"
                  value={hero.highlightText}
                  onChange={(e) => setHero({ ...hero, highlightText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-blue-400 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Título do Hero
              </label>
              <input
                type="text"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Descrição
              </label>
              <textarea
                rows={3}
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Texto do Botão de Projetos
                </label>
                <input
                  type="text"
                  value={hero.buttonProjectsText}
                  onChange={(e) => setHero({ ...hero, buttonProjectsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Texto do Botão de WhatsApp
                </label>
                <input
                  type="text"
                  value={hero.buttonWhatsappText}
                  onChange={(e) => setHero({ ...hero, buttonWhatsappText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Imagem do Diego no Hero */}
          <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Foto do Diego no Hero (Site Geral)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center gap-4">
                <img
                  src={hero.imageDesktopUrl || '/images/diego-rosa.jpg'}
                  alt="Diego Rosa Hero Preview"
                  className="w-20 h-24 rounded-lg object-cover bg-slate-950 shrink-0"
                />
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-white block">Foto Desktop</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Alterar Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0], 'heroDesktop')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center gap-4">
                <img
                  src={hero.imageMobileUrl || '/images/diego-rosa.jpg'}
                  alt="Diego Rosa Mobile Preview"
                  className="w-20 h-24 rounded-lg object-cover bg-slate-950 shrink-0"
                />
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-white block">Foto Mobile</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Alterar Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0], 'heroMobile')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOBRE */}
      {activeTab === 'about' && (
        <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Seção Sobre Mim
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Label Superior
              </label>
              <input
                type="text"
                value={about.label}
                onChange={(e) => setAbout({ ...about, label: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Título
              </label>
              <input
                type="text"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Parágrafo 1
            </label>
            <textarea
              rows={3}
              value={about.paragraph1}
              onChange={(e) => setAbout({ ...about, paragraph1: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Parágrafo 2
            </label>
            <textarea
              rows={3}
              value={about.paragraph2}
              onChange={(e) => setAbout({ ...about, paragraph2: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
            />
          </div>

          {/* Métricas estatísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Experiência
              </label>
              <input
                type="text"
                value={about.experienceYears}
                onChange={(e) => setAbout({ ...about, experienceYears: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Projetos
              </label>
              <input
                type="text"
                value={about.projectsCount}
                onChange={(e) => setAbout({ ...about, projectsCount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Segmentos
              </label>
              <input
                type="text"
                value={about.segmentsCount}
                onChange={(e) => setAbout({ ...about, segmentsCount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Foco
              </label>
              <input
                type="text"
                value={about.focusText}
                onChange={(e) => setAbout({ ...about, focusText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVIÇOS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Serviços Oferecidos
            </h3>
            <button
              onClick={() =>
                setEditingService({
                  title: '',
                  description: '',
                  icon: 'Layout',
                  active: true,
                  displayOrder: services.length + 1,
                })
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Serviço</span>
            </button>
          </div>

          {/* Service Editor Modal */}
          {editingService && (
            <form
              onSubmit={handleSaveService}
              className="p-5 rounded-2xl bg-[#0d1220] border border-blue-500/40 space-y-4 shadow-xl"
            >
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {editingService.id ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Nome do serviço (ex: Landing Pages de Alta Conversão)"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Ícone (ex: Layout, ShoppingBag, Wrench, Search)"
                  value={editingService.icon || ''}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
              <textarea
                rows={2}
                required
                placeholder="Descrição detalhada do serviço..."
                value={editingService.description || ''}
                onChange={(e) =>
                  setEditingService({ ...editingService, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  Salvar Serviço
                </button>
              </div>
            </form>
          )}

          {/* List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{srv.title || srv.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingService(srv)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteService(srv.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CTA */}
      {activeTab === 'cta' && (
        <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Seção Final de Conversão (CTA)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Label Superior
              </label>
              <input
                type="text"
                value={cta.label}
                onChange={(e) => setCta({ ...cta, label: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Título do Bloco
              </label>
              <input
                type="text"
                value={cta.title}
                onChange={(e) => setCta({ ...cta, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Descrição
            </label>
            <textarea
              rows={3}
              value={cta.description}
              onChange={(e) => setCta({ ...cta, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Texto do Botão de WhatsApp
              </label>
              <input
                type="text"
                value={cta.whatsappButtonText}
                onChange={(e) => setCta({ ...cta, whatsappButtonText: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Texto do Botão Secundário
              </label>
              <input
                type="text"
                value={cta.projectsButtonText}
                onChange={(e) => setCta({ ...cta, projectsButtonText: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONTATO */}
      {activeTab === 'contact' && (
        <div className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Dados de Contato & Redes Sociais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Número de WhatsApp (Exibição)
              </label>
              <input
                type="text"
                value={contact.whatsapp}
                onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Link do WhatsApp (wa.me)
              </label>
              <input
                type="url"
                value={contact.whatsappUrl}
                onChange={(e) => setContact({ ...contact, whatsappUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                E-mail Comercial
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Localização (Cidade/Estado)
              </label>
              <input
                type="text"
                value={contact.location}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Perfil do LinkedIn
              </label>
              <input
                type="url"
                value={contact.linkedinUrl}
                onChange={(e) => setContact({ ...contact, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Perfil do GitHub
              </label>
              <input
                type="url"
                value={contact.githubUrl}
                onChange={(e) => setContact({ ...contact, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
