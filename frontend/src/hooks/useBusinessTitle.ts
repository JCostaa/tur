import { useEffect } from 'react';
import { env } from '../env';

/**
 * Hook para atualizar o título da página com o nome do negócio do env.ts
 */
export const useBusinessTitle = () => {
  useEffect(() => {
    const businessName = env.VITE_BUSINESS_NAME || 'RESEX Cuniã';
    const city = env.VITE_CITY || 'Barra do Bugres';
    
    // Atualiza o título da página
    document.title = `${businessName} - Turismo`;
    
    // Atualiza a meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Descubra as maravilhas de ${city} - um destino turístico único no Mato Grosso`);
    }
  }, []);
};

export default useBusinessTitle;
