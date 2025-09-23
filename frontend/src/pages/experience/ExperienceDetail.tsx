import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { experienceService } from '../../services/experienceService';
import type { Experience } from '../../types/experience';
import { Box, Container, Typography, Card, styled, Button, Chip, Divider } from '@mui/material';
import { ArrowBack, Star, LocationOn, AccessTime, Group } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slide from '@mui/material/Slide';

const BackgroundImage = styled(Box)(() => ({
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

const GalleryImage = styled('img')({
  width: 120,
  height: 80,
  objectFit: 'cover',
  borderRadius: 8,
  marginRight: 8,
  marginBottom: 8,
  border: '2px solid #eee',
});


const ExperienceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: experience, isLoading, isError } = useQuery<Experience>({
    queryKey: ['experience', id],
    queryFn: () => experienceService.getById(Number(id)),
    enabled: !!id,
  });
  
  // experience já vem diretamente da query

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  if (isLoading) {
    return <Typography align="center" sx={{ mt: 8 }}>Carregando experiência...</Typography>;
  }
  if (isError || !experience) {
    return <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Experiência não encontrada.</Typography>;
  }

  // Mapeamento dos campos para exibição
  const categories = experience?.categories || [];
  const descriptionHtml = experience?.description || '';
  const location = 'Barra do Bugres - MT'; // Valor padrão
  const duration = '2-4 horas'; // Valor padrão
  const rating = 5;
  const people = 2;
  // Para galeria, usar apenas a imagem principal por enquanto
  const gallery = experience?.image ? [{ large: experience.image.url, thumb: experience.image.url }] : [];
  const banner = experience?.image?.url || '';

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
          <Title>{experience?.title}</Title>
          <Subtitle>
            <LocationOn sx={{ mr: 1, fontSize: 22 }} /> {location}
          </Subtitle>
          <ChipsRow>
            <Chip icon={<Star sx={{ color: '#FFD700' }} />} label={`${rating} estrelas`} />
            <Chip icon={<AccessTime />} label={duration} />
            <Chip icon={<Group />} label={`${people} pessoas`} />
          </ChipsRow>
          
          {/* Categorias */}
          {categories.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Categorias:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category, idx: number) => (
                  <Chip 
                    key={idx} 
                    label={category.name} 
                    variant="outlined" 
                    color="primary"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Galeria de imagens */}
          {gallery.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Galeria de Imagens</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {gallery.map((img, idx: number) => (
                  <GalleryImage
                    key={idx}
                    src={img.large}
                    alt={experience?.title || 'Experiência'}
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
                    alt={experience?.title || 'Experiência'}
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

          {/* Descrição */}
          {descriptionHtml && (
            <Description 
              dangerouslySetInnerHTML={{ 
                __html: descriptionHtml
                  .replace(/[\u00A0]/g, ' ')  // substitui espaços não-quebráveis
                  .replace(/[\u200B-\u200D\uFEFF]/g, '')  // remove caracteres de controle invisíveis
                  .replace(/&nbsp;/g, ' ')  // substitui &nbsp; por espaço normal
                  .trim()
              }} 
            />
          )}

          <Divider sx={{ my: 2 }} />

          {/* Informações do Provider */}
          {experience?.provider && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: '1.3rem', color: '#1976d2' }}>
                Responsável:
              </Typography>
              <Box sx={{ color: '#444', fontSize: '1.15rem', lineHeight: 1.6 }}>
                {experience.provider.name && (
                  <div style={{ marginBottom: '6px' }}>
                    <b>Nome:</b> {experience.provider.name}
                  </div>
                )}
                {experience.provider.email && (
                  <div style={{ marginBottom: '6px' }}>
                    <b>Email:</b> {experience.provider.email}
                  </div>
                )}
                {experience.provider.phone && (
                  <div style={{ marginBottom: '6px' }}>
                    <b>Telefone:</b> {experience.provider.phone}
                  </div>
                )}
              </Box>
            </Box>
          )}

          {/* Informações adicionais */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: '1.3rem', color: '#1976d2' }}>
              Sobre esta experiência:
            </Typography>
            <Typography sx={{ color: '#555', mb: 1, fontSize: '1.15rem', lineHeight: 1.6 }}>
              {experience?.subtitle || 'Uma experiência única que combina aventura, cultura e natureza em Barra do Bugres e região.'}
            </Typography>
          </Box>

          {/* Botão de ação */}
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
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
            }}
            onClick={() => {
              const phone = experience?.provider?.phone;
              
              if (phone) {
                // Remove any non-numeric characters except +
                const cleanPhone = phone.replace(/[^\d+]/g, '');
                // Create WhatsApp URL with pre-filled message
                const message = encodeURIComponent(`Olá! Tenho interesse na experiência "${experience?.title}". Gostaria de mais informações.`);
                const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
                window.open(whatsappUrl, '_blank');
              } else {
                alert('Número de telefone não disponível para esta experiência.');
              }
            }}
          >
            Reservar Experiência
          </Button>
        </InfoCard>
      </Container>
    </Box>
  );
};

export default ExperienceDetail;
