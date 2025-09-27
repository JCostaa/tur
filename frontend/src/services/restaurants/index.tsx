import api from '../skoobtur';

export const getRestaurants = async () => {
  try {
    console.log('🎯 [RESTAURANTS] Fazendo requisição para /restaurants');
    const response = await api.get('/restaurants');
    console.log('✅ [RESTAURANTS] Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [RESTAURANTS] Erro na requisição:', error);
    throw error;
  }
};