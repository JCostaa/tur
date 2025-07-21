// Adicione este comentário para garantir que o Vite reconheça as variáveis de ambiente
/// <reference types="vite/client" />
import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:5001/api',
});

export default api; 