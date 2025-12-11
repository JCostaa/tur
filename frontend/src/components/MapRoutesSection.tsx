import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Directions as DirectionsIcon,
  Place as PlaceIcon,
  Navigation as NavigationIcon,
  Map as MapIcon,
  NearMe as NearMeIcon,
} from '@mui/icons-material';
import { env } from '../env';
import { useCity } from '../hooks/useCity';

// Animações
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(216, 67, 21, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(216, 67, 21, 0); }
  100% { box-shadow: 0 0 0 0 rgba(216, 67, 21, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Cores do tema
const COLORS = {
  primary: '#D84315',
  secondary: '#E7A400',
  accent: '#FF6B35',
  dark: '#1a1a2e',
  light: '#f8f9fa',
};

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)',
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `
      radial-gradient(circle at 10% 20%, rgba(216, 67, 21, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(231, 164, 0, 0.05) 0%, transparent 40%)
    `,
    pointerEvents: 'none',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #D84315 0%, #E7A400 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.15rem',
  color: '#5a6a7a',
  textAlign: 'center',
  maxWidth: 700,
  margin: '0 auto',
  marginBottom: theme.spacing(5),
  lineHeight: 1.7,
}));

const MapWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(216, 67, 21, 0.1)',
  transition: 'all 0.4s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 25px 80px rgba(216, 67, 21, 0.2)',
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 16,
  },
}));

const MapOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 16,
  left: 16,
  right: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  zIndex: 10,
  flexWrap: 'wrap',
  gap: 12,
}));

const LocationBadge = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(15px)',
  borderRadius: 16,
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(216, 67, 21, 0.15)',
  animation: `${float} 4s ease-in-out infinite`,
  maxWidth: 'calc(100% - 24px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2),
    borderRadius: 12,
    width: '100%',
  },
}));

const LocationIcon = styled(Box)(() => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #D84315, #E7A400)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${pulse} 2s infinite`,
  flexShrink: 0,
  '& svg': {
    fontSize: 26,
    color: '#fff',
  },
}));

const RouteButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #D84315 0%, #FF6B35 100%)',
  color: '#fff',
  padding: theme.spacing(1.5, 4),
  borderRadius: 50,
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(216, 67, 21, 0.4)',
  transition: 'all 0.3s ease',
  border: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #BF360C 0%, #D84315 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0 12px 35px rgba(216, 67, 21, 0.5)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const InfoCardsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  marginTop: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: '#fff',
  border: '1px solid rgba(216, 67, 21, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 35px rgba(216, 67, 21, 0.15)',
    borderColor: COLORS.primary,
  },
}));

const InfoCardIcon = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: 16,
  background: 'linear-gradient(135deg, rgba(216, 67, 21, 0.1), rgba(231, 164, 0, 0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& svg': {
    fontSize: 28,
    color: COLORS.primary,
  },
}));

const RatingBadge = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  background: 'linear-gradient(135deg, rgba(216, 67, 21, 0.1), rgba(231, 164, 0, 0.1))',
  backgroundSize: '200% auto',
  animation: `${shimmer} 3s linear infinite`,
  padding: '6px 14px',
  borderRadius: 30,
  marginTop: 6,
}));

