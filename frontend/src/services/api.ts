import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'https://tur-production.up.railway.app'}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer a3f1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2`,
  },
});

export default api;