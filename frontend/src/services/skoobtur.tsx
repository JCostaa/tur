import axios from 'axios';
import { getGlobalParams } from './globalParams';

const baseURL = import.meta.env.VITE_SKOOBTUR_API_URL || 'https://www.skoobtur.com/api/public';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_SKOOBTUR_API_KEY && {
      'Authorization': `Bearer ${import.meta.env.VITE_SKOOBTUR_API_KEY}`,
    }),
  },
  // Adicionar timeout para evitar requisições muito lentas
  timeout: 10000,
});

// Interceptor para adicionar parâmetros GET dinâmicos do .env
api.interceptors.request.use(
  (config) => {
    // Só adiciona parâmetros para requisições GET
    if (config.method === 'get') {
      const globalParams = getGlobalParams();
      
      // Se já existem params, mescla com os globais
      if (config.params) {
        config.params = { ...globalParams, ...config.params };
      } else {
        config.params = globalParams;
      }
      
      // Log para debug (apenas em desenvolvimento)
      if (import.meta.env.DEV) {
        console.log('🔧 [Skoobtur] Parâmetros adicionados à requisição:', globalParams);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;