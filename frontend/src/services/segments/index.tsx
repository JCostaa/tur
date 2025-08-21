import api from '../api';

// Mock segments data - exactly matching the UI requirements
const MOCK_SEGMENTS = [
  {
    id: 1,
    title: 'O que fazer',
    description: 'Descubra experiências autênticas, passeios e atrativos que revelam a essência do destino, conectando você ao que há de melhor no turismo local',
    icon: null, // Will use default Public icon
    orderIndex: 0,
    isActive: true,
    imageId: null,
    provider_id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Onde dormir',
    description: 'Encontre opções de hospedagem aconchegantes e variadas, do simples ao sofisticado, sempre com a hospitalidade local pronta para receber você.',
    icon: null, // Will use default Public icon
    orderIndex: 1,
    isActive: true,
    imageId: null,
    provider_id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Onde comer',
    description: 'Saboreie a culinária regional em restaurantes, bares e lanchonetes que traduzem a cultura e os sabores do destino em cada prato.',
    icon: null, // Will use default Public icon
    orderIndex: 2,
    isActive: true,
    imageId: null,
    provider_id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Onde comprar',
    description: 'Apoie o comércio local com artesanatos, produtos típicos e lojas variadas, além de agências receptivas, guias e condutores prontos para atender você.',
    icon: null, // Will use default Public icon
    orderIndex: 3,
    isActive: true,
    imageId: null,
    provider_id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getSegments = async (): Promise<any[]> => {
  // Return mock data instead of API call for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SEGMENTS);
    }, 600); // Simulate API delay
  });
  
  // Original API call (commented out for now)
  // const response = await api.get('/segments');
  // return response.data;
};