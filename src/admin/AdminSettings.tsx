import React, { useState, useEffect } from 'react';
import {
  Save,
  Check,
  Globe,
  Shield,
  Copy,
  Database,
  ExternalLink,
} from 'lucide-react';
import { SiteSettings } from '../types';
import { settingsService, DEFAULT_SITE_SETTINGS } from '../services/settingsService';
import { isSupabaseConfigured } from '../lib/supabase';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await settingsService.getSettings();
      setSettings(data);
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.saveSettings(settings);
      setSuccessToast('Configurações salvas com sucesso!');
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopySqlHelp = () => {
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Configurações do Sistema
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerencie dados institucionais, tags de SEO globais e status de conexão com o banco de dados.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Dados Institucionais */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <Globe className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Identidade & Informações Institucionais
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Nome do Site / Marca
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                CNPJ (Rodapé Institucional)
              </label>
              <input
                type="text"
                value={settings.cnpj || ''}
                onChange={(e) => setSettings({ ...settings, cnpj: e.target.value })}
                placeholder="00.000.000/0001-00"
                className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        </section>

        {/* 2. SEO e Meta Tags Globais */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <Shield className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Otimização de Buscas (SEO Padrão)
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título Padrão das Páginas (Meta Title)
            </label>
            <input
              type="text"
              value={settings.defaultMetaTitle}
              onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Descrição Padrão das Páginas (Meta Description)
            </label>
            <textarea
              rows={3}
              value={settings.defaultMetaDescription}
              onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0d1220] border border-slate-700/80 rounded-xl text-xs text-white"
            />
          </div>
        </section>

        {/* 3. Conexão Supabase e Script SQL */}
        <section className="p-6 rounded-2xl bg-[#090d18] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Infraestrutura Supabase & Banco de Dados
              </h2>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isSupabaseConfigured()
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {isSupabaseConfigured() ? 'Supabase Conectado' : 'Modo Preview / Demonstração'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            O script completo de criação das tabelas PostgreSQL com Row Level Security (RLS) e
            permissões de storage está disponível no arquivo <code className="bg-slate-900 px-1.5 py-0.5 rounded text-blue-400">supabase_schema.sql</code> na raiz do projeto.
          </p>

          <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-800 text-xs text-slate-300 space-y-3">
            <div className="font-semibold text-white">Como conectar com seu projeto Supabase:</div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
              <li>Acesse o dashboard do seu projeto no Supabase e vá em <strong>SQL Editor</strong>.</li>
              <li>Cole o conteúdo do arquivo <code className="text-blue-400">supabase_schema.sql</code> e execute o script.</li>
              <li>No painel de Configurações de API do Supabase, copie a <strong>URL</strong> e a <strong>chave anon/publishable</strong>.</li>
              <li>Adicione as variáveis no seu <code className="text-blue-400">.env</code>:
                <div className="mt-1 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-emerald-400">
                  VITE_SUPABASE_URL=https://xxxx.supabase.co<br />
                  VITE_SUPABASE_PUBLISHABLE_KEY=eyJh...
                </div>
              </li>
              <li>Pronto! Todas as alterações do painel serão salvas diretamente em nuvem.</li>
            </ol>
          </div>
        </section>
      </form>
    </div>
  );
};