interface RouteDestination {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

const MapRoutesSection: React.FC = () => {
  const { currentCity } = useCity();
  const [isHovered] = useState(false);

  // Coordenadas da cidade (usando dados da API ou defaults)
  const cityName = env.VITE_CITY || 'Nossa Senhora do Livramento';
  const cityState = env.VITE_STATE || 'Mato Grosso';
  
  // Coordenadas de Nossa Senhora do Livramento - MT
  // Usa lat/lng da agência de suporte turístico ou valores padrão
  const touristSupport = currentCity?.tourist_support_agency;
  const cityLat = touristSupport?.lat || -15.7697;
  const cityLng = touristSupport?.lng || -56.3539;

  // Pontos turísticos/destinos principais (podem vir da API no futuro)
  const destinations: RouteDestination[] = [
    { 
      name: 'Centro de Livramento', 
      lat: cityLat, 
      lng: cityLng,
      description: 'Centro histórico e comercial'
    },
    { 
      name: 'Cuiabá (Capital)', 
      lat: -15.6014, 
      lng: -56.0979,
      description: 'A 42km - Capital do estado'
    },
    { 
      name: 'Chapada dos Guimarães', 
      lat: -15.4608, 
      lng: -55.7500,
      description: 'A 120km - Parque Nacional'
    },
  ];

  // Função para abrir rotas no Google Maps
  const openGoogleMapsRoute = () => {
    // Monta URL com múltiplos waypoints
    const origin = `${cityLat},${cityLng}`;
    const waypoints = destinations.slice(1).map(d => `${d.lat},${d.lng}`).join('|');
    
    // URL para rotas no Google Maps
    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
    const params = new URLSearchParams({
      origin,
      destination: `${destinations[destinations.length - 1].lat},${destinations[destinations.length - 1].lng}`,
      waypoints,
      travelmode: 'driving',
    });
    
    window.open(`${baseUrl}&${params.toString()}`, '_blank');
  };

  // Função para abrir localização específica
  const openLocation = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  // URL do mapa embed
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60000!2d${cityLng}!3d${cityLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939db424c49e22d5%3A0x84b5c3d0f0c0c0c0!2s${encodeURIComponent(cityName)}%2C%20${encodeURIComponent(cityState)}!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr`;

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 2,
              background: 'linear-gradient(135deg, rgba(216, 67, 21, 0.1), rgba(231, 164, 0, 0.1))',
              padding: '10px 24px',
              borderRadius: 50,
            }}
          >
            <MapIcon sx={{ color: COLORS.primary, fontSize: 28 }} />
            <Typography sx={{ color: COLORS.primary, fontWeight: 600, fontSize: '0.95rem', letterSpacing: 1 }}>
              EXPLORE A REGIÃO
            </Typography>
          </Box>
          
          <SectionTitle>
            Como Chegar em {cityName}
          </SectionTitle>
          
          <SectionSubtitle>
            Planeje sua visita e descubra as melhores rotas para explorar nossa cidade e seus arredores. 
            Clique no mapa para ver rotas detalhadas.
          </SectionSubtitle>
        </Box>

        {/* Mapa principal */}
        <MapWrapper elevation={0}>
          <MapOverlay>
            <LocationBadge>
              <LocationIcon>
                <PlaceIcon />
              </LocationIcon>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>
                  {cityName}
                </Typography>
                <Typography sx={{ color: '#6a7a8a', fontSize: '0.9rem' }}>
                  {cityState}, Brasil
                </Typography>
                <RatingBadge>
                  <Typography sx={{ color: COLORS.primary, fontWeight: 600, fontSize: '0.8rem' }}>
                    ⭐ 4.8 • 1.240 avaliações
                  </Typography>
                </RatingBadge>
              </Box>
            </LocationBadge>
            
            <RouteButton 
              startIcon={<DirectionsIcon />}
              onClick={openGoogleMapsRoute}
              sx={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              Traçar Rota
            </RouteButton>
          </MapOverlay>

          <Box
            sx={{
              width: '100%',
              height: { xs: 350, sm: 400, md: 500 },
              position: 'relative',
            }}
          >
            <iframe
              title="Mapa de localização"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </MapWrapper>

        {/* Cards de destinos */}
        <InfoCardsContainer>
          {destinations.map((dest, index) => (
            <InfoCard 
              key={index} 
              elevation={0}
              onClick={() => openLocation(dest.lat, dest.lng, dest.name)}
            >
              <InfoCardIcon>
                {index === 0 ? <PlaceIcon /> : <NearMeIcon />}
              </InfoCardIcon>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.05rem', mb: 0.5 }}>
                  {dest.name}
                </Typography>
                <Typography sx={{ color: '#6a7a8a', fontSize: '0.85rem' }}>
                  {dest.description}
                </Typography>
              </Box>
              <NavigationIcon sx={{ color: COLORS.secondary, fontSize: 24 }} />
            </InfoCard>
          ))}
        </InfoCardsContainer>
      </Container>
    </SectionContainer>
  );
};

export default MapRoutesSection;

