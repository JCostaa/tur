import api from '../skoobtur';

export interface ToursParams {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const getTours = async (params?: ToursParams) => {
  try {
    const queryParams = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      ...params
    };
    
    console.log('🎯 [TOURS] Fazendo requisição para /tours com params:', queryParams);
    const response = await api.get('/tours', { params: queryParams });
    console.log('✅ [TOURS] Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [TOURS] Erro na requisição:', error);
    throw error;
  }
};