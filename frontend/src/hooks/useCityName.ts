import { useMemo } from 'react';

/**
 * Hook para obter o nome da cidade do .env
 */
export const useCityName = () => {
  return useMemo(() => {
    return import.meta.env.VITE_CITY || 'Resex Cuniã';
  }, []);
};

/**
 * Hook para obter o nome do negócio do .env
 */
export const useBusinessName = () => {
  return useMemo(() => {
    return import.meta.env.VITE_BUSINESS_NAME || 'RESEX Cuniã';
  }, []);
};

export default useCityName;
