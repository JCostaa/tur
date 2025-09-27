import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';

interface AnimatedGifProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  objectPosition?: string;
}

const AnimatedGif: React.FC<AnimatedGifProps> = ({
  src,
  alt,
  width = '100%',
  height = '100%',
  objectFit = 'cover',
  objectPosition = 'center',
  sx,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src.toLowerCase().includes('.gif')) return;

    // Função para forçar reload do GIF
    const forceGifReload = () => {
      const originalSrc = img.src;
      img.src = '';
      // Usar requestAnimationFrame para garantir que o browser processe a mudança
      requestAnimationFrame(() => {
        img.src = originalSrc;
      });
    };

    // Aguardar o carregamento inicial antes de forçar reload
    const timer = setTimeout(() => {
      if (img.complete && img.naturalWidth > 0) {
        forceGifReload();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(false);
    // Log apenas em desenvolvimento para não poluir console em produção
    if (import.meta.env.DEV) {
      console.warn(`Falha ao carregar GIF: ${src}`);
    }
  };

  return (
    <Box
      component="img"
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      sx={{
        width,
        height,
        objectFit,
        objectPosition,
        // Estilos específicos para GIFs animados
        imageRendering: 'auto',
        // Garantir que a animação não seja pausada
        animationPlayState: 'running',
        // Transição suave quando carrega
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        // Estilos adicionais para garantir animação
        ...(src.includes('.gif') && {
          // Forçar hardware acceleration para melhor performance
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }),
        // Estilos customizados do usuário
        ...sx,
      }}
      {...props}
    />
  );
};

export default AnimatedGif;
