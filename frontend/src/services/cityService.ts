import skoobturApi from './skoobtur';
import { env } from '../env';

export interface TouristSupportAgency {
  name: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  phone_number: string | null;
  email: string | null;
  site: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
  linkedin: string | null;
  observations: string | null;
}

export interface City {
  id: number;
  name: string;
  state: string;
  region?: string;
  country?: string;
  tourist_support_agency?: TouristSupportAgency;
  gallery?: Array<{ large: string; thumb: string }>;
}

export interface CityApiResponse {
  success: boolean;
  data: {
    page: number;
    limit: number;
    total: number;
    cities: City[];
  };
}

/**
 * Serviço para integração com a API de cidades da Skoobtur
 */
class CityService {
  /**
   * Normaliza o nome da cidade removendo espaços extras
   * e formatando para o padrão esperado pela API
   */
  private formatCityName(cityName: string): string {
    return cityName.trim().toLowerCase();
  }

  /**
   * Busca cidades por nome na API da Skoobtur
   * @param name Nome da cidade para buscar
   * @returns Promise com lista de cidades encontradas
   */
  async getCitiesByName(name: string): Promise<City[]> {
    try {
      const formattedName = this.formatCityName(name);
      console.log('🔍 Buscando cidade:', { original: name, formatted: formattedName });
      
      const response = await skoobturApi.get<CityApiResponse>('/cities', {
        params: {
          name: formattedName
        }
      });

      console.log('📡 Resposta da API:', response.data);

      if (response.data && response.data.data && response.data.data.cities) {
        console.log('✅ Cidades encontradas:', response.data.data.cities.length);
        console.log('🔍 Primeira cidade completa:', JSON.stringify(response.data.data.cities[0], null, 2));
        return response.data.data.cities;
      }

      console.log('❌ Nenhuma cidade encontrada');
      return [];
    } catch (error) {
      console.error('❌ Erro ao buscar cidades:', error);
      return [];
    }
  }

  /**
   * Busca a cidade configurada no .env
   * Pega o valor de VITE_CITY e busca na API
   */
  async getCityFromEnv(): Promise<City | null> {
    try {
      const envCity = env.VITE_CITY;
      console.log('🌍 VITE_CITY do env.ts:', envCity);
      
      if (!envCity) {
        console.warn('❌ VITE_CITY não está configurada no env.ts');
        return null;
      }

      const cities = await this.getCitiesByName(envCity);
      
      if (cities.length > 0) {
        console.log('✅ Cidade encontrada na API:', cities[0]);
        // Retorna a primeira cidade encontrada
        return cities[0];
      }

      console.warn(`❌ Cidade "${envCity}" não encontrada na API`);
      return null;
    } catch (error) {
      console.error('❌ Erro ao buscar cidade do .env:', error);
      return null;
    }
  }

  /**
   * Busca todas as cidades (com paginação se necessário)
   * @param limit Limite de resultados por página
   * @param page Página atual
   */
  async getAllCities(): Promise<CityApiResponse> {
    try {
      const response = await skoobturApi.get<CityApiResponse>('/cities');

      return response.data || { 
        success: false, 
        data: { 
          page: 1, 
          limit: 10, 
          total: 0, 
          cities: [] 
        } 
      };
    } catch (error) {
      console.error('Erro ao buscar todas as cidades:', error);
      return { 
        success: false, 
        data: { 
          page: 1, 
          limit: 10, 
          total: 0, 
          cities: [] 
        } 
      };
    }
  }
}

// Exportar instância singleton do serviço
export const cityService = new CityService();
export default cityService;
