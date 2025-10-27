import { useEffect } from 'react';

/**
 * Hook para atualizar o título da página com o nome do negócio do .env
 */
export const useBusinessTitle = () => {
  useEffect(() => {
    const businessName = import.meta.env.VITE_BUSINESS_NAME || 'Livramento Cuniã';
    const city = import.meta.env.VITE_CITY || 'Barra do Bugres';
    
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
