import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTours } from '../services/tours';
import { Box, Container, Typography, Card, CardContent, styled, Button, Chip, Divider, Avatar, Link } from '@mui/material';
import { ArrowBack, Star, LocationOn, AccessTime, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slide from '@mui/material/Slide';

const BackgroundImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 380,
  background: `url('/images/browse-3.jpg') center/cover no-repeat`,
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

const ProviderBox = styled(Box)(({ theme }) => ({
  background: '#f5f5f5',
  borderRadius: 16,
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const TourDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: toursData, isLoading, isError } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
  });
  const tour = React.useMemo(() => {
    const allTours = Array.isArray(toursData?.data?.tours) ? toursData.data.tours : [];
    return allTours.find((t: any) => String(t.id) === String(id));
  }, [toursData, id]);

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  if (isLoading) {
    return <Typography align="center" sx={{ mt: 8 }}>Carregando passeio...</Typography>;
  }
  if (isError || !tour) {
    return <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Passeio não encontrado.</Typography>;
  }

  // Mapeamento dos campos para exibição
  const highlights = [
    ...(tour.attributes?.flatMap((attr: any) => attr.items) || []),
    ...(tour.category ? [tour.category] : []),
  ];
  const descriptionHtml = tour.content || '';
  const location = tour.location?.city || tour.location?.address || 'Local não informado';
  const duration = tour.duration_description || (tour.duration ? `${tour.duration} min` : 'Duração não informada');
  const price = tour.price;
  const image = tour.image;
  const rating = 5;
  const people = 2;
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.filter((img: any) => img && img.large) : [];
  const banner = tour.banner || image;
  const howItWorks = tour.how_it_works;
  const essentialInfo = tour.essential_information;
  const insuranceInfo = tour.insurance_info;
  const include = tour.include;
  const exclude = tour.exclude;
  const info = tour.info || {};
  const provider = tour.provider || {};
  const video = tour.video;
  const faq = Array.isArray(tour.faq) ? tour.faq : [];

  return (
    <Box sx={{ background: '#f8f9fa', minHeight: '100vh', pb: 8 }}>
      <BackgroundImage style={banner ? { backgroundImage: `url('${banner}')` } : {}}>
        <GradientOverlay />
        <BackButton startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Voltar
        </BackButton>
      </BackgroundImage>
      <Container maxWidth="lg">
        <InfoCard>
          <Title>{tour.title}</Title>
          <Subtitle>
            <LocationOn sx={{ mr: 1, fontSize: 22 }} /> {location}
          </Subtitle>
          <ChipsRow>
            <Chip icon={<Star sx={{ color: '#FFD700' }} />} label={`${rating} estrelas`} />
            <Chip icon={<AccessTime />} label={duration} />
            <Chip icon={<Group />} label={`${people} pessoas`} />
          </ChipsRow>
          {/* Galeria de imagens */}
          {gallery.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Galeria de Imagens</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {gallery.map((img: any, idx: number) => (
                  <GalleryImage
                    key={idx}
                    src={img.large}
                    alt={tour.title}
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
                      src={gallery[lightboxIndex]?.large}
                      alt={tour.title}
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
          {/* Descrição HTML */}
          {descriptionHtml && (
            <Description>
              <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </Description>
          )}
          {/* Como funciona, informações essenciais, seguro */}
          {howItWorks && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Como funciona:</Typography>
              <Typography sx={{ color: '#555', mb: 1 }}>{howItWorks}</Typography>
            </Box>
          )}
          {essentialInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Informações essenciais:</Typography>
              <Typography sx={{ color: '#555', mb: 1 }}>{essentialInfo}</Typography>
            </Box>
          )}
          {insuranceInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Seguro:</Typography>
              <Typography sx={{ color: '#555', mb: 1 }}>{insuranceInfo}</Typography>
            </Box>
          )}
          {/* Inclui / Não inclui */}
          {(include || exclude) && (
            <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 2, mb: 2 }}>
              {include && (
                <Box sx={{ flex: 1, mb: { xs: 2, md: 0 } }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Inclui:</Typography>
                  <Typography sx={{ color: '#555', mb: 1 }}>{include}</Typography>
                </Box>
              )}
              {exclude && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Não inclui:</Typography>
                  <Typography sx={{ color: '#555', mb: 1 }}>{exclude}</Typography>
                </Box>
              )}
            </Box>
          )}
          {/* Info extra */}
          {Object.values(info).some(Boolean) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Informações adicionais:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {info.how_to_get_there && <li><b>Como chegar:</b> {info.how_to_get_there}</li>}
                {info.how_to_visit && <li><b>Como visitar:</b> {info.how_to_visit}</li>}
                {info.operation && <li><b>Funcionamento:</b> {info.operation}</li>}
                {info.track_level && <li><b>Nível da trilha:</b> {info.track_level}</li>}
                {info.general_info && <li><b>Informações gerais:</b> {info.general_info}</li>}
              </ul>
            </Box>
          )}
          {/* FAQ */}
          {faq.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Perguntas frequentes:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {faq.map((item: any, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          {highlights.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Destaques do passeio:
              </Typography>
              <Box component="ul" sx={{ pl: 3, color: '#555', fontSize: '1.05rem' }}>
                {highlights.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </Box>
            </Box>
          )}
          <Price>Valor: {price}</Price>
          {/* Vídeo */}
          {video && typeof video === 'string' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Vídeo:</Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={video}
                  title="Vídeo do passeio"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder={0}
                  allowFullScreen
                />
              </Box>
            </Box>
          )}
          {/* Provider */}
          {provider && (
            <ProviderBox>
              <Avatar>{provider.name ? provider.name[0] : '?'}</Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{provider.name}</Typography>
                {provider.email && <Typography sx={{ color: '#555' }}>Email: {provider.email}</Typography>}
                {provider.phone_number && <Typography sx={{ color: '#555' }}>Telefone: {provider.phone_number}</Typography>}
                {provider.site && <Typography sx={{ color: '#555' }}>Site: <Link href={provider.site} target="_blank" rel="noopener">{provider.site}</Link></Typography>}
                {provider.social && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    {provider.social.whatsapp && <Link href={`https://wa.me/${provider.social.whatsapp}`} target="_blank" rel="noopener">WhatsApp</Link>}
                    {provider.social.facebook && <Link href={typeof provider.social.facebook === 'string' && provider.social.facebook.startsWith('http') ? provider.social.facebook : `https://facebook.com/${provider.social.facebook}`} target="_blank" rel="noopener">Facebook</Link>}
                    {provider.social.instagram && <Link href={provider.social.instagram} target="_blank" rel="noopener">Instagram</Link>}
                    {provider.social.tiktok && <Link href={provider.social.tiktok} target="_blank" rel="noopener">TikTok</Link>}
                  </Box>
                )}
              </Box>
            </ProviderBox>
          )}
          <ReserveButton sx={{ mt: 2 }} onClick={() => {
            window.open(`https://wa.me/${provider.social.whatsapp}`, '_blank');
          }}>Reservar Agora</ReserveButton>
        </InfoCard>
      </Container>
    </Box>
  );
};

export default TourDetail; 