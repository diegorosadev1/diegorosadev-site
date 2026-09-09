import React from 'react';
import { Instagram, Linkedin, Github, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

interface FooterProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinks = [
    { label: 'Início', path: '/', hash: 'inicio' },
    { label: 'Projetos', path: '/projetos' },
    { label: 'Serviços', path: '/', hash: 'servicos' },
    { label: 'Sobre', path: '/', hash: 'sobre' },
    { label: 'Contato', path: '/', hash: 'contato' },
  ];

  return (
    <footer className="bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white tracking-wider text-base shadow-md shadow-blue-500/20">
              DR
            </div>
            <div>
              <div className="text-white font-bold text-base">
                Diego Rosa
              </div>
              <div className="text-xs text-slate-400">
                Sites · Landing Pages · Soluções Digitais
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.path, item.hash)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 bg-[#0e1424] hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Social Icons & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/diegodossantosbjj/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/diegodossantosrosa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/diegorosadev1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-center sm:text-right">
            <span>&copy; {new Date().getFullYear()} Diego Rosa. Todos os direitos reservados.</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400 font-medium">CNPJ: 59.938.744/0001-02</span>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Painel CMS
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
