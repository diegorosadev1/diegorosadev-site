import { ServiceItem, ProcessStep, DifferentialItem } from '../types';

export const STATS = [
  {
    number: '5+ anos',
    label: 'de experiência',
    icon: 'Calendar',
  },
  {
    number: '10+',
    label: 'projetos entregues',
    icon: 'Rocket',
  },
  {
    number: '5+',
    label: 'segmentos atendidos',
    icon: 'Users',
  },
  {
    number: '100%',
    label: 'foco no seu resultado',
    icon: 'Target',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'websites',
    title: 'Websites',
    description:
      'Sites institucionais e comerciais modernos, responsivos e pensados para fortalecer a presença da empresa e gerar oportunidades.',
    icon: 'Globe',
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description:
      'Páginas estratégicas para campanhas, serviços e produtos, com foco em experiência, geração de leads e conversão.',
    icon: 'Zap',
  },
  {
    id: 'seo',
    title: 'SEO e Visibilidade',
    description:
      'Estrutura preparada para mecanismos de busca, ajudando sua empresa a ser encontrada por quem procura pelo que você oferece.',
    icon: 'Search',
  },
  {
    id: 'suporte',
    title: 'Manutenção & Suporte',
    description:
      'Acompanhamento contínuo para manter o projeto atualizado, seguro, rápido e funcionando.',
    icon: 'Wrench',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Conversa',
    description: 'Entendo seu negócio, objetivos e o que você precisa.',
  },
  {
    number: '02',
    title: 'Planejamento',
    description: 'Defino a melhor estrutura, design e funcionalidades para o projeto.',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    description: 'Transformo o planejamento em um site rápido, responsivo e profissional.',
  },
  {
    number: '04',
    title: 'Publicação',
    description: 'Coloco tudo no ar e acompanho o projeto após a entrega.',
  },
];

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    number: '01',
    title: 'Estratégia que gera resultado',
    description:
      'Cada página é pensada para apresentar seu negócio com clareza e conduzir o visitante até o próximo passo.',
    icon: 'Rocket',
    color: 'blue',
  },
  {
    number: '02',
    title: 'Performance de verdade',
    description:
      'Sites rápidos, leves e otimizados para oferecer uma experiência melhor em qualquer dispositivo.',
    icon: 'Zap',
    color: 'purple',
  },
  {
    number: '03',
    title: 'SEO e visibilidade',
    description:
      'Estrutura preparada para SEO, ajudando sua empresa a ser encontrada por quem procura pelo que você oferece.',
    icon: 'Search',
    color: 'sky',
  },
  {
    number: '04',
    title: 'Feito para o seu negócio',
    description:
      'Design, conteúdo e funcionalidades personalizados para representar sua empresa e atender seus objetivos.',
    icon: 'Code2',
    color: 'teal',
  },
];

export const ABOUT_TECH_BADGES = [
  { name: 'React', icon: 'Atom' },
  { name: 'TypeScript', icon: 'Code' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'Vercel', icon: 'Cloud' },
];

export const WHATSAPP_URL =
  'https://wa.me/5519998382005?text=Ol%C3%A1%2C%20Diego!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.';
export const EMAIL_CONTACT = 'diegorosadev1@gmail.com';
