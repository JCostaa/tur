// Definindo a interface localmente para evitar dependência circular
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  author?: string;
  publishedAt: string;
  category?: string;
  readTime?: string;
  featured?: boolean;
  slug?: string;
  tags?: string[];
  views?: number;
  status?: 'published' | 'draft' | 'archived';
}

export interface VarBlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
      width: number;
      height: number;
    }>;
    author?: string;
  };
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      taxonomy: string;
    }>>;
  };
}

export interface VarBlogResponse {
  posts: VarBlogPost[];
  total: number;
  totalPages: number;
}

// Mapear categorias do VAR Blog para categorias do nosso sistema
const categoryMapping: { [key: string]: string } = {
  'noticias': 'Notícias e Atualizações',
  'inovacao': 'Inovação no Turismo',
  'negocios': 'Negócios no Turismo',
  'tendencias': 'Tendências',
  'sustentabilidade': 'Sustentabilidade',
  'planejamento': 'Planejamento Turístico'
};

// Função para limpar HTML tags
const stripHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// Função para criar excerpt do conteúdo se não existir
const createExcerpt = (content: string, maxLength: number = 200): string => {
  const cleanContent = stripHtml(content);
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  return cleanContent.substring(0, maxLength).trim() + '...';
};

// Função para mapear post do VAR Blog para NewsItem
export const mapVarBlogPostToNewsItem = (post: VarBlogPost): NewsItem => {
  const title = stripHtml(post.title.rendered);
  const content = post.content.rendered;
  const excerpt = post.excerpt.rendered ? stripHtml(post.excerpt.rendered) : createExcerpt(content, 200);
  
  // Extrair imagem
  let image = '';
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    image = post._embedded['wp:featuredmedia'][0].source_url;
  } else if (post.yoast_head_json?.og_image?.[0]?.url) {
    image = post.yoast_head_json.og_image[0].url;
  }

  // Extrair autor
  let author = '';
  if (post._embedded?.author?.[0]?.name) {
    author = post._embedded.author[0].name;
  } else if (post.yoast_head_json?.author) {
    author = post.yoast_head_json.author;
  }

  // Extrair categoria
  let category = 'Notícias';
  if (post._embedded?.['wp:term']?.[0]) {
    const categories = post._embedded['wp:term'][0];
    const mainCategory = categories.find(cat => cat.taxonomy === 'category');
    if (mainCategory) {
      category = categoryMapping[mainCategory.name.toLowerCase()] || mainCategory.name;
    }
  }

  // Calcular tempo de leitura estimado
  const wordCount = stripHtml(content).split(' ').length;
  const readTime = Math.ceil(wordCount / 200) + ' min'; // 200 palavras por minuto

  return {
    id: post.id,
    title,
    summary: excerpt,
    content,
    image: image || undefined,
    author: author || undefined,
    publishedAt: post.date,
    category,
    readTime,
    featured: post.sticky,
    slug: post.slug,
    views: Math.floor(Math.random() * 1000) + 100, // Simulado pois não temos dados reais
    status: post.status as 'published' | 'draft' | 'archived'
  };
};

export const fetchVarBlogPosts = async (
  page: number = 1,
  perPage: number = 10,
  categories?: string[]
): Promise<VarBlogResponse> => {
  try {
    const baseUrl = 'https://blog.var.tur.br/wp-json/wp/v2/posts';
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true', // Incluir dados de autor, mídia, etc.
      status: 'publish'
    });

    // Filtrar por categorias se especificado
    if (categories && categories.length > 0) {
      // Primeiro, precisamos buscar os IDs das categorias
      // Por simplicidade, vamos omitir este filtro por enquanto
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log('🔍 VAR Blog: Fazendo requisição para:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 VAR Blog: Status da resposta:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: VarBlogPost[] = await response.json();
    console.log('✅ VAR Blog: Posts recebidos:', posts.length);
    
    // Extrair informações de paginação dos headers
    const totalPosts = parseInt(response.headers.get('x-wp-total') || '0');
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');

    console.log('📊 VAR Blog: Total de posts:', totalPosts, 'Páginas:', totalPages);

    return {
      posts,
      total: totalPosts,
      totalPages
    };
  } catch (error) {
    console.error('❌ VAR Blog: Erro ao buscar posts:', error);
    throw error;
  }
};

export const fetchVarBlogPostById = async (id: number): Promise<VarBlogPost | null> => {
  try {
    const url = `https://blog.var.tur.br/wp-json/wp/v2/posts/${id}?_embed=true`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post: VarBlogPost = await response.json();
    return post;
  } catch (error) {
    console.error(`Erro ao buscar post ${id} do VAR Blog:`, error);
    return null;
  }
};

export const searchVarBlogPosts = async (
  searchTerm: string,
  page: number = 1,
  perPage: number = 10
): Promise<VarBlogResponse> => {
  try {
    const baseUrl = 'https://blog.var.tur.br/wp-json/wp/v2/posts';
    const params = new URLSearchParams({
      search: searchTerm,
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true',
      status: 'publish'
    });

    const url = `${baseUrl}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: VarBlogPost[] = await response.json();
    
    const totalPosts = parseInt(response.headers.get('x-wp-total') || '0');
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');

    return {
      posts,
      total: totalPosts,
      totalPages
    };
  } catch (error) {
    console.error('Erro ao buscar posts do VAR Blog:', error);
    throw error;
  }
};
