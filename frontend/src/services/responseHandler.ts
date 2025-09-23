/**
 * Utilitário para tratamento padronizado de respostas de API
 */

export interface ApiResponse<T = unknown> {
  data: T[];
  message: string;
  isEmpty: boolean;
  error?: string;
  meta?: Record<string, unknown>;
}

// Re-export for compatibility
export type { ApiResponse as ApiResponseType };

export interface ApiResponseOptions {
  resourceName: string; // Nome do recurso (ex: "atrações", "restaurantes", "hotéis")
  dataProperty?: string; // Propriedade que contém os dados (ex: "data", "items", "results")
}

/**
 * Processa a resposta da API e retorna um formato padronizado
 */
export const handleApiResponse = <T = unknown>(
  response: { data: unknown },
  options: ApiResponseOptions
): ApiResponse<T> => {
  const { resourceName, dataProperty } = options;
  
  // Verificar se a resposta existe e tem dados
  if (!response.data) {
    console.warn('⚠️ Nenhum dado retornado da API');
    return {
      data: [],
      message: 'Nenhum dado foi retornado do servidor',
      isEmpty: true
    };
  }
  
  // Se a resposta é um array, verificar se está vazio
  if (Array.isArray(response.data)) {
    if (response.data.length === 0) {
      console.warn(`⚠️ Nenhum(a) ${resourceName} encontrado(a)`);
      return {
        data: [],
        message: `Nenhum(a) ${resourceName} foi encontrado(a) para os critérios especificados`,
        isEmpty: true
      };
    }
    
    console.log(`✅ ${response.data.length} ${resourceName} encontrado(s)`);
    return {
      data: response.data as T[],
      message: `${response.data.length} ${resourceName} encontrado(s)`,
      isEmpty: false
    };
  }
  
  // Se a resposta é um objeto, verificar se tem propriedades relevantes
  if (typeof response.data === 'object') {
    // Tentar encontrar o array de dados usando diferentes propriedades comuns
    const possibleDataProperties = [
      dataProperty,
      'data',
      'items',
      'results',
      resourceName.toLowerCase(),
      `${resourceName.toLowerCase()}s`
    ].filter(Boolean);
    
    let dataArray: unknown[] | null = null;
    
    for (const prop of possibleDataProperties) {
      if (prop) {
        const responseData = response.data as Record<string, unknown>;
        if (responseData[prop] && Array.isArray(responseData[prop])) {
          dataArray = responseData[prop] as unknown[];
          break;
        }
      }
    }
    
    if (dataArray) {
      if (dataArray.length === 0) {
        console.warn(`⚠️ Nenhum(a) ${resourceName} encontrado(a)`);
        return {
          data: [],
          message: `Nenhum(a) ${resourceName} foi encontrado(a) para os critérios especificados`,
          isEmpty: true
        };
      }
      
      console.log(`✅ ${dataArray.length} ${resourceName} encontrado(s)`);
      return {
        data: dataArray as T[],
        message: `${dataArray.length} ${resourceName} encontrado(s)`,
        isEmpty: false,
        meta: response.data as Record<string, unknown> // Manter metadados se existirem (paginação, etc.)
      };
    }
    
    // Se não é um array, retornar o objeto como está
    console.log(`✅ Dados de ${resourceName} encontrados`);
    return {
      data: [response.data] as T[], // Envolver em array para consistência
      message: 'Dados encontrados',
      isEmpty: false
    };
  }
  
  // Fallback para outros tipos de dados
  return {
    data: (Array.isArray(response.data) ? response.data : [response.data]) as T[],
    message: 'Dados encontrados',
    isEmpty: false
  };
};

/**
 * Trata erros de API de forma padronizada
 */
export const handleApiError = (error: unknown, resourceName: string): ApiResponse => {
  console.error(`❌ Erro ao buscar ${resourceName}:`, error);
  
  // Tratamento específico para diferentes tipos de erro
  if (error && typeof error === 'object' && 'response' in error) {
    // Erro de resposta HTTP (4xx, 5xx)
    const errorResponse = error as { response: { status: number; statusText: string } };
    const status = errorResponse.response.status;
    const statusText = errorResponse.response.statusText;
    
    if (status === 404) {
      return {
        data: [],
        message: `Nenhum(a) ${resourceName} encontrado(a) - endpoint não encontrado`,
        isEmpty: true,
        error: `HTTP ${status}: ${statusText}`
      };
    }
    
    if (status >= 500) {
      return {
        data: [],
        message: 'Erro interno do servidor - tente novamente mais tarde',
        isEmpty: true,
        error: `HTTP ${status}: ${statusText}`
      };
    }
    
    if (status === 400) {
      return {
        data: [],
        message: 'Parâmetros inválidos na requisição',
        isEmpty: true,
        error: `HTTP ${status}: ${statusText}`
      };
    }
    
    if (status === 401) {
      return {
        data: [],
        message: 'Não autorizado - verifique suas credenciais',
        isEmpty: true,
        error: `HTTP ${status}: ${statusText}`
      };
    }
    
    if (status === 403) {
      return {
        data: [],
        message: 'Acesso negado',
        isEmpty: true,
        error: `HTTP ${status}: ${statusText}`
      };
    }
    
    return {
      data: [],
      message: `Erro ao buscar ${resourceName}: ${statusText}`,
      isEmpty: true,
      error: `HTTP ${status}: ${statusText}`
    };
  }
  
  if (error && typeof error === 'object' && 'request' in error) {
    // Erro de rede/conexão
    return {
      data: [],
      message: 'Erro de conexão - verifique sua internet',
      isEmpty: true,
      error: 'Network Error'
    };
  }
  
  // Outros erros
  const errorMessage = error && typeof error === 'object' && 'message' in error 
    ? (error as { message: string }).message 
    : 'Unknown Error';
    
  return {
    data: [],
    message: `Erro inesperado ao buscar ${resourceName}`,
    isEmpty: true,
    error: errorMessage
  };
};

/**
 * Função utilitária que combina handleApiResponse e handleApiError
 */
export const processApiCall = async <T = unknown>(
  apiCall: () => Promise<{ data: unknown }>,
  options: ApiResponseOptions
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall();
    return handleApiResponse<T>(response, options);
  } catch (error) {
    return handleApiError(error, options.resourceName) as ApiResponse<T>;
  }
};
