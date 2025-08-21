import api from '../api';

// Mock categories data
const MOCK_CATEGORIES = [
  { id: 1, name: 'Aventura', provider_id: 1 },
  { id: 2, name: 'Cultural', provider_id: 1 },
  { id: 3, name: 'Ecoturismo', provider_id: 1 },
  { id: 4, name: 'Enoturismo', provider_id: 1 },
  { id: 5, name: 'Místico e Esotérico', provider_id: 1 },
  { id: 6, name: 'Cachoeiras', provider_id: 1 },
  { id: 7, name: 'Negócios e Eventos', provider_id: 1 },
  { id: 8, name: 'Vida Selvagem', provider_id: 1 },
  { id: 9, name: 'Pesca', provider_id: 1 },
  { id: 10, name: 'Sol e Praia', provider_id: 1 },
  { id: 11, name: 'Turismo Rural', provider_id: 1 },
  { id: 12, name: 'Rotas e Roteiros', provider_id: 1 },
];

export const getCategories = async (): Promise<any[]> => {
  // Return mock data instead of API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CATEGORIES);
    }, 500); // Simulate API delay
  });
  
  // Original API call (commented out for now)
  // const response = await api.get('/categories');
  // return response.data;
};