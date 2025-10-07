import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Typography,
  styled,
  alpha,
  useTheme
} from '@mui/material';
// Imports removidos para limpar linter errors
import { useQuery } from '@tanstack/react-query';
import { getTours } from '../services/tours';
import { generateOptimizedUrl, preloadOptimizedImage } from '../utils/imageOptimization';
import { useCity } from '../hooks/useCity';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '75vh', // Reduzido de 100vh para 75vh
  minHeight: 500, // Reduzido de 600 para 500
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  // Mobile: ajustes de altura
  [theme.breakpoints.down('md')]: {
    height: '80vh',
    minHeight: 500,
  },
  [theme.breakpoints.down('sm')]: {
    height: '70vh',
    minHeight: 450,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
    zIndex: 1,
  },
}));

const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>(({ theme, $active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  opacity: $active ? 1 : 0,
  transform: $active ? 'scale(1.05)' : 'scale(1)',
  transition: 'opacity 1s ease-in-out, transform 8s ease-in-out',
  zIndex: $active ? 2 : 1, // Z-index dinâmico baseado no estado ativo
  // Melhorias para imagens de baixa qualidade
  filter: 'blur(0.3px) contrast(1.05) saturate(1.1) brightness(1.1)',
  imageRendering: 'auto',
  // Mobile: ajuste para não cortar a imagem
  [theme.breakpoints.down('md')]: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
    width: '100%',
    filter: 'blur(0.2px) contrast(1.03) saturate(1.05) brightness(1.08)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%)',
    zIndex: 1,
  },
}));

// Componentes styled removidos para limpar linter errors

const SlideIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 40,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 10, // Z-index alto para ficar sempre visível
  [theme.breakpoints.down('md')]: {
    bottom: 20,
  },
}));

const Indicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: $active ? '#fff' : alpha('#fff', 0.3),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: $active ? '#fff' : alpha('#fff', 0.6),
  },
}));

