
import api from '../skoobtur'

const getProviders = async (type: 'guides' | 'agencies' | 'drivers' | 'tours') => {
  try {
    console.log(`🎯 [PROVIDERS-${type.toUpperCase()}] Fazendo requisição para /providers?type=${type}`);
    const response = await api.get(`/providers?type=${type}`);
    console.log(`✅ [PROVIDERS-${type.toUpperCase()}] Resposta recebida:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ [PROVIDERS-${type.toUpperCase()}] Erro na requisição:`, error);
    throw error;
  }
};

export { getProviders };