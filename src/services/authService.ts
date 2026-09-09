import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: string | null;
}

export const authService = {
  /**
   * Autentica o usuário com Supabase Auth usando email e senha.
   * Verifica em seguida se o usuário autenticado possui registro na tabela public.admin_users.
   * Se não for administrador, efetua logout imediato e recusa o acesso.
   */
  async signInWithPassword(email: string, password: string): Promise<AuthResult> {
    if (!isSupabaseConfigured()) {
      return {
        user: null,
        session: null,
        error:
          'Supabase não configurado. Por favor, certifique-se de configurar as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.',
      };
    }

    try {
      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        let friendlyMessage = 'Falha na autenticação. Verifique os dados informados.';
        const lowerMsg = (error.message || '').toLowerCase();

        if (
          lowerMsg.includes('invalid login credentials') ||
          lowerMsg.includes('invalid_credentials')
        ) {
          friendlyMessage = 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.';
        } else if (lowerMsg.includes('email not confirmed')) {
          friendlyMessage = 'Este e-mail ainda não foi confirmado no Supabase Auth.';
        } else if (lowerMsg.includes('user not found') || lowerMsg.includes('user_not_found')) {
          friendlyMessage = 'Usuário não cadastrado com o e-mail informado.';
        } else if (lowerMsg.includes('too many requests') || lowerMsg.includes('rate limit')) {
          friendlyMessage = 'Muitas tentativas consecutivas. Aguarde alguns instantes antes de tentar novamente.';
        } else if (
          lowerMsg.includes('network') ||
          lowerMsg.includes('fetch') ||
          lowerMsg.includes('failed to fetch') ||
          lowerMsg.includes('connection')
        ) {
          friendlyMessage = 'Erro de conexão com o servidor de autenticação. Verifique sua conexão com a internet.';
        } else if (lowerMsg.includes('session') || lowerMsg.includes('expired')) {
          friendlyMessage = 'Sessão expirada. Por favor, faça login novamente.';
        } else {
          friendlyMessage = error.message;
        }

        return { user: null, session: null, error: friendlyMessage };
      }

      const authUser = data.user;
      if (!authUser) {
        return {
          user: null,
          session: null,
          error: 'Usuário não encontrado após a autenticação.',
        };
      }

      // Step 4: Validação rigorosa na tabela public.admin_users
      // Apenas usuários autenticados que também existam em public.admin_users podem acessar
      const isAuthorizedAdmin = await this.isAdmin(authUser.id);

      if (!isAuthorizedAdmin) {
        // Desconecta imediatamente o usuário não autorizado
        await supabase.auth.signOut();
        return {
          user: null,
          session: null,
          error:
            'Acesso negado. Sua conta foi autenticada, mas não possui permissão de administrador no sistema (registro não encontrado em admin_users).',
        };
      }

      return {
        user: authUser,
        session: data.session,
        error: null,
      };
    } catch (err: any) {
      console.error('Erro no fluxo de autenticação Supabase:', err);
      const msg = err?.message || '';
      let friendly = 'Erro inesperado ao conectar ao Supabase Auth.';
      if (msg.includes('fetch') || msg.includes('network')) {
        friendly = 'Erro de conexão com o servidor. Verifique sua internet.';
      }
      return {
        user: null,
        session: null,
        error: friendly,
      };
    }
  },

  /**
   * Atalho para signInWithPassword
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    return this.signInWithPassword(email, password);
  },

  /**
   * Encerra a sessão atual no Supabase Auth
   */
  async signOut(): Promise<void> {
    if (!isSupabaseConfigured()) return;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Erro ao encerrar sessão no Supabase:', err);
    }
  },

  /**
   * Retorna a sessão ativa atual
   */
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return null;
      return data.session;
    } catch (err) {
      console.warn('Erro ao obter sessão:', err);
      return null;
    }
  },

  /**
   * Retorna o usuário autenticado atual validado pelo servidor
   */
  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return null;
      return data.user;
    } catch (err) {
      console.warn('Erro ao obter usuário autenticado:', err);
      return null;
    }
  },

  /**
   * Consulta public.admin_users onde user_id = userId
   * Retorna true estritamente se houver registro correspondente.
   * NUNCA considera qualquer usuário como admin.
   */
  async isAdmin(userId?: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    let targetUserId = userId;
    if (!targetUserId) {
      const currentUser = await this.getCurrentUser();
      targetUserId = currentUser?.id;
    }

    if (!targetUserId) {
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, user_id')
        .eq('user_id', targetUserId)
        .maybeSingle();

      if (error) {
        console.error('Erro ao verificar tabela admin_users:', error.message);
        return false;
      }

      // Confirma que data existe e pertence exatamente ao targetUserId
      return Boolean(data && data.user_id === targetUserId);
    } catch (err) {
      console.error('Exceção ao checar privilégios de administrador:', err);
      return false;
    }
  },

  /**
   * Monitora alterações no estado de autenticação (login, logout, refresh de token)
   */
  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    if (!isSupabaseConfigured()) {
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    }

    return supabase.auth.onAuthStateChange(callback);
  },
};
