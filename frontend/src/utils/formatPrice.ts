/**
 * Formata preços, substituindo valores zero por "Grátis"
 */
export const formatPrice = (price: string | number | undefined | null): string => {
  if (!price) {
    return 'Grátis';
  }

  // Converter para string se for número
  const priceStr = typeof price === 'number' ? price.toString() : price;

  // Extrair apenas os números e vírgulas/pontos
  const numericValue = priceStr.replace(/[^\d,.]/g, '').replace(',', '.');
  const parsedValue = parseFloat(numericValue);

  // Se for zero, NaN, ou muito próximo de zero, retorna "Grátis"
  if (isNaN(parsedValue) || parsedValue === 0 || parsedValue < 0.01) {
    return 'Grátis';
  }

  // Retorna o preço original
  return priceStr;
};

/**
 * Verifica se um preço é zero ou grátis
 */
export const isPriceFree = (price: string | number | undefined | null): boolean => {
  if (!price) {
    return true;
  }

  const priceStr = typeof price === 'number' ? price.toString() : price;
  
  // Verifica se já está marcado como grátis
  if (/grátis|gratuito|free/i.test(priceStr)) {
    return true;
  }

  // Extrair apenas os números e vírgulas/pontos
  const numericValue = priceStr.replace(/[^\d,.]/g, '').replace(',', '.');
  const parsedValue = parseFloat(numericValue);

  return isNaN(parsedValue) || parsedValue === 0 || parsedValue < 0.01;
};

