import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { City } from '../services/cityService';
import { cityService } from '../services/cityService';

interface CityContextData {
  currentCity: City | null;
  isLoading: boolean;
  error: string | null;
  setCurrentCity: (city: City | null) => void;
  refreshCity: () => Promise<void>;
}

const CityContext = createContext<CityContextData | undefined>(undefined);

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega a cidade configurada no .env na inicialização
   */
  const loadCityFromEnv = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🚀 Iniciando carregamento da cidade...');

      const city = await cityService.getCityFromEnv();
      console.log('📦 Resultado do cityService.getCityFromEnv():', city);
      
      if (city) {
        setCurrentCity(city);
        console.log('🏙️ Cidade carregada da API:', city);
        console.log('🔍 tourist_support_agency da API:', city.tourist_support_agency);
      } else {
        // Se não encontrar a cidade na API, criar um objeto com os dados do .env
        const envCity = import.meta.env.VITE_CITY;
        const envState = import.meta.env.VITE_STATE;
        
        if (envCity && envState) {
          const fallbackCity: City = {
            id: 0, // ID temporário
            name: envCity.trim(),
            state: envState.trim(),
            region: import.meta.env.VITE_REGION || '',
            country: import.meta.env.VITE_COUNTRY || 'BR',
            tourist_support_agency: {
              name: null,
              address: null,
              lat: null,
              lng: null,
              phone_number: null,
              email: null,
              site: null,
              instagram: null,
              facebook: null,
              youtube: null,
              tiktok: null,
              linkedin: null,
              observations: null
            }
          };
          
          setCurrentCity(fallbackCity);
          console.log('🏙️ Usando dados do .env como fallback:', fallbackCity);
          console.log('⚠️ ATENÇÃO: Usando fallback - tourist_support_agency será null!');
        } else {
          setError('Cidade não configurada no .env');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar cidade';
      setError(errorMessage);
      console.error('Erro ao carregar cidade:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função para recarregar a cidade
   */
  const refreshCity = async () => {
    await loadCityFromEnv();
  };

  /**
   * Carrega a cidade na inicialização do contexto
   */
  useEffect(() => {
    loadCityFromEnv();
  }, []);

  const contextValue: CityContextData = {
    currentCity,
    isLoading,
    error,
    setCurrentCity,
    refreshCity
  };

  return (
    <CityContext.Provider value={contextValue}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;
