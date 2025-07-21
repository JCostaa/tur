import React from 'react';
import { Box, Container, Typography, Card, styled, Button, Chip, Divider } from '@mui/material';
import { ArrowBack, Star, LocationOn, RestaurantMenu, LocalPhone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BackgroundImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 380,
  background: `url('/images/category-2.jpg') center/cover no-repeat`,
  position: 'relative',
  borderRadius: '0 0 32px 32px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  display: 'flex',
  alignItems: 'flex-end',
  overflow: 'hidden',
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  background: 'linear-gradient(180deg, rgba(20,20,40,0.05) 0%, rgba(20,20,40,0.75) 100%)',
  zIndex: 1,
});

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 24,
  left: 24,
  zIndex: 2,
  background: 'rgba(255,255,255,0.85)',
  color: theme.palette.primary.main,
  fontWeight: 700,
  borderRadius: 24,
  padding: '8px 18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  '&:hover': {
    background: 'rgba(255,255,255,1)',
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  marginTop: -64,
  marginBottom: theme.spacing(4),
  borderRadius: 24,
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  padding: theme.spacing(4),
  maxWidth: 900,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  zIndex: 2,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 800,
  fontSize: '2.5rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.2rem',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}));

const ChipsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: '#444',
  fontSize: '1.15rem',
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
}));

const Price = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#FF5722',
  marginBottom: theme.spacing(2),
}));

const ReserveButton = styled(Button)(({ theme }) => ({
  background: '#FF5722',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  borderRadius: 24,
  padding: '14px 40px',
  boxShadow: '0 2px 8px rgba(255,87,34,0.10)',
  letterSpacing: 0.5,
  '&:hover': {
    background: '#e64a19',
    transform: 'translateY(-2px) scale(1.04)',
    boxShadow: '0 6px 18px rgba(255,87,34,0.18)',
  },
}));

const RestaurantDetail: React.FC = () => {
  const navigate = useNavigate();
  // Mock de dados do restaurante
  const restaurant = {
    title: 'Restaurante Sabor do Pantanal',
    location: 'Centro, Pantanal',
    rating: 4.7,
    cuisine: 'Culinária regional',
    price: 'R$60,00 (médio)',
    description:
      'O Restaurante Sabor do Pantanal oferece pratos típicos da região, ambiente acolhedor e atendimento de excelência. Ideal para famílias, casais e grupos de amigos.',
    image: '/images/category-2.jpg',
    highlights: ['Pratos regionais', 'Ambiente climatizado', 'Música ao vivo', 'Opções vegetarianas'],
    phone: '(65) 99999-8888',
  };

  return (
    <Box sx={{ background: '#f8f9fa', minHeight: '100vh', pb: 8 }}>
      <BackgroundImage>
        <GradientOverlay />
        <BackButton startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Voltar
        </BackButton>
      </BackgroundImage>
      <Container maxWidth="lg">
        <InfoCard>
          <Title>{restaurant.title}</Title>
          <Subtitle>
            <LocationOn sx={{ mr: 1, fontSize: 22 }} /> {restaurant.location}
          </Subtitle>
          <ChipsRow>
            <Chip icon={<Star sx={{ color: '#FFD700' }} />} label={`${restaurant.rating} estrelas`} />
            <Chip icon={<RestaurantMenu />} label={restaurant.cuisine} />
            <Chip icon={<LocalPhone />} label={restaurant.phone} />
          </ChipsRow>
          <Description>{restaurant.description}</Description>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Destaques do restaurante:
            </Typography>
            <Box component="ul" sx={{ pl: 3, color: '#555', fontSize: '1.05rem' }}>
              {restaurant.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </Box>
          </Box>
          <Price>Preço médio: {restaurant.price}</Price>
          <ReserveButton>Entrar em contato</ReserveButton>
        </InfoCard>
      </Container>
    </Box>
  );
};

export default RestaurantDetail; 