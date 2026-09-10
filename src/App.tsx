import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { AboutSection } from './components/AboutSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
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

  // Check if viewing projects list page: /projetos
  const isProjectsPage = currentPath.startsWith('/projetos');

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      <main className="flex-1">
        {isProjectsPage ? (
          /* Projects Listing Page */
          <ProjectsPage />
        ) : (
          /* Home Portfolio Page */
          <>
            {/* 1. Hero with dynamic content */}
            <Hero
              content={hero}
              onExploreProjects={() => navigateTo('/projetos')}
            />

            {/* 2. Featured Projects (Meus Projetos - Limite 6 na Home) */}
            <FeaturedProjects
              onViewAllProjects={() => navigateTo('/projetos')}
            />

            {/* 3. Services (O que eu faço) */}
            <ServicesSection />

            {/* 4. Process Timeline (Como funciona) */}
            <ProcessTimeline />

            {/* 5. About Me with dynamic content */}
            <AboutSection content={about} />

            {/* 6. Differentials (Diferenciais) */}
            <DifferentialsSection />

            {/* 7. Final CTA (Vamos conversar?) */}
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
