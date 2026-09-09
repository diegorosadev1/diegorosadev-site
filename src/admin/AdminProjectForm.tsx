import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Tag,
  Eye,
} from 'lucide-react';
import { Project, TechItem, FeatureItem, ResultMetric, ProjectScreenshot } from '../types';
import { projectService } from '../services/projectService';
import { technologyService, TechOption } from '../services/technologyService';
import { storageService } from '../services/storageService';

interface AdminProjectFormProps {
  projectId?: string; // If undefined, we are creating a new project
  onNavigate: (path: string) => void;
}

export const AdminProjectForm: React.FC<AdminProjectFormProps> = ({
  projectId,
  onNavigate,
}) => {
  const isEditing = Boolean(projectId && projectId !== 'novo');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available tech catalog
  const [availableTechs, setAvailableTechs] = useState<TechOption[]>([]);
  const [newTechModalOpen, setNewTechModalOpen] = useState(false);
  const [newTechName, setNewTechName] = useState('');
  const [newTechSubtitle, setNewTechSubtitle] = useState('');

  // Project Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Automotivo');
  const [shortDescription, setShortDescription] = useState('');
  const [heroSummary, setHeroSummary] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [published, setPublished] = useState<boolean>(true);
  const [featured, setFeatured] = useState<boolean>(false);

  // Images
  const [logoUrl, setLogoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [heroDesktopUrl, setHeroDesktopUrl] = useState('');
  const [heroMobileUrl, setHeroMobileUrl] = useState('');

  // Section Toggles
  const [showContext, setShowContext] = useState(true);
  const [showProblems, setShowProblems] = useState(true);
  const [showSolutions, setShowSolutions] = useState(true);
  const [showHighlights, setShowHighlights] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [showGallery, setShowGallery] = useState(true);

  // Context
  const [contextTitle, setContextTitle] = useState('');
  const [contextDescription, setContextDescription] = useState('');
  const [contextImageUrl, setContextImageUrl] = useState('');

  // Selected Technologies
  const [selectedTechNames, setSelectedTechNames] = useState<string[]>([]);

  // Problems
  const [problems, setProblems] = useState<string[]>([]);
  const [newProblemInput, setNewProblemInput] = useState('');

  // Solutions
  const [solutions, setSolutions] = useState<string[]>([]);
  const [newSolutionInput, setNewSolutionInput] = useState('');

  // Highlights / Features
  const [highlights, setHighlights] = useState<FeatureItem[]>([]);

  // Results
  const [resultsTitle, setResultsTitle] = useState('Resultados Alcançados');
  const [resultsDescription, setResultsDescription] = useState('');
  const [results, setResults] = useState<ResultMetric[]>([]);

  // Gallery / Screenshots
  const [gallery, setGallery] = useState<ProjectScreenshot[]>([]);

  // Load existing project or initial tech catalog
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const techs = await technologyService.getTechnologies();
        setAvailableTechs(techs);

        if (isEditing && projectId) {
          const project = await projectService.getAdminProjectById(projectId);
          if (project) {
            setName(project.name);
            setSlug(project.slug);
            setCategory(project.segment || project.category || 'Geral');
            setShortDescription(project.shortDescription || '');
            setHeroSummary(project.heroSummary || project.description || '');
            setLiveUrl(project.liveUrl || '');
            setGithubUrl(project.githubUrl || '');
            setDisplayOrder(project.displayOrder || 1);
            setPublished(project.published ?? true);
            setFeatured(project.featured ?? false);

            setLogoUrl(project.logoUrl || project.logo || '');
            setThumbnailUrl(project.thumbnailUrl || project.image || '');
            setHeroDesktopUrl(project.heroDesktopUrl || project.thumbnailUrl || project.image || '');
            setHeroMobileUrl(project.heroMobileUrl || project.thumbnailUrl || project.image || '');

            setShowContext(project.showContext !== false);
            setShowProblems(project.showProblems !== false);
            setShowSolutions(project.showSolutions !== false);
            setShowHighlights(project.showHighlights !== false);
            setShowResults(project.showResults !== false);
            setShowGallery(project.showGallery !== false);

            setContextTitle(project.context?.title || '');
            setContextDescription(project.context?.description || '');
            setContextImageUrl(project.context?.image || '');

            setSelectedTechNames(
              (project.techStack || project.technologies || []).map((t) => t.name)
            );

            setProblems(project.problems || []);
            setSolutions(project.solutions || []);
            setHighlights(project.highlights || project.features || []);
            setResultsTitle(project.resultsTitle || 'Resultados Alcançados');
            setResultsDescription(project.resultsDescription || '');
            setResults(project.results || []);
            setGallery(project.gallery || project.screenshots || []);
          }
        } else {
          // Defaults for new project
          setSelectedTechNames(['React', 'TypeScript', 'Vite']);
          setProblems([
            'Site antigo sem responsividade para mobile',
            'Dificuldade para converter visitantes em leads qualificados',
          ]);
          setSolutions([
            'Arquitetura moderna com carregamento instantâneo',
            'Direcionamento de conversão com chamadas estratégicas para WhatsApp',
          ]);
          setHighlights([
            {
              title: 'Design Responsivo de Alta Conversão',
              description: 'Interface adaptável para todos os dispositivos e telas.',
            },
          ]);
          setResults([
            { value: '+140%', label: 'Mais contatos qualificados via WhatsApp' },
            { value: '< 1s', label: 'Tempo de carregamento médio no mobile' },
          ]);
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Erro ao carregar dados do formulário');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [projectId, isEditing]);

  // Auto-generate slug when name changes (only in create mode)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      const generated = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  // Image Upload Handlers
  const handleUploadImage = async (
    file: File,
    field: 'logo' | 'thumbnail' | 'heroDesktop' | 'heroMobile' | 'context'
  ) => {
    try {
      const result = await storageService.uploadImage(file, 'portfolio-projects', slug || 'temp');
      if (field === 'logo') setLogoUrl(result.url);
      if (field === 'thumbnail') setThumbnailUrl(result.url);
      if (field === 'heroDesktop') setHeroDesktopUrl(result.url);
      if (field === 'heroMobile') setHeroMobileUrl(result.url);
      if (field === 'context') setContextImageUrl(result.url);
    } catch (err: any) {
      alert(err.message || 'Erro no upload da imagem.');
    }
  };

  // Gallery image upload
  const handleAddGalleryImage = async (file: File) => {
    try {
      const result = await storageService.uploadImage(file, 'portfolio-projects', `${slug || 'temp'}/gallery`);
      const newImg: ProjectScreenshot = {
        image: result.url,
        url: result.url,
        title: file.name.replace(/\.[^/.]+$/, ''),
        caption: '',
        alt: file.name,
      };
      setGallery([...gallery, newImg]);
    } catch (err: any) {
      alert(err.message || 'Erro no upload da screenshot.');
    }
  };

  // Toggle Technology
  const toggleTech = (techName: string) => {
    if (selectedTechNames.includes(techName)) {
      setSelectedTechNames(selectedTechNames.filter((t) => t !== techName));
    } else {
      setSelectedTechNames([...selectedTechNames, techName]);
    }
  };

  // Add New Technology Modal
  const handleCreateNewTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechName.trim()) return;
    try {
      const created = await technologyService.createTechnology(newTechName, newTechSubtitle);
      setAvailableTechs([...availableTechs, created]);
      setSelectedTechNames([...selectedTechNames, created.name]);
      setNewTechName('');
      setNewTechSubtitle('');
      setNewTechModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Erro ao cadastrar tecnologia.');
    }
  };

  // Save Project
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('O nome do projeto é obrigatório.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('O slug do projeto é obrigatório.');
      return;
    }

    setIsSaving(true);
    try {
      // Map techStack
      const techStack: TechItem[] = selectedTechNames.map((tName) => {
        const found = availableTechs.find((at) => at.name === tName);
        return {
          name: tName,
          subtitle: found?.subtitle || 'Tecnologia',
        };
      });

      const projectPayload: Partial<Project> = {
        id: isEditing && projectId ? projectId : undefined,
        name,
        slug,
        segment: category,
        category,
        shortDescription,
        heroSummary,
        description: heroSummary,
        image: thumbnailUrl || heroDesktopUrl || '/images/auto-shopping.jpg',
        thumbnailUrl,
        logoUrl,
        logo: logoUrl,
        heroDesktopUrl,
        heroMobileUrl,
        liveUrl,
        githubUrl,
        displayOrder: Number(displayOrder),
        published,
        featured,
        showContext,
        showProblems,
        showSolutions,
        showHighlights,
        showResults,
        showGallery,
        context: {
          title: contextTitle,
          description: contextDescription,
          image: contextImageUrl,
        },
        problems,
        solutions,
        features: highlights,
        highlights,
        resultsTitle,
        resultsDescription,
        results,
        techStack,
        technologies: techStack,
        gallery,
        screenshots: gallery,
      };

      const saved = await projectService.saveProject(projectPayload);
      setSuccessToast('Projeto salvo com sucesso!');
      setTimeout(() => {
        setSuccessToast(null);
        onNavigate('/admin/projetos');
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao salvar projeto no banco.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400">
        Carregando dados do projeto...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Bar with Back and Save */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/projetos')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {isEditing ? `Editar: ${name || 'Projeto'}` : 'Cadastrar Novo Projeto'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Preencha os dados e gerencie a identidade visual e o case study completo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/admin/projetos')}
            className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Projeto'}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* =========================================================================
            SECTION 1: Informações Básicas
        ========================================================================= */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <Tag className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Informações Principais
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nome */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Nome do Projeto *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Auto Shopping da Cidade"
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Slug (URL Amigável) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                  /projetos/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="auto-shopping"
                  className="w-full pl-24 pr-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Segmento / Categoria
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Automotivo, Imobiliário, Saúde, E-commerce"
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Ordem de Exibição */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Ordem de Exibição
              </label>
              <input
                type="number"
                min={0}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Link do Site no Ar (Live URL)
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://exemplo.com.br"
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Repositório GitHub (Opcional)
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/diegorosa/projeto"
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Descrição Curta */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Descrição Curta (Exibida no Card da Listagem) *
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Breve resumo comercial com foco em valor e funcionalidade."
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Resumo do Hero / Descrição Completa */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Resumo do Hero da Página de Detalhe
            </label>
            <textarea
              rows={3}
              value={heroSummary}
              onChange={(e) => setHeroSummary(e.target.value)}
              placeholder="Texto completo exibido no topo da página interna do projeto."
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Switches */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800/80">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-200">
                Publicar no site (Visível para o público)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Destacar na Página Inicial (Home - limite 6)
              </span>
            </label>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: Identidade Visual & Imagens
        ========================================================================= */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                2. Identidade Visual & Imagens
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Upload via Supabase Storage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1. Capa / Thumbnail */}
            <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Capa / Thumbnail (Card)</span>
                <span className="text-[10px] text-slate-400">16:10 proporção</span>
              </div>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Nenhuma imagem enviada</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload da Capa</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'thumbnail')}
                  className="hidden"
                />
              </label>
            </div>

            {/* 2. Logo do Cliente */}
            <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Logo do Cliente</span>
                <span className="text-[10px] text-slate-400">PNG/SVG Transparente</span>
              </div>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Nenhum logo enviado</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload do Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'logo')}
                  className="hidden"
                />
              </label>
            </div>

            {/* 3. Hero Desktop Image */}
            <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  Hero Desktop
                </span>
                <span className="text-[10px] text-blue-400 font-mono">1920x1080 recomendado</span>
              </div>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {heroDesktopUrl ? (
                  <img
                    src={heroDesktopUrl}
                    alt="Hero Desktop preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Mockup Desktop</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Hero Desktop</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'heroDesktop')}
                  className="hidden"
                />
              </label>
            </div>

            {/* 4. Hero Mobile Image */}
            <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                  Hero Mobile
                </span>
                <span className="text-[10px] text-purple-400 font-mono">1080x1920 recomendado</span>
              </div>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {heroMobileUrl ? (
                  <img
                    src={heroMobileUrl}
                    alt="Hero Mobile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Mockup Mobile</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Hero Mobile</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'heroMobile')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: Tecnologias
        ========================================================================= */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                3. Tecnologias Utilizadas
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setNewTechModalOpen(true)}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Cadastrar Nova Tecnologia</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Selecione as tecnologias que compõem a stack deste projeto:
          </p>

          <div className="flex flex-wrap gap-2">
            {availableTechs.map((tech) => {
              const isSelected = selectedTechNames.includes(tech.name);
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => toggleTech(tech.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{tech.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-blue-400" />}
                </button>
              );
            })}
          </div>

          {/* New Tech Modal */}
          {newTechModalOpen && (
            <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-700 space-y-3">
              <div className="text-xs font-bold text-white">Adicionar Tecnologia ao Catálogo</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nome (ex: Docker, GraphQL)"
                  value={newTechName}
                  onChange={(e) => setNewTechName(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Subtítulo (ex: Containerização)"
                  value={newTechSubtitle}
                  onChange={(e) => setNewTechSubtitle(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewTechModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleCreateNewTech}
                  className="px-3 py-1.5 rounded-lg text-xs bg-blue-600 text-white font-semibold"
                >
                  Salvar Tecnologia
                </button>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 4: Case Study Sections & Visibility Toggles
        ========================================================================= */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-6">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              4. Seções do Case Study
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ative ou desative seções e edite o conteúdo detalhado do projeto.
            </p>
          </div>

          {/* 4.1 Contexto */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Seção Contexto</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showContext}
                  onChange={(e) => setShowContext(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showContext && (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Título do Contexto"
                  value={contextTitle}
                  onChange={(e) => setContextTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
                <textarea
                  rows={3}
                  placeholder="Descrição detalhada do desafio e história do cliente..."
                  value={contextDescription}
                  onChange={(e) => setContextDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>
            )}
          </div>

          {/* 4.2 Problemas */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Seção Problemas</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showProblems}
                  onChange={(e) => setShowProblems(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showProblems && (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar problema enfrentado..."
                    value={newProblemInput}
                    onChange={(e) => setNewProblemInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newProblemInput.trim()) {
                          setProblems([...problems, newProblemInput.trim()]);
                          setNewProblemInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newProblemInput.trim()) {
                        setProblems([...problems, newProblemInput.trim()]);
                        setNewProblemInput('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="space-y-2">
                  {problems.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                    >
                      <span>• {p}</span>
                      <button
                        type="button"
                        onClick={() => setProblems(problems.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4.3 Soluções */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Seção Soluções</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showSolutions}
                  onChange={(e) => setShowSolutions(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showSolutions && (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar solução implementada..."
                    value={newSolutionInput}
                    onChange={(e) => setNewSolutionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newSolutionInput.trim()) {
                          setSolutions([...solutions, newSolutionInput.trim()]);
                          setNewSolutionInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSolutionInput.trim()) {
                        setSolutions([...solutions, newSolutionInput.trim()]);
                        setNewSolutionInput('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="space-y-2">
                  {solutions.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                    >
                      <span>• {s}</span>
                      <button
                        type="button"
                        onClick={() => setSolutions(solutions.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4.4 Destaques do Projeto */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Destaques do Projeto (Features)</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showHighlights}
                  onChange={(e) => setShowHighlights(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showHighlights && (
              <div className="space-y-3 pt-2">
                {highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-400">Destaque #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setHighlights(highlights.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        Remover
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Título do destaque"
                      value={h.title}
                      onChange={(e) => {
                        const updated = [...highlights];
                        updated[idx].title = e.target.value;
                        setHighlights(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Descrição do destaque"
                      value={h.description}
                      onChange={(e) => {
                        const updated = [...highlights];
                        updated[idx].description = e.target.value;
                        setHighlights(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setHighlights([
                      ...highlights,
                      { title: 'Novo Destaque', description: 'Descrição da funcionalidade implementada.' },
                    ])
                  }
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                >
                  + Adicionar Destaque
                </button>
              </div>
            )}
          </div>

          {/* 4.5 Resultados */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Resultados Alcançados (Métricas)</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showResults}
                  onChange={(e) => setShowResults(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showResults && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Título (ex: Resultados Alcançados)"
                    value={resultsTitle}
                    onChange={(e) => setResultsTitle(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Descrição opcional dos resultados"
                    value={resultsDescription}
                    onChange={(e) => setResultsDescription(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  {results.map((r, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800"
                    >
                      <input
                        type="text"
                        placeholder="Valor (ex: +340%, < 1s)"
                        value={r.value}
                        onChange={(e) => {
                          const updated = [...results];
                          updated[idx].value = e.target.value;
                          setResults(updated);
                        }}
                        className="w-28 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-emerald-400 font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Rótulo (ex: Aumento em conversão)"
                        value={r.label}
                        onChange={(e) => {
                          const updated = [...results];
                          updated[idx].label = e.target.value;
                          setResults(updated);
                        }}
                        className="flex-1 px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setResults(results.filter((_, i) => i !== idx))}
                        className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setResults([...results, { value: '+100%', label: 'Melhoria na métrica' }])
                  }
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                >
                  + Adicionar Métrica de Resultado
                </button>
              </div>
            )}
          </div>

          {/* 4.6 Galeria de Screenshots */}
          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Galeria de Imagens & Telas</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showGallery}
                  onChange={(e) => setShowGallery(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-900 text-blue-600"
                />
                <span>Exibir no site</span>
              </label>
            </div>

            {showGallery && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group"
                    >
                      <img
                        src={img.image || img.url}
                        alt={img.alt || `Screenshot ${idx + 1}`}
                        className="w-full aspect-video object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors border border-dashed border-slate-600">
                  <Upload className="w-4 h-4" />
                  <span>Adicionar Imagem à Galeria</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleAddGalleryImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Save Bar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#0c101c]/95 backdrop-blur border border-slate-700 shadow-2xl flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isEditing ? 'Editando projeto existente' : 'Criando novo projeto'}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/admin/projetos')}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : 'Salvar Projeto'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
