import { SiteSettings } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_SETTINGS_KEY = 'portfolio_site_settings';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Diego Rosa - Desenvolvedor Web',
  defaultMetaTitle: 'Diego Rosa | Desenvolvedor Web e Soluções Digitais',
  defaultMetaDescription:
    'Desenvolvo sites, landing pages e experiências digitais profissionais focadas em alta conversão, performance extrema e resultados comerciais.',
  cnpj: '59.938.744/0001-02',
};

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(LOCAL_SETTINGS_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return DEFAULT_SITE_SETTINGS;
        }
      }
      return DEFAULT_SITE_SETTINGS;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        return DEFAULT_SITE_SETTINGS;
      }

      const row: any = data;
      return {
        siteName: row.site_name || DEFAULT_SITE_SETTINGS.siteName,
        logoUrl: row.logo_url || undefined,
        faviconUrl: row.favicon_url || undefined,
        cnpj: row.cnpj || undefined,
        defaultMetaTitle: row.default_meta_title || DEFAULT_SITE_SETTINGS.defaultMetaTitle,
        defaultMetaDescription:
          row.default_meta_description || DEFAULT_SITE_SETTINGS.defaultMetaDescription,
        ogImageUrl: row.og_image_url || undefined,
      };
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    if (!isSupabaseConfigured()) {
      localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
      return;
    }

    try {
      // Find existing id if any
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      const payload = {
        site_name: settings.siteName,
        logo_url: settings.logoUrl || null,
        favicon_url: settings.faviconUrl || null,
        cnpj: settings.cnpj || null,
        default_meta_title: settings.defaultMetaTitle,
        default_meta_description: settings.defaultMetaDescription,
        og_image_url: settings.ogImageUrl || null,
        updated_at: new Date().toISOString(),
      };

      const existingRecord: any = existing;
      if (existingRecord && existingRecord.id) {
        await supabase.from('site_settings').update(payload).eq('id', existingRecord.id);
      } else {
        await supabase.from('site_settings').insert(payload);
      }
    } catch (err) {
      console.warn('Fallback saving settings locally:', err);
      localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
    }
  },
};
