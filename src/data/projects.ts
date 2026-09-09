import { Project } from '../types';
import diamondConstrutoraImg from '../assets/images/diamond_construtora_1788981129965.jpg';
import techstoreImg from '../assets/images/techstore_preview_1788981149047.jpg';
import fitproImg from '../assets/images/fitpro_preview_1788981161537.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'auto-shopping',
    slug: 'auto-shopping',
    name: 'Auto Shopping da Cidade',
    segment: 'Automotivo',
    shortDescription: 'Website para apresentação do estoque de veículos, filtros avançados e direcionamento de atendimento.',
    heroSummary: 'Website moderno e completo para apresentar o estoque de veículos, facilitar a navegação por modelos e gerar mais contatos para a concessionária.',
    image: '/images/auto-shopping.jpg',
    logo: 'car-front',
    liveUrl: 'https://autoshoppingdacidade.com.br',
    githubUrl: 'https://github.com/diegorosa/auto-shopping-da-cidade',
    techStack: [
      { name: 'React', subtitle: 'Biblioteca principal' },
      { name: 'TypeScript', subtitle: 'Tipagem segura' },
      { name: 'Vite', subtitle: 'Build rápido' },
      { name: 'Supabase', subtitle: 'Backend & DB' },
    ],
    context: {
      title: 'Uma vitrine digital para uma grande concessionária',
      description: 'O Auto Shopping da Cidade é um dos maiores centros automotivos do Brasil, reunindo diversas lojas e marcas em um só lugar. O desafio era criar um site moderno, rápido e fácil de navegar, que apresentasse o estoque de veículos de forma organizada e intuitiva, facilitando o contato com as lojas e aumentando a geração de leads.',
      image: '/images/dealership-exterior.jpg',
    },
    problems: [
      'Site antigo e pouco intuitivo para visualização em smartphones',
      'Dificuldade para encontrar veículos por filtros específicos e categorias',
      'Baixa conversão de visitantes em contatos qualificados',
      'Falta de integração com ferramentas de marketing e rastreamento de métricas',
    ],
    solutions: [
      'Interface moderna, responsiva e focada na experiência fluida do usuário',
      'Filtros avançados por marca, modelo, ano, faixa de preço e câmbio',
      'Páginas individuais ricas para cada veículo com galeria e ficha técnica',
      'Integração direta com WhatsApp, analytics e disparo de leads',
      'Painel administrativo veloz para gerenciamento de banners e estoque',
    ],
    features: [
      {
        title: 'Catálogo de veículos completo',
        description: 'Exibição dinâmica com paginação instantânea, badges de destaque e fotos em alta definição.',
        iconName: 'Car',
      },
      {
        title: 'Filtros inteligentes',
        description: 'Busca facetada em tempo real que permite encontrar o veículo desejado em poucos cliques.',
        iconName: 'Filter',
      },
      {
        title: 'Páginas detalhadas dos veículos',
        description: 'Especificações técnicas completas, itens de série, simulação de financiamento e galeria.',
        iconName: 'Layers',
      },
      {
        title: 'Integração com WhatsApp',
        description: 'Botões contextuais que enviam a mensagem já com o modelo exato do veículo pretendido.',
        iconName: 'Clock',
      },
      {
        title: 'Painel administrativo (banners e conteúdo)',
        description: 'Gestão simplificada de estoque e campanhas comerciais promocionais.',
        iconName: 'Sliders',
      },
    ],
    results: [
      { value: '+50%', label: 'de tempo de permanência no site', iconName: 'Clock' },
      { value: '+35%', label: 'de cliques no WhatsApp', iconName: 'TrendingUp' },
      { value: '100%', label: 'responsivo em todos os dispositivos', iconName: 'Smartphone' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Interface de usuário' },
      { name: 'TypeScript', subtitle: 'Tipagem estática' },
      { name: 'Vite', subtitle: 'Ambiente de compilação' },
      { name: 'Supabase', subtitle: 'Banco de dados e API' },
      { name: 'Vercel', subtitle: 'Infraestrutura de borda' },
      { name: 'Google Analytics', subtitle: 'Métricas e eventos de conversão' },
    ],
    screenshots: [
      {
        title: 'Visão Geral do Catálogo',
        image: '/images/auto-shopping.jpg',
        caption: 'Página inicial com banner de destaque e filtros dinâmicos de modelos.',
      },
      {
        title: 'Concessionária e Estoque Físico',
        image: '/images/dealership-exterior.jpg',
        caption: 'Integração visual com a mega estrutura da loja física.',
      },
    ],
  },
  {
    id: 'mohave-motors',
    slug: 'mohave-motors',
    name: 'Mohave Motors',
    segment: 'Automotivo',
    shortDescription: 'Site moderno e responsivo, com foco em apresentação de estoque e geração de leads via WhatsApp.',
    heroSummary: 'Plataforma para revenda de carros esportivos e executivos, com estética dark premium e contato instantâneo com corretores.',
    image: '/images/mohave-motors.jpg',
    logo: 'crown',
    liveUrl: 'https://mohavemotors.com.br',
    githubUrl: 'https://github.com/diegorosa/mohave-motors',
    techStack: [
      { name: 'React', subtitle: 'Frontend dinâmico' },
      { name: 'TypeScript', subtitle: 'Escalabilidade' },
      { name: 'Vite', subtitle: 'Build ultrarrápido' },
      { name: 'Tailwind', subtitle: 'Estilização' },
    ],
    context: {
      title: 'Posicionamento exclusivo para veículos de alto padrão',
      description: 'A Mohave Motors comercializa veículos seminovos e esportivos selecionados. Eles precisavam de um portal digital que refletisse a sofisticação da marca e que reduzisse a fricção entre a visualização de um carro e a conversa com um consultor.',
      image: '/images/mohave-motors.jpg',
    },
    problems: [
      'Visual genérico que não correspondia ao padrão premium dos veículos',
      'Carregamento demorado de fotos pesadas do estoque',
      'Perda de visitantes que não sabiam como iniciar uma negociação',
    ],
    solutions: [
      'Layout dark minimalista com iluminação focada nos detalhes dos veículos',
      'Otimização avançada de imagens em formato WebP com carregamento progressivo',
      'Chamadas para ação diretas para o WhatsApp de cada consultor da loja',
    ],
    features: [
      {
        title: 'Showroom Virtual Interativo',
        description: 'Exposição cinematográfica das viaturas em modo escuro com alto contraste.',
      },
      {
        title: 'Atendimento Direto por Consultor',
        description: 'Roteamento dinâmico de conversas de WhatsApp para a equipe de vendas.',
      },
      {
        title: 'Ficha Técnica Simplificada',
        description: 'Destaque rápido de opcionais, quilometragem certificada e laudo cautelar.',
      },
    ],
    results: [
      { value: '+42%', label: 'em solicitações de test drive', iconName: 'TrendingUp' },
      { value: '-60%', label: 'no tempo de carregamento de imagens', iconName: 'Zap' },
      { value: '99.9%', label: 'disponibilidade e estabilidade', iconName: 'Shield' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Biblioteca principal' },
      { name: 'TypeScript', subtitle: 'Segurança de tipos' },
      { name: 'Tailwind CSS', subtitle: 'Estilização utilitária' },
      { name: 'Vercel', subtitle: 'Hospedagem global' },
    ],
  },
  {
    id: 'canaa-motors',
    slug: 'canaa-motors',
    name: 'Canaa Motors',
    segment: 'Automotivo',
    shortDescription: 'Plataforma com catálogo de veículos, integração com canais de contato e painel administrativo.',
    heroSummary: 'Portal de veículos utilitários e familiares com navegação descomplicada, simulação de entrada e contato ágil.',
    image: '/images/canaa-motors.jpg',
    logo: 'compass',
    liveUrl: 'https://canaamotors.com.br',
    githubUrl: 'https://github.com/diegorosa/canaa-motors',
    techStack: [
      { name: 'React', subtitle: 'Interface ágil' },
      { name: 'TypeScript', subtitle: 'Tipagem robusta' },
      { name: 'Vite', subtitle: 'Build ultrarrápido' },
      { name: 'Supabase', subtitle: 'Banco de dados' },
    ],
    context: {
      title: 'Facilidade e transparência na compra do veículo da família',
      description: 'A Canaa Motors atende um público amplo em busca do seu próximo automóvel. O foco do projeto foi garantir que pessoas de todas as idades pudessem filtrar veículos, ver parcelas estimadas e enviar propostas em segundos.',
      image: '/images/canaa-motors.jpg',
    },
    problems: [
      'Dificuldade do cliente em calcular opções de financiamento',
      'Site não adaptado para celulares populares',
      'Formulários de contato longos que eram abandonados',
    ],
    solutions: [
      'Calculadora simples de simulação prévia integrada aos cards',
      'Design ultra responsivo e leve, otimizado para conexões móveis 4G',
      'Substituição de formulários burocráticos por um clique direto para o WhatsApp',
    ],
    features: [
      {
        title: 'Filtro por Faixa de Parcela',
        description: 'Permite ao cliente buscar carros que cabem exatamente no orçamento mensal.',
      },
      {
        title: 'Avaliação do Carro Usado',
        description: 'Fluxo rápido para envio de dados do carro atual na troca.',
      },
      {
        title: 'Catálogo de Fotos Multicâmera',
        description: 'Visualização nítida de exterior, painel e porta-malas.',
      },
    ],
    results: [
      { value: '+48%', label: 'no envio de propostas de troca', iconName: 'TrendingUp' },
      { value: '3x', label: 'mais rapidez na busca de veículos', iconName: 'Zap' },
      { value: '98%', label: 'de aprovação pelos clientes pesquisados', iconName: 'ThumbsUp' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Camada visual' },
      { name: 'TypeScript', subtitle: 'Tipagem estática' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
      { name: 'Vercel', subtitle: 'Servidores CDN' },
    ],
  },
  {
    id: 'bruno-fitness',
    slug: 'bruno-fitness',
    name: 'Bruno Fitness',
    segment: 'Esportes',
    shortDescription: 'Site institucional para apresentação de serviços, planos e agendamento de treinos.',
    heroSummary: 'Presença digital completa para centro de treinamento físico, combinando catálogo de modalidades, agenda e contato.',
    image: '/images/bruno-fitness.jpg',
    logo: 'flame',
    liveUrl: 'https://brunofitness.com.br',
    githubUrl: 'https://github.com/diegorosa/bruno-fitness',
    techStack: [
      { name: 'React', subtitle: 'Interface moderna' },
      { name: 'TypeScript', subtitle: 'Tipagem forte' },
      { name: 'Tailwind', subtitle: 'Estilos ágeis' },
      { name: 'Supabase', subtitle: 'Banco e Auth' },
    ],
    context: {
      title: 'Um centro de treinamento que inspira disciplina e comunidade',
      description: 'O Bruno Fitness é um centro especializado em musculação, funcional e reabilitação física. Eles precisavam de um site que acolhesse novos membros, mostrasse o ambiente moderno da academia e eliminasse a barreira de entrada para a primeira aula experimental.',
      image: '/images/bruno-fitness.jpg',
    },
    problems: [
      'Alunos tinham dificuldade para consultar a grade de horários das aulas coletivas',
      'Dúvidas repetidas na recepção sobre valores de planos e formas de pagamento',
      'Pouca visibilidade da qualificação técnica dos professores e do espaço físico',
    ],
    solutions: [
      'Grade de horários interativa e filtrável por modalidade (manhã, tarde e noite)',
      'Apresentação clara dos planos mensais, semestrais e anuais com todos os benefícios',
      'Agendamento rápido da aula experimental grátis com redirecionamento ao WhatsApp da recepção',
    ],
    features: [
      {
        title: 'Tour Virtual do Espaço',
        description: 'Fotos dos aparelhos de última geração, vestiários e área de convivência.',
      },
      {
        title: 'Grade Semanal de Aulas',
        description: 'Quadro visual com horários atualizados de funcional, mobilidade e musculação.',
      },
      {
        title: 'Agendamento de Aula Experimental',
        description: 'Chamada com 1 clique para agendar o primeiro treino gratuitamente.',
      },
    ],
    results: [
      { value: '+55%', label: 'no comparecimento em aulas experimentais', iconName: 'TrendingUp' },
      { value: '-40%', label: 'no tempo gasto pela recepção respondendo dúvidas repetidas', iconName: 'Clock' },
      { value: '5.0★', label: 'avaliação média da experiência de agendamento', iconName: 'Star' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Interface moderna' },
      { name: 'TypeScript', subtitle: 'Código sustentável' },
      { name: 'Tailwind CSS', subtitle: 'Estilos ágeis' },
      { name: 'Vercel', subtitle: 'Deploy e estabilidade' },
    ],
  },
  {
    id: 'team-bg',
    slug: 'team-bg',
    name: 'Team BG Consultoria',
    segment: 'Esportes',
    shortDescription: 'Landing page para captação de leads e apresentação dos serviços de consultoria esportiva.',
    heroSummary: 'Página de alta conversão para treinadores físicos de elite, focada em autoridade profissional e fechamento de planos.',
    image: '/images/team-bg.jpg',
    logo: 'dumbbell',
    liveUrl: 'https://teambgconsultoria.com.br',
    githubUrl: 'https://github.com/diegorosa/team-bg-consultoria',
    techStack: [
      { name: 'React', subtitle: 'Componentes' },
      { name: 'TypeScript', subtitle: 'Tipagem' },
      { name: 'Vite', subtitle: 'Build veloz' },
      { name: 'Supabase', subtitle: 'Banco de dados' },
    ],
    context: {
      title: 'Transformando conhecimento esportivo em autoridade e novos alunos',
      description: 'A Team BG Consultoria oferece acompanhamento físico e nutricional de alta performance. O objetivo foi criar uma landing page com forte apelo visual, mostrando transformações reais e conduzindo o visitante para a contratação dos planos mensais e anuais.',
      image: '/images/team-bg.jpg',
    },
    problems: [
      'Presença online dependente exclusivamente de posts temporários do Instagram',
      'Dúvidas frequentes de alunos repetidas no WhatsApp sem explicação prévia de método',
      'Dificuldade em demonstrar o valor agregado dos planos de longo prazo',
    ],
    solutions: [
      'Landing page estruturada com prova social, antes/depois e explicação de metodologia',
      'Tabela de planos clara com destaque para o plano mais vantajoso',
      'Botões de adesão com parâmetros diretos para atendimento prioritário',
    ],
    features: [
      {
        title: 'Apresentação do Método',
        description: 'Exposição didática dos 3 pilares: treino prescrito, nutrição e acompanhamento diário.',
      },
      {
        title: 'Galeria de Evolução de Alunos',
        description: 'Comparações de resultados com depoimentos e métricas corporais.',
      },
      {
        title: 'Seletor de Planos e Metas',
        description: 'Indicação automática do melhor plano baseado no objetivo do aluno.',
      },
    ],
    results: [
      { value: '3.4x', label: 'aumento na conversão de novos alunos', iconName: 'TrendingUp' },
      { value: '70%', label: 'dos novos contatos já chegam informados sobre valores', iconName: 'Clock' },
      { value: '100%', label: 'otimizado para smartphones', iconName: 'Smartphone' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Estrutura da aplicação' },
      { name: 'TypeScript', subtitle: 'Robustez de código' },
      { name: 'Tailwind CSS', subtitle: 'Design responsivo' },
      { name: 'Motion', subtitle: 'Animações fluidas' },
    ],
  },
  {
    id: 'gotracker',
    slug: 'gotracker',
    name: 'GoTracker',
    segment: 'Tecnologia',
    shortDescription: 'Landing page focada na apresentação do produto e conversão de leads.',
    heroSummary: 'Landing page moderna de produto tecnológico, com demonstração interativa de recursos e captação de demonstrações.',
    image: '/images/gotracker.jpg',
    logo: 'navigation',
    liveUrl: 'https://gotracker.io',
    githubUrl: 'https://github.com/diegorosa/gotracker-platform',
    techStack: [
      { name: 'React', subtitle: 'Single Page App' },
      { name: 'TypeScript', subtitle: 'Qualidade de código' },
      { name: 'Tailwind', subtitle: 'Estilo tecnológico' },
      { name: 'Supabase', subtitle: 'Banco de dados' },
    ],
    context: {
      title: 'Comunicação clara para um produto tecnológico de alta precisão',
      description: 'A GoTracker desenvolve sistemas de telemetria e rastreamento de frotas para pequenas e médias empresas. A missão do site era explicar uma tecnologia complexa de forma extremamente simples e atrativa para gestores de operações.',
      image: '/images/gotracker.jpg',
    },
    problems: [
      'Explicação excessivamente técnica que afastava empresários e tomadores de decisão',
      'Falta de demonstração visual clara do aplicativo nos smartphones e dashboards',
      'Taxa de conversão baixa na solicitação de demonstrações guiadas',
    ],
    solutions: [
      'Storytelling focado nos benefícios: economia de combustível, segurança e produtividade',
      'Mockups interativos da interface do app e do painel web em tempo real',
      'Formulário enxuto de apenas 3 campos para agendar uma demonstração rápida',
    ],
    features: [
      {
        title: 'Demonstração Interativa da Plataforma',
        description: 'Cards interativos simulando alertas de velocidade, cerca virtual e rotas.',
      },
      {
        title: 'Calculadora de ROI para Frotas',
        description: 'Simulação instantânea de quanto a empresa economiza em combustível por mês.',
      },
      {
        title: 'Integração com CRM de Vendas',
        description: 'Leads enviados automaticamente para o time comercial.',
      },
    ],
    results: [
      { value: '+65%', label: 'no agendamento de reuniões comerciais', iconName: 'TrendingUp' },
      { value: '1.2s', label: 'tempo de carregamento inicial (LCP)', iconName: 'Zap' },
      { value: '+80%', label: 'de compreensão relatada em pesquisas com clientes', iconName: 'Smile' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Desenvolvimento ágil' },
      { name: 'TypeScript', subtitle: 'Segurança de tipagem' },
      { name: 'Tailwind CSS', subtitle: 'Estilo tecnológico' },
      { name: 'Vercel', subtitle: 'Infraestrutura de ponta' },
    ],
  },
  {
    id: 'diamond-construtora',
    slug: 'diamond-construtora',
    name: 'Diamond Construtora',
    segment: 'Institucional',
    shortDescription: 'Site institucional moderno para apresentação da empresa, serviços e portfólio de obras.',
    heroSummary: 'Portal corporativo com vitrine de empreendimentos de alto padrão, projetos entregues e canal institucional para investidores.',
    image: diamondConstrutoraImg,
    logo: 'building-2',
    liveUrl: 'https://diamondconstrutora.com.br',
    githubUrl: 'https://github.com/diegorosa/diamond-construtora',
    techStack: [
      { name: 'Next.js', subtitle: 'Framework SSR' },
      { name: 'TypeScript', subtitle: 'Segurança de código' },
      { name: 'Vercel', subtitle: 'Hospedagem e CDN' },
    ],
    context: {
      title: 'Autoridade e sofisticação na construção civil de luxo',
      description: 'A Diamond Construtora atua no mercado de incorporações residenciais e comerciais de excelência. O projeto digital foi desenvolvido para transmitir credibilidade, solidez patrimonial e apresentar o catálogo de obras em andamento.',
      image: diamondConstrutoraImg,
    },
    problems: [
      'Falta de um portfólio digital acessível e responsivo para investidores',
      'Dificuldade para apresentar status de obras e imagens de acompanhamento',
    ],
    solutions: [
      'Design institucional imersivo com galeria de alta resolução',
      'Seções dedicadas a lançamentos com tour virtual e ficha de acabamentos',
    ],
    features: [
      {
        title: 'Vitrine de Empreendimentos',
        description: 'Filtro por estágio de obra: Breve Lançamento, Em Construção e Entregues.',
      },
      {
        title: 'Acompanhamento de Obras',
        description: 'Painel visual de evolução da fundação ao acabamento com fotos mensais.',
      },
    ],
    results: [
      { value: '+85%', label: 'de contatos de investidores qualificados', iconName: 'TrendingUp' },
      { value: '100%', label: 'otimizado para dispositivos móveis', iconName: 'Smartphone' },
    ],
    technologies: [
      { name: 'Next.js', subtitle: 'Framework e SEO' },
      { name: 'TypeScript', subtitle: 'Tipagem robusta' },
      { name: 'Tailwind CSS', subtitle: 'Estilização' },
      { name: 'Vercel', subtitle: 'Infraestrutura' },
    ],
  },
  {
    id: 'techstore',
    slug: 'techstore',
    name: 'TechStore',
    segment: 'Tecnologia',
    shortDescription: 'Loja virtual completa com catálogo de produtos, pagamentos e gerenciamento de pedidos.',
    heroSummary: 'E-commerce moderno de eletrônicos e acessórios de alta performance com checkout otimizado e integração de pagamentos.',
    image: techstoreImg,
    logo: 'shopping-bag',
    liveUrl: 'https://techstore-demo.com.br',
    githubUrl: 'https://github.com/diegorosa/techstore-platform',
    techStack: [
      { name: 'React', subtitle: 'Frontend dinâmico' },
      { name: 'TypeScript', subtitle: 'Tipagem estática' },
      { name: 'Stripe', subtitle: 'Pagamentos' },
    ],
    context: {
      title: 'Experiência de compra fluida em tecnologia de ponta',
      description: 'A TechStore é uma loja online focada em periféricos, áudio premium e gadgets para desenvolvedores. O desafio era criar um e-commerce ultra rápido com checkout transparente e foco total em conversão.',
      image: techstoreImg,
    },
    problems: [
      'Alta taxa de abandono de carrinho em dispositivos móveis',
      'Navegação lenta entre categorias de produtos',
    ],
    solutions: [
      'Carrinho lateral com cálculo instantâneo de frete',
      'Integração de checkout Stripe em um clique (Apple Pay / Google Pay / Pix)',
    ],
    features: [
      {
        title: 'Busca Instantânea de Produtos',
        description: 'Auto-complete com sugestões dinâmicas e fotos em miniatura.',
      },
      {
        title: 'Checkout em Uma Página',
        description: 'Redução drástica de passos para concluir compras no cartão ou Pix.',
      },
    ],
    results: [
      { value: '+38%', label: 'de aumento na taxa de conversão final', iconName: 'TrendingUp' },
      { value: '<1s', label: 'tempo de resposta nas buscas', iconName: 'Zap' },
    ],
    technologies: [
      { name: 'React', subtitle: 'Interface ágil' },
      { name: 'TypeScript', subtitle: 'Segurança de código' },
      { name: 'Tailwind CSS', subtitle: 'Design System' },
      { name: 'Stripe', subtitle: 'Processamento de pagamentos' },
    ],
  },
  {
    id: 'fitpro',
    slug: 'fitpro',
    name: 'FitPro Landing Page',
    segment: 'Esportes',
    shortDescription: 'Landing page para campanha de lançamento de um programa de treinos online.',
    heroSummary: 'Página de vendas focada em conversão para cursos e programas de treinamento físico personalizado à distância.',
    image: fitproImg,
    logo: 'activity',
    liveUrl: 'https://fitpro-program.com.br',
    githubUrl: 'https://github.com/diegorosa/fitpro-landing',
    techStack: [
      { name: 'Next.js', subtitle: 'Renderização rápida' },
      { name: 'TypeScript', subtitle: 'Tipagem estática' },
      { name: 'Vercel', subtitle: 'Hospedagem' },
    ],
    context: {
      title: 'Lançamento de alto impacto para programa de assessoria física',
      description: 'Campanha de tráfego pago para capturar novos alunos para programa de emagrecimento e ganho de massa muscular. A página precisava ser visualmente impactante e carregar instantaneamente.',
      image: fitproImg,
    },
    problems: [
      'Páginas pesadas anteriores tinham alto custo por clique em campanhas do Meta Ads',
      'Falta de clareza nos diferenciais e garantias do programa',
    ],
    solutions: [
      'Design dark atlético com alto contraste e CTA fixo no mobile',
      'Seções de quebra de objeções, cronograma de treinos e garantia incondicional',
    ],
    features: [
      {
        title: 'Vídeo Promocional Otimizado',
        description: 'Player customizado sem buffering para prévia dos exercícios.',
      },
      {
        title: 'Cronômetro de Vagas Limitadas',
        description: 'Gatilho de escassez dinâmico para promoções de abertura de turmas.',
      },
    ],
    results: [
      { value: '4.2x', label: 'retorno sobre investimento (ROAS)', iconName: 'TrendingUp' },
      { value: '99/100', label: 'score de performance no PageSpeed', iconName: 'Zap' },
    ],
    technologies: [
      { name: 'Next.js', subtitle: 'Framework e SEO' },
      { name: 'TypeScript', subtitle: 'Robustez de código' },
      { name: 'Tailwind CSS', subtitle: 'Estilização utilitária' },
      { name: 'Vercel', subtitle: 'Deploy de ponta' },
    ],
  },
];

