import { useMemo } from 'react';
import { env } from '../env';

/**
 * Hook para obter o nome da cidade do env.ts
 */
export const useCityName = () => {
  return useMemo(() => {
    return env.VITE_CITY || 'Resex Cuniã';
  }, []);
};

/**
 * Hook para obter o nome do negócio do env.ts
 */
export const useBusinessName = () => {
  return useMemo(() => {
    return env.VITE_BUSINESS_NAME || 'RESEX Cuniã';
  }, []);
};

export default useCityName;
