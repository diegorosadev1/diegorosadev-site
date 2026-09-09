import { ServiceItem } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SERVICES } from '../data/servicesAndProcess';

const LOCAL_SERVICES_KEY = 'portfolio_services_store_v2';

const DEFAULT_SERVICES: ServiceItem[] = SERVICES.map((s, idx) => ({
  id: `srv-${idx + 1}`,
  title: s.title,
  name: s.title,
  description: s.description,
  icon: (s as any).icon || 'Layout',
  active: true,
  displayOrder: idx + 1,
}));

export const serviceService = {
  /**
   * Fetch active services for public site
   */
  async getActiveServices(): Promise<ServiceItem[]> {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(LOCAL_SERVICES_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.filter((s: ServiceItem) => s.active !== false);
        } catch {
          return DEFAULT_SERVICES;
        }
      }
      return DEFAULT_SERVICES;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return DEFAULT_SERVICES;
      }

      return data.map((item: any) => ({
        id: item.id,
        title: item.name,
        name: item.name,
        description: item.description,
        icon: item.icon,
        active: item.active,
        displayOrder: item.display_order,
      }));
    } catch {
      return DEFAULT_SERVICES;
    }
  },

  /**
   * Fetch all services for admin editor
   */
  async getAllServices(): Promise<ServiceItem[]> {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(LOCAL_SERVICES_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return DEFAULT_SERVICES;
        }
      }
      return DEFAULT_SERVICES;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return DEFAULT_SERVICES;
      }

      return data.map((item: any) => ({
        id: item.id,
        title: item.name,
        name: item.name,
        description: item.description,
        icon: item.icon,
        active: item.active,
        displayOrder: item.display_order,
      }));
    } catch {
      return DEFAULT_SERVICES;
    }
  },

  /**
   * Save or update a service
   */
  async saveService(service: Partial<ServiceItem>): Promise<ServiceItem> {
    const isEdit = Boolean(service.id);

    if (!isSupabaseConfigured()) {
      const current = await this.getAllServices();
      const item: ServiceItem = {
        id: service.id || `srv-${Date.now()}`,
        title: service.title || service.name || 'Novo Serviço',
        name: service.title || service.name || 'Novo Serviço',
        description: service.description || '',
        icon: service.icon || 'Layout',
        active: service.active ?? true,
        displayOrder: service.displayOrder ?? current.length + 1,
      };

      let updated: ServiceItem[];
      if (isEdit) {
        updated = current.map((s) => (s.id === item.id ? item : s));
      } else {
        updated = [...current, item];
      }
      localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(updated));
      return item;
    }

    try {
      if (isEdit) {
        const { data, error } = await supabase
          .from('services')
          .update({
            name: service.title || service.name || '',
            description: service.description || '',
            icon: service.icon || 'Layout',
            active: service.active ?? true,
            display_order: service.displayOrder ?? 0,
          })
          .eq('id', service.id!)
          .select()
          .single();

        if (error || !data) throw new Error(error?.message || 'Falha ao atualizar serviço');
        return {
          id: data.id,
          title: data.name,
          name: data.name,
          description: data.description,
          icon: data.icon,
          active: data.active,
          displayOrder: data.display_order,
        };
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert({
            name: service.title || service.name || '',
            description: service.description || '',
            icon: service.icon || 'Layout',
            active: service.active ?? true,
            display_order: service.displayOrder ?? 0,
          })
          .select()
          .single();

        if (error || !data) throw new Error(error?.message || 'Falha ao inserir serviço');
        return {
          id: data.id,
          title: data.name,
          name: data.name,
          description: data.description,
          icon: data.icon,
          active: data.active,
          displayOrder: data.display_order,
        };
      }
    } catch (err: any) {
      console.warn('Fallback saving service locally:', err);
      return {
        id: service.id || `srv-${Date.now()}`,
        title: service.title || service.name || 'Serviço',
        name: service.title || service.name || 'Serviço',
        description: service.description || '',
        icon: service.icon || 'Layout',
        active: service.active ?? true,
        displayOrder: service.displayOrder ?? 1,
      };
    }
  },

  /**
   * Delete a service
   */
  async deleteService(id: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      const current = await this.getAllServices();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(updated));
      return;
    }

    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (err) {
      console.warn('Fallback deleting service locally:', err);
      const current = await this.getAllServices();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(updated));
    }
  },
};
