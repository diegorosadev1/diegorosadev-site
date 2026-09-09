import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface TechOption {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  subtitle?: string;
}

const LOCAL_TECH_KEY = 'portfolio_technologies_store';

const DEFAULT_TECHNOLOGIES: TechOption[] = [
  { id: 'tech-react', name: 'React', slug: 'react', subtitle: 'Biblioteca Frontend', icon: 'Code' },
  { id: 'tech-typescript', name: 'TypeScript', slug: 'typescript', subtitle: 'Tipagem Estática', icon: 'FileCode' },
  { id: 'tech-nextjs', name: 'Next.js', slug: 'nextjs', subtitle: 'Framework Fullstack SSR', icon: 'Layers' },
  { id: 'tech-tailwind', name: 'Tailwind CSS', slug: 'tailwind', subtitle: 'Estilização Ágil', icon: 'Palette' },
  { id: 'tech-supabase', name: 'Supabase', slug: 'supabase', subtitle: 'Backend & Autenticação', icon: 'Database' },
  { id: 'tech-nodejs', name: 'Node.js', slug: 'nodejs', subtitle: 'Ambiente de Execução JS', icon: 'Server' },
  { id: 'tech-postgresql', name: 'PostgreSQL', slug: 'postgresql', subtitle: 'Banco Relacional', icon: 'HardDrive' },
  { id: 'tech-vercel', name: 'Vercel', slug: 'vercel', subtitle: 'Deploy e Edge Hosting', icon: 'Cloud' },
  { id: 'tech-docker', name: 'Docker', slug: 'docker', subtitle: 'Containerização', icon: 'Box' },
  { id: 'tech-stripe', name: 'Stripe', slug: 'stripe', subtitle: 'Pagamentos Online', icon: 'CreditCard' },
];

export const technologyService = {
  async getTechnologies(): Promise<TechOption[]> {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(LOCAL_TECH_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return DEFAULT_TECHNOLOGIES;
        }
      }
      return DEFAULT_TECHNOLOGIES;
    }

    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('name');

      if (error || !data || data.length === 0) {
        return DEFAULT_TECHNOLOGIES;
      }

      return data.map((t: any) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        icon: t.icon || undefined,
        subtitle: t.subtitle || undefined,
      }));
    } catch {
      return DEFAULT_TECHNOLOGIES;
    }
  },

  async createTechnology(name: string, subtitle?: string, icon?: string): Promise<TechOption> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (!isSupabaseConfigured()) {
      const current = await this.getTechnologies();
      const existing = current.find((t) => t.name.toLowerCase() === name.toLowerCase());
      if (existing) return existing;

      const newTech: TechOption = {
        id: `tech-${Date.now()}`,
        name,
        slug,
        subtitle: subtitle || 'Tecnologia',
        icon: icon || 'Code',
      };
      const updated = [...current, newTech];
      localStorage.setItem(LOCAL_TECH_KEY, JSON.stringify(updated));
      return newTech;
    }

    try {
      const { data, error } = await supabase
        .from('technologies')
        .insert({
          name,
          slug,
          subtitle: subtitle || 'Tecnologia',
          icon: icon || 'Code',
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Falha ao cadastrar tecnologia');
      }

      const row: any = data;
      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        subtitle: row.subtitle || undefined,
        icon: row.icon || undefined,
      };
    } catch (err: any) {
      console.warn('Fallback adding technology locally:', err);
      return {
        id: `tech-${Date.now()}`,
        name,
        slug,
        subtitle: subtitle || 'Tecnologia',
        icon: icon || 'Code',
      };
    }
  },
};
