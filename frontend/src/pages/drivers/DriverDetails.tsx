import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  styled, 
  Button, 
  Chip, 
  Divider, 
  Avatar, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  IconButton
} from '@mui/material';
import { 
  ArrowBack, 
  Star, 
  LocationOn, 
  AccessTime, 
  Group, 
  Phone,
  Email,
  Person,
  DirectionsCar,
  CheckCircle,
  Schedule,
  AttachMoney,
  Language,
  Security,
  PhotoCamera
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
  color: 'white',
  padding: theme.spacing(4, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/browse-3.jpg") center/cover',
    opacity: 0.1,
    zIndex: 0,
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 24,
  left: 24,
  zIndex: 2,
  background: 'rgba(255,255,255,0.9)',
  color: theme.palette.primary.main,
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    background: 'rgba(255,255,255,1)',
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginTop: -80,
  marginBottom: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  position: 'relative',
  zIndex: 2,
  overflow: 'visible',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid white',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  marginTop: -60,
  marginLeft: theme.spacing(3),
}));

const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  marginBottom: theme.spacing(3),
  border: '1px solid #e0e0e0',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const DataRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const DataLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
}));

const DataValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));

const ContactButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
}));

const DriverDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGallery, setOpenGallery] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Pegar os dados do motorista do state da navegação
  const driver = location.state?.driver;

  // Debug logging
  console.log('DriverDetails - location.state:', location.state);
  console.log('DriverDetails - id:', id);
  console.log('DriverDetails - driver from state:', driver);

  if (!id) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2 }}>
        <Typography color="error" variant="h6">ID do condutor não fornecido.</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/all-drivers')}
          sx={{ mt: 2 }}
        >
          Voltar para Condutores
        </Button>
      </Box>
    );
  }

  if (!driver) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2 }}>
        <Typography color="error" variant="h6">Condutor não encontrado.</Typography>
        <Typography color="text.secondary" variant="body2">
          Os dados do condutor não foram fornecidos na navegação.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/all-drivers')}
          sx={{ mt: 2 }}
        >
          Voltar para Condutores
        </Button>
      </Box>
    );
  }

  const handleBack = () => {
    navigate('/all-drivers');
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpenGallery(true);
  };

  const handleCloseGallery = () => {
    setOpenGallery(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (driver.gallery?.length || 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (driver.gallery?.length || 1)) % (driver.gallery?.length || 1));
  };

  const images = driver.gallery && driver.gallery.length > 0 ? driver.gallery : [driver.image];

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <HeaderSection>
        <BackButton onClick={handleBack} startIcon={<ArrowBack />}>
          Voltar
        </BackButton>
        <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', pt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Ficha do Condutor
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Informações completas e detalhadas
          </Typography>
        </Container>
      </HeaderSection>

      <Container sx={{ py: 4 ,marginTop: 3}}>
        {/* Card Principal */}
        <ProfileCard>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
              <ProfileAvatar src={driver.image} alt={driver.title || driver.name}>
                <Person sx={{ fontSize: 60 }} />
              </ProfileAvatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
                  {driver.title || driver.name || 'Motorista'}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip 
                    icon={<Star />} 
                    label={`${driver.rating || 5.0} estrelas`} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                  <Chip 
                    icon={<LocationOn />} 
                    label={driver.location?.city || driver.location?.address || 'Local não informado'} 
                    variant="outlined" 
                    size="small"
                  />
                  <Chip 
                    icon={<CheckCircle />} 
                    label="Disponível" 
                    color="success" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>

                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                  {driver.content || driver.description || 'Descrição não disponível'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF5722', mb: 2 }}>
                  {driver.price || 'R$ 0'}
                </Typography>
                <ContactButton variant="contained" color="primary" startIcon={<Phone />}>
                  Contatar
                </ContactButton>
              </Box>
            </Box>
          </CardContent>
        </ProfileCard>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {/* Informações Pessoais */}
          <InfoSection>
            <SectionTitle>
              <Person />
              Informações Pessoais
            </SectionTitle>
            
            <DataRow>
              <DataLabel>Nome Completo</DataLabel>
              <DataValue>{driver.title || driver.name || 'Não informado'}</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Localização</DataLabel>
              <DataValue>{driver.location?.city || driver.location?.address || 'Não informado'}</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Disponibilidade</DataLabel>
              <DataValue>{driver.duration_description || driver.duration || 'Disponível'}</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Capacidade</DataLabel>
              <DataValue>{driver.people || 1} pessoa(s)</DataValue>
            </DataRow>
          </InfoSection>

          {/* Informações de Serviço */}
          <InfoSection>
            <SectionTitle>
              <DirectionsCar />
              Informações do Serviço
            </SectionTitle>
            
            <DataRow>
              <DataLabel>Preço</DataLabel>
              <DataValue sx={{ color: '#FF5722', fontWeight: 700 }}>{driver.price || 'R$ 0'}</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Avaliação</DataLabel>
              <DataValue>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#FFC107', fontSize: 20 }} />
                  {driver.rating || 5.0}
                </Box>
              </DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Experiência</DataLabel>
              <DataValue>5+ anos</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Status</DataLabel>
              <DataValue>
                <Chip label="Ativo" color="success" size="small" />
              </DataValue>
            </DataRow>
          </InfoSection>

          {/* Contato */}
          <InfoSection>
            <SectionTitle>
              <Phone />
              Informações de Contato
            </SectionTitle>
            
            <DataRow>
              <DataLabel>Telefone</DataLabel>
              <DataValue>+55 (11) 99999-9999</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Email</DataLabel>
              <DataValue>condutor@email.com</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>WhatsApp</DataLabel>
              <DataValue>+55 (11) 99999-9999</DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Horário de Atendimento</DataLabel>
              <DataValue>24h</DataValue>
            </DataRow>
          </InfoSection>

          {/* Documentação */}
          <InfoSection>
            <SectionTitle>
              <Security />
              Documentação
            </SectionTitle>
            
            <DataRow>
              <DataLabel>CNH</DataLabel>
              <DataValue>
                <Chip label="Categoria B" color="primary" size="small" />
              </DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Documentação</DataLabel>
              <DataValue>
                <Chip label="Em dia" color="success" size="small" />
              </DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Seguro</DataLabel>
              <DataValue>
                <Chip label="Ativo" color="success" size="small" />
              </DataValue>
            </DataRow>
            
            <DataRow>
              <DataLabel>Veículo</DataLabel>
              <DataValue>Próprio</DataValue>
            </DataRow>
          </InfoSection>
        </Box>

        {/* Galeria de Fotos */}
        {images && images.length > 0 && (
          <InfoSection>
            <SectionTitle>
              <PhotoCamera />
              Galeria de Fotos
            </SectionTitle>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {images.slice(0, 6).map((image: string, index: number) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Foto ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </Box>
            
            {images.length > 6 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block' }}>
                +{images.length - 6} mais fotos disponíveis
              </Typography>
            )}
          </InfoSection>
        )}
      </Container>

      {/* Modal da galeria */}
      <Dialog
        open={openGallery}
        onClose={handleCloseGallery}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            onClick={handleCloseGallery}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 16,
              color: 'white',
              zIndex: 1,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 16,
              color: 'white',
              zIndex: 1,
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box
            component="img"
            src={images[currentImageIndex]}
            alt={`Foto ${currentImageIndex + 1}`}
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default DriverDetail;