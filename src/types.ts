export interface TechItem {
  name: string;
  subtitle: string;
  category?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface ResultMetric {
  value: string;
  label: string;
  iconName?: string;
  displayOrder?: number;
}

export interface ProjectScreenshot {
  id?: string;
  title?: string;
  image: string;
  url?: string;
  caption?: string;
  alt?: string;
  displayOrder?: number;
}

export interface ProjectProblem {
  id?: string;
  title: string;
  description?: string;
  displayOrder?: number;
}

export interface ProjectSolution {
  id?: string;
  title: string;
  description?: string;
  displayOrder?: number;
}

export interface ProjectHighlight {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  segment: string;
  category?: string;
  shortDescription: string;
  heroSummary: string;
  description?: string;
  image: string;
  thumbnailUrl?: string;
  logoUrl?: string;
  heroDesktopUrl?: string;
  heroMobileUrl?: string;
  liveUrl: string;
  githubUrl?: string;
  techStack: TechItem[];
  context: {
    title: string;
    description: string;
    image?: string;
  };
  problems: string[];
  problemItems?: ProjectProblem[];
  solutions: string[];
  solutionItems?: ProjectSolution[];
  features: FeatureItem[];
  highlights?: ProjectHighlight[];
  results: ResultMetric[];
  resultsTitle?: string;
  resultsDescription?: string;
  technologies: TechItem[];
  logo?: string;
  screenshots?: ProjectScreenshot[];
  gallery?: ProjectScreenshot[];
  published?: boolean;
  featured?: boolean;
  displayOrder?: number;
  showContext?: boolean;
  showProblems?: boolean;
  showSolutions?: boolean;
  showHighlights?: boolean;
  showResults?: boolean;
  showGallery?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  name?: string;
  description: string;
  icon: string;
  active?: boolean;
  displayOrder?: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface DifferentialItem {
  number?: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
}

export interface SiteHeroContent {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  buttonProjectsText: string;
  buttonWhatsappText: string;
  imageDesktopUrl?: string;
  imageMobileUrl?: string;
  handwrittenNote?: string;
}

export interface SiteAboutContent {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  photoUrl: string;
  experienceYears: string;
  projectsCount: string;
  segmentsCount: string;
  focusText: string;
}

export interface SiteCtaContent {
  label: string;
  title: string;
  description: string;
  whatsappButtonText: string;
  projectsButtonText: string;
}

export interface SiteContactContent {
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  location: string;
}

export interface SiteSettings {
  siteName: string;
  logoUrl?: string;
  faviconUrl?: string;
  cnpj?: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ogImageUrl?: string;
}
