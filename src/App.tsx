import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { AboutSection } from './components/AboutSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// CMS Admin Components
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProjectsList } from './admin/AdminProjectsList';
import { AdminProjectForm } from './admin/AdminProjectForm';
import { AdminContentEditor } from './admin/AdminContentEditor';
import { AdminSettings } from './admin/AdminSettings';

// Custom Hooks
import { useAuth } from './hooks/useAuth';
import { useProjectDetail } from './hooks/useProjectDetail';
import { useSiteContent } from './hooks/useSiteContent';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hero, about } = useSiteContent();

  // Sync state with browser URL navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, hash?: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProject = (slug: string) => {
    const projectPath = `/projetos/${slug}`;
    window.history.pushState({}, '', projectPath);
    setCurrentPath(projectPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    window.history.pushState({}, '', '/projetos');
    setCurrentPath('/projetos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // ADMIN ROUTES
  // =========================================================================
  if (currentPath.startsWith('/admin')) {
    const cleanAdminPath = currentPath.replace(/\/$/, '');

    // Rota dedicada para login: /admin/login
    if (cleanAdminPath === '/admin/login') {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            navigateTo('/admin');
          }}
          onNavigateHome={() => {
            navigateTo('/');
          }}
        />
      );
    }

    // Conteúdo da sub-rota administrativa
    let adminContent = null;
    if (cleanAdminPath === '/admin/projetos') {
      adminContent = <AdminProjectsList onNavigate={navigateTo} />;
    } else if (cleanAdminPath === '/admin/projetos/novo') {
      adminContent = <AdminProjectForm onNavigate={navigateTo} />;
    } else if (cleanAdminPath.startsWith('/admin/projetos/')) {
      const projectId = cleanAdminPath.replace('/admin/projetos/', '');
      adminContent = <AdminProjectForm projectId={projectId} onNavigate={navigateTo} />;
    } else if (cleanAdminPath === '/admin/conteudo') {
      adminContent = <AdminContentEditor />;
    } else if (cleanAdminPath === '/admin/configuracoes') {
      adminContent = <AdminSettings />;
    } else {
      // Default: Dashboard (/admin)
      adminContent = <AdminDashboard onNavigate={navigateTo} />;
    }

    // Todas as rotas /admin (exceto /admin/login) são estritamente protegidas por ProtectedRoute
    return (
      <ProtectedRoute
        onUnauthorized={() => {
          navigateTo('/admin/login');
        }}
      >
        <AdminLayout currentPath={currentPath} onNavigate={navigateTo}>
          {adminContent}
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // =========================================================================
  // PUBLIC ROUTES
  // =========================================================================

  // Check if viewing a single project detail page: /projetos/:slug
  const isProjectsListPage = currentPath === '/projetos' || currentPath === '/projetos/';
  const isProjectDetailRoute = currentPath.startsWith('/projetos/') && !isProjectsListPage;
  const projectSlug = isProjectDetailRoute
    ? currentPath.replace('/projetos/', '').replace(/\/$/, '')
    : null;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      <main className="flex-1">
        {isProjectDetailRoute && projectSlug ? (
          /* Project Detail View with dynamic fetching */
          <ProjectDetailRouteContainer
            slug={projectSlug}
            onBack={handleBackToProjects}
            onSelectProject={handleSelectProject}
          />
        ) : isProjectsListPage ? (
          /* Projects Listing Page */
          <ProjectsPage onSelectProject={handleSelectProject} />
        ) : (
          /* Home Portfolio Page */
          <>
            {/* 1. Hero with dynamic content */}
            <Hero
              content={hero}
              onExploreProjects={() => navigateTo('/projetos')}
            />

            {/* 2. Stats / Indicadores */}
            <StatsBar />

            {/* 3. Featured Projects (Meus Projetos - Limite 6 na Home) */}
            <FeaturedProjects
              onSelectProject={handleSelectProject}
              onViewAllProjects={() => navigateTo('/projetos')}
            />

            {/* 4. Services (O que eu faço) */}
            <ServicesSection />

            {/* 5. Process Timeline (Como funciona) */}
            <ProcessTimeline />

            {/* 6. About Me with dynamic content */}
            <AboutSection content={about} />

            {/* 7. Differentials (Diferenciais) */}
            <DifferentialsSection />

            {/* 8. Final CTA (Vamos conversar?) */}
            <FinalCTA onExploreProjects={() => navigateTo('/projetos')} />
          </>
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

/**
 * Helper container for loading project detail dynamically
 */
function ProjectDetailRouteContainer({
  slug,
  onBack,
  onSelectProject,
}: {
  slug: string;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}) {
  const { project, isLoading, error } = useProjectDetail(slug);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">
        Carregando detalhes do projeto...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-xl font-bold text-white">Projeto não encontrado</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          O projeto solicitado não foi localizado ou não está mais publicado.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
        >
          Voltar para Projetos
        </button>
      </div>
    );
  }

  return (
    <ProjectDetailPage
      project={project}
      onBack={onBack}
      onSelectProject={onSelectProject}
    />
  );
}
