import api from '../skoobtur';

export const getEvents = async () => {
  try {
    console.log('🎯 [EVENTS] Fazendo requisição para /attractions');
    const response = await api.get('/attractions');
    console.log('✅ [EVENTS] Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [EVENTS] Erro na requisição:', error);
    throw error;
  }
};
