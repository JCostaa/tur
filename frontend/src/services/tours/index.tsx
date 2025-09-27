import api from '../skoobtur';

export const getTours = async () => {
  try {
    console.log('🎯 [TOURS] Fazendo requisição para /tours');
    const response = await api.get('/tours');
    console.log('✅ [TOURS] Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [TOURS] Erro na requisição:', error);
    throw error;
  }
};