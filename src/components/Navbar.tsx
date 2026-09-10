import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', path: '/', hash: 'inicio' },
    { label: 'Projetos', path: '/projetos' },
    { label: 'Serviços', path: '/', hash: 'servicos' },
    { label: 'Sobre', path: '/', hash: 'sobre' },
    { label: 'Contato', path: '/', hash: 'contato' },
  ];

  const handleLinkClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    onNavigate(path, hash);
  };

  const isHome = currentPath === '/';

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-[#07090e]/50 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleLinkClick('/', 'inicio')}
          className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
        >
          <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left bracket < */}
              <path
                d="M12 11L4 18L12 25"
                stroke="url(#nav-code-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Slash / */}
              <path
                d="M16 26L20 10"
                stroke="url(#nav-code-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Right bracket > */}
              <path
                d="M24 11L32 18L24 25"
                stroke="url(#nav-code-grad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="nav-code-grad" x1="4" y1="10" x2="32" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="0.55" stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.08em] uppercase group-hover:text-blue-300 transition-colors leading-tight">
              Diego Rosa
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase leading-tight mt-0.5">
              Engenheiro de Software
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isProjectsActive = currentPath.startsWith('/projetos') && item.label === 'Projetos';
            const isHomeActive = isHome && item.label === 'Início';
            const isActive = isHomeActive || isProjectsActive;

            return (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={() => handleLinkClick(item.path, item.hash)}
                className={`px-4 py-2 text-sm font-medium transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            id="nav-whatsapp-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-200 bg-[#0e1424] hover:bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/50 transition-all duration-200 group shadow-sm hover:shadow-blue-950"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.path, item.hash)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>
          ))}
          <div className="pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
