import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se o usuário já estiver autenticado e for admin, redireciona diretamente ao painel
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      onLoginSuccess();
    }
  }, [isAuthenticated, isAuthLoading, onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Por favor, informe seu e-mail e senha cadastrados.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { user, error } = await login(cleanEmail, password);

      if (error || !user) {
        setErrorMessage(
          error || 'Não foi possível autenticar. Verifique suas credenciais de acesso.'
        );
      } else {
        onLoginSuccess();
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Falha de comunicação com o Supabase Auth. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center relative z-10">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-3 mb-3 group cursor-pointer"
          title="Ir para o site público"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-extrabold text-blue-400 group-hover:scale-105 transition-transform shadow-inner">
            DR
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Diego Rosa
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Painel Administrativo</span>
        </div>
      </div>

      {/* Card de Login */}
      <div className="w-full max-w-md bg-[#090d18] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Acesso exclusivo para administradores cadastrados no sistema.
          </p>
        </div>

        {/* Mensagem de Erro Amigável */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800/70 text-xs text-rose-200 flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo E-mail */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-[#0d1220] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Campo Senha com mostrar/ocultar */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                className="w-full pl-10 pr-11 py-3 bg-[#0d1220] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Botão Entrar com estado de loading */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/80 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Voltar para o site público
          </button>
        </div>
      </div>
    </div>
  );
};
