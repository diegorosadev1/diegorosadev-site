import { Project } from '../types';

export const PROJECTS: Project[] = [
  // ==================================================
  // PROJETOS PUBLICADOS (DESTAQUES 1 A 6 NA HOME)
  // ==================================================

  // 1. SYNVIA
  {
    id: 'synvia',
    slug: 'synvia',
    name: 'Synvia',
    segment: 'Site institucional',
    category: 'Site institucional',
    shortDescription: 'Site institucional desenvolvido para apresentar a empresa, sua atuação e soluções de forma profissional.',
    heroSummary: 'Site institucional desenvolvido para apresentar a empresa, sua atuação e soluções de forma profissional.',
    image: '/images/synvia.jpg',
    thumbnailUrl: '/images/synvia.jpg',
    heroDesktopUrl: '/images/synvia.jpg',
    heroMobileUrl: '/images/synvia.jpg',
    logo: 'building-2',
    liveUrl: 'https://synvia.com/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 1,
    isProfessionalExperience: true,
    techStack: [
      { name: 'React', subtitle: 'Interface moderna' },
      { name: 'TypeScript', subtitle: 'Tipagem robusta' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
      { name: 'Vite', subtitle: 'Build de alta performance' },
    ],
    context: {
      title: 'Experiência Profissional | Engenharia de Software',
      description: 'Atuação profissional em engenharia de software no desenvolvimento e evolução do site institucional da Synvia, apresentando a empresa, sua atuação corporativa e soluções com excelência técnica, velocidade e design responsivo.',
      image: '/images/synvia.jpg',
    },
    problems: [
      'Apresentar a atuação da empresa e seus serviços com alta clareza e credibilidade corporativa',
      'Garantir carregamento veloz, responsividade e estabilidade em todos os navegadores',
      'Estruturar canais claros de contato institucional e atendimento comercial',
    ],
    solutions: [
      'Interface institucional moderna com arquitetura de informação limpa e intuitiva',
      'Desenvolvimento frontend com foco em performance, experiência do usuário e SEO',
      'Pontos de contato acessíveis para comunicação rápida e novas oportunidades',
    ],
    features: [
      {
        title: 'Apresentação Institucional',
        description: 'Estrutura corporativa pensada para fortalecer a autoridade da empresa e transmitir confiança aos visitantes.',
        iconName: 'Layers',
      },
      {
        title: 'Performance e Responsividade',
        description: 'Site leve e otimizado para uma experiência de navegação rápida em celulares e computadores.',
        iconName: 'Smartphone',
      },
      {
        title: 'Canais de Contato',
        description: 'Direcionamento claro para canais de atendimento e solicitação de informações.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem forte' },
      { name: 'Tailwind CSS', subtitle: 'Estilização utilitária' },
      { name: 'Vite', subtitle: 'Ambiente de desenvolvimento' },
    ],
  },

  // 2. AUTO SHOPPING DA CIDADE
  {
    id: 'auto-shopping',
    slug: 'auto-shopping',
    name: 'Auto Shopping da Cidade',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Site automotivo focado em conversão, com integração ao estoque de veículos, páginas de detalhes e canais de atendimento.',
    heroSummary: 'Site automotivo focado em conversão, com integração ao estoque de veículos, páginas de detalhes e canais de atendimento.',
    image: '/images/auto-shopping.jpg',
    thumbnailUrl: '/images/auto-shopping.jpg',
    heroDesktopUrl: '/images/auto-shopping.jpg',
    heroMobileUrl: '/images/auto-shopping.jpg',
    logo: 'car-front',
    liveUrl: 'https://www.autoshoppingdacidade.com.br/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 2,
    techStack: [
      { name: 'React', subtitle: 'Interface moderna' },
      { name: 'TypeScript', subtitle: 'Tipagem robusta' },
      { name: 'Vite', subtitle: 'Build rápido' },
      { name: 'Supabase', subtitle: 'Integração de dados' },
    ],
    context: {
      title: 'Vitrine digital automotiva com foco em conversão',
      description: 'O Auto Shopping da Cidade reúne grande volume de veículos e diversas lojas. O projeto foi desenhado como um site automotivo moderno e focado em conversão, com integração ao estoque de veículos, páginas de detalhes e canais de atendimento.',
      image: '/images/auto-shopping.jpg',
    },
    problems: [
      'Apresentar estoque volumoso de forma rápida e intuitiva para o comprador',
      'Facilitar a busca com filtros de modelos e características no celular',
      'Conduzir o visitante de maneira direta para negociação com a equipe',
    ],
    solutions: [
      'Integração direta com o estoque atualizado de veículos',
      'Filtros inteligentes por marca, modelo e ano',
      'Páginas individuais ricas para cada veículo e botões diretos de atendimento',
    ],
    features: [
      {
        title: 'Integração com estoque',
        description: 'Atualização dinâmica dos veículos disponíveis para compra.',
        iconName: 'Car',
      },
      {
        title: 'Filtros de veículos',
        description: 'Busca ágil por modelo, marca e características desejadas.',
        iconName: 'Filter',
      },
      {
        title: 'Página de detalhes dos veículos',
        description: 'Exibição completa de fotos, especificações técnicas e opcionais.',
        iconName: 'Layers',
      },
      {
        title: 'Direcionamento para atendimento',
        description: 'Canais rápidos de contato via WhatsApp para fechamento de negócios.',
        iconName: 'Clock',
      },
      {
        title: 'Experiência responsiva',
        description: 'Navegação fluida e adaptada para celulares, tablets e computadores.',
        iconName: 'Smartphone',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Interface de usuário' },
      { name: 'TypeScript', subtitle: 'Tipagem estática' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
      { name: 'Supabase', subtitle: 'Integração e banco' },
    ],
  },

  // 3. CANAA MOTORS
  {
    id: 'canaa-motors',
    slug: 'canaa-motors',
    name: 'Canaa Motors',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Site automotivo focado em conversão, com integração ao estoque, filtros e páginas completas para apresentação dos veículos.',
    heroSummary: 'Site automotivo focado em conversão, com integração ao estoque, filtros e páginas completas para apresentação dos veículos.',
    image: '/images/canaa-motors.jpg',
    thumbnailUrl: '/images/canaa-motors.jpg',
    heroDesktopUrl: '/images/canaa-motors.jpg',
    heroMobileUrl: '/images/canaa-motors.jpg',
    logo: 'compass',
    liveUrl: 'https://www.canaamotors.com.br/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 3,
    techStack: [
      { name: 'React', subtitle: 'Interface de usuário' },
      { name: 'TypeScript', subtitle: 'Segurança de tipos' },
      { name: 'Vite', subtitle: 'Build veloz' },
      { name: 'Tailwind', subtitle: 'Design System' },
    ],
    context: {
      title: 'Facilidade e transparência na busca pelo veículo ideal',
      description: 'A Canaa Motors atende clientes em busca de veículos utilitários e seminovos com procedência. O projeto é um site automotivo focado em conversão, com integração ao estoque, filtros e páginas completas para apresentação dos veículos.',
      image: '/images/canaa-motors.jpg',
    },
    problems: [
      'Visual desatualizado que não destacava os diferenciais de cada veículo',
      'Dificuldade de navegação em smartphones para filtrar modelos',
      'Falta de canais de contato imediatos integrados aos anúncios',
    ],
    solutions: [
      'Catálogo online com imagens em destaque e carregamento progressivo',
      'Filtros intuitivos para busca de veículos',
      'Botões de atendimento direto para envio rápido de propostas',
    ],
    features: [
      {
        title: 'Integração com estoque',
        description: 'Apresentação em tempo real dos modelos disponíveis na concessionária.',
        iconName: 'Car',
      },
      {
        title: 'Filtros',
        description: 'Ferramenta de busca prática para selecionar veículos por categoria e faixa.',
        iconName: 'Filter',
      },
      {
        title: 'Detalhes dos veículos',
        description: 'Apresentação visual com fotos e ficha técnica completa.',
        iconName: 'Layers',
      },
      {
        title: 'Canais de contato',
        description: 'Acesso imediato para falar com a equipe pelo WhatsApp.',
        iconName: 'Clock',
      },
      {
        title: 'Experiência responsiva',
        description: 'Layout otimizado para velocidade máxima em smartphones.',
        iconName: 'Smartphone',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
      { name: 'Vite', subtitle: 'Ferramenta de build' },
    ],
  },

  // 4. AVANCE MOTORS
  {
    id: 'avance-motors',
    slug: 'avance-motors',
    name: 'Avance Motors',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Website automotivo desenvolvido para apresentar a loja, seus veículos e facilitar a jornada do visitante até o atendimento.',
    heroSummary: 'Website automotivo desenvolvido para apresentar a loja, seus veículos e facilitar a jornada do visitante até o atendimento.',
    image: '/images/avance-motors.jpg',
    thumbnailUrl: '/images/avance-motors.jpg',
    heroDesktopUrl: '/images/avance-motors.jpg',
    heroMobileUrl: '/images/avance-motors.jpg',
    logo: 'car-front',
    liveUrl: 'https://avancemotors.com.br/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 4,
    techStack: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem robusta' },
      { name: 'Tailwind', subtitle: 'Design responsivo' },
      { name: 'Vite', subtitle: 'Performance' },
    ],
    context: {
      title: 'Presença online e jornada simplificada até a negociação',
      description: 'Website automotivo desenvolvido para apresentar a loja, seus veículos e facilitar a jornada do visitante até o atendimento.',
      image: '/images/avance-motors.jpg',
    },
    problems: [
      'Apresentação dos veículos sem padronização visual',
      'Lentidão no carregamento de fotos do estoque',
      'Distanciamento entre a navegação no site e o primeiro contato comercial',
    ],
    solutions: [
      'Showroom digital moderno com fotos de alta qualidade e carregamento leve',
      'Estrutura clara para visualização de especificações de cada veículo',
      'Integração direta com canais de atendimento para aceleração das vendas',
    ],
    features: [
      {
        title: 'Apresentação da loja e estoque',
        description: 'Vitrine digital moderna para valorizar os modelos e a identidade da loja.',
        iconName: 'Car',
      },
      {
        title: 'Páginas de veículos',
        description: 'Fotos e dados detalhados para orientar a decisão do cliente.',
        iconName: 'Layers',
      },
      {
        title: 'Direcionamento para atendimento',
        description: 'Botões contextuais para contato direto com a equipe comercial.',
        iconName: 'Clock',
      },
      {
        title: 'Layout moderno e responsivo',
        description: 'Experiência fluida e consistente em qualquer tamanho de tela.',
        iconName: 'Smartphone',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Segurança de tipos' },
      { name: 'Tailwind CSS', subtitle: 'Estilização utilitária' },
      { name: 'Vite', subtitle: 'Build' },
    ],
  },

  // 5. TEAM BG CONSULTORIA
  {
    id: 'team-bg',
    slug: 'team-bg',
    name: 'Team BG Consultoria',
    segment: 'Landing Page',
    category: 'Landing Page',
    shortDescription: 'Landing page desenvolvida para apresentar uma consultoria esportiva, fortalecer sua autoridade e gerar novas oportunidades de contato.',
    heroSummary: 'Landing page desenvolvida para apresentar uma consultoria esportiva, fortalecer sua autoridade e gerar novas oportunidades de contato.',
    image: '/images/team-bg.jpg',
    thumbnailUrl: '/images/team-bg.jpg',
    heroDesktopUrl: '/images/team-bg.jpg',
    heroMobileUrl: '/images/team-bg.jpg',
    logo: 'dumbbell',
    liveUrl: 'https://www.teambgconsultoria.com.br/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 5,
    techStack: [
      { name: 'React', subtitle: 'Componentes modernos' },
      { name: 'TypeScript', subtitle: 'Tipagem segura' },
      { name: 'Tailwind', subtitle: 'Design de alta conversão' },
      { name: 'Vite', subtitle: 'Build rápido' },
    ],
    context: {
      title: 'Autoridade e captação de clientes para consultoria esportiva',
      description: 'Landing page desenvolvida para apresentar uma consultoria esportiva, fortalecer sua autoridade e gerar novas oportunidades de contato.',
      image: '/images/team-bg.jpg',
    },
    problems: [
      'Presença online restrita a redes sociais com pouca conversão',
      'Dificuldade em explicar a metodologia dos treinamentos e planos',
      'Falta de canal centralizado para recepção e qualificação de novos contatos',
    ],
    solutions: [
      'Landing page com foco em posicionamento profissional e autoridade',
      'Apresentação clara dos planos, benefícios e acompanhamento',
      'Chamadas para ação integradas ao WhatsApp para atendimento imediato',
    ],
    features: [
      {
        title: 'Posicionamento e Autoridade',
        description: 'Comunicação visual planejada para transmitir confiança e reforçar a credibilidade.',
        iconName: 'Layers',
      },
      {
        title: 'Divulgação de Serviços e Planos',
        description: 'Apresentação estruturada das opções de consultoria para o aluno.',
        iconName: 'CheckCircle2',
      },
      {
        title: 'Captação de Contatos',
        description: 'Pontos de conversão estratégicos para início de conversa no WhatsApp.',
        iconName: 'Clock',
      },
      {
        title: 'Design Responsivo',
        description: 'Navegação veloz e experiência impecável em celulares.',
        iconName: 'Smartphone',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
      { name: 'Vite', subtitle: 'Performance' },
    ],
  },

  // 6. GO TRACKER
  {
    id: 'gotracker',
    slug: 'gotracker',
    name: 'GoTracker',
    segment: 'Landing Page',
    category: 'Landing Page',
    shortDescription: 'Landing page desenvolvida para apresentar a solução, destacar seus benefícios e transformar visitantes em oportunidades comerciais.',
    heroSummary: 'Landing page desenvolvida para apresentar a solução, destacar seus benefícios e transformar visitantes em oportunidades comerciais.',
    image: '/images/gotracker.jpg',
    thumbnailUrl: '/images/gotracker.jpg',
    heroDesktopUrl: '/images/gotracker.jpg',
    heroMobileUrl: '/images/gotracker.jpg',
    logo: 'navigation',
    liveUrl: 'https://www.gotracker.com.br/',
    status: 'published',
    published: true,
    featured: true,
    displayOrder: 6,
    techStack: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind', subtitle: 'Estilo tecnológico' },
      { name: 'Vite', subtitle: 'Build' },
    ],
    context: {
      title: 'Comunicação clara de benefícios e captação comercial',
      description: 'Landing page desenvolvida para apresentar a solução, destacar seus benefícios e transformar visitantes em oportunidades comerciais.',
      image: '/images/gotracker.jpg',
    },
    problems: [
      'Explicar uma solução de tecnologia com linguagem simples e atrativa',
      'Demonstrar visualmente o produto e seu funcionamento',
      'Conduzir o visitante para agendamento de conversa com o comercial',
    ],
    solutions: [
      'Estrutura narrativa focada nos ganhos e diferenciais da solução',
      'Apresentação ilustrada dos recursos e facilidades',
      'Formulários e botões diretos para solicitação de contato',
    ],
    features: [
      {
        title: 'Destaque dos Benefícios',
        description: 'Apresentação didática das vantagens competitivas da solução.',
        iconName: 'CheckCircle2',
      },
      {
        title: 'Demonstração Visual',
        description: 'Recursos e telas ilustradas para compreensão instantânea.',
        iconName: 'Layers',
      },
      {
        title: 'Geração de Oportunidades',
        description: 'Canais diretos para solicitação de demonstração e contato.',
        iconName: 'Clock',
      },
      {
        title: 'Performance e SEO',
        description: 'Estrutura preparada para indexação e carregamento ágil.',
        iconName: 'Smartphone',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Código tipado' },
      { name: 'Tailwind CSS', subtitle: 'Design System' },
      { name: 'Vite', subtitle: 'Build rápido' },
    ],
  },

  // ==================================================
  // OUTROS PROJETOS PUBLICADOS (DISPONÍVEIS EM /PROJETOS)
  // ==================================================

  // 7. PROTOCOLO 90 DIAS
  {
    id: 'protocolo-90-dias',
    slug: 'protocolo-90-dias',
    name: 'Protocolo 90 Dias',
    segment: 'Landing Page',
    category: 'Landing Page',
    shortDescription: 'Landing page desenvolvida para apresentação e divulgação do Protocolo 90 Dias.',
    heroSummary: 'Landing page desenvolvida para apresentação e divulgação do Protocolo 90 Dias.',
    image: '/images/protocolo-90.jpg',
    thumbnailUrl: '/images/protocolo-90.jpg',
    heroDesktopUrl: '/images/protocolo-90.jpg',
    heroMobileUrl: '/images/protocolo-90.jpg',
    logo: 'flame',
    liveUrl: 'https://protocolo90.teambgconsultoria.com.br/',
    status: 'published',
    published: true,
    featured: false,
    displayOrder: 7,
    techStack: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind', subtitle: 'Design responsivo' },
    ],
    context: {
      title: 'Apresentação e divulgação do Protocolo 90 Dias',
      description: 'Landing page desenvolvida para apresentação e divulgação do Protocolo 90 Dias.',
      image: '/images/protocolo-90.jpg',
    },
    problems: [
      'Apresentar a proposta do protocolo com clareza',
      'Estruturar canal direto de inscrição e dúvidas',
    ],
    solutions: [
      'Página com design dinâmico focada no programa',
      'Direcionamento rápido para início no atendimento',
    ],
    features: [
      {
        title: 'Apresentação do Programa',
        description: 'Visão completa sobre a metodologia do Protocolo 90 Dias.',
        iconName: 'Layers',
      },
      {
        title: 'Inscrição e Atendimento',
        description: 'Canal direto para dúvidas e participação.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
    ],
  },

  // 8. MOBIIS
  {
    id: 'mobiis',
    slug: 'mobiis',
    name: 'Mobiis',
    segment: 'Site institucional',
    category: 'Site institucional',
    shortDescription: 'Site institucional desenvolvido para apresentar a empresa, sua atuação e suas soluções de forma profissional.',
    heroSummary: 'Site institucional desenvolvido para apresentar a empresa, sua atuação e suas soluções de forma profissional.',
    image: '/images/mobiis.jpg',
    thumbnailUrl: '/images/mobiis.jpg',
    heroDesktopUrl: '/images/mobiis.jpg',
    heroMobileUrl: '/images/mobiis.jpg',
    logo: 'building-2',
    liveUrl: 'https://www.mobiis.com.br/',
    status: 'published',
    published: true,
    featured: false,
    displayOrder: 8,
    techStack: [
      { name: 'React', subtitle: 'Interface' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
    ],
    context: {
      title: 'Presença digital corporativa e apresentação de soluções',
      description: 'Site institucional desenvolvido para apresentar a empresa, sua atuação e suas soluções de forma profissional.',
      image: '/images/mobiis.jpg',
    },
    problems: [
      'Apresentar serviços e áreas de atuação com clareza institucional',
      'Fortalecer a credibilidade e facilitar o contato corporativo',
    ],
    solutions: [
      'Navegação estruturada e apresentação limpa das soluções',
      'Canais claros para solicitação de atendimento e parcerias',
    ],
    features: [
      {
        title: 'Apresentação Corporativa',
        description: 'Estrutura institucional para valorizar a atuação da empresa no mercado.',
        iconName: 'Layers',
      },
      {
        title: 'Canais Institucionais',
        description: 'Facilidade para contato e abertura de novas oportunidades.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilos' },
    ],
  },

  // ==================================================
  // PROJETOS NÃO PUBLICADOS (EM DESENVOLVIMENTO)
  // ==================================================

  // 9. SHINERAY HORTOLÂNDIA
  {
    id: 'shineray-hortolandia',
    slug: 'shineray-hortolandia',
    name: 'Shineray Hortolândia',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Website em desenvolvimento para a concessionária Shineray Hortolândia, com catálogo de motos e canais de atendimento.',
    heroSummary: 'Website em desenvolvimento para a concessionária Shineray Hortolândia, com catálogo de motos e canais de atendimento.',
    image: '/images/shineray-hortolandia.jpg',
    thumbnailUrl: '/images/shineray-hortolandia.jpg',
    heroDesktopUrl: '/images/shineray-hortolandia.jpg',
    heroMobileUrl: '/images/shineray-hortolandia.jpg',
    logo: 'car-front',
    liveUrl: 'https://shineray-hortolandia.vercel.app/',
    status: 'in_development',
    published: false,
    featured: false,
    displayOrder: 9,
    techStack: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
    ],
    context: {
      title: 'Projeto em desenvolvimento para concessionária de motos',
      description: 'Website em desenvolvimento para a concessionária Shineray em Hortolândia, voltado para exibição dos modelos e direcionamento para atendimento.',
      image: '/images/shineray-hortolandia.jpg',
    },
    problems: [
      'Estruturar a apresentação do catálogo de motocicletas e scooters',
      'Facilitar o contato direto de interessados com a equipe de vendas',
    ],
    solutions: [
      'Catálogo visual com fotos, modelos e especificações',
      'Canais de atendimento rápido integrados para cotações',
    ],
    features: [
      {
        title: 'Catálogo de Motos',
        description: 'Apresentação dos modelos disponíveis na concessionária.',
        iconName: 'Car',
      },
      {
        title: 'Atendimento Integrado',
        description: 'Canais para cotação e informações de financiamento.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
    ],
  },

  // 10. MOHAVE MOTORS
  {
    id: 'mohave-motors',
    slug: 'mohave-motors',
    name: 'Mohave Motors',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Website em desenvolvimento para revenda de veículos, com foco em estoque e direcionamento para atendimento.',
    heroSummary: 'Website em desenvolvimento para revenda de veículos, com foco em estoque e direcionamento para atendimento.',
    image: '/images/mohave-motors.jpg',
    thumbnailUrl: '/images/mohave-motors.jpg',
    heroDesktopUrl: '/images/mohave-motors.jpg',
    heroMobileUrl: '/images/mohave-motors.jpg',
    logo: 'crown',
    liveUrl: 'https://mohave-motors-site.vercel.app/',
    status: 'in_development',
    published: false,
    featured: false,
    displayOrder: 10,
    techStack: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
    ],
    context: {
      title: 'Projeto em desenvolvimento para revenda automotiva',
      description: 'Website em desenvolvimento para revenda de veículos, com foco em estoque e direcionamento para atendimento.',
      image: '/images/mohave-motors.jpg',
    },
    problems: [
      'Apresentar estoque de veículos com estética refinada',
      'Direcionar o cliente para contato direto com consultores',
    ],
    solutions: [
      'Showroom visual com fotos e detalhes dos modelos',
      'Botões de contato direto para atendimento e negociação',
    ],
    features: [
      {
        title: 'Showroom de Veículos',
        description: 'Exposição dos veículos com detalhes essenciais.',
        iconName: 'Car',
      },
      {
        title: 'Contato Rápido',
        description: 'Direcionamento para atendimento comercial.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
    ],
  },

  // 11. PERSONAL TRAINER
  {
    id: 'personal-trainer',
    slug: 'personal-trainer',
    name: 'Personal Trainer',
    segment: 'Website',
    category: 'Website',
    shortDescription: 'Website em desenvolvimento para personal trainer, apresentando metodologia, serviços e contato.',
    heroSummary: 'Website em desenvolvimento para personal trainer, apresentando metodologia, serviços e contato.',
    image: '/images/personal-trainer.jpg',
    thumbnailUrl: '/images/personal-trainer.jpg',
    heroDesktopUrl: '/images/personal-trainer.jpg',
    heroMobileUrl: '/images/personal-trainer.jpg',
    logo: 'dumbbell',
    liveUrl: 'https://personal-trainer-site-flax.vercel.app/',
    status: 'in_development',
    published: false,
    featured: false,
    displayOrder: 11,
    techStack: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
    ],
    context: {
      title: 'Projeto em desenvolvimento para atendimento fitness personalizado',
      description: 'Website em desenvolvimento para profissional de educação física, com foco em apresentação de serviços, planos e agendamento de treinos.',
      image: '/images/personal-trainer.jpg',
    },
    problems: [
      'Apresentar serviços de treinamento e planos personalizados',
      'Facilitar o contato inicial para agendamento de avaliação',
    ],
    solutions: [
      'Layout objetivo com descrição dos tipos de treino e acompanhamento',
      'Integração direta com canal de atendimento para novos alunos',
    ],
    features: [
      {
        title: 'Apresentação de Serviços',
        description: 'Detalhes sobre consultoria presencial e online.',
        iconName: 'Layers',
      },
      {
        title: 'Agendamento',
        description: 'Caminho facilitado para início do atendimento.',
        iconName: 'Clock',
      },
    ],
    results: [],
    technologies: [
      { name: 'React', subtitle: 'Frontend' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
    ],
  },
];
