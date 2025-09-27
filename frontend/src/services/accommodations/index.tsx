import api from '../skoobtur';

export const getAccommodations = async () => {
  try {
    console.log('🎯 [ACCOMMODATIONS] Fazendo requisição para /hotels');
    const response = await api.get('/hotels');
    console.log('✅ [ACCOMMODATIONS] Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [ACCOMMODATIONS] Erro na requisição:', error);
    throw error;
  }
};