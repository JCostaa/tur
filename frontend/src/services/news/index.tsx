import { fetchVarBlogPosts, fetchVarBlogPostById, searchVarBlogPosts, mapVarBlogPostToNewsItem, type NewsItem } from '../varBlog';
import { env } from '../../env';

// Re-exportar NewsItem para compatibilidade
export type { NewsItem };

export interface NewsResponse {
  data: NewsItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface NewsFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  status?: string;
  sortBy?: 'publishedAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Mock data para desenvolvimento
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Nova Trilha Ecológica Inaugurada no Parque Municipal",
    summary: `Uma nova trilha de 2km foi aberta ao público, oferecendo vistas deslumbrantes da fauna e flora local de ${env.VITE_CITY || 'Barra do Bugres'}.`,
    content: `A Prefeitura de ${env.VITE_CITY || 'Barra do Bugres'} inaugurou ontem uma nova trilha ecológica no Parque Municipal, proporcionando aos visitantes uma experiência única em contato com a natureza. A trilha, com extensão de 2 quilômetros, foi projetada para ser acessível a visitantes de todas as idades...`,
    image: "",
    author: "Maria Silva",
    publishedAt: "2024-01-15T10:00:00Z",
    category: "Ecoturismo",
    readTime: "3 min",
    featured: true,
    views: 1250,
    tags: ["trilha", "ecoturismo", "parque", "natureza"]
  },
  {
    id: 2,
    title: "Festival de Pesca Esportiva Movimenta a Região",
    summary: "O tradicional festival anual de pesca esportiva trouxe centenas de participantes para as águas do Rio Paraguai.",
    content: `Durante o fim de semana, ${env.VITE_CITY || 'Barra do Bugres'} recebeu pescadores de todo o estado para o Festival de Pesca Esportiva, realizado nas margens do Rio Paraguai...`,
    image: "/images/browse-2.jpg",
    author: "João Santos",
    publishedAt: "2024-01-14T08:30:00Z",
    category: "Eventos",
    readTime: "4 min",
    featured: false,
    views: 890,
    tags: ["pesca", "festival", "rio paraguai", "evento"]
  },
  {
    id: 3,
    title: "Novo Roteiro Gastronômico Destaca Culinária Local",
    summary: "Restaurantes locais se unem para criar roteiro que valoriza ingredientes e pratos típicos da região pantaneira.",
    content: `A Associação de Restaurantes de ${env.VITE_CITY || 'Barra do Bugres'} lançou um novo roteiro gastronômico que destaca os sabores únicos da culinária pantaneira...`,
    image: "/images/browse-3.jpg",
    author: "Ana Costa",
    publishedAt: "2024-01-13T14:20:00Z",
    category: "Gastronomia",
    readTime: "5 min",
    featured: false,
    views: 670,
    tags: ["gastronomia", "culinária", "pantanal", "roteiro"]
  },
  {
    id: 4,
    title: "Temporada de Observação de Aves Atrai Turistas",
    summary: "A diversidade de espécies de aves na região tem atraído cada vez mais turistas especializados em birdwatching.",
    content: `Com mais de 200 espécies catalogadas, ${env.VITE_CITY || 'Barra do Bugres'} se consolida como destino preferido para observação de aves...`,
    image: "/images/browse-4.jpg",
    author: "Carlos Oliveira",
    publishedAt: "2024-01-12T09:15:00Z",
    category: "Vida Selvagem",
    readTime: "6 min",
    featured: false,
    views: 450,
    tags: ["aves", "birdwatching", "turismo", "natureza"]
  },
  {
    id: 5,
    title: "Cachoeira Recém-Descoberta Vira Atração Turística",
    summary: "Uma cachoeira de 15 metros de altura foi descoberta por guias locais e já está recebendo visitantes.",
    content: "Uma expedição de guias locais descobriu uma impressionante cachoeira na Serra do Roncador, que rapidamente se tornou nova atração...",
    image: "/images/browse-5.jpg",
    author: "Luiza Ferreira",
    publishedAt: "2024-01-11T16:45:00Z",
    category: "Aventura",
    readTime: "4 min",
    featured: false,
    views: 1100,
    tags: ["cachoeira", "aventura", "descoberta", "serra"]
  },
  {
    id: 6,
    title: "Workshop de Artesanato Tradicional Pantaneiro",
    summary: "Artesãos locais ensinam técnicas tradicionais de confecção de peças típicas da cultura pantaneira.",
    content: "O Centro Cultural promove workshop onde visitantes podem aprender técnicas centenárias de artesanato pantaneiro...",
    image: "/images/header-1.jpg",
    author: "Pedro Almeida",
    publishedAt: "2024-01-10T11:30:00Z",
    category: "Cultural",
    readTime: "3 min",
    featured: false,
    views: 320,
    tags: ["artesanato", "cultura", "workshop", "tradição"]
  },
  {
    id: 7,
    title: "Turismo Rural Ganha Força na Região",
    summary: "Fazendas locais abrem portões para turistas interessados em experiências autênticas do campo.",
    content: `O turismo rural em ${env.VITE_CITY || 'Barra do Bugres'} tem crescido significativamente, com fazendas oferecendo hospedagem e atividades...`,
    image: "/images/header-2.jpg",
    author: "Fernanda Lima",
    publishedAt: "2024-01-09T13:20:00Z",
    category: "Turismo Rural",
    readTime: "5 min",
    featured: false,
    views: 780,
    tags: ["turismo rural", "fazenda", "campo", "hospedagem"]
  }
];

// Simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getNews = async (filters: NewsFilters = {}): Promise<NewsResponse> => {
  const {
    page = 1,
    limit = 10,
    category,
    search,
    featured,
    sortBy = 'publishedAt',
    sortOrder = 'desc'
  } = filters;

  try {
    console.log('🚀 News Service: Iniciando busca de notícias, filtros:', filters);
    
    // Buscar notícias do VAR Blog
    let varBlogData;
    
    if (search) {
      console.log('🔍 News Service: Buscando com termo:', search);
      // Se há busca, usar a função de search
      varBlogData = await searchVarBlogPosts(search, page, limit);
    } else {
      console.log('📰 News Service: Buscando notícias normais');
      // Busca normal
      varBlogData = await fetchVarBlogPosts(page, limit);
    }

    // Mapear posts do VAR Blog para NewsItem
    console.log('🔄 News Service: Mapeando', varBlogData.posts.length, 'posts do VAR Blog');
    let newsItems = varBlogData.posts.map(mapVarBlogPostToNewsItem);
    console.log('✅ News Service: Notícias mapeadas:', newsItems.length);

    // Aplicar filtros locais
    if (category && category !== 'all') {
      newsItems = newsItems.filter(item => 
        item.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (featured !== undefined) {
      newsItems = newsItems.filter(item => item.featured === featured);
    }

    // Ordenar se necessário (os posts já vêm ordenados por data do WordPress)
    if (sortBy === 'views' || sortBy === 'title' || sortOrder === 'asc') {
      newsItems.sort((a, b) => {
        let aValue: string | number | Date, bValue: string | number | Date;
        
        switch (sortBy) {
          case 'publishedAt':
            aValue = new Date(a.publishedAt);
            bValue = new Date(b.publishedAt);
            break;
          case 'views':
            aValue = a.views || 0;
            bValue = b.views || 0;
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          default:
            aValue = new Date(a.publishedAt);
            bValue = new Date(b.publishedAt);
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return {
      data: newsItems,
      meta: {
        total: varBlogData.total,
        page,
        limit,
        totalPages: varBlogData.totalPages
      }
    };
  } catch (error) {
    console.error('Erro ao buscar notícias do VAR Blog, usando dados mock:', error);
    
    // Fallback para dados mock em caso de erro
    return getNewsMock(filters);
  }
};

// Função auxiliar para dados mock (fallback)
const getNewsMock = async (filters: NewsFilters = {}): Promise<NewsResponse> => {
  await delay(800); // Simular delay da API
  
  const {
    page = 1,
    limit = 10,
    category,
    search,
    featured,
    sortBy = 'publishedAt',
    sortOrder = 'desc'
  } = filters;

  let filteredNews = [...mockNews];

  // Filtrar por categoria
  if (category && category !== 'all') {
    filteredNews = filteredNews.filter(item => 
      item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Filtrar por busca
  if (search) {
    const searchLower = search.toLowerCase();
    filteredNews = filteredNews.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.summary.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower) ||
      item.author?.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Filtrar por featured
  if (featured !== undefined) {
    filteredNews = filteredNews.filter(item => item.featured === featured);
  }

  // Ordenar
  filteredNews.sort((a, b) => {
    let aValue: string | number | Date, bValue: string | number | Date;
    
    switch (sortBy) {
      case 'publishedAt':
        aValue = new Date(a.publishedAt);
        bValue = new Date(b.publishedAt);
        break;
      case 'views':
        aValue = a.views || 0;
        bValue = b.views || 0;
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      default:
        aValue = new Date(a.publishedAt);
        bValue = new Date(b.publishedAt);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Paginação
  const total = filteredNews.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  return {
    data: paginatedNews,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getNewsById = async (id: number): Promise<NewsItem | null> => {
  try {
    // Primeiro tentar buscar do VAR Blog
    const varBlogPost = await fetchVarBlogPostById(id);
    
    if (varBlogPost) {
      return mapVarBlogPostToNewsItem(varBlogPost);
    }
    
    // Fallback para dados mock
    await delay(500);
    const newsItem = mockNews.find(item => item.id === id);
    
    if (newsItem) {
      // Incrementar views (simulado)
      newsItem.views = (newsItem.views || 0) + 1;
    }
    
    return newsItem || null;
  } catch (error) {
    console.error('Erro ao buscar notícia por ID, usando dados mock:', error);
    
    // Fallback para dados mock
    await delay(500);
    const newsItem = mockNews.find(item => item.id === id);
    
    if (newsItem) {
      newsItem.views = (newsItem.views || 0) + 1;
    }
    
    return newsItem || null;
  }
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | null> => {
  await delay(500);
  
  const newsItem = mockNews.find(item => 
    item.slug === slug || 
    item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  );
  
  if (newsItem) {
    // Incrementar views (simulado)
    newsItem.views = (newsItem.views || 0) + 1;
  }
  
  return newsItem || null;
};

export const getFeaturedNews = async (): Promise<NewsItem[]> => {
  await delay(300);
  return mockNews.filter(item => item.featured);
};

export const getRelatedNews = async (id: number, limit = 4): Promise<NewsItem[]> => {
  await delay(400);
  
  const currentNews = mockNews.find(item => item.id === id);
  if (!currentNews) return [];
  
  // Buscar notícias relacionadas por categoria ou tags
  const related = mockNews
    .filter(item => 
      item.id !== id && (
        item.category === currentNews.category ||
        item.tags?.some(tag => currentNews.tags?.includes(tag))
      )
    )
    .slice(0, limit);
  
  return related;
};

export const getNewsCategories = async (): Promise<string[]> => {
  try {
    // Buscar algumas notícias do VAR Blog para extrair categorias
    const varBlogData = await fetchVarBlogPosts(1, 50); // Buscar mais posts para ter mais categorias
    const varBlogNews = varBlogData.posts.map(mapVarBlogPostToNewsItem);
    const varCategories = [...new Set(varBlogNews.map(item => item.category).filter(Boolean))];
    
    // Combinar com categorias mock
    const mockCategories = [...new Set(mockNews.map(item => item.category).filter(Boolean))];
    const allCategories = [...new Set([...varCategories, ...mockCategories])];
    
    return allCategories as string[];
  } catch (error) {
    console.error('Erro ao buscar categorias do VAR Blog, usando dados mock:', error);
    
    // Fallback para dados mock
    await delay(200);
    const categories = [...new Set(mockNews.map(item => item.category).filter(Boolean))];
    return categories as string[];
  }
};

// Funções para desenvolvimento com API real (comentadas para usar mock)
/*
export const getNews = async (filters: NewsFilters = {}): Promise<NewsResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  
  const response = await api.get(`/news?${params.toString()}`);
  return response.data;
};

export const getNewsById = async (id: number): Promise<NewsItem | null> => {
  try {
    const response = await api.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | null> => {
  try {
    const response = await api.get(`/news/slug/${slug}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
*/
