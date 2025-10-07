import { useContext } from 'react';
import CityContext from '../contexts/CityContext';
import type { City } from '../services/cityService';

interface CityContextData {
  currentCity: City | null;
  isLoading: boolean;
  error: string | null;
  setCurrentCity: (city: City | null) => void;
  refreshCity: () => Promise<void>;
}

/**
 * Hook para acessar o contexto de cidade
 * 
 * Exemplo de uso para acessar informações de agência de suporte ao turismo:
 * 
 * ```tsx
 * const { currentCity } = useCity();
 * const touristSupport = currentCity?.tourist_support_agency;
 * 
 * if (touristSupport?.name) {
 *   console.log('Agência:', touristSupport.name);
 *   console.log('Telefone:', touristSupport.phone_number);
 *   console.log('Email:', touristSupport.email);
 * }
 * ```
 */
export const useCity = (): CityContextData => {
  const context = useContext(CityContext);
  
  if (context === undefined) {
    throw new Error('useCity deve ser usado dentro de um CityProvider');
  }
  
  return context;
};

export default useCity;
