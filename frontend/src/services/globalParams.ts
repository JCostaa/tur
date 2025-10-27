/**
 * Configuração centralizada para parâmetros globais que devem ser 
 * adicionados automaticamente a todas as requisições HTTP GET
 */
import { env } from '../env';

export interface GlobalParams {
  [key: string]: string | number | boolean;
}

/**
 * Mapeamento de variáveis de ambiente para parâmetros de query
 * Adicione novas variáveis aqui conforme necessário
 */
const ENV_TO_PARAMS_MAP = {
  // Localização
  VITE_CITY: 'city',
  VITE_STATE: 'state',
  VITE_COUNTRY: 'country',
  VITE_REGION: 'region',
  
  // Configurações de negócio
  VITE_BUSINESS_ID: 'business_id',
  VITE_TENANT_ID: 'tenant_id',
  VITE_PARTNER_ID: 'partner_id',
  
  // Configurações de API
  VITE_API_VERSION: 'version',
  VITE_LANGUAGE: 'lang',
  VITE_CURRENCY: 'currency',
  
  // Configurações de filtros padrão
  VITE_DEFAULT_CATEGORY: 'category',
  VITE_DEFAULT_SEGMENT: 'segment',
  VITE_DEFAULT_STATUS: 'status',
  
  // Configurações de paginação
  VITE_DEFAULT_LIMIT: 'limit',
  VITE_DEFAULT_PAGE_SIZE: 'page_size',
} as const;

/**
 * Função para obter parâmetros globais que devem ser adicionados a todas as requests GET
 * Automaticamente pega valores do env.ts definidas no mapeamento
 */
export const getGlobalParams = (): GlobalParams => {
  const params: GlobalParams = {};
  
  // Iterar sobre o mapeamento e adicionar parâmetros que existem no env.ts
  Object.entries(ENV_TO_PARAMS_MAP).forEach(([envKey, paramKey]) => {
    const envValue = (env as any)[envKey];
    
    if (envValue !== undefined && envValue !== null && envValue !== '') {
      // Converter valores numéricos
      if (!isNaN(Number(envValue)) && envValue.trim() !== '') {
        params[paramKey] = Number(envValue);
      }
      // Converter valores booleanos
      else if (envValue.toLowerCase() === 'true' || envValue.toLowerCase() === 'false') {
        params[paramKey] = envValue.toLowerCase() === 'true';
      }
      // Manter como string
      else {
        params[paramKey] = envValue;
      }
    }
  });
  
  return params;
};

/**
 * Função utilitária para debug - mostra os parâmetros globais atuais
 */
export const debugGlobalParams = (): void => {
  const params = getGlobalParams();
  console.log('🔍 Parâmetros Globais Atuais:', params);
  
  // Mostrar também quais variáveis estão definidas no env.ts
  const definedEnvVars = Object.keys(ENV_TO_PARAMS_MAP).filter(
    envKey => (env as any)[envKey] !== undefined && 
              (env as any)[envKey] !== null && 
              (env as any)[envKey] !== ''
  );
  
  console.log('📋 Variáveis definidas no env.ts:', definedEnvVars);
  console.log('🔧 Mapeamento completo:', ENV_TO_PARAMS_MAP);
};

/**
 * Função para obter uma variável do env.ts específica
 */
export const getEnvParam = (envKey: keyof typeof ENV_TO_PARAMS_MAP): string | undefined => {
  return (env as any)[envKey];
};

/**
 * Função para verificar se um parâmetro específico está ativo
 */
export const isParamActive = (paramKey: string): boolean => {
  const params = getGlobalParams();
  return paramKey in params;
};

/**
 * Função para obter apenas parâmetros de localização
 */
export const getLocationParams = (): GlobalParams => {
  const allParams = getGlobalParams();
  const locationKeys = ['city', 'state', 'country', 'region'];
  
  return Object.keys(allParams)
    .filter(key => locationKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = allParams[key];
      return obj;
    }, {} as GlobalParams);
};

/**
 * Função para obter apenas parâmetros de negócio
 */
export const getBusinessParams = (): GlobalParams => {
  const allParams = getGlobalParams();
  const businessKeys = ['business_id', 'tenant_id', 'partner_id'];
  
  return Object.keys(allParams)
    .filter(key => businessKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = allParams[key];
      return obj;
    }, {} as GlobalParams);
};
