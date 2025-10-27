import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Fab,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Send,
  KeyboardArrowUp,
  TravelExplore,
  Support,
  Schedule
} from '@mui/icons-material';
import { brandColors } from '../../config/colors';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getLocationParams } from '../../services/globalParams';
import { useCity } from '../../hooks/useCity';
import { env } from '../../env';

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Obter informações da cidade do contexto
  const { currentCity } = useCity();
  const touristSupport = currentCity?.tourist_support_agency;
  
  // Debug: verificar dados recebidos
  console.log('🏙️ currentCity:', currentCity);
  console.log('📞 touristSupport:', touristSupport);
  console.log('🔍 currentCity?.tourist_support_agency:', currentCity?.tourist_support_agency);
  
  // Fallback para parâmetros de localização do env.ts se não houver dados do contexto
  const locationParams = getLocationParams();
  const city = currentCity?.name || locationParams.city as string || env.VITE_CITY || 'Barra do Bugres';
  const state = currentCity?.state || locationParams.state as string || 'MT';
  
  // Função para tratar valores null/undefined
  const getValueOrDefault = (value: string | null | undefined, defaultValue: string = 'Não Informado') => {
    return value && value.trim() !== '' ? value : defaultValue;
  };
  
  // Função para gerar URL do Google Maps
  const generateMapUrl = (city: string, state: string) => {
    // Se houver coordenadas específicas do tourist_support_agency, usar elas
    if (touristSupport?.lat && touristSupport?.lng) {
      return `https://www.google.com/maps?q=${touristSupport.lat},${touristSupport.lng}&output=embed`;
    }
    
    // Caso contrário, usar a cidade e estado
    const location = `${city}, ${state}, Brasil`;
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  };
  
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aqui você pode implementar o envio do formulário
  };

  console.log('🏙️ touristSupport:', touristSupport);
  // Contact info data usando informações do tourist_support_agency
  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Localização',
      details: [
        getValueOrDefault(touristSupport?.address),
        `${city} - ${state}, Brasil`
      ],
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Telefone',
      details: [
        getValueOrDefault(touristSupport?.phone_number)
      ],
      gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)'
    },
    {
      icon: <Email sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'E-mail',
      details: [
        getValueOrDefault(touristSupport?.email)
      ],
      gradient: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)'
    }
  ];

  return (
    <>
      <Header />
      <Box sx={{ 
        background: `linear-gradient(135deg, ${brandColors.neutral.lightGray} 0%, #f8f9fa 100%)`,
        minHeight: '100vh',
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 8 }
      }}>
        <Container maxWidth="xl">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}>
              <TravelExplore sx={{ 
                fontSize: { xs: 40, md: 56 }, 
                color: brandColors.legacy.teal,
                mr: 2
              }} />
              <Typography
                variant="h6"
                sx={{
                  color: brandColors.legacy.teal,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Contato
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: brandColors.neutral.darkGray,
                fontSize: { xs: '2rem', md: '3.5rem' }
              }}
            >
              Fale Conosco
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: brandColors.neutral.gray,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Estamos aqui para ajudar você a planejar sua experiência turística perfeita
            </Typography>
          </Box>

          {/* Contact Info Cards */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: { xs: 4, md: 8 }
          }}>
            {contactInfo.map((info, index) => (
              <Card key={index} sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ 
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  background: info.gradient,
                  color: 'white',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 0
                  }
                }}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {info.icon}
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body1" sx={{ 
                        mb: 0.5,
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Main Content */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 4
          }}>
            {/* Contact Form */}
            <Card sx={{
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: brandColors.neutral.darkGray
                  }}>
                    Envie sua Mensagem
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: brandColors.neutral.gray,
                    mb: 2
                  }}>
                    Iremos responder o mais breve possível. Nossa equipe está pronta para ajudar!
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Seu Nome"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: brandColors.legacy.teal,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: brandColors.legacy.teal,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: brandColors.legacy.teal,
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Seu E-mail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: brandColors.legacy.teal,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: brandColors.legacy.teal,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: brandColors.legacy.teal,
                        },
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Assunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: brandColors.legacy.teal,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: brandColors.legacy.teal,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: brandColors.legacy.teal,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Sua Mensagem"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: brandColors.legacy.teal,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: brandColors.legacy.teal,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: brandColors.legacy.teal,
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      background: `linear-gradient(135deg, ${brandColors.legacy.teal} 0%, ${brandColors.legacy.fish} 100%)`,
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 20px rgba(44,95,45,0.20)',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${brandColors.legacy.fish} 0%, ${brandColors.legacy.teal} 100%)`,
                        boxShadow: '0 6px 24px rgba(44,95,45,0.25)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    Enviar Mensagem
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card sx={{
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              background: `linear-gradient(135deg, ${brandColors.legacy.teal}10 0%, ${brandColors.legacy.orange}05 100%)`,
              height: 'fit-content'
            }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Support sx={{ 
                    fontSize: 32, 
                    color: brandColors.legacy.teal,
                    mr: 2
                  }} />
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700,
                    color: brandColors.neutral.darkGray
                  }}>
                    {getValueOrDefault(touristSupport?.name, 'Atendimento')}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Schedule sx={{ 
                      fontSize: 20, 
                      color: brandColors.legacy.teal,
                      mr: 1
                    }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: brandColors.neutral.darkGray
                    }}>
                      Horário de Funcionamento
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: brandColors.neutral.gray,
                    ml: 3
                  }}>
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h<br />
                    Domingo: Fechado
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Informações adicionais do tourist_support_agency */}
                {touristSupport && (
                  <Box sx={{ mb: 3 }}>
                    {touristSupport.site && (
                      <Typography variant="body2" sx={{ 
                        color: brandColors.neutral.gray,
                        mb: 1
                      }}>
                        <strong>Site:</strong> {getValueOrDefault(touristSupport.site)}
                      </Typography>
                    )}
                    {touristSupport.observations && (
                      <Typography variant="body2" sx={{ 
                        color: brandColors.neutral.gray,
                        mb: 1
                      }}>
                        <strong>Observações:</strong> {getValueOrDefault(touristSupport.observations)}
                      </Typography>
                    )}
                    
                    {/* Redes Sociais */}
                    {(touristSupport.instagram || touristSupport.facebook || touristSupport.youtube) && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ 
                          color: brandColors.neutral.darkGray,
                          fontWeight: 600,
                          mb: 1
                        }}>
                          Redes Sociais:
                        </Typography>
                        {touristSupport.instagram && (
                          <Typography variant="body2" sx={{ color: brandColors.neutral.gray, ml: 1 }}>
                            Instagram: {getValueOrDefault(touristSupport.instagram)}
                          </Typography>
                        )}
                        {touristSupport.facebook && (
                          <Typography variant="body2" sx={{ color: brandColors.neutral.gray, ml: 1 }}>
                            Facebook: {getValueOrDefault(touristSupport.facebook)}
                          </Typography>
                        )}
                        {touristSupport.youtube && (
                          <Typography variant="body2" sx={{ color: brandColors.neutral.gray, ml: 1 }}>
                            YouTube: {getValueOrDefault(touristSupport.youtube)}
                          </Typography>
                        )}
                        {touristSupport.tiktok && (
                          <Typography variant="body2" sx={{ color: brandColors.neutral.gray, ml: 1 }}>
                            TikTok: {getValueOrDefault(touristSupport.tiktok)}
                          </Typography>
                        )}
                        {touristSupport.linkedin && (
                          <Typography variant="body2" sx={{ color: brandColors.neutral.gray, ml: 1 }}>
                            LinkedIn: {getValueOrDefault(touristSupport.linkedin)}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                )}

                <Typography variant="body2" sx={{ 
                  color: brandColors.neutral.gray,
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  "Sua aventura em {city} começa aqui! Estamos prontos para tornar sua viagem inesquecível."
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Map Section */}
          <Box sx={{ mt: { xs: 4, md: 8 } }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              mb: 3,
              textAlign: 'center',
              color: brandColors.neutral.darkGray
            }}>
              Nossa Localização
            </Typography>
            <Paper sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <iframe
                title={`Mapa ${city} - ${state}`}
                src={generateMapUrl(city, state)}
                width="100%"
                height={isMobile ? 300 : 450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Box>
        </Container>

        {/* Floating Action Button */}
        <Fab
          onClick={handleScrollTop}
          sx={{
            position: 'fixed',
            left: { xs: 16, md: 32 },
            bottom: { xs: 16, md: 32 },
            background: `linear-gradient(135deg, ${brandColors.legacy.teal} 0%, ${brandColors.legacy.fish} 100%)`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(135deg, ${brandColors.legacy.fish} 0%, ${brandColors.legacy.teal} 100%)`,
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s'
          }}
          aria-label="Voltar ao topo"
        >
          <KeyboardArrowUp />
        </Fab>
      </Box>
      <Footer />
    </>
  );
};

export default Contact; 
