import axios from 'axios';

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

export default api;