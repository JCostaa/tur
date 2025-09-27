/**
 * Utilitários para otimização de imagens no lado do cliente
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface ImageQualityInfo {
  width: number;
  height: number;
  aspectRatio: number;
  isLowQuality: boolean;
  recommendedOptimization: ImageOptimizationOptions;
}

/**
 * Analisa a qualidade de uma imagem
 */
export const analyzeImageQuality = (imageUrl: string): Promise<ImageQualityInfo> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const aspectRatio = width / height;
      
      // Critérios para determinar baixa qualidade
      const isLowQuality = 
        width < 800 || 
        height < 600 || 
        (width * height) < 480000; // Menos que 480k pixels
      
      // Recomendações de otimização baseadas na análise
      const recommendedOptimization: ImageOptimizationOptions = {
        maxWidth: isLowQuality ? Math.min(width * 2, 1920) : 1920,
        maxHeight: isLowQuality ? Math.min(height * 2, 1080) : 1080,
        quality: isLowQuality ? 0.9 : 0.8,
        format: 'webp'
      };
      
      resolve({
        width,
        height,
        aspectRatio,
        isLowQuality,
        recommendedOptimization
      });
    };
    
    img.onerror = () => {
      reject(new Error('Falha ao carregar imagem para análise'));
    };
    
    img.src = imageUrl;
  });
};

/**
 * Gera URL otimizada usando serviços externos (Unsplash, Cloudinary, etc.)
 */
export const generateOptimizedUrl = (
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 80,
    format = 'webp'
  } = options;

  // Se for Unsplash, usar parâmetros de otimização
  if (originalUrl.includes('unsplash.com')) {
    const url = new URL(originalUrl);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', maxWidth.toString());
    url.searchParams.set('h', maxHeight.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    return url.toString();
  }

  // Se for uma URL local, adicionar parâmetros de otimização
  if (originalUrl.startsWith('/') || originalUrl.includes(window.location.hostname)) {
    return `${originalUrl}?w=${maxWidth}&h=${maxHeight}&q=${quality}&f=${format}`;
  }

  // Para outras URLs, retornar original
  return originalUrl;
};

/**
 * Cria uma versão blur da imagem para loading progressivo
 */
export const generateBlurDataUrl = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context não disponível'));
        return;
      }
      
      // Criar uma versão muito pequena (blur effect)
      canvas.width = 40;
      canvas.height = 40;
      
      // Desenhar imagem reduzida
      ctx.drawImage(img, 0, 0, 40, 40);
      
      // Aplicar blur via CSS filter seria melhor, mas para data URL:
      const dataUrl = canvas.toDataURL('image/jpeg', 0.1);
      resolve(dataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Falha ao gerar blur data URL'));
    };
    
    img.src = imageUrl;
  });
};

/**
 * Pré-carrega uma imagem com otimizações
 */
export const preloadOptimizedImage = (
  imageUrl: string,
  options: ImageOptimizationOptions = {}
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const optimizedUrl = generateOptimizedUrl(imageUrl, options);
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar: ${optimizedUrl}`));
    
    img.src = optimizedUrl;
  });
};

/**
 * Detecta suporte a WebP
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Estratégia de carregamento progressivo
 */
export interface ProgressiveLoadingOptions {
  lowQualityUrl?: string;
  mediumQualityUrl?: string;
  highQualityUrl: string;
  blurDataUrl?: string;
}

export const createProgressiveLoader = (options: ProgressiveLoadingOptions) => {
  const { lowQualityUrl, mediumQualityUrl, highQualityUrl, blurDataUrl } = options;
  
  return {
    // Primeira fase: blur data URL ou low quality
    getInitialUrl: () => blurDataUrl || lowQualityUrl || highQualityUrl,
    
    // Segunda fase: medium quality
    getMediumUrl: () => mediumQualityUrl || highQualityUrl,
    
    // Fase final: high quality
    getFinalUrl: () => highQualityUrl,
    
    // Pré-carregar todas as versões
    preloadAll: async () => {
      const promises = [];
      
      if (lowQualityUrl) {
        promises.push(preloadOptimizedImage(lowQualityUrl, { quality: 0.3 }));
      }
      
      if (mediumQualityUrl) {
        promises.push(preloadOptimizedImage(mediumQualityUrl, { quality: 0.6 }));
      }
      
      promises.push(preloadOptimizedImage(highQualityUrl, { quality: 0.9 }));
      
      return Promise.allSettled(promises);
    }
  };
};
