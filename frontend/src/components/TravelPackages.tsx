import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Star as StarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAutoSlide } from '../hooks/useAutoSlide';
import { decodeHtmlEntities } from '../utils/decodeHtml';
import { env } from '../env';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f5f5f5',
  // Mobile: ajustes de padding
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2rem', // menor
  fontWeight: 600, // menos negrito
  textAlign: 'center',
  marginBottom: theme.spacing(4), // menos espaço
  color: '#232323',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

const PackagesGrid = styled(Box)<{ cardsPerView: number; showArrows?: boolean }>(({ theme, cardsPerView, showArrows }) => ({
  display: 'grid',
  gridTemplateColumns: showArrows
    ? `repeat(${cardsPerView}, 350px)`
    : 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  justifyContent: 'center',
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: showArrows
      ? `repeat(${cardsPerView}, minmax(280px, 1fr))`
      : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 1),
  },
}));

const CarouselTrack = styled(Box)<{ translateX: number }>(({ theme, translateX }) => ({
  display: 'flex',
  transition: 'transform 0.6s ease-in-out',
  transform: `translateX(${translateX}px)`,
  gap: theme.spacing(4),
  willChange: 'transform',
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
  },
}));

const CarouselCard = styled(Box)(({ theme }) => ({
  minWidth: 350,
  maxWidth: 350,
  flexShrink: 0,
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    minWidth: 280,
    maxWidth: 280,
  },
}));

const PackageCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: '#fff',
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0,0,0,0.06)',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: 16,
  },
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
    borderColor: 'rgba(0,0,0,0.08)',
    '& .package-image': {
      transform: 'scale(1.08)',
    },
    '& .image-overlay': {
      opacity: 0.4,
    },
    '& .badge': {
      transform: 'scale(1.05)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  [theme.breakpoints.down('md')]: {
    height: 180,
  },
}));

const PackageImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
});

const ImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
  opacity: 0.2,
  transition: 'opacity 0.4s ease',
  zIndex: 1,
  pointerEvents: 'none',
});

const BadgeBase = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  borderRadius: 12,
  padding: theme.spacing(0.75, 1.5),
  fontWeight: 700,
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  border: '1px solid rgba(255,255,255,0.3)',
  transition: 'transform 0.3s ease',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.6, 1.2),
    fontSize: 12,
    borderRadius: 10,
  },
}));

const RatingBadge = styled(BadgeBase)<{ hasFeatured?: boolean }>(({ theme, hasFeatured }) => ({
  position: 'absolute',
  top: 16,
  left: hasFeatured ? 'auto' : 16,
  right: hasFeatured ? 16 : 'auto',
  color: '#1a1a1a',
  background: 'rgba(255, 255, 255, 0.98)',
  zIndex: 3,
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    top: 12,
    left: hasFeatured ? 'auto' : 12,
    right: hasFeatured ? 12 : 'auto',
  },
}));

const DurationBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  color: '#fff',
  background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 16px rgba(33, 150, 243, 0.4)',
  border: 'none',
  zIndex: 3,
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    top: 12,
    right: 12,
  },
}));

const PeopleBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  left: 16,
  color: '#1a1a1a',
  background: 'rgba(255, 255, 255, 0.98)',
  zIndex: 3,
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    bottom: 12,
    left: 12,
  },
}));

const FeaturedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A52 100%)',
  color: '#fff',
  borderRadius: 12,
  padding: theme.spacing(0.75, 1.75),
  fontWeight: 800,
  fontSize: 13,
  zIndex: 4,
  boxShadow: '0 4px 16px rgba(255, 107, 107, 0.4)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('md')]: {
    top: 12,
    left: 12,
    padding: theme.spacing(0.6, 1.4),
    fontSize: 11,
    borderRadius: 10,
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2.5, 2.5, 2.5, 2.5),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  '&:last-child': {
    paddingBottom: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const PackageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: theme.spacing(0.5),
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  letterSpacing: '-0.02em',
  lineHeight: 1.25,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.05rem',
    lineHeight: 1.3,
  },
}));

const PackageLocation = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: '#666',
  marginBottom: theme.spacing(0.75),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.4),
  fontWeight: 500,
}));

const PackageDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  marginBottom: theme.spacing(1.5),
  display: '-webkit-box',
  WebkitLineClamp: 6,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
}));

const PackagePrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  fontWeight: 800,
  color: '#FF5722',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  marginTop: 'auto',
  marginBottom: theme.spacing(1.25),
  letterSpacing: '-0.02em',
  lineHeight: 1,
}));

const CardActionsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingTop: 0,
}));

const ActionButton = styled('button')<{
  variant?: 'contained' | 'outlined';
}>(({ variant }) => ({
  padding: '9px 18px',
  borderRadius: 10,
  border: variant === 'outlined' ? '2px solid #e0e0e0' : 'none',
  background: variant === 'outlined' ? 'transparent' : 'linear-gradient(135deg, #FF5722 0%, #F4511E 100%)',
  color: variant === 'outlined' ? '#666' : '#fff',
  fontWeight: 700,
  fontSize: '0.8rem',
  cursor: 'pointer',
  boxShadow: variant === 'outlined' ? 'none' : '0 4px 12px rgba(255,87,34,0.25)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  letterSpacing: '0.02em',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  textTransform: 'none',
  fontFamily: '"Inter", -apple-system, sans-serif',
  whiteSpace: 'nowrap',
  '&:hover': {
    background: variant === 'outlined' ? '#f5f5f5' : 'linear-gradient(135deg, #F4511E 0%, #E64A19 100%)',
    borderColor: variant === 'outlined' ? '#d0d0d0' : undefined,
    boxShadow: variant === 'outlined' ? '0 2px 8px rgba(0,0,0,0.08)' : '0 6px 20px rgba(255,87,34,0.35)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const StarIconStyled = styled(StarIcon)(() => ({
  color: '#FFD700',
  fontSize: 16,
}));

const LocationIconStyled = styled(LocationIcon)(() => ({
  color: '#FF5722',
  fontSize: 18,
}));

// Função para formatar localização sem duplicações
const formatLocation = (location: string): string => {
const cityName = env.VITE_BUSINESS_NAME;
  if (!location) return env.VITE_BUSINESS_NAME || cityName;
  
  // Remove vírgulas extras e espaços
  const cleanLocation = location.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim();
  
  // Se contém a cidade do env.ts e "Mato Grosso", formata especificamente
  if (cleanLocation.includes(cityName) && cleanLocation.includes('Mato Grosso')) {
    return `${cityName} - ${env.VITE_STATE}`;
  }
  
  // Para outros casos, remove duplicações comuns
  const parts = cleanLocation.split(',').map(part => part.trim()).filter(Boolean);
  const uniqueParts = [...new Set(parts)];
  
  return uniqueParts.join(' - ');
};

// Função para calcular desconto e formatar preços
const calculateDiscount = (price: string, salePrice: string): { discount: number; displayPrice: string; originalPrice: string } => {
  // Extrair números dos preços (remover R$, espaços, etc.)
  const priceNum = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
  const salePriceNum = parseFloat(salePrice.replace(/[^\d,]/g, '').replace(',', '.'));
  
  // Só exibe desconto se sale_price for maior que zero e menor que price
  if (isNaN(priceNum) || isNaN(salePriceNum) || salePriceNum <= 0 || priceNum <= salePriceNum) {
    return { discount: 0, displayPrice: price, originalPrice: '' };
  }
  
  const discount = Math.round(((priceNum - salePriceNum) / priceNum) * 100);
  
  return {
    discount,
    displayPrice: salePrice,
    originalPrice: price
  };
};



// Adicionar tipos para as props
interface TravelPackage {
  id: number;
  title: string;
  location: string;
  rating: number;
  duration: string;
  price: string;
  sale_price?: string; // Preço de promoção
  image: string;
  people: number;
  description: string;
  tags?: string[]; // Adicionar tags
  is_featured?: boolean; // Indica se o pacote é destaque
}

interface TravelPackagesProps {
  customPackages?: TravelPackage[];
  totalItems?: number; // novo: total de itens da API (para calcular páginas corretamente)
  hideTitle?: boolean;
  detailRoute?: string; // new prop
  showArrows?: boolean; // novo: controla exibição das setas
  hidePeopleAndPrice?: boolean; // novo: esconde pessoas e preço
  onCardClick?: (pkg: TravelPackage) => void; // novo: callback de clique
  showReserveButton?: boolean; // novo: controla exibição do botão "Reserve Agora"
  enableAutoSlide?: boolean; // novo: habilita slide automático
  autoSlideInterval?: number; // novo: intervalo do slide automático em ms
  onNeedMoreData?: () => void; // novo: callback quando precisar de mais dados
}

const defaultPackages = [
  {
    id: 1,
    title: 'Observação de Aves',
    location: 'Amazônia',
    rating: 5,
    duration: '3 dias',
    price: 'R$549,00',
    image: '',
    people: 2,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat',
    tags: ['Aves', 'Natureza', 'Fotografia'],
    is_featured: true, // Exemplo de pacote em destaque
  },
  {
    id: 2,
    title: 'Experiência com comunidade indígena',
    location: 'Haliti-Paresí',
    rating: 5,
    duration: '3 dias',
    price: 'R$649,00',
    image: '/images/browse-2.jpg',
    people: 2,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat',
    tags: ['Cultura', 'Comunidade', 'História'],
    is_featured: false,
  },
  {
    id: 3,
    title: 'Passeio de barco - rio Paraguai',
    location: 'Pantanal',
    rating: 5,
    duration: '3 dias',
    price: 'R$349,00',
    image: '/images/browse-3.jpg',
    people: 2,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat',
    tags: ['Passeio', 'Rio', 'Natureza'],
    is_featured: false,
  },
];

const TravelPackages: React.FC<TravelPackagesProps> = ({ 
  customPackages, 
  totalItems,
  hideTitle, 
  detailRoute = 'restaurant', 
  showArrows = true, 
  hidePeopleAndPrice = false, 
  onCardClick, 
  showReserveButton = true,
  enableAutoSlide = false,
  autoSlideInterval = 4000,
  onNeedMoreData
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const packages = customPackages || defaultPackages;
  const navigate = useNavigate();
  const cardsPerView = isMobile ? 1 : 3;
  
  // Usa o total da API se disponível, senão usa o tamanho do array
  const totalItemsCount = totalItems || packages.length;

  // Hook para slide automático (apenas quando showArrows é true)
  const {
    currentIndex: startIndex,
    goToNext: handleNext,
    goToPrevious: handlePrev,
    canGoNext: canGoForward,
    canGoPrevious: canGoBack
  } = useAutoSlide({
    totalItems: packages.length,
    itemsPerView: cardsPerView,
    autoSlideInterval,
    enabled: enableAutoSlide && showArrows && packages.length > cardsPerView
  });

  // Detectar quando está chegando perto do fim dos dados e solicitar mais
  React.useEffect(() => {
    if (onNeedMoreData) {
      const totalCards = packages.length;
      const currentViewPage = Math.floor(startIndex / cardsPerView);
      const cardsNeeded = (currentViewPage + 2) * cardsPerView;
      
      // Se precisa de mais cards do que tem disponível, solicita mais dados
      if (cardsNeeded > totalCards) {
        onNeedMoreData();
      }
    }
  }, [startIndex, packages.length, cardsPerView, onNeedMoreData]);


  // Calcular o translateX para o efeito de scroll suave
  const cardWidth = isMobile ? 280 : 350;
  const gap = isMobile ? 16 : 32; // theme.spacing(2) = 16px, theme.spacing(4) = 32px
  const translateX = showArrows ? -(startIndex * (cardWidth + gap)) : 0;



  const handleCardClick = (pkg: TravelPackage) => {
    if (typeof onCardClick === 'function') {
      onCardClick(pkg);
    } else {
      if (!showArrows) {
        navigate(`/tour/${pkg.id}`);
      } else {
        navigate(`/${detailRoute}/${pkg.id}`);
      }
    }
  };


  return (
    <SectionWrapper style={{ position: 'relative' }}>
      <Container maxWidth="xl" style={{ position: 'relative' }}>
        {!hideTitle && (
          <>
            <SectionTitle>
              Browse By Category
            </SectionTitle>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.5rem',
                fontWeight: 500,
                textAlign: 'center',
                marginBottom: theme.spacing(3),
                color: '#333',
                [theme.breakpoints.down('md')]: {
                  fontSize: '1.2rem',
                },
              }}
            >
              Find Out The Best Travel Choice
            </Typography>
          </>
        )}

        {/* Setas de navegação - acima dos cards */}
        {showArrows && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 2, 
            marginBottom: 3 
          }}>
            <button
              aria-label="Voltar"
              style={{
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canGoBack ? 'pointer' : 'not-allowed',
                fontSize: 18,
                color: canGoBack ? theme.palette.primary.main : '#ccc',
                opacity: canGoBack ? 0.95 : 0.5,
                transition: 'all 0.2s ease',
              }}
              onClick={handlePrev}
              disabled={!canGoBack}
              onMouseEnter={(e) => {
                if (canGoBack) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)';
                }
              }}
              onMouseLeave={(e) => {
                if (canGoBack) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                }
              }}
            >
              &#8592;
            </button>
            
            <Box sx={{ 
              fontSize: 14, 
              color: '#666', 
              fontWeight: 500,
              minWidth: 80,
              textAlign: 'center'
            }}>
              {Math.min(Math.floor(startIndex / cardsPerView) + 1, Math.ceil(totalItemsCount / cardsPerView))} de {Math.ceil(totalItemsCount / cardsPerView)}
            </Box>
            
            <button
              aria-label="Avançar"
              style={{
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canGoForward ? 'pointer' : 'not-allowed',
                fontSize: 18,
                color: canGoForward ? theme.palette.primary.main : '#ccc',
                opacity: canGoForward ? 0.95 : 0.5,
                transition: 'all 0.2s ease',
              }}
              onClick={handleNext}
              disabled={!canGoForward}
              onMouseEnter={(e) => {
                if (canGoForward) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)';
                }
              }}
              onMouseLeave={(e) => {
                if (canGoForward) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                }
              }}
            >
              &#8594;
            </button>
          </Box>
        )}


        {showArrows ? (
          <CarouselContainer>
            <CarouselTrack translateX={translateX}>
              {packages.map((pkg: TravelPackage, index: number) => (
                <CarouselCard key={pkg.id}>
                  <PackageCard
                    className="animate-zoomIn hover-from-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleCardClick(pkg)}
                  >
                    <ImageContainer>
                      {pkg.image && (
                        <PackageImage
                          src={pkg.image}
                          alt={pkg.title}
                          className="package-image"
                        />
                      )}
                      <ImageOverlay className="image-overlay" />
                      {pkg.is_featured && (
                        <FeaturedBadge className="badge">
                          Destaque
                        </FeaturedBadge>
                      )}
                      <RatingBadge className="badge" hasFeatured={pkg.is_featured}>
                        <StarIconStyled style={{ color: '#FFD700', fontSize: 16 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
                          {pkg.rating}
                        </Typography>
                      </RatingBadge>
                      <DurationBadge className="badge">
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
                          {pkg.duration}
                        </Typography>
                      </DurationBadge>
                      {!hidePeopleAndPrice && (
                        <PeopleBadge className="badge">
                          <span role="img" aria-label="pessoas">👥</span> {pkg.people} Pessoas
                        </PeopleBadge>
                      )}
                    </ImageContainer>
                    <CardContentStyled>
                      <PackageTitle>
                        {decodeHtmlEntities(pkg.title)}
                      </PackageTitle>
                      <PackageLocation>
                        <LocationIconStyled />
                        <Typography variant="body2">
                          {decodeHtmlEntities(formatLocation(pkg.location))}
                        </Typography>
                      </PackageLocation>
                      {/* Tags como chips/badges */}
                      {pkg.tags && Array.isArray(pkg.tags) && pkg.tags.length > 0 && (
                        <Box sx={{ 
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5, 
                          mb: 1 
                        }}>
                          {pkg.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <Box key={idx} sx={{
                              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                              color: '#555',
                              borderRadius: 6,
                              px: 1.25,
                              py: 0.35,
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              border: '1px solid rgba(0,0,0,0.08)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #e8e8e8 0%, #ddd 100%)',
                                transform: 'translateY(-1px)',
                              }
                            }}>{decodeHtmlEntities(tag)}</Box>
                          ))}
                        </Box>
                      )}
                      <PackageDescription>
                        {decodeHtmlEntities(pkg.description)}
                      </PackageDescription>
                      
                      {!hidePeopleAndPrice && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', marginBottom: 1.5 }}>
                          {pkg.sale_price && calculateDiscount(pkg.price, pkg.sale_price).discount > 0 ? (
                            <>
                              <PackagePrice sx={{ color: theme.palette.primary.main, marginBottom: 0 }}>
                                {pkg.sale_price}
                              </PackagePrice>
                              <Box sx={{ 
                                background: '#ff4444', 
                                color: '#fff', 
                                padding: '2px 6px', 
                                borderRadius: 1, 
                                fontSize: 11, 
                                fontWeight: 600 
                              }}>
                                -{calculateDiscount(pkg.price, pkg.sale_price).discount}%
                              </Box>
                              <Typography variant="body2" sx={{ 
                                textDecoration: 'line-through', 
                                color: '#999', 
                                fontSize: 12 
                              }}>
                                {pkg.price}
                              </Typography>
                            </>
                          ) : (
                            <PackagePrice sx={{ marginBottom: 0 }}>
                              {pkg.price}
                            </PackagePrice>
                          )}
                        </Box>
                      )}
                      
                      <CardActionsStyled>
                        <ActionButton
                          variant="outlined"
                          onClick={e => { e.stopPropagation(); handleCardClick(pkg); }}
                        >Leia Mais</ActionButton>
                        {showReserveButton && (
                          <ActionButton variant="contained">Reserve Agora</ActionButton>
                        )}
                      </CardActionsStyled>
                    </CardContentStyled>
                  </PackageCard>
                </CarouselCard>
              ))}
            </CarouselTrack>
          </CarouselContainer>
        ) : (
        <PackagesGrid 
          cardsPerView={cardsPerView} 
          showArrows={showArrows}
          style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            minHeight: isMobile ? 420 : 350 
          }}
        >
            {packages.map((pkg: TravelPackage, index: number) => (
            <PackageCard
              key={pkg.id}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(pkg)}
            >
              <ImageContainer>
                {pkg.image && (
                  <PackageImage
                    src={pkg.image}
                    alt={pkg.title}
                    className="package-image"
                  />
                )}
                <ImageOverlay className="image-overlay" />
                {pkg.is_featured && (
                  <FeaturedBadge className="badge">
                    Destaque
                  </FeaturedBadge>
                )}
                <RatingBadge className="badge" hasFeatured={pkg.is_featured}>
                  <StarIconStyled style={{ color: '#FFD700', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
                    {pkg.rating}
                  </Typography>
                </RatingBadge>
                <DurationBadge className="badge">
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
                    {pkg.duration}
                  </Typography>
                </DurationBadge>
                {!hidePeopleAndPrice && (
                  <PeopleBadge className="badge">
                    <span role="img" aria-label="pessoas">👥</span> {pkg.people} Pessoas
                  </PeopleBadge>
                )}
              </ImageContainer>
              <CardContentStyled>
                <PackageTitle>
                  {decodeHtmlEntities(pkg.title)}
                </PackageTitle>
                <PackageLocation>
                  <LocationIconStyled />
                  <Typography variant="body2">
                      {decodeHtmlEntities(formatLocation(pkg.location))}
                  </Typography>
                </PackageLocation>
                {/* Tags como chips/badges */}
                {pkg.tags && Array.isArray(pkg.tags) && pkg.tags.length > 0 && (
                  <Box sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5, 
                    mb: 1 
                  }}>
                    {pkg.tags.slice(0, 3).map((tag: string, idx: number) => (
                      <Box key={idx} sx={{
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                        color: '#555',
                        borderRadius: 6,
                        px: 1.25,
                        py: 0.35,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #e8e8e8 0%, #ddd 100%)',
                          transform: 'translateY(-1px)',
                        }
                      }}>{decodeHtmlEntities(tag)}</Box>
                    ))}
                  </Box>
                )}
                <PackageDescription>
                  {decodeHtmlEntities(pkg.description)}
                </PackageDescription>
                
                {!hidePeopleAndPrice && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', marginBottom: 1.5 }}>
                    {pkg.sale_price && calculateDiscount(pkg.price, pkg.sale_price).discount > 0 ? (
                      <>
                        <PackagePrice sx={{ color: theme.palette.primary.main, marginBottom: 0 }}>
                          {pkg.sale_price}
                        </PackagePrice>
                        <Box sx={{ 
                          background: '#ff4444', 
                          color: '#fff', 
                          padding: '2px 6px', 
                          borderRadius: 1, 
                          fontSize: 11, 
                          fontWeight: 600 
                        }}>
                          -{calculateDiscount(pkg.price, pkg.sale_price).discount}%
                        </Box>
                        <Typography variant="body2" sx={{ 
                          textDecoration: 'line-through', 
                          color: '#999', 
                          fontSize: 12 
                        }}>
                          {pkg.price}
                        </Typography>
                      </>
                    ) : (
                      <PackagePrice sx={{ marginBottom: 0 }}>
                        {pkg.price}
                      </PackagePrice>
                    )}
                  </Box>
                )}
                
                <CardActionsStyled>
                  <ActionButton
                    variant="outlined"
                    onClick={e => { e.stopPropagation(); handleCardClick(pkg); }}
                  >Leia Mais</ActionButton>
                  {showReserveButton && (
                    <ActionButton variant="contained">Reserve Agora</ActionButton>
                  )}
                </CardActionsStyled>
              </CardContentStyled>
            </PackageCard>
          ))}
        </PackagesGrid>
        )}
      </Container>
    </SectionWrapper>
  );
};

export default TravelPackages; 