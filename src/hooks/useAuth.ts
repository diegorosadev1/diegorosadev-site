import { useState, useEffect, useCallback } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { authService, AuthResult } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Checa se o usuário atual possui sessão válida e está cadastrado em public.admin_users
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const currentSession = await authService.getSession();
      if (!currentSession?.user) {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        return false;
      }

      // Validação do token com o servidor do Supabase
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        await authService.signOut();
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        return false;
      }

      // Validação obrigatória na tabela public.admin_users
      const userIsAdmin = await authService.isAdmin(currentUser.id);
      if (!userIsAdmin) {
        // Usuário autenticado mas sem privilégios de administrador -> logout imediato
        await authService.signOut();
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        return false;
      }

      setUser(currentUser);
      setSession(currentSession);
      setIsAdmin(true);
      return true;
    } catch (err) {
      console.error('Falha ao checar autorização de admin:', err);
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      return false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      setIsLoading(true);
      try {
        const sessionData = await authService.getSession();
        if (sessionData?.user) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            const userIsAdmin = await authService.isAdmin(currentUser.id);
            if (isMounted) {
              if (userIsAdmin) {
                setUser(currentUser);
                setSession(sessionData);
                setIsAdmin(true);
              } else {
                await authService.signOut();
                setUser(null);
                setSession(null);
                setIsAdmin(false);
              }
            }
          } else {
            if (isMounted) {
              setUser(null);
              setSession(null);
              setIsAdmin(false);
            }
          }
        } else {
          if (isMounted) {
            setUser(null);
            setSession(null);
            setIsAdmin(false);
          }
        }
      } catch (err) {
        console.error('Erro na inicialização da autenticação:', err);
        if (isMounted) {
          setUser(null);
          setSession(null);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSession();

    // Inscrição em alterações de autenticação do Supabase
    const { data: listener } = authService.onAuthStateChange(
      async (event: AuthChangeEvent, newSession: Session | null) => {
        if (!isMounted) return;

        if (event === 'SIGNED_OUT' || !newSession?.user) {
          setUser(null);
          setSession(null);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED'
        ) {
          const currentUser = newSession.user;
          const userIsAdmin = await authService.isAdmin(currentUser.id);

          if (!isMounted) return;

          if (userIsAdmin) {
            setUser(currentUser);
            setSession(newSession);
            setIsAdmin(true);
          } else {
            await authService.signOut();
            setUser(null);
            setSession(null);
            setIsAdmin(false);
          }
          setIsLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  /**
   * Realiza login com email e senha e valida privilégios de administrador
   */
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authService.signInWithPassword(email, password);
      if (result.user && result.session && !result.error) {
        setUser(result.user);
        setSession(result.session);
        setIsAdmin(true);
      } else {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Realiza logout do Supabase e limpa o estado
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = Boolean(user && isAdmin);

  return {
    user,
    session,
    isAdmin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};
