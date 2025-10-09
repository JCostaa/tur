import skoobturApi from './skoobtur';
import type { Experience, CreateExperienceData } from '../types/experience';

class ExperienceService {
  private readonly baseUrl = '/experiences';
  private cache: Experience[] | null = null;

  /**
   * Busca todas as experiências
   */
  getAll = async (): Promise<Experience[]> => {
    try {
      console.log('🎯 [EXPERIENCES] Fazendo requisição para /experiences');
      const response = await skoobturApi.get(this.baseUrl);
      console.log('✅ [EXPERIENCES] Resposta recebida:', response.data);
      
      // A API Skoobtur retorna { success: true, data: { experiences: [...] } }
      const experiences = response.data?.data?.experiences || [];
      
      // Mapear para o formato esperado pelo frontend
      return experiences.map((exp: any, index: number) => {
        // Extrair categoria do nome (ex: "Experiência Gastronômica" -> "Gastronômica")
        const categoryName = exp.name.replace('Experiência de ', '').replace('Experiência ', '').replace('Experiência em ', '').replace('Experiência no ', '');
        
        return {
          id: index + 1, // Gerar ID sequencial já que a API não retorna
          title: exp.name,
          subtitle: '',
          description: `Descubra ${categoryName.toLowerCase()} em ${import.meta.env.VITE_CITY || 'Barra do Bugres'} e região.`,
          image: {
            url: exp.image,
            path: exp.image
          },
          categories: [{
            id: index + 1,
            name: categoryName,
            description: `Categoria de ${categoryName.toLowerCase()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }],
          provider_id: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      });
    } catch (error) {
      console.error('❌ Erro ao buscar experiências:', error);
      throw error;
    }
  }

  /**
   * Busca experiência por ID
   */
  getById = async (id: number): Promise<Experience> => {
    try {
      console.log(`🌐 Buscando experiência ID ${id}...`);
      
      // Como a API não tem endpoint individual, buscar todas e filtrar por ID
      const allExperiences = await this.getAll();
      const experience = allExperiences.find(exp => exp.id === id);
      
      if (!experience) {
        throw new Error(`Experiência com ID ${id} não encontrada`);
      }
      
      console.log('✅ Experiência recebida:', experience);
      return experience;
    } catch (error) {
      console.error(`❌ Erro ao buscar experiência ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria nova experiência
   */
  async create(data: CreateExperienceData): Promise<Experience> {
    try {
      console.log('🌐 Criando nova experiência...', data);
      
      const formData = new FormData();
      formData.append('title', data.title);
      
      if (data.subtitle) {
        formData.append('subtitle', data.subtitle);
      }
      
      if (data.description) {
        formData.append('description', data.description);
      }
      
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await skoobturApi.post(this.baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Experiência criada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar experiência:', error);
      throw error;
    }
  }

  /**
   * Atualiza experiência existente
   */
  async update(id: number, data: Partial<CreateExperienceData>): Promise<Experience> {
    try {
      console.log(`🌐 Atualizando experiência ID ${id}...`, data);
      
      const formData = new FormData();
      
      if (data.title) {
        formData.append('title', data.title);
      }
      
      if (data.subtitle) {
        formData.append('subtitle', data.subtitle);
      }
      
      if (data.description) {
        formData.append('description', data.description);
      }
      
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await skoobturApi.put(`${this.baseUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Experiência atualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar experiência ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove experiência
   */
  async delete(id: number): Promise<void> {
    try {
      console.log(`🌐 Removendo experiência ID ${id}...`);
      await skoobturApi.delete(`${this.baseUrl}/${id}`);
      console.log('✅ Experiência removida com sucesso');
    } catch (error) {
      console.error(`❌ Erro ao remover experiência ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca experiências por categoria (filtra pelo nome)
   */
  getByCategory = async (categoryName: string): Promise<Experience[]> => {
    try {
      console.log(`🌐 Buscando experiências da categoria ${categoryName}...`);
      
      const allExperiences = await this.getAll();
      const filtered = allExperiences.filter(exp => 
        exp.title.toLowerCase().includes(categoryName.toLowerCase())
      );
      
      console.log('✅ Experiências filtradas por categoria:', filtered);
      return filtered;
    } catch (error) {
      console.error(`❌ Erro ao buscar experiências da categoria ${categoryName}:`, error);
      throw error;
    }
  }

  /**
   * Busca experiências com filtros
   */
  async getWithFilters(filters: {
    search?: string;
    category?: number;
    provider?: number;
    page?: number;
    limit?: number;
  }): Promise<Experience[]> {
    try {
      console.log('🌐 Buscando experiências com filtros...', filters);
      
      const params = new URLSearchParams();
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      if (filters.category) {
        params.append('category', filters.category.toString());
      }
      
      if (filters.provider) {
        params.append('provider', filters.provider.toString());
      }
      
      if (filters.page) {
        params.append('page', filters.page.toString());
      }
      
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }

      const response = await skoobturApi.get(`${this.baseUrl}?${params.toString()}`);
      console.log('✅ Experiências filtradas recebidas:', response.data);
      
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('❌ Erro ao buscar experiências com filtros:', error);
      throw error;
    }
  }
}

export const experienceService = new ExperienceService();
export default experienceService;
