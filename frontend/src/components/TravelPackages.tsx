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
  useMediaQuery
} from '@mui/material';
import {
  Star as StarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  color: '#333',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const PackagesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
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
}));

const RatingBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  left: 18,
  color: '#222',
  background: alpha('#fff', 0.98),
  zIndex: 3,
}));

const DurationBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  top: 18,
  right: 18,
  color: '#fff',
  background: 'rgba(33, 150, 243, 0.85)', // azul translúcido
  zIndex: 3,
}));

const PeopleBadge = styled(BadgeBase)(({ theme }) => ({
  position: 'absolute',
  bottom: 18,
  left: 18,
  color: '#222',
  background: alpha('#fff', 0.92),
  zIndex: 3,
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2, 3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // garantir que ocupe toda a altura
  justifyContent: 'space-between', // empurra preço/botões para baixo
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const PackageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.7rem',
  fontWeight: 700,
  color: '#232323',
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
  letterSpacing: 0.2,
}));

const PackageLocation = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#888',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const PackageDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: 15,
  marginBottom: theme.spacing(1),
}));

const PackagePrice = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  color: '#FF5722',
  fontFamily: '"Playfair Display", serif',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  letterSpacing: 0.5,
}));

const CardActionsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2), // Espaço fixo acima dos botões
  gap: theme.spacing(2),
}));

const ActionButton = styled('button')(({ theme }) => ({
  padding: '12px 32px',
  borderRadius: 24,
  border: 'none',
  background: '#FF5722',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(255,87,34,0.10)',
  transition: 'all 0.2s',
  letterSpacing: 0.5,
  '&:hover': {
    background: '#e64a19',
    transform: 'translateY(-2px) scale(1.04)',
    boxShadow: '0 6px 18px rgba(255,87,34,0.18)',
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
}

interface TravelPackagesProps {
  customPackages?: TravelPackage[];
  hideTitle?: boolean;
  detailRoute?: string; // new prop
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
  },
];

const TravelPackages: React.FC<TravelPackagesProps> = ({ customPackages, hideTitle, detailRoute = 'restaurant' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const packages = customPackages || defaultPackages;
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/${detailRoute}/${id}`);
  };

  return (
    <SectionWrapper>
      <Container maxWidth="xl">
        {!hideTitle && (
          <>
            <SectionTitle>
              Browse By Category
            </SectionTitle>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '3rem',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: theme.spacing(6),
                color: '#333',
                [theme.breakpoints.down('md')]: {
                  fontSize: '2.5rem',
                },
              }}
            >
              Find Out The Best Travel Choice
            </Typography>
          </>
        )}

        <PackagesGrid>
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(pkg.id)}
            >
              <ImageContainer>
                <PackageImage
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-image"
                />
                <ImageGradient />
                <RatingBadge className="rating-badge">
                  <StarIconStyled style={{ color: '#FFD700', fontSize: 18, marginRight: 4 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 15 }}>
                    {pkg.rating}
                  </Typography>
                </RatingBadge>
                <DurationBadge className="package-overlay">
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 15 }}>
                    {pkg.duration}
                  </Typography>
                </DurationBadge>
                <PeopleBadge>
                  <span role="img" aria-label="pessoas">👥</span> {pkg.people} Pessoas
                </PeopleBadge>
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
                <PackageDescription>
                  {pkg.description}
                </PackageDescription>
                <PackagePrice>
                  Start From {pkg.price}
                </PackagePrice>
                <CardActionsStyled>
                  <ActionButton onClick={e => { e.stopPropagation(); handleCardClick(pkg.id); }}>Leia Mais</ActionButton>
                  <ActionButton>Reserve Agora</ActionButton>
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