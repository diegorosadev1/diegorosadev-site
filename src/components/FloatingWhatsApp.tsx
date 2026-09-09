import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

export const FloatingWhatsApp: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {/* Tooltip prompt */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0c1222]/95 border border-slate-700/90 text-slate-200 text-xs py-2 px-3.5 rounded-xl shadow-xl backdrop-blur-md">
          <span>Olá! Vamos conversar sobre seu site?</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all group focus:outline-none focus:ring-4 focus:ring-emerald-500/30 cursor-pointer"
        aria-label="Falar com Diego Rosa no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-6 transition-transform" />
      </a>
    </aside>
  );
};
