import React from 'react';
import { Box, Container, Typography, Card, styled, Button, Chip, Divider, Grid, Dialog, IconButton, Slide } from '@mui/material';
import { ArrowBack, Star, LocationOn, RestaurantMenu, LocalPhone } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../services/restaurants';

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

const GalleryImage = styled('img')({
  width: 120,
  height: 80,
  objectFit: 'cover',
  borderRadius: 8,
  marginRight: 8,
  marginBottom: 8,
  border: '2px solid #eee',
});

const RestaurantDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  let restaurant = location.state?.restaurant;

  // Fallback: buscar restaurante pelo id se não vier via state
  const { data } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
    enabled: !restaurant,
  });
  if (!restaurant && data?.data?.restaurants) {
    restaurant = data.data.restaurants.find((r: any) => String(r.id) === String(id));
  }
  console.log('gallery', restaurant);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  if (!restaurant) {
    React.useEffect(() => {
      navigate('/all-restaurants');
    }, [navigate]);
    return null;
  }
  // Galeria: array de objetos {large, thumb} ou string
  let gallery: { large: string; thumb: string }[] = [];
  if (Array.isArray(restaurant.gallery) && restaurant.gallery.length > 0) {
    gallery = restaurant.gallery
      .filter((img: any) => img && typeof img === 'object' && img.large && img.thumb && img.large !== false && img.thumb !== false);
  } else if (restaurant.images && Array.isArray(restaurant.images) && restaurant.images.length > 0) {
    gallery = restaurant.images
      .filter((img: any) => img && typeof img === 'object' && img.large && img.thumb && img.large !== false && img.thumb !== false);
  } else if (restaurant.image) {
    gallery = [{ large: restaurant.image, thumb: restaurant.image }];
  }
  // Provider (responsável, contato, etc)
  const provider = restaurant.provider || {};
  const providerFields = [
    { label: 'Nome', value: provider.name },
    { label: 'Contato', value: provider.contact },
    { label: 'Telefone', value: provider.phone },
    { label: 'Email', value: provider.email },
    { label: 'Site', value: provider.website || provider.site },
    { label: 'Endereço', value: provider.address },
  ];
  // Tags/attributes
  const tags = restaurant.tags || (Array.isArray(restaurant.attributes)
    ? restaurant.attributes.flatMap((attr: any) => Array.isArray(attr.items) ? attr.items : [attr.name || attr])
    : []);

  // Garantir que location seja string para renderização e Google Maps
  let locationString = '';
  if (restaurant && restaurant.location) {
    if (typeof restaurant.location === 'string') {
      locationString = restaurant.location;
    } else if (
      restaurant.location.address || restaurant.location.city || restaurant.location.state
    ) {
      locationString = [
        restaurant.location.address,
        restaurant.location.city,
        restaurant.location.state,
        restaurant.location.country,
      ].filter(Boolean).join(', ');
    }
  }

  return (
    <Box sx={{ background: '#f8f9fa', minHeight: '100vh', pb: 8 }}>
      <BackgroundImage style={gallery[0] ? { backgroundImage: `url('${gallery[0].large}')` } : {}}>
        <GradientOverlay />
        <BackButton startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Voltar
        </BackButton>
      </BackgroundImage>
      <Container maxWidth="lg">
        <InfoCard>
          <Title>{restaurant.title}</Title>
          <Subtitle>
            <LocationOn sx={{ mr: 1, fontSize: 22 }} /> {locationString}
          </Subtitle>
          <ChipsRow>
            {restaurant.rating && <Chip icon={<Star sx={{ color: '#FFD700' }} />} label={`${restaurant.rating} estrelas`} />}
            {restaurant.cuisine && <Chip icon={<RestaurantMenu />} label={restaurant.cuisine} />}
            {restaurant.phone && <Chip icon={<LocalPhone />} label={restaurant.phone} />}
            {tags && tags.length > 0 && tags.map((tag: string, idx: number) => (
              <Chip key={idx} label={tag} />
            ))}
          </ChipsRow>
          <Description dangerouslySetInnerHTML={{ __html: restaurant.content || restaurant.description }} />
          {/* Galeria de imagens */}
          {gallery.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Galeria de Imagens</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {gallery.map((img, idx) => (
                  <GalleryImage
                    key={idx}
                    src={img.thumb || img.large}
                    alt={restaurant.title}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
              {/* Lightbox Modal */}
              <Dialog
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                TransitionComponent={Slide}
                transitionDuration={300}
                PaperProps={{
                  style: {
                    background: 'rgba(20,20,20,0.85)',
                    boxShadow: 'none',
                    borderRadius: 24,
                    backdropFilter: 'blur(6px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  },
                }}
                sx={{
                  '& .MuiDialog-container': {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'auto',
                    maxWidth: { xs: '90vw', sm: 600 },
                    maxHeight: { xs: '60vh', sm: '80vh' },
                    mx: 'auto',
                    p: 0,
                    boxSizing: 'border-box',
                  }}
                  onClick={e => {
                    if (e.target === e.currentTarget) setLightboxOpen(false);
                  }}
                >
                  {/* Indicador de posição */}
                  <Box sx={{ position: 'absolute', top: 16, left: 24, color: '#fff', fontWeight: 600, fontSize: 18, zIndex: 3, textShadow: '0 2px 8px #0008' }}>
                    {lightboxIndex + 1} / {gallery.length}
                  </Box>
                  {/* Botão fechar */}
                  <IconButton
                    onClick={() => setLightboxOpen(false)}
                    sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 3, bgcolor: 'rgba(0,0,0,0.25)', '&:hover': { bgcolor: 'rgba(0,0,0,0.45)' }, p: 1.5 }}
                    aria-label="Fechar"
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  {/* Botão anterior */}
                  <IconButton
                    onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      color: '#fff',
                      zIndex: 3,
                      bgcolor: 'rgba(0,0,0,0.55)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                      p: 2,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    aria-label="Anterior"
                    disabled={gallery.length <= 1}
                  >
                    <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                  {/* Imagem central */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'auto',
                      maxWidth: { xs: '90vw', sm: 500, md: 600 },
                      maxHeight: { xs: '60vh', sm: '80vh', md: '80vh' },
                      mx: 'auto',
                      borderRadius: 3,
                      boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
                      overflow: 'hidden',
                      background: '#222',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <img
                      src={gallery[lightboxIndex].large}
                      alt={restaurant.title}
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                        objectFit: 'contain',
                        display: 'block',
                        margin: 0,
                        borderRadius: 12,
                        transition: 'opacity 0.3s',
                      }}
                    />
                  </Box>
                  {/* Botão próxima */}
                  <IconButton
                    onClick={e => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      color: '#fff',
                      zIndex: 3,
                      bgcolor: 'rgba(0,0,0,0.55)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                      p: 2,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    aria-label="Próxima"
                    disabled={gallery.length <= 1}
                  >
                    <ChevronRightIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Dialog>
            </Box>
          )}
          {/* Provider/Responsável */}
          {provider && providerFields.some(f => f.value) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Responsável</Typography>
              <Box sx={{ color: '#555', fontSize: '1.05rem' }}>
                {providerFields.map((f, idx) => f.value && (
                  <div key={idx}><b>{f.label}:</b> {f.value}</div>
                ))}
              </Box>
            </Box>
          )}
          {/* Preço */}
          {restaurant.price && <Price>Preço médio: {restaurant.price}</Price>}
          <ReserveButton>Entrar em contato</ReserveButton>
        </InfoCard>
        {/* Mapa Google Maps */}
        {locationString && (
          <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 4 }}>
            <Box sx={{ maxWidth: 900, width: '100%' }}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, p: 0 }}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Localização</Typography>
                  <Box sx={{ width: '100%', height: 320, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                    <iframe
                      title="Mapa do restaurante"
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(locationString)}&output=embed`}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>
          </Container>
        )}
      </Container>
    </Box>
  );
};

export default RestaurantDetail; 