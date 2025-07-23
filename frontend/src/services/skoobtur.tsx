import axios from 'axios';

const isDev = import.meta.env.DEV;

// Alternative CORS proxy services (uncomment one if needed)
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
// const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

const api = axios.create({
  baseURL: isDev ? '/api/public' : '/api/proxy',
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