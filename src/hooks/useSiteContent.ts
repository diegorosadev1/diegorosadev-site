import { useState, useEffect, useCallback } from 'react';
import {
  SiteHeroContent,
  SiteAboutContent,
  SiteCtaContent,
  SiteContactContent,
  ServiceItem,
} from '../types';
import {
  contentService,
  DEFAULT_HERO_CONTENT,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CTA_CONTENT,
  DEFAULT_CONTACT_CONTENT,
} from '../services/contentService';
import { serviceService } from '../services/serviceService';

export const useSiteContent = () => {
  const [hero, setHero] = useState<SiteHeroContent>(DEFAULT_HERO_CONTENT);
  const [about, setAbout] = useState<SiteAboutContent>(DEFAULT_ABOUT_CONTENT);
  const [cta, setCta] = useState<SiteCtaContent>(DEFAULT_CTA_CONTENT);
  const [contact, setContact] = useState<SiteContactContent>(DEFAULT_CONTACT_CONTENT);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const [heroData, aboutData, ctaData, contactData, servicesData] = await Promise.all([
        contentService.getSectionContent<SiteHeroContent>('hero', DEFAULT_HERO_CONTENT),
        contentService.getSectionContent<SiteAboutContent>('about', DEFAULT_ABOUT_CONTENT),
        contentService.getSectionContent<SiteCtaContent>('cta', DEFAULT_CTA_CONTENT),
        contentService.getSectionContent<SiteContactContent>('contact', DEFAULT_CONTACT_CONTENT),
        serviceService.getActiveServices(),
      ]);

      setHero(heroData);
      setAbout(aboutData);
      setCta(ctaData);
      setContact(contactData);
      setServices(servicesData);
    } catch (err) {
      console.error('Error fetching site content:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { hero, about, cta, contact, services, isLoading, refetch: fetchContent };
};
