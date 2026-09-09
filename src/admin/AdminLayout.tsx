import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  FileEdit,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      active: currentPath === '/admin',
    },
    {
      label: 'Projetos',
      path: '/admin/projetos',
      icon: FolderGit2,
      active: currentPath.startsWith('/admin/projetos'),
    },
    {
      label: 'Conteúdo do Site',
      path: '/admin/conteudo',
      icon: FileEdit,
      active: currentPath === '/admin/conteudo',
    },
    {
      label: 'Configurações',
      path: '/admin/configuracoes',
      icon: Settings,
      active: currentPath === '/admin/configuracoes',
    },
  ];

  const handleLogout = async () => {
    await logout();
    onNavigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0a0e1a] border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-sm">
            DR
          </div>
          <div>
            <span className="font-bold text-white text-sm">Diego Rosa</span>
            <span className="text-[10px] block text-blue-400 font-semibold tracking-wider uppercase">
              CMS Admin
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#090d18] border-r border-slate-800/80 flex flex-col transition-transform duration-200 md:translate-x-0 md:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-extrabold text-blue-400 text-base shadow-inner">
              DR
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Diego Rosa</h2>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 uppercase tracking-wider mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Painel CMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick New Project Button */}
        <div className="px-4 pt-5 pb-2">
          <button
            onClick={() => {
              onNavigate('/admin/projetos/novo');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Criar Novo Projeto</span>
          </button>
        </div>

        {/* Main Nav Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  item.active
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.active ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.active && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          {/* View Public Site */}
          <button
            onClick={() => {
              onNavigate('/');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span>Ver Site Público</span>
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              Home
            </span>
          </button>

          {/* User Profile info */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="text-xs font-semibold text-white truncate">
                {user?.email || 'Administrador'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Autenticado
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sair do painel"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