// Componente de Loading Skeleton para o banner
const BannerSkeleton = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%),
    linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)
  `,
  backgroundSize: '200% 100%, 200% 100%',
  animation: 'shimmer 2s infinite ease-in-out',
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '200% 0, 200% 0',
    },
    '100%': {
      backgroundPosition: '-200% 0, -200% 0',
    },
  },
}));

// Tour type para integração com skoobtur (removido para limpar linter)

// Constantes de fallback removidas - não mais necessárias

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [citySlides, setCitySlides] = useState<Array<{ id: string; title: string; imageUrl: string; source: 'city' }>>([]);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});
  const [slidesProcessed, setSlidesProcessed] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  const slidesRef = useRef<Array<{ id: string; title: string; imageUrl: string; source: 'city' }>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  
  // Usar o contexto da cidade
  const { currentCity, isLoading: cityLoading } = useCity();

  // Verificação de tamanho removida - aceitar todas as imagens

  // Função para pré-carregar imagens com otimização
  const preloadImage = async (imageUrl: string, slideId: string): Promise<void> => {
    try {
      setImageLoadingStates(prev => ({ ...prev, [slideId]: 'loading' }));
      
      // Gerar URL otimizada
      const optimizedUrl = generateOptimizedUrl(imageUrl, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp'
      });
      
      await preloadOptimizedImage(optimizedUrl);
      setImageLoadingStates(prev => ({ ...prev, [slideId]: 'loaded' }));
    } catch {
      setImageLoadingStates(prev => ({ ...prev, [slideId]: 'error' }));
      throw new Error(`Falha ao carregar imagem: ${slideId}`);
    }
  };

  console.log('📡 CITY STATE:', { 
    cityLoading, 
    hasCity: !!currentCity,
    hasGallery: !!currentCity?.gallery,
    galleryLength: currentCity?.gallery?.length || 0
  });

  // Reset slidesProcessed quando cidade começar a carregar
  useEffect(() => {
    if (cityLoading && slidesProcessed) {
      console.log('🔄 RESETTING SLIDES PROCESSED - City is loading');
      setSlidesProcessed(false);
    }
  }, [cityLoading, slidesProcessed]);

  // Processar gallery da cidade para criar slides - APENAS quando cidade finalizar
  useEffect(() => {
    // CRÍTICO: Não processar se ainda está carregando
    // Isso garante que só criamos slides quando temos dados reais da cidade
    if (cityLoading) {
      console.log('⏳ WAITING FOR CITY TO LOAD...');
      return;
    }
    
    console.log('🔄 PROCESSING SLIDES - City:', currentCity?.name, 'Gallery:', currentCity?.gallery?.length || 0, 'Processed:', slidesProcessed, 'Loading:', cityLoading);
    
    const processSlides = async () => {
      const slides: Array<{ id: string; title: string; imageUrl: string; source: 'city' }> = [];
      
      if (currentCity?.gallery && Array.isArray(currentCity.gallery) && currentCity.gallery.length > 0) {
        // Usar gallery da cidade na ordem original
        const galleryToProcess = [...currentCity.gallery];
        
        for (let i = 0; i < galleryToProcess.length; i++) {
          const galleryItem = galleryToProcess[i];
          
          console.log(`🏙️ PROCESSING CITY GALLERY ${i}:`, {
            large: galleryItem.large,
            thumb: galleryItem.thumb
          });
          
          // Usar gallery[i].large da cidade
          if (galleryItem && galleryItem.large) {
            const imageUrl = galleryItem.large;
            console.log(`📸 Using GALLERY[${i}].LARGE for city:`, imageUrl);
            
            const slideId = `city-gallery-${i}`;
            
            // Pré-carregar imagem principal com otimização
            preloadImage(imageUrl, slideId).catch(() => {
              // Se falhar ao carregar, ainda adiciona o slide mas marca como erro
            });
            
            const slideData = {
              id: slideId,
              title: `${currentCity.name} - Imagem ${i + 1}`,
              imageUrl,
              source: 'city' as const
            };
            
            console.log(`📋 CREATING SLIDE ${slides.length + 1}:`, {
              id: slideData.id,
              title: slideData.title,
              imageUrl: slideData.imageUrl
            });
            
            slides.push(slideData);
          } else {
            console.log(`🚫 SKIPPING CITY GALLERY ${i} - No large image available`);
          }
        }
      }
      
      // Se não houver gallery da cidade, o banner ficará vazio
      
      // Atualizar tanto o estado quanto a ref
      console.log('Processing completed. Total slides created:', slides.length);
      setCitySlides(slides);
      slidesRef.current = slides;
      setSlidesProcessed(true);
    };

    if (!slidesProcessed) {
      processSlides();
    }
  }, [currentCity, cityLoading, slidesProcessed]);

  // Reset currentSlide quando slides mudarem (apenas se necessário)
  useEffect(() => {
    if (citySlides.length > 0) {
      // Só resetar se o índice atual for inválido
      if (currentSlide >= citySlides.length) {
        console.log('Resetting currentSlide from', currentSlide, 'to 0 because citySlides.length is', citySlides.length);
        setCurrentSlide(0);
      }
      // Se não há slides ainda, começar do 0
      else if (currentSlide < 0) {
        console.log('Setting initial currentSlide to 0');
        setCurrentSlide(0);
      }
    }
  }, [citySlides.length, currentSlide]);

  // Função startSlideshow removida - usando apenas a do useEffect

  // Parar slideshow
  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Iniciar slideshow quando slides estiverem prontos
  useEffect(() => {
    const initSlideshow = () => {
      // Não iniciar se usuário está interagindo
      if (userInteracting) return;
      
      // Limpar intervalo anterior se existir
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Só iniciar se houver slides
      if (slidesRef.current.length > 1) {
        intervalRef.current = setInterval(() => {
          // Verificar novamente se usuário não está interagindo
          if (!userInteracting) {
            setCurrentSlide((prev) => {
              const slidesCount = slidesRef.current.length;
              const nextSlide = slidesCount > 0 ? (prev + 1) % slidesCount : 0;
              console.log('Auto advancing from slide', prev, 'to slide', nextSlide, 'Total slides:', slidesCount);
              return nextSlide;
            });
          }
        }, 5000);
      }
    };

    if (citySlides.length > 1 && !userInteracting) {
      initSlideshow();
    } else {
      stopSlideshow();
    }
    
    return () => stopSlideshow();
  }, [citySlides.length, userInteracting]);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      stopSlideshow();
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  const handleIndicatorClick = (index: number) => {
    console.log('🔴 CLICK - Index:', index, 'Current:', currentSlide, 'Total:', citySlides.length);
    
    // Validar índice antes de definir
    if (index >= 0 && index < citySlides.length) {
      // Marcar que usuário está interagindo
      setUserInteracting(true);
      
      // Parar slideshow
      stopSlideshow();
      
      // Limpar timeout anterior se existir
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
      
      // Definir novo slide
      setCurrentSlide(index);
      console.log('🟢 SET SLIDE TO:', index);
      
      // Aguardar 3 segundos após interação do usuário para retomar slideshow
      userInteractionTimeoutRef.current = setTimeout(() => {
        console.log('🔄 RESUMING SLIDESHOW');
        setUserInteracting(false);
      }, 3000);
    } else {
      console.error('❌ INVALID INDEX:', index, 'Valid range: 0 to', citySlides.length - 1);
    }
  };

  // Só renderizar o banner quando a cidade estiver carregada
  if (cityLoading) {
    return (
      <Box sx={{ 
        height: '100vh', 
        minHeight: 600,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Typography 
          variant="h4" 
          color="#fff" 
          sx={{ 
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: 2
          }}
        >
          Carregando cidade...
        </Typography>
      </Box>
    );
  }
  
  if (!currentCity) {
    return (
      <Box sx={{ 
        height: '100vh', 
        minHeight: 600,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
      }}>
        <Typography 
          variant="h4" 
          color="#fff"
          sx={{ 
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: 2
          }}
        >
          Cidade não encontrada
        </Typography>
      </Box>
    );
  }

  // Se chegou aqui, a cidade foi carregada (com ou sem gallery)
  if (citySlides.length === 0) {
    return (
      <Box sx={{ 
        height: '100vh', 
        minHeight: 600,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
      }}>
        <Typography 
          variant="h4" 
          color="#fff"
          sx={{ 
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: 2
          }}
        >
          Nenhuma imagem disponível para {currentCity.name}
        </Typography>
      </Box>
    );
  }

  console.log('🎬 RENDER - Current:', currentSlide, 'Total:', citySlides.length);

  return (
    <HeroSection>
      {citySlides.map((slide, index) => {
        const loadingState = imageLoadingStates[slide.id];
        const isActive = index === currentSlide;
        
        if (isActive) {
          console.log('✅ ACTIVE SLIDE:', index, 'ID:', slide.id);
          console.log('🖼️ IMAGE URL:', slide.imageUrl);
        }
        
        // Simplificar: mostrar imagem se estiver ativa, independente do loading
        const shouldShowImage = isActive;
        console.log(`📷 SLIDE ${index}: isActive=${isActive}, loadingState=${loadingState}, shouldShow=${shouldShowImage}`);
        
        return (
          <React.Fragment key={slide.id}>
            {/* Skeleton loading */}
            {loadingState === 'loading' && isActive && <BannerSkeleton />}
            
            {/* Não precisa mais de imagem de fallback - só imagens de alta qualidade */}
            
            {/* Imagem principal */}
            <BackgroundImage
              $active={shouldShowImage}
              sx={{
                backgroundImage: (() => {
                  const optimizedUrl = generateOptimizedUrl(slide.imageUrl, {
                    maxWidth: 1920,
                    maxHeight: 1080,
                    quality: 0.8,
                    format: 'webp'
                  });
                  if (isActive) {
                    console.log(`🔗 OPTIMIZED URL for slide ${index}:`, optimizedUrl);
                  }
                  return `url(${optimizedUrl})`;
                })(),
                backgroundColor: '#3a3a3a', // Fallback color
                // Filtros otimizados para todas as imagens
                filter: 'blur(0.2px) contrast(1.08) saturate(1.1) brightness(1.15)',
                // Usar cover para preencher toda a tela
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                // Mobile: ajustes específicos
                [theme.breakpoints.down('md')]: {
                  filter: 'blur(0.1px) contrast(1.05) saturate(1.08) brightness(1.12)',
                },
                zIndex: shouldShowImage ? 2 : 1, // Z-index dinâmico
              }}
            />
            
            {/* Overlay sutil apenas para melhorar legibilidade do texto */}
            {isActive && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)',
                  zIndex: 3, // Acima das imagens
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
{/* 
      <ContentWrapper maxWidth="xl">
        <Box sx={{ maxWidth: isMobile ? '100%' : '60%' }}>
      

          <Button
            variant="contained"
            size="large"
            className="animate-fadeInUp glow-enable"
            style={{ animationDelay: '0.4s' }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: 50,
              padding: theme.spacing(1.5, 4),
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              zIndex: 2,
              position: 'relative',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
              },
            }}
          >
            Discover More
          </Button>
        </Box>
      </ContentWrapper> */}
{/* 
      <SocialSection>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Follow us on our social media:
        </Typography>
        <Box>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <LinkedIn />
          </SocialIcon>
        </Box>
      </SocialSection> */}

      <SlideIndicator>
        {citySlides.map((_, index) => (
          <Indicator
            key={index}
            $active={index === currentSlide}
            onClick={() => {
              console.log('DIRECT CLICK ON INDICATOR:', index);
              handleIndicatorClick(index);
            }}
          />
        ))}
      </SlideIndicator>
    </HeroSection>
  );
};

export default HeroBanner; 