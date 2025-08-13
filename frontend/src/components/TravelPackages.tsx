import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Star as StarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

const RatingBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  left: 18,
  color: '#222',
  background: alpha('#fff', 0.98),
  zIndex: 3,
  // Mobile: posicionamento ajustado
  [theme.breakpoints.down('md')]: {
    top: 12,
    left: 12,
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
}>(({ theme, variant }) => ({
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

const StarIconStyled = styled(StarIcon)(({ theme }) => ({
  color: '#FFD700',
  fontSize: 16,
}));

const LocationIconStyled = styled(LocationIcon)(({ theme }) => ({
  color: '#666',
  fontSize: 16,
}));

// Container para setinhas mobile - acima dos cards
const MobileArrowsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none', // Esconde no desktop
  },
}));

const ArrowCounter = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#666',
  fontWeight: 500,
}));

// Adicionar tipos para as props
interface TravelPackage {
  id: number;
  title: string;
  location: string;
  rating: number;
  duration: string;
  price: string;
  image: string;
  people: number;
  description: string;
  tags?: string[]; // Adicionar tags
}

interface TravelPackagesProps {
  customPackages?: TravelPackage[];
  hideTitle?: boolean;
  detailRoute?: string; // new prop
  showArrows?: boolean; // novo: controla exibição das setas
  hidePeopleAndPrice?: boolean; // novo: esconde pessoas e preço
  onCardClick?: (pkg: TravelPackage) => void; // novo: callback de clique
  showReserveButton?: boolean; // novo: controla exibição do botão "Reserve Agora"
}

const defaultPackages = [
  {
    id: 1,
    title: 'Observação de Aves',
    location: 'Amazônia',
    rating: 5,
    duration: '3 dias',
    price: 'R$549,00',
    image: '/images/browse-1.jpg',
    people: 2,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat',
    tags: ['Aves', 'Natureza', 'Fotografia'],
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
  },
];

const TravelPackages: React.FC<TravelPackagesProps> = ({ customPackages, hideTitle, detailRoute = 'restaurant', showArrows = true, hidePeopleAndPrice = false, onCardClick, showReserveButton = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const packages = customPackages || defaultPackages;
  const navigate = useNavigate();

  // Carrossel: estado do índice inicial
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerView = isMobile ? 1 : 3;
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + cardsPerView < packages.length;

  const handlePrev = () => {
    if (canGoBack) setStartIndex(startIndex - cardsPerView);
  };
  
  const handleNext = () => {
    if (canGoForward) setStartIndex(startIndex + cardsPerView);
  };

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

  // Estilos para as setas - desktop: lateral, mobile: acima
  const arrowStyleDesktop = {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 24,
    color: theme.palette.primary.main,
    opacity: 0.95,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-50%) scale(1.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    },
  };

  const arrowStyleMobile = {
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 28,
    color: theme.palette.primary.main,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    },
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

        {/* Setas de navegação Mobile - acima dos cards */}
        {showArrows && isMobile && (
          <MobileArrowsContainer>
            <button
              aria-label="Voltar"
              style={arrowStyleMobile}
              onClick={handlePrev}
              disabled={!canGoBack}
            >
              &#8592;
            </button>
            <ArrowCounter>
              {startIndex + 1} de {packages.length}
            </ArrowCounter>
            <button
              aria-label="Avançar"
              style={arrowStyleMobile}
              onClick={handleNext}
              disabled={!canGoForward}
            >
              &#8594;
            </button>
          </MobileArrowsContainer>
        )}

        {/* Setas de navegação Desktop - laterais */}
        {showArrows && !isMobile && canGoBack && (
          <button
            aria-label="Voltar"
            style={{ ...arrowStyleDesktop, left: 100 }}
            onClick={handlePrev}
            disabled={!canGoBack}
          >
            &#8592;
          </button>
        )}
        {showArrows && !isMobile && canGoForward && (
          <button
            aria-label="Avançar"
            style={{ ...arrowStyleDesktop, right: 100 }}
            onClick={handleNext}
            disabled={!canGoForward}
          >
            &#8594;
          </button>
        )}

        <PackagesGrid 
          cardsPerView={cardsPerView} 
          showArrows={showArrows}
          style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            minHeight: isMobile ? 420 : 350 
          }}
        >
          {(
            showArrows
              ? packages.slice(startIndex, startIndex + cardsPerView)
              : packages
          ).map((pkg: TravelPackage, index: number) => (
            <PackageCard
              key={pkg.id}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(pkg)}
            >
              <ImageContainer>
                <PackageImage
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-image"
                />
                <ImageGradient />
                <RatingBadge className="rating-badge">
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
                    {pkg.location}
                  </Typography>
                </PackageLocation>
                {/* Tags como chips/badges */}
                {pkg.tags && Array.isArray(pkg.tags) && pkg.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {pkg.tags.map((tag: string, idx: number) => (
                      <Box key={idx} sx={{
                        background: '#e0e0e0',
                        color: '#333',
                        borderRadius: 12,
                        px: 1.5,
                        py: 0.2,
                        fontSize: 12,
                        fontWeight: 500,
                        mr: 0.5,
                        mb: 0.5,
                        display: 'inline-block',
                      }}>{tag}</Box>
                    ))}
                  </Box>
                )}
                <PackageDescription>
                  {pkg.description}
                </PackageDescription>
                {!hidePeopleAndPrice && (
                  <PackagePrice>
                    {pkg.price}
                  </PackagePrice>
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
      </Container>
    </SectionWrapper>
  );
};

export default TravelPackages; 