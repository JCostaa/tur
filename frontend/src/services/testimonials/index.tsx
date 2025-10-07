import skoobturApi from '../skoobtur';

// Interface baseada na resposta da API Skoobtur
export interface TestimonialItem {
  id: number;
  name: string;
  location?: string;
  occupation?: string;
  rating: number;
  title?: string;
  content: string;
  message?: string; // Alguns feedbacks podem usar 'message' ao invés de 'content'
  image?: string;
  avatar?: string;
  visitDate?: string;
  created_at?: string;
  updated_at?: string;
  experience?: string; // tour, restaurant, accommodation, etc.
  experienceId?: number;
  featured?: boolean;
  verified?: boolean;
  helpful?: number;
  tags?: string[];
  status?: 'published' | 'pending' | 'archived';
  // Campos específicos da API Skoobtur
  author?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
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

// Interface para dados brutos da API Skoobtur
interface SkoobturFeedback {
  id: number;
  rating: string; // Vem como string da API
  description: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  tour: {
    id: number;
    title: string;
    slug: string;
    image?: string;
    banner?: string;
    location: {
      id: number;
      name: string;
      state: string;
      city: string;
      address?: string;
      lat?: string | null;
      lng?: string | null;
    };
  };
}

// Função para normalizar dados da API Skoobtur
const normalizeTestimonial = (item: SkoobturFeedback): TestimonialItem => {
  // Filtrar mensagens de áudio (que começam com "audioMessage|")
  const isAudioMessage = item.description?.startsWith('audioMessage|');
  const content = isAudioMessage ? 'Mensagem de áudio' : item.description || '';
  
  return {
    id: item.id,
    name: item.user?.name || 'Anônimo',
    location: `${item.tour?.location?.city || ''}${item.tour?.location?.city && item.tour?.location?.state ? ', ' : ''}${item.tour?.location?.state || ''}`.trim() || undefined,
    occupation: undefined, // Não disponível na API
    rating: parseInt(item.rating) || 5,
    title: item.tour?.title || undefined,
    content: content,
    message: item.description,
    image: item.tour?.image || item.tour?.banner,
    avatar: item.user?.avatar,
    visitDate: item.created_at,
    created_at: item.created_at,
    updated_at: undefined,
    experience: 'tours', // Baseado na estrutura da API (sempre tours)
    experienceId: item.tour?.id,
    featured: parseInt(item.rating) >= 9, // Considera featured se rating >= 9
    verified: true, // Por padrão considera verificado
    helpful: 0, // Não disponível na API
    tags: [], // Não disponível na API
    status: 'published',
    author: item.user?.name,
    email: item.user?.email,
    phone: undefined,
    city: item.tour?.location?.city,
    state: item.tour?.location?.state,
    country: 'BR' // Assumindo Brasil
  };
};

export const getTestimonials = async (filters: TestimonialFilters = {}): Promise<TestimonialResponse> => {
  try {
  const {
    page = 1,
    limit = 10,
    experience,
    rating,
    search,
    featured,
    verified,
      sortBy = 'created_at',
    sortOrder = 'desc'
  } = filters;

    // Construir parâmetros da query
    const params: Record<string, string | number | boolean> = {
      page,
      limit,
      sort: `${sortBy}:${sortOrder}`
    };

    // A cidade será adicionada automaticamente pelo interceptor
    // baseado na variável VITE_CITY do .env
    // Para a API de feedbacks, pode precisar do parâmetro 'city' específico
    // Exemplo: city=bugres (será adicionado pelo interceptor)

  if (experience && experience !== 'all') {
      params.experience = experience;
  }

  if (rating) {
      params.rating_min = rating;
  }

  if (search) {
      params.search = search;
    }

  if (featured !== undefined) {
      params.featured = featured;
  }

  if (verified !== undefined) {
      params.verified = verified;
    }

    const response = await skoobturApi.get('/feedbacks', { params });
    
    // Normalizar dados da resposta baseado na estrutura real da API
    const apiData = response.data?.data || response.data;
    const feedbacks = apiData?.feedbacks || [];
    
    const testimonials = feedbacks.map(normalizeTestimonial);

  // Calcular rating médio
    const averageRating = testimonials.length > 0 
      ? testimonials.reduce((sum: number, item: TestimonialItem) => sum + item.rating, 0) / testimonials.length
      : 0;

    // Estrutura de resposta baseada na API real
    const total = apiData?.total || testimonials.length;
    const totalPages = Math.ceil(total / limit);

  return {
      data: testimonials,
    meta: {
      total,
      page,
      limit,
        totalPages,
      averageRating: Math.round(averageRating * 10) / 10
    }
  };
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    
    // Retornar resposta vazia em caso de erro
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        averageRating: 0
      }
    };
  }
};

export const getTestimonialById = async (id: number): Promise<TestimonialItem | null> => {
  try {
    const response = await skoobturApi.get(`/feedbacks/${id}`);
    
    if (response.data) {
      return normalizeTestimonial(response.data);
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar depoimento por ID:', error);
    return null;
  }
};

export const getFeaturedTestimonials = async (): Promise<TestimonialItem[]> => {
  try {
    const response = await getTestimonials({ featured: true, limit: 50 });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar depoimentos em destaque:', error);
    return [];
  }
};

export const getRelatedTestimonials = async (id: number, limit = 4): Promise<TestimonialItem[]> => {
  try {
    // Primeiro buscar o depoimento atual para obter informações de contexto
    const currentTestimonial = await getTestimonialById(id);
  if (!currentTestimonial) return [];
  
    // Buscar depoimentos relacionados por experiência
    const response = await getTestimonials({ 
      experience: currentTestimonial.experience,
      limit: limit + 1 // +1 para excluir o atual
    });
    
    // Filtrar o depoimento atual e limitar resultados
    const related = response.data
      .filter(item => item.id !== id)
    .slice(0, limit);
  
  return related;
  } catch (error) {
    console.error('Erro ao buscar depoimentos relacionados:', error);
    return [];
  }
};

export const getTestimonialExperiences = async (): Promise<string[]> => {
  try {
    // Buscar uma amostra grande de depoimentos para extrair experiências únicas
    const response = await getTestimonials({ limit: 100 });
    
    const experiences = [...new Set(
      response.data
        .map(item => item.experience)
        .filter(Boolean)
    )];
    
  return experiences as string[];
  } catch (error) {
    console.error('Erro ao buscar tipos de experiências:', error);
    return ['tours', 'restaurants', 'accommodations', 'events', 'agencies']; // Fallback
  }
};

export const getTestimonialStats = async () => {
  try {
    // Buscar uma amostra grande para calcular estatísticas
    const response = await getTestimonials({ limit: 1000 });
    
    const total = response.meta.total;
    const averageRating = response.meta.averageRating;
    const verified = response.data.filter(item => item.verified).length;
    const experienceCount = new Set(response.data.map(item => item.experience).filter(Boolean)).size;
  
  return {
    total,
      averageRating,
    verified,
    experienceCount
  };
  } catch (error) {
    console.error('Erro ao buscar estatísticas de depoimentos:', error);
    return {
      total: 0,
      averageRating: 0,
      verified: 0,
      experienceCount: 0
    };
  }
};
