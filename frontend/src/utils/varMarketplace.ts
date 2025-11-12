/**
 * Utilitário para gerar URLs dinâmicas do Var Marketplace
 */
import { env } from '../env';

/**
 * Converte o nome da cidade para o formato slug usado na URL
 * Exemplo: "Barra do Bugres" -> "barra-do-bugres"
 */
export const cityToSlug = (cityName: string): string => {
  return cityName
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

/**
 * Gera a URL dinâmica do Var Marketplace baseada na cidade configurada no env.ts
 * Formato: https://skoobtur.com/municipio/{city-slug}
 */
export const getVarMarketplaceUrl = (): string => {
  const cityName = env.VITE_CITY;
  
  if (!cityName) {
    console.warn('VITE_CITY não está configurada no env.ts, usando URL padrão');
    return 'https://www.skoobtur.com/';
  }
  return `https://skoobtur.com`;
};

/**
 * Hook para usar a URL dinâmica do Var Marketplace em componentes React
 */
export const useVarMarketplaceUrl = (): string => {
  return getVarMarketplaceUrl();
};

/**
 * Obtém o nome da cidade configurada no env.ts
 */
export const getCityName = (): string => {
  return env.VITE_CITY || 'Cidade';
};
