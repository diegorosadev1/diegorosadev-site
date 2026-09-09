import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  SiteHeroContent,
  SiteAboutContent,
  SiteCtaContent,
  SiteContactContent,
} from '../types';
import { WHATSAPP_URL } from '../data/servicesAndProcess';

export const DEFAULT_HERO_CONTENT: SiteHeroContent = {
  badge: 'Desenvolvedor Web',
  title: 'Sites que ajudam empresas a',
  highlightText: 'vender mais.',
  description:
    'Desenvolvo sites, landing pages e experiências digitais profissionais para empresas que querem fortalecer sua presença online e transformar visitantes em oportunidades.',
  buttonProjectsText: 'Ver meus projetos',
  buttonWhatsappText: 'Falar no WhatsApp',
  imageDesktopUrl: '/images/diego-rosa.jpg',
  imageMobileUrl: '/images/diego-rosa.jpg',
  handwrittenNote: 'Seu projeto em boas mãos!',
};

export const DEFAULT_ABOUT_CONTENT: SiteAboutContent = {
  label: 'Sobre mim',
  title: 'Prazer, sou o Diego.',
  paragraph1:
    'Trabalho com desenvolvimento de aplicações web, sites, plataformas e sistemas, unindo engenharia, performance, design e estratégia para entregar produtos que realmente fazem a diferença.',
  paragraph2:
    'Meu foco é transformar ideias em soluções digitais bem estruturadas, escaláveis e centradas no usuário, com o objetivo de gerar valor real para o negócio.',
  photoUrl: '/images/diego-rosa.jpg',
  experienceYears: '5+ anos',
  projectsCount: '10+',
  segmentsCount: '5+',
  focusText: '100%',
};

export const DEFAULT_CTA_CONTENT: SiteCtaContent = {
  label: 'Vamos conversar?',
  title: 'Tem um projeto em mente?',
  description:
    'Vamos transformar sua ideia em um site profissional, moderno e feito sob medida para o seu negócio.',
  whatsappButtonText: 'Falar no WhatsApp',
  projectsButtonText: 'Ver meus projetos',
};

export const DEFAULT_CONTACT_CONTENT: SiteContactContent = {
  whatsapp: '(19) 99838-2005',
  whatsappUrl: WHATSAPP_URL,
  email: 'diegorosadev1@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/diegodossantosrosa/',
  githubUrl: 'https://github.com/diegorosadev1',
  instagramUrl: 'https://www.instagram.com/diegodossantosbjj/',
  location: 'São Paulo, Brasil',
};

const LOCAL_CONTENT_PREFIX = 'diego_rosa_site_content_';

export const contentService = {
  async getSectionContent<T>(section: 'hero' | 'about' | 'cta' | 'contact', fallback: T): Promise<T> {
    if (!isSupabaseConfigured()) {
      const stored = localStorage.getItem(`${LOCAL_CONTENT_PREFIX}${section}`);
      if (stored) {
        try {
          return { ...fallback, ...JSON.parse(stored) };
        } catch {
          // fallback
        }
      }
      return fallback;
    }

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('section', section)
        .maybeSingle();

      if (error || !data || !data.content) {
        return fallback;
      }

      return { ...fallback, ...(data.content as unknown as T) };
    } catch {
      return fallback;
    }
  },

  async saveSectionContent<T>(section: 'hero' | 'about' | 'cta' | 'contact', content: T): Promise<void> {
    if (!isSupabaseConfigured()) {
      localStorage.setItem(`${LOCAL_CONTENT_PREFIX}${section}`, JSON.stringify(content));
      return;
    }

    try {
      const { error } = await supabase.from('site_content').upsert(
        {
          section,
          content: content as any,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'section' }
      );

      if (error) {
        console.warn('Error saving site content to Supabase, fallback to localStorage:', error.message);
        localStorage.setItem(`${LOCAL_CONTENT_PREFIX}${section}`, JSON.stringify(content));
      }
    } catch (err) {
      console.error('Save site content exception:', err);
      localStorage.setItem(`${LOCAL_CONTENT_PREFIX}${section}`, JSON.stringify(content));
    }
  },
};
