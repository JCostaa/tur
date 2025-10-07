import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Star as StarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAutoSlide } from '../hooks/useAutoSlide';

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
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%', // garantir altura igual
  display: 'flex',
  flexDirection: 'column',
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    '& .package-image': {
      transform: 'scale(1.1)',
    },
    '& .package-overlay': {
      opacity: 1,
    },
    '& .rating-badge': {
      transform: 'scale(1.1)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 220,
  overflow: 'hidden',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  // Mobile: altura ajustada
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
}));

const PackageImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

const ImageGradient = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '40%',
  background: 'linear-gradient(0deg, rgba(20,20,40,0.65) 0%, rgba(0,0,0,0.0) 100%)',
  zIndex: 2,
});

const BadgeBase = styled(Box)(({ theme }) => ({
  background: alpha('#fff', 0.92),
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 600,
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  // Mobile: badges menores
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.4, 1.2),
    fontSize: 12,
    borderRadius: 16,
  },
}));

const RatingBadge = styled(BadgeBase)<{ hasFeatured?: boolean }>(({ theme, hasFeatured }) => ({
  position: 'absolute',
  top: 18,
  left: hasFeatured ? 'auto' : 18,
  right: hasFeatured ? 18 : 'auto',
  color: '#222',
  background: alpha('#fff', 0.98),
  zIndex: 3,
  // Mobile: posicionamento ajustado
  [theme.breakpoints.down('md')]: {
    top: 12,
    left: hasFeatured ? 'auto' : 12,
    right: hasFeatured ? 12 : 'auto',
  },
}));

const DurationBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  right: 18,
  color: '#fff',
  background: 'rgba(33, 150, 243, 0.85)', // azul translúcido
  zIndex: 3,
  // Mobile: posicionamento ajustado
  [theme.breakpoints.down('md')]: {
    top: 12,
    right: 12,
  },
}));

const PeopleBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  bottom: 18,
  left: 18,
  color: '#222',
  background: alpha('#fff', 0.92),
  zIndex: 3,
  // Mobile: posicionamento ajustado
  [theme.breakpoints.down('md')]: {
    bottom: 12,
    left: 12,
  },
}));

const FeaturedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  left: 18,
  background: '#d9534f', // Cor vermelha/terracota como na imagem
  color: '#fff',
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontWeight: 600,
  fontSize: 14,
  zIndex: 4,
  boxShadow: '0 2px 8px rgba(217,83,79,0.3)',
  // Mobile: ajustes específicos
  [theme.breakpoints.down('md')]: {
    top: 12,
    left: 12,
    padding: theme.spacing(0.4, 1.2),
    fontSize: 12,
    borderRadius: 16,
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2, 3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // garantir que ocupe toda a altura
  justifyContent: 'space-between', // empurra preço/botões para baixo
  // Mobile: padding reduzido
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5, 2.5, 2, 2.5),
  },
  '&:last-child': {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(2.5),
    },
  },
}));

const PackageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem', // menor
  fontWeight: 600,
  color: '#232323',
  marginBottom: theme.spacing(0.5),
  fontFamily: '"Playfair Display", serif',
  letterSpacing: 0.1,
  // Mobile: tipografia ajustada
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
    lineHeight: 1.3,
  },
}));

const PackageLocation = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#888',
  marginBottom: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const PackageDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: 13,
  marginBottom: theme.spacing(0.5),
}));

const PackagePrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem', // menor
  fontWeight: 700,
  color: '#FF5722',
  fontFamily: '"Playfair Display", serif',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  letterSpacing: 0.2,
}));

const CardActionsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  gap: theme.spacing(1.5),
}));

const ActionButton = styled('button')<{
  variant?: 'contained' | 'outlined';
}>(({ variant }) => ({
  padding: '7px 18px',
  borderRadius: 18,
  border: variant === 'outlined' ? '1.5px solid #FF5722' : 'none',
  background: variant === 'outlined' ? 'transparent' : '#FF5722',
  color: variant === 'outlined' ? '#FF5722' : '#fff',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  boxShadow: variant === 'outlined' ? 'none' : '0 1px 4px rgba(255,87,34,0.08)',
  transition: 'all 0.18s',
  letterSpacing: 0.2,
  minWidth: 0,
  minHeight: 0,
  '&:hover': {
    background: variant === 'outlined' ? 'rgba(255,87,34,0.08)' : '#e64a19',
    color: '#FF5722',
    borderColor: '#e64a19',
    boxShadow: variant === 'outlined' ? '0 1px 6px rgba(255,87,34,0.10)' : '0 4px 12px rgba(255,87,34,0.15)',
    transform: 'translateY(-1px) scale(1.03)',
  },
}));

const StarIconStyled = styled(StarIcon)(() => ({
  color: '#FFD700',
  fontSize: 16,
}));

const LocationIconStyled = styled(LocationIcon)(() => ({
  color: '#666',
  fontSize: 16,
}));

