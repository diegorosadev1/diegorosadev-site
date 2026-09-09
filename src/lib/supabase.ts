import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('placeholder')
  );
};

// Singleton client instance
let supabaseInstance: SupabaseClient<any> | null = null;

export const getSupabase = (): SupabaseClient<any> => {
  if (!supabaseInstance) {
    if (!isSupabaseConfigured()) {
      // Prevents runtime crash when environment variables are not yet populated
      supabaseInstance = createClient(
        'https://placeholder-project.supabase.co',
        'placeholder-anon-key'
      );
    } else {
      supabaseInstance = createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    }
  }
  return supabaseInstance;
};

export const supabase = getSupabase();

export const STORAGE_BUCKETS = {
  PROJECTS: 'portfolio-projects',
  SITE: 'portfolio-site',
} as const;
