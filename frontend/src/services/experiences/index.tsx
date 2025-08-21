import api from '../api';

// Mock experiences data with images and categories
const MOCK_EXPERIENCES = [
  {
    id: 1,
    title: 'Aventura na Chapada dos Guimarães',
    subtitle: 'Trilhas e cachoeiras imperdíveis',
    description: 'Explore as belezas naturais da Chapada dos Guimarães com trilhas guiadas e banhos de cachoeira.',
    imageId: 1,
    image: {
      id: 1,
      filename: 'browse-1.jpg',
      url: '/images/browse-1.jpg',
      path: '/images/browse-1.jpg'
    },
    categories: [
      { id: 1, name: 'Aventura' },
      { id: 6, name: 'Cachoeiras' }
    ],
    type: 'Aventura'
  },
  {
    id: 2,
    title: 'Experiência Cultural Indígena',
    subtitle: 'Vivência com comunidades tradicionais',
    description: 'Imersão cultural com comunidades indígenas, aprendendo sobre tradições ancestrais.',
    imageId: 2,
    image: {
      id: 2,
      filename: 'browse-2.jpg',
      url: '/images/browse-2.jpg',
      path: '/images/browse-2.jpg'
    },
    categories: [
      { id: 2, name: 'Cultural' }
    ],
    type: 'Cultural'
  },
  {
    id: 3,
    title: 'Safari Fotográfico no Pantanal',
    subtitle: 'Observação da vida selvagem',
    description: 'Safari para fotografar a rica fauna do Pantanal com guias especializados.',
    imageId: 3,
    image: {
      id: 3,
      filename: 'browse-3.jpg',
      url: '/images/browse-3.jpg',
      path: '/images/browse-3.jpg'
    },
    categories: [
      { id: 3, name: 'Ecoturismo' },
      { id: 8, name: 'Vida Selvagem' }
    ],
    type: 'Ecoturismo'
  },
  {
    id: 4,
    title: 'Degustação de Vinhos Locais',
    subtitle: 'Descobrindo sabores únicos',
    description: 'Tour por vinícolas locais com degustação de vinhos artesanais da região.',
    imageId: 4,
    image: {
      id: 4,
      filename: 'browse-4.jpg',
      url: '/images/browse-4.jpg',
      path: '/images/browse-4.jpg'
    },
    categories: [
      { id: 4, name: 'Enoturismo' }
    ],
    type: 'Enoturismo'
  },
  {
    id: 5,
    title: 'Retiro Espiritual na Natureza',
    subtitle: 'Conexão com energias místicas',
    description: 'Experiência de reconexão espiritual em locais sagrados da região.',
    imageId: 5,
    image: {
      id: 5,
      filename: 'browse-5.jpg',
      url: '/images/browse-5.jpg',
      path: '/images/browse-5.jpg'
    },
    categories: [
      { id: 5, name: 'Místico e Esotérico' }
    ],
    type: 'Místico e Esotérico'
  },
  {
    id: 6,
    title: 'Trilha das Cachoeiras Secretas',
    subtitle: 'Cachoeiras escondidas na mata',
    description: 'Caminhada por trilhas menos conhecidas até cachoeiras preservadas.',
    imageId: 6,
    image: {
      id: 6,
      filename: 'category-1.jpg',
      url: '/images/category-1.jpg',
      path: '/images/category-1.jpg'
    },
    categories: [
      { id: 6, name: 'Cachoeiras' },
      { id: 1, name: 'Aventura' }
    ],
    type: 'Cachoeiras'
  },
  {
    id: 7,
    title: 'Workshop de Negócios Sustentáveis',
    subtitle: 'Empreendedorismo e meio ambiente',
    description: 'Evento corporativo focado em práticas sustentáveis de negócios.',
    imageId: 7,
    image: {
      id: 7,
      filename: 'category-2.jpg',
      url: '/images/category-2.jpg',
      path: '/images/category-2.jpg'
    },
    categories: [
      { id: 7, name: 'Negócios e Eventos' }
    ],
    type: 'Negócios e Eventos'
  },
  {
    id: 8,
    title: 'Observação Noturna de Animais',
    subtitle: 'Vida selvagem em seu habitat natural',
    description: 'Tour noturno para observar animais em atividade durante a noite.',
    imageId: 8,
    image: {
      id: 8,
      filename: 'category-3.jpg',
      url: '/images/category-3.jpg',
      path: '/images/category-3.jpg'
    },
    categories: [
      { id: 8, name: 'Vida Selvagem' },
      { id: 3, name: 'Ecoturismo' }
    ],
    type: 'Vida Selvagem'
  },
  {
    id: 9,
    title: 'Pesca Esportiva no Rio',
    subtitle: 'Pescaria com guias experientes',
    description: 'Experiência de pesca esportiva nos rios da região com equipamentos inclusos.',
    imageId: 9,
    image: {
      id: 9,
      filename: 'category-4.jpg',
      url: '/images/category-4.jpg',
      path: '/images/category-4.jpg'
    },
    categories: [
      { id: 9, name: 'Pesca' }
    ],
    type: 'Pesca'
  },
  {
    id: 10,
    title: 'Relaxamento na Praia Fluvial',
    subtitle: 'Sol e águas cristalinas',
    description: 'Dia de descanso em praias fluviais com atividades aquáticas.',
    imageId: 10,
    image: {
      id: 10,
      filename: 'category-5.jpg',
      url: '/images/category-5.jpg',
      path: '/images/category-5.jpg'
    },
    categories: [
      { id: 10, name: 'Sol e Praia' }
    ],
    type: 'Sol e Praia'
  },
  {
    id: 11,
    title: 'Vivência em Fazenda Histórica',
    subtitle: 'Turismo rural autêntico',
    description: 'Experiência em fazenda histórica com atividades rurais tradicionais.',
    imageId: 11,
    image: {
      id: 11,
      filename: 'header-1.jpg',
      url: '/images/header-1.jpg',
      path: '/images/header-1.jpg'
    },
    categories: [
      { id: 11, name: 'Turismo Rural' },
      { id: 2, name: 'Cultural' }
    ],
    type: 'Turismo Rural'
  },
  {
    id: 12,
    title: 'Rota Gastronômica Regional',
    subtitle: 'Sabores e tradições culinárias',
    description: 'Roteiro gastronômico pelos melhores restaurantes e produtores locais.',
    imageId: 12,
    image: {
      id: 12,
      filename: 'header-2.jpg',
      url: '/images/header-2.jpg',
      path: '/images/header-2.jpg'
    },
    categories: [
      { id: 12, name: 'Rotas e Roteiros' },
      { id: 2, name: 'Cultural' }
    ],
    type: 'Rotas e Roteiros'
  }
];

export const getExperiences = async (): Promise<any[]> => {
  // Return mock data instead of API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EXPERIENCES);
    }, 800); // Simulate API delay
  });
  
  // Original API call (commented out for now)
  // const response = await api.get('/experiences');
  // return response.data;
};