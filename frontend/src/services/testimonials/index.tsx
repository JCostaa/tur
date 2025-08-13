import api from '../api';

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  occupation?: string;
  rating: number;
  title: string;
  content: string;
  image?: string;
  avatar?: string;
  visitDate: string;
  experience: string; // tour, restaurant, accommodation, etc.
  experienceId?: number;
  featured?: boolean;
  verified?: boolean;
  helpful?: number;
  tags?: string[];
  status?: 'published' | 'pending' | 'archived';
}

export interface TestimonialResponse {
  data: TestimonialItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    averageRating: number;
  };
}

export interface TestimonialFilters {
  page?: number;
  limit?: number;
  experience?: string;
  rating?: number;
  search?: string;
  featured?: boolean;
  verified?: boolean;
  sortBy?: 'visitDate' | 'rating' | 'helpful' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Mock data para desenvolvimento
const mockTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    occupation: "Fotógrafa",
    rating: 5,
    title: "Experiência Inesquecível no Pantanal",
    content: "Minha viagem para Barra do Bugres superou todas as expectativas! A diversidade de aves que consegui fotografar foi impressionante. Os guias locais são extremamente conhecedores da região e me levaram aos melhores pontos para observação da fauna. Recomendo para todos os amantes da natureza!",
    image: "/images/browse-1.jpg",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=150&h=150&fit=crop&crop=face",
    visitDate: "2024-01-10T00:00:00Z",
    experience: "tours",
    experienceId: 1,
    featured: true,
    verified: true,
    helpful: 24,
    tags: ["pantanal", "fotografia", "aves", "natureza"]
  },
  {
    id: 2,
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    occupation: "Empresário",
    rating: 5,
    title: "Gastronomia Pantaneira Autêntica",
    content: "A experiência gastronômica em Barra do Bugres foi extraordinária! Experimentei pratos típicos da região pantaneira que nunca havia provado. O pacu assado e a farofa de banana foram os destaques. O atendimento foi caloroso e o ambiente muito acolhedor.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    visitDate: "2024-01-08T00:00:00Z",
    experience: "restaurants",
    experienceId: 2,
    featured: false,
    verified: true,
    helpful: 18,
    tags: ["gastronomia", "culinária pantaneira", "pacu", "tradição"]
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Brasília, DF",
    occupation: "Professora",
    rating: 5,
    title: "Pousada Aconchegante com Vista Deslumbrante",
    content: "Me hospedei por 3 dias em uma pousada às margens do Rio Paraguai e foi simplesmente perfeito! O nascer do sol visto do quarto era de tirar o fôlego. A hospitalidade dos proprietários e a tranquilidade do local fizeram desta uma experiência única e relaxante.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    visitDate: "2024-01-05T00:00:00Z",
    experience: "accommodations",
    experienceId: 3,
    featured: true,
    verified: true,
    helpful: 31,
    tags: ["pousada", "rio paraguai", "hospitalidade", "tranquilidade"]
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    location: "Cuiabá, MT",
    occupation: "Biólogo",
    rating: 4,
    title: "Aventura de Pesca Esportiva Emocionante",
    content: "A pesca esportiva no Rio Paraguai foi uma aventura incrível! Pesquei alguns exemplares magníficos de dourado e pintado. O equipamento fornecido era de primeira qualidade e os guias conheciam os melhores pontos. Uma experiência que todo pescador deveria ter!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    visitDate: "2024-01-03T00:00:00Z",
    experience: "tours",
    experienceId: 4,
    featured: false,
    verified: true,
    helpful: 15,
    tags: ["pesca esportiva", "rio paraguai", "dourado", "pintado"]
  },
  {
    id: 5,
    name: "Luiza Ferreira",
    location: "Belo Horizonte, MG",
    occupation: "Arquiteta",
    rating: 5,
    title: "Trilha Ecológica Fascinante",
    content: "A trilha ecológica na Serra do Roncador foi uma das experiências mais marcantes da minha vida! A biodiversidade local é impressionante e a paisagem é de uma beleza indescritível. Os guias são muito preparados e compartilharam conhecimentos valiosos sobre a flora e fauna.",
    image: "/images/browse-5.jpg",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    visitDate: "2024-01-01T00:00:00Z",
    experience: "tours",
    experienceId: 5,
    featured: false,
    verified: true,
    helpful: 22,
    tags: ["trilha ecológica", "serra do roncador", "biodiversidade", "natureza"]
  },
  {
    id: 6,
    name: "Pedro Almeida",
    location: "Porto Alegre, RS",
    occupation: "Médico",
    rating: 5,
    title: "Festival Cultural Emocionante",
    content: "Participar do festival cultural local foi uma experiência enriquecedora! Conheci as tradições pantaneiras, a música típica e o artesanato regional. A comunidade nos recebeu com muito carinho e pude aprender sobre a história e cultura da região.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    visitDate: "2023-12-28T00:00:00Z",
    experience: "events",
    experienceId: 6,
    featured: false,
    verified: true,
    helpful: 19,
    tags: ["festival cultural", "tradições", "música", "artesanato"]
  },
  {
    id: 7,
    name: "Fernanda Lima",
    location: "Salvador, BA",
    occupation: "Jornalista",
    rating: 4,
    title: "Passeio de Barco Inesquecível",
    content: "O passeio de barco pelo Rio Paraguai foi incrível! Avistamos diversas espécies de aves, jacarés e capivaras. O pôr do sol visto do rio é algo que ficará para sempre na minha memória. O piloto era muito experiente e nos deixou muito seguros durante todo o trajeto.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    visitDate: "2023-12-25T00:00:00Z",
    experience: "tours",
    experienceId: 7,
    featured: true,
    verified: true,
    helpful: 27,
    tags: ["passeio de barco", "rio paraguai", "vida selvagem", "pôr do sol"]
  },
  {
    id: 8,
    name: "Roberto Silva",
    location: "Fortaleza, CE",
    occupation: "Engenheiro",
    rating: 5,
    title: "Agência de Turismo Excepcional",
    content: "A agência que nos atendeu foi simplesmente excepcional! Desde o planejamento até a execução da viagem, tudo foi perfeito. O atendimento personalizado e a atenção aos detalhes fizeram toda a diferença. Recomendo fortemente para quem quer uma experiência inesquecível!",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    visitDate: "2023-12-20T00:00:00Z",
    experience: "agencies",
    experienceId: 8,
    featured: false,
    verified: true,
    helpful: 16,
    tags: ["agência", "atendimento", "planejamento", "personalizado"]
  }
];

// Simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTestimonials = async (filters: TestimonialFilters = {}): Promise<TestimonialResponse> => {
  await delay(600); // Simular delay da API
  
  const {
    page = 1,
    limit = 10,
    experience,
    rating,
    search,
    featured,
    verified,
    sortBy = 'visitDate',
    sortOrder = 'desc'
  } = filters;

  let filteredTestimonials = [...mockTestimonials];

  // Filtrar por experiência
  if (experience && experience !== 'all') {
    filteredTestimonials = filteredTestimonials.filter(item => 
      item.experience.toLowerCase() === experience.toLowerCase()
    );
  }

  // Filtrar por rating mínimo
  if (rating) {
    filteredTestimonials = filteredTestimonials.filter(item => item.rating >= rating);
  }

  // Filtrar por busca
  if (search) {
    const searchLower = search.toLowerCase();
    filteredTestimonials = filteredTestimonials.filter(item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.title.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower) ||
      item.occupation?.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Filtrar por featured
  if (featured !== undefined) {
    filteredTestimonials = filteredTestimonials.filter(item => item.featured === featured);
  }

  // Filtrar por verified
  if (verified !== undefined) {
    filteredTestimonials = filteredTestimonials.filter(item => item.verified === verified);
  }

  // Ordenar
  filteredTestimonials.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'visitDate':
        aValue = new Date(a.visitDate);
        bValue = new Date(b.visitDate);
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'helpful':
        aValue = a.helpful || 0;
        bValue = b.helpful || 0;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      default:
        aValue = new Date(a.visitDate);
        bValue = new Date(b.visitDate);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calcular rating médio
  const averageRating = filteredTestimonials.length > 0 
    ? filteredTestimonials.reduce((sum, item) => sum + item.rating, 0) / filteredTestimonials.length
    : 0;

  // Paginação
  const total = filteredTestimonials.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  return {
    data: paginatedTestimonials,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      averageRating: Math.round(averageRating * 10) / 10
    }
  };
};

export const getTestimonialById = async (id: number): Promise<TestimonialItem | null> => {
  await delay(500);
  
  const testimonial = mockTestimonials.find(item => item.id === id);
  
  if (testimonial) {
    // Incrementar helpful (simulado)
    testimonial.helpful = (testimonial.helpful || 0) + 1;
  }
  
  return testimonial || null;
};

export const getFeaturedTestimonials = async (): Promise<TestimonialItem[]> => {
  await delay(300);
  return mockTestimonials.filter(item => item.featured);
};

export const getRelatedTestimonials = async (id: number, limit = 4): Promise<TestimonialItem[]> => {
  await delay(400);
  
  const currentTestimonial = mockTestimonials.find(item => item.id === id);
  if (!currentTestimonial) return [];
  
  // Buscar depoimentos relacionados por experiência ou tags
  const related = mockTestimonials
    .filter(item => 
      item.id !== id && (
        item.experience === currentTestimonial.experience ||
        item.tags?.some(tag => currentTestimonial.tags?.includes(tag))
      )
    )
    .slice(0, limit);
  
  return related;
};

export const getTestimonialExperiences = async (): Promise<string[]> => {
  await delay(200);
  
  const experiences = [...new Set(mockTestimonials.map(item => item.experience).filter(Boolean))];
  return experiences as string[];
};

export const getTestimonialStats = async () => {
  await delay(300);
  
  const total = mockTestimonials.length;
  const averageRating = mockTestimonials.reduce((sum, item) => sum + item.rating, 0) / total;
  const verified = mockTestimonials.filter(item => item.verified).length;
  const experienceCount = new Set(mockTestimonials.map(item => item.experience)).size;
  
  return {
    total,
    averageRating: Math.round(averageRating * 10) / 10,
    verified,
    experienceCount
  };
};
