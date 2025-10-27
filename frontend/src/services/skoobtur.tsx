import axios from 'axios';
import { getGlobalParams } from './globalParams';
import { env } from '../env';

// Em desenvolvimento, usar proxy local para evitar CORS
// Em produção, usar URL direta da API
const baseURL = import.meta.env.DEV 
  ? '/api/skoobtur'  // Proxy local em desenvolvimento
  : (env.VITE_SKOOBTUR_API_URL || 'https://www.skoobtur.com/api/public');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Token de autorização da API Skoobtur
    'Authorization': `Bearer ${env.VITE_SKOOBTUR_API_KEY || 'Jnw6M615NguH3eo1b5MFGifPLVR62WdaY1bab6KUtv8ZrQJnlHb8LQxF6djjo699NCfm8i83Pnr1Gg8tZtUi7xEnOh9MGi6MpuSt'}`,
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