import axios from 'axios';
import { getGlobalParams } from './globalParams';
import { env } from '../env';

const api = axios.create({
  baseURL: `${env.VITE_API_URL || 'https://tur-production.up.railway.app'}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer a3f1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2`,
  },
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
        console.log('🔧 Parâmetros adicionados à requisição:', globalParams);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;