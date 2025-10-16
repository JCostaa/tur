import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../../services/providers';
import { Box, Container, Typography, Card, styled, Button, Chip, Divider, Avatar, Link, useTheme } from '@mui/material';
import { ArrowBack, Star, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slide from '@mui/material/Slide';
import { decodeHtmlEntities } from '../../utils/decodeHtml';

const BackgroundImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 380,
  background: theme.palette.primary.main,
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

const ProviderTourDetail: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { data: providersData, isLoading, isError } = useQuery({
    queryKey: ['providers-tours'],
    queryFn: () => getProviders('tours'),
  });
  const tour = React.useMemo(() => {
    const allProviderTours = Array.isArray(providersData?.data?.providers) ? providersData.data.providers : [];
    const foundTour = allProviderTours.find((t: Record<string, unknown>) => String(t.id) === String(id));
    
    // Debug: mostrar todos os dados disponíveis
    if (foundTour) {
      console.log('🎯 [PROVIDER-TOUR-DETAIL] Dados completos do fornecedor:', foundTour);
      console.log('🎯 [PROVIDER-TOUR-DETAIL] Estrutura dos dados:', Object.keys(foundTour));
    }
    
    return foundTour;
  }, [providersData, id]);

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  if (isLoading) {
    return <Typography align="center" sx={{ mt: 8 }}>Carregando fornecedor...</Typography>;
  }
  if (isError || !tour) {
    return <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Fornecedor não encontrado.</Typography>;
  }

  // Mapeamento dos campos para exibição - expandido para mostrar todos os dados
  const highlights = [
    ...(tour.attributes?.flatMap((attr: Record<string, unknown>) => attr.items) || []),
    ...(tour.category ? [tour.category] : []),
  ];
  
  // Campos básicos
  const descriptionHtml = tour.content || tour.description || '';
  const location = tour.location?.city || tour.location?.address || tour.location || 'Local não informado';
  const price = tour.price || tour.sale_price || 'Preço não informado';
  const image = tour.image;
  const rating = tour.rating || 5;
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.filter((img: Record<string, unknown>) => img && (img.large || img.url || img)) : [];
  const banner = tour.banner || image;
  
  // Campos informativos
  const howItWorks = tour.how_it_works;
  const essentialInfo = tour.essential_information;
  const insuranceInfo = tour.insurance_info;
  const include = tour.include;
  const exclude = tour.exclude;
  const info = tour.info || {};
  const provider = tour.provider || {};
  const video = tour.video;
  const faq = Array.isArray(tour.faq) ? tour.faq : [];
  
  // Campos adicionais que podem estar presentes
  const name = tour.name || tour.title;
  const slug = tour.slug;
  const status = tour.status;
  const featured = tour.is_featured || tour.featured;
  const createdAt = tour.created_at;
  const updatedAt = tour.updated_at;
  const experiences = tour.experiences || tour.expriences || [];
  const tags = tour.tags || [];
  const amenities = tour.amenities || [];
  const policies = tour.policies || {};
  const social = tour.social || {};
  const schedule = tour.schedule || {};
  const capacity = tour.capacity || {};
  const pricing = tour.pricing || {};
  const locationDetails = tour.location_details || {};
  const accessibility = tour.accessibility || {};
  const requirements = tour.requirements || {};
  const cancellation = tour.cancellation || {};

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', pb: 8 }}>
      <BackgroundImage>
        <GradientOverlay />
        <BackButton startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Voltar
        </BackButton>
      </BackgroundImage>
      <Container maxWidth="lg">
        <InfoCard>
          <Title>{decodeHtmlEntities(name)}</Title>
          <Subtitle>
            <LocationOn sx={{ mr: 1, fontSize: 22 }} /> {decodeHtmlEntities(location)}
          </Subtitle>
          <ChipsRow>
            <Chip icon={<Star sx={{ color: '#FFD700' }} />} label={`${rating} estrelas`} />
          </ChipsRow>
          
          {/* Informações de Contato - Posicionadas no topo */}
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e9ecef' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}>
              📞 Informações de Contato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Telefone */}
              {(provider.phone_number || tour.phone_number || tour.commercial_phone_number) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>Telefone:</Typography>
                  <Link href={`tel:${provider.phone_number || tour.phone_number || tour.commercial_phone_number}`} sx={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                    {provider.phone_number || tour.phone_number || tour.commercial_phone_number}
                  </Link>
                </Box>
              )}
              
              {/* WhatsApp */}
              {(provider.social?.whatsapp || tour.social?.whatsapp) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>WhatsApp:</Typography>
                  <Link 
                    href={`https://wa.me/${provider.social?.whatsapp || tour.social?.whatsapp}`} 
                    target="_blank" 
                    rel="noopener"
                    sx={{ textDecoration: 'none', color: '#25D366' }}
                  >
                    {provider.social?.whatsapp || tour.social?.whatsapp}
                  </Link>
                </Box>
              )}
              
              {/* Email */}
              {(provider.email || tour.email) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>Email:</Typography>
                  <Link href={`mailto:${provider.email || tour.email}`} sx={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                    {provider.email || tour.email}
                  </Link>
                </Box>
              )}
              
              {/* Site */}
              {(provider.site || tour.site) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>Site:</Typography>
                  <Link href={provider.site || tour.site} target="_blank" rel="noopener" sx={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                    {provider.site || tour.site}
                  </Link>
                </Box>
              )}
              
              {/* CNPJ */}
              {(provider.cnpj || tour.cnpj) && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>CNPJ:</Typography>
                  <Typography variant="body2">{provider.cnpj || tour.cnpj}</Typography>
                </Box>
              )}
              
              {/* Nome Comercial */}
              {tour.business_name && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>Nome Comercial:</Typography>
                  <Typography variant="body2">{tour.business_name}</Typography>
                </Box>
              )}
              
              {/* CADASTUR */}
              {tour.cadastur && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>CADASTUR:</Typography>
                  <Typography variant="body2">{tour.cadastur}</Typography>
                </Box>
              )}
              
              {/* Status traduzido */}
              {status && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>Status:</Typography>
                  <Chip 
                    label={
                      status === 'active' ? 'Ativo' : 
                      status === 'inactive' ? 'Inativo' : 
                      status === 'pending' ? 'Pendente' : 
                      status === 'publish' ? 'Publicado' : 
                      status
                    }
                    size="small"
                    color={
                      status === 'active' || status === 'publish' ? 'success' : 
                      status === 'inactive' ? 'error' : 
                      'warning'
                    }
                  />
                </Box>
              )}
              
              {/* Redes Sociais */}
              {(provider.social || tour.social) && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Redes Sociais:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {/* WhatsApp */}
                    {(provider.social?.whatsapp || tour.social?.whatsapp) ? (
                      <Link 
                        href={`https://wa.me/${provider.social?.whatsapp || tour.social?.whatsapp}`} 
                        target="_blank" 
                        rel="noopener"
                        sx={{ textDecoration: 'none' }}
                      >
                        <Chip label="WhatsApp" size="small" clickable color="success" />
                      </Link>
                    ) : (
                      <Chip label="WhatsApp" size="small" disabled />
                    )}
                    
                    {/* Facebook */}
                    {(provider.social?.facebook || tour.social?.facebook) ? (
                      <Link 
                        href={typeof (provider.social?.facebook || tour.social?.facebook) === 'string' && (provider.social?.facebook || tour.social?.facebook).startsWith('http') 
                          ? (provider.social?.facebook || tour.social?.facebook)
                          : `https://facebook.com/${provider.social?.facebook || tour.social?.facebook}`} 
                        target="_blank" 
                        rel="noopener"
                        sx={{ textDecoration: 'none' }}
                      >
                        <Chip label="Facebook" size="small" clickable color="primary" />
                      </Link>
                    ) : (
                      <Chip label="Facebook" size="small" disabled />
                    )}
                    
                    {/* Instagram */}
                    {(provider.social?.instagram || tour.social?.instagram) ? (
                      <Link 
                        href={provider.social?.instagram || tour.social?.instagram} 
                        target="_blank" 
                        rel="noopener"
                        sx={{ textDecoration: 'none' }}
                      >
                        <Chip label="Instagram" size="small" clickable color="secondary" />
                      </Link>
                    ) : (
                      <Chip label="Instagram" size="small" disabled />
                    )}
                    
                    {/* TikTok */}
                    {(provider.social?.tiktok || tour.social?.tiktok) ? (
                      <Link 
                        href={provider.social?.tiktok || tour.social?.tiktok} 
                        target="_blank" 
                        rel="noopener"
                        sx={{ textDecoration: 'none' }}
                      >
                        <Chip label="TikTok" size="small" clickable />
                      </Link>
                    ) : (
                      <Chip label="TikTok" size="small" disabled />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          
          {/* Galeria de imagens */}
          {gallery.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Galeria de Imagens</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {gallery.map((img: Record<string, unknown>, idx: number) => (
                  <GalleryImage
                    key={idx}
                    src={String(img.large || img.url || img)}
                    alt={name}
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
                      src={String(gallery[lightboxIndex]?.large || gallery[lightboxIndex]?.url || gallery[lightboxIndex])}
                      alt={name}
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
              <Box sx={{ color: '#555', mb: 1, '& p': { margin: '0.5em 0' }, '& span': { fontSize: '1rem' } }}>
                <span dangerouslySetInnerHTML={{ __html: howItWorks }} />
              </Box>
            </Box>
          )}
          {essentialInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Informações essenciais:</Typography>
              <Box sx={{ color: '#555', mb: 1, '& p': { margin: '0.5em 0' }, '& span': { fontSize: '1rem' } }}>
                <span dangerouslySetInnerHTML={{ __html: essentialInfo }} />
              </Box>
            </Box>
          )}
          {insuranceInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Seguro:</Typography>
              <Box sx={{ color: '#555', mb: 1, '& p': { margin: '0.5em 0' }, '& span': { fontSize: '1rem' } }}>
                <span dangerouslySetInnerHTML={{ __html: insuranceInfo }} />
              </Box>
            </Box>
          )}
          {/* Inclui / Não inclui */}
          {(include || exclude) && (
            <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 2, mb: 2 }}>
              {include && (
                <Box sx={{ flex: 1, mb: { xs: 2, md: 0 } }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Inclui:</Typography>
                  <Box sx={{ color: '#555', mb: 1, '& p': { margin: '0.5em 0' }, '& span': { fontSize: '1rem' } }}>
                    <span dangerouslySetInnerHTML={{ __html: include }} />
                  </Box>
                </Box>
              )}
              {exclude && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Não inclui:</Typography>
                  <Box sx={{ color: '#555', mb: 1, '& p': { margin: '0.5em 0' }, '& span': { fontSize: '1rem' } }}>
                    <span dangerouslySetInnerHTML={{ __html: exclude }} />
                  </Box>
                </Box>
              )}
            </Box>
          )}
          {/* Info extra */}
          {Object.values(info).some(Boolean) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Informações adicionais:</Typography>
              <Box component="ul" sx={{ color: '#555', fontSize: '1.05rem', paddingLeft: 3, '& p': { display: 'inline', margin: 0 }, '& span': { fontSize: '1.05rem' } }}>
                {info.how_to_get_there && <li><b>Como chegar:</b> <span dangerouslySetInnerHTML={{ __html: info.how_to_get_there }} /></li>}
                {info.how_to_visit && <li><b>Como visitar:</b> <span dangerouslySetInnerHTML={{ __html: info.how_to_visit }} /></li>}
                {info.operation && <li><b>Funcionamento:</b> <span dangerouslySetInnerHTML={{ __html: info.operation }} /></li>}
                {info.track_level && <li><b>Nível da trilha:</b> <span dangerouslySetInnerHTML={{ __html: info.track_level }} /></li>}
                {info.general_info && <li><b>Informações gerais:</b> <span dangerouslySetInnerHTML={{ __html: info.general_info }} /></li>}
              </Box>
            </Box>
          )}
          {/* FAQ */}
          {faq.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Perguntas frequentes:</Typography>
              <Box component="ul" sx={{ color: '#555', fontSize: '1.05rem', paddingLeft: 3, '& p': { display: 'inline', margin: 0 }, '& span': { fontSize: '1.05rem' } }}>
                {faq.map((item: string, idx: number) => (
                  <li key={idx}><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                ))}
              </Box>
            </Box>
          )}
          
          {/* Experiências */}
          {experiences.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Experiências oferecidas:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {experiences.map((exp: string, idx: number) => (
                  <Chip key={idx} label={exp} size="small" />
                ))}
              </Box>
            </Box>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Tags:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {tags.map((tag: string, idx: number) => (
                  <Chip key={idx} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
          
          {/* Amenidades */}
          {amenities.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Amenidades:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {amenities.map((amenity: string, idx: number) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Políticas */}
          {Object.keys(policies).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Políticas:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(policies).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Cronograma */}
          {Object.keys(schedule).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Cronograma:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(schedule).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Capacidade */}
          {Object.keys(capacity).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Capacidade:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(capacity).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Preços detalhados */}
          {Object.keys(pricing).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Preços detalhados:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(pricing).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Detalhes da localização */}
          {Object.keys(locationDetails).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Detalhes da localização:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(locationDetails).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Acessibilidade */}
          {Object.keys(accessibility).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Acessibilidade:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(accessibility).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Requisitos */}
          {Object.keys(requirements).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Requisitos:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(requirements).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          {/* Cancelamento */}
          {Object.keys(cancellation).length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Política de cancelamento:</Typography>
              <ul style={{ color: '#555', fontSize: '1.05rem', paddingLeft: 20 }}>
                {Object.entries(cancellation).map(([key, value]: [string, unknown]) => (
                  <li key={key}><b>{key}:</b> {String(value)}</li>
                ))}
              </ul>
            </Box>
          )}
          
          
      
          
          <Divider sx={{ my: 2 }} />
          {highlights.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Destaques do fornecedor:
              </Typography>
              <Box component="ul" sx={{ pl: 3, color: '#555', fontSize: '1.05rem', '& p': { display: 'inline', margin: 0 }, '& span': { fontSize: '1.05rem' } }}>
                {highlights.map((item: string, idx: number) => (
                  <li key={idx}><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                ))}
              </Box>
            </Box>
          )}
          {/* Vídeo */}
         
          <ReserveButton sx={{ mt: 2 }} onClick={() => {
            // Direcionar diretamente para o WhatsApp
            const whatsapp = provider.social?.whatsapp || tour.social?.whatsapp;
            
            if (whatsapp) {
              window.open(`https://wa.me/${whatsapp}`, '_blank');
            } else {
              alert('WhatsApp não disponível para este fornecedor');
            }
          }}>Entrar em Contato</ReserveButton>
        </InfoCard>
      </Container>
    </Box>
  );
};

export default ProviderTourDetail;