// Função para formatar localização sem duplicações
const formatLocation = (location: string): string => {
  if (!location) return 'Local não informado';
  
  // Remove vírgulas extras e espaços
  const cleanLocation = location.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim();
  
  // Se contém "Barra do Bugres" e "Mato Grosso", formata especificamente
  if (cleanLocation.includes('Barra do Bugres') && cleanLocation.includes('Mato Grosso')) {
    return 'Barra do Bugres - Mato Grosso';
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
  hideTitle?: boolean;
  detailRoute?: string; // new prop
  showArrows?: boolean; // novo: controla exibição das setas
  hidePeopleAndPrice?: boolean; // novo: esconde pessoas e preço
  onCardClick?: (pkg: TravelPackage) => void; // novo: callback de clique
  showReserveButton?: boolean; // novo: controla exibição do botão "Reserve Agora"
  enableAutoSlide?: boolean; // novo: habilita slide automático
  autoSlideInterval?: number; // novo: intervalo do slide automático em ms
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
  hideTitle, 
  detailRoute = 'restaurant', 
  showArrows = true, 
  hidePeopleAndPrice = false, 
  onCardClick, 
  showReserveButton = true,
  enableAutoSlide = false,
  autoSlideInterval = 4000
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const packages = customPackages || defaultPackages;
  const navigate = useNavigate();
  const cardsPerView = isMobile ? 1 : 3;

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
              {Math.floor(startIndex / cardsPerView) + 1} de {Math.ceil(packages.length / cardsPerView)}
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
                      <ImageGradient />
                      {pkg.is_featured && (
                        <FeaturedBadge>
                          Destaque
                        </FeaturedBadge>
                      )}
                      <RatingBadge className="rating-badge" hasFeatured={pkg.is_featured}>
                        <StarIconStyled style={{ color: '#FFD700', fontSize: 15, marginRight: 3 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                          {pkg.rating}
                        </Typography>
                      </RatingBadge>
                      <DurationBadge className="package-overlay">
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                          {pkg.duration}
                        </Typography>
                      </DurationBadge>
                      {!hidePeopleAndPrice && (
                        <PeopleBadge>
                          <span role="img" aria-label="pessoas">👥</span> {pkg.people} Pessoas
                        </PeopleBadge>
                      )}
                    </ImageContainer>
                    <CardContentStyled>
                      <PackageTitle>
                        {pkg.title}
                      </PackageTitle>
                      <PackageLocation>
                        <LocationIconStyled />
                        <Typography variant="body2">
                          {formatLocation(pkg.location)}
                        </Typography>
                      </PackageLocation>
                      {/* Tags como chips/badges */}
                      {pkg.tags && Array.isArray(pkg.tags) && pkg.tags.length > 0 && (
                        <Box sx={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1fr 1fr', 
                          gap: 0.5, 
                          mb: 1 
                        }}>
                          {pkg.tags.slice(0, 5).map((tag: string, idx: number) => (
                            <Box key={idx} sx={{
                              background: '#e0e0e0',
                              color: '#333',
                              borderRadius: 12,
                              px: 1.5,
                              py: 0.2,
                              fontSize: 12,
                              fontWeight: 500,
                              display: 'inline-block',
                              textAlign: 'center',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>{tag}</Box>
                          ))}
                        </Box>
                      )}
                      <PackageDescription>
                        {pkg.description}
                      </PackageDescription>
                      {!hidePeopleAndPrice && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          {pkg.sale_price && calculateDiscount(pkg.price, pkg.sale_price).discount > 0 ? (
                            <>
                              <PackagePrice sx={{ color: theme.palette.primary.main }}>
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
                            <PackagePrice>
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
                <ImageGradient />
                {pkg.is_featured && (
                  <FeaturedBadge>
                    Destaque
                  </FeaturedBadge>
                )}
                <RatingBadge className="rating-badge" hasFeatured={pkg.is_featured}>
                  <StarIconStyled style={{ color: '#FFD700', fontSize: 15, marginRight: 3 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                    {pkg.rating}
                  </Typography>
                </RatingBadge>
                <DurationBadge className="package-overlay">
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                    {pkg.duration}
                  </Typography>
                </DurationBadge>
                {!hidePeopleAndPrice && (
                  <PeopleBadge>
                    <span role="img" aria-label="pessoas">👥</span> {pkg.people} Pessoas
                  </PeopleBadge>
                )}
              </ImageContainer>
              <CardContentStyled>
                <PackageTitle>
                  {pkg.title}
                </PackageTitle>
                <PackageLocation>
                  <LocationIconStyled />
                  <Typography variant="body2">
                      {formatLocation(pkg.location)}
                  </Typography>
                </PackageLocation>
                {/* Tags como chips/badges */}
                {pkg.tags && Array.isArray(pkg.tags) && pkg.tags.length > 0 && (
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: 0.5, 
                    mb: 1 
                  }}>
                    {pkg.tags.slice(0, 5).map((tag: string, idx: number) => (
                      <Box key={idx} sx={{
                        background: '#e0e0e0',
                        color: '#333',
                        borderRadius: 12,
                        px: 1.5,
                        py: 0.2,
                        fontSize: 12,
                        fontWeight: 500,
                        display: 'inline-block',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{tag}</Box>
                    ))}
                  </Box>
                )}
                <PackageDescription>
                  {pkg.description}
                </PackageDescription>
                {!hidePeopleAndPrice && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      {pkg.sale_price && calculateDiscount(pkg.price, pkg.sale_price).discount > 0 ? (
                        <>
                          <PackagePrice sx={{ color: theme.palette.primary.main }}>
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
                  <PackagePrice>
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