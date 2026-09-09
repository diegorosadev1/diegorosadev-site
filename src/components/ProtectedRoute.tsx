import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onUnauthorized: () => void;
}

/**
 * Componente de proteção de rotas administrativas.
 * Verifica:
 * 1. Existência de sessão ativa
 * 2. Existência do usuário autenticado
 * 3. Existência do registro do usuário na tabela public.admin_users
 *
 * Durante a verificação, exibe estado de loading condizente com a identidade visual.
 * Nunca renderiza conteúdo administrativo antes da confirmação da autorização.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onUnauthorized,
}) => {
  const { isLoading, isAuthenticated, user, isAdmin } = useAuth();

  useEffect(() => {
    // Redireciona caso o carregamento termine e o usuário não esteja autorizado
    if (!isLoading && (!isAuthenticated || !user || !isAdmin)) {
      onUnauthorized();
    }
  }, [isLoading, isAuthenticated, user, isAdmin, onUnauthorized]);

  // Enquanto a verificação estiver ocorrendo, exibe tela de carregamento elegante
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#07090e] flex flex-col items-center justify-center px-4">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 shadow-xl shadow-blue-500/10">
            <ShieldCheck className="w-7 h-7 text-blue-400 animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-base font-bold text-white tracking-tight">
            Verificando permissões de acesso
          </h3>
          <p className="text-xs text-slate-400 max-w-xs flex items-center justify-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
            <span>Consultando Supabase Auth & admin_users...</span>
          </p>
        </div>
      </div>
    );
  }

  // Se não autorizado, não renderiza a árvore administrativa
  if (!isAuthenticated || !user || !isAdmin) {
    return null;
  }

  // Autorizado: exibe o painel administrativo
  return <>{children}</>;
};
