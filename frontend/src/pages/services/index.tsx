import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Stack,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  Public, 
  Hotel, 
  Restaurant,
  Attractions,
  Business,
  Event,
  Bed,
  RestaurantMenu,
  TravelExplore,
  PersonPin,
  ExpandMore,
  ExpandLess,
  ArrowForward
} from '@mui/icons-material';
import { brandColors } from '../../config/colors';
import { useNavigate } from 'react-router-dom';

// Definição dos dados dos segmentos melhorados
const ENHANCED_SEGMENTS = [
  {
    id: 1,
    title: 'O que fazer',
    icon: <Public sx={{ fontSize: 56, color: '#fff' }} />,
    description: 'Descubra experiências autênticas, passeios e atrativos que revelam a essência do destino, conectando você ao que há de melhor no turismo local',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', // Verde natureza
    iconBg: '#4CAF50',
    subcategories: [
      {
        id: 'atrativos',
        name: 'ATRATIVOS',
        icon: <Attractions sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Pontos turísticos e atrações locais',
        route: '/all-tours'
      },
      {
        id: 'eventos',
        name: 'EVENTOS',
        icon: <Event sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Eventos e festivais da região',
        route: '/events'
      }
    ]
  },
  {
    id: 2,
    title: 'Onde dormir',
    icon: <Hotel sx={{ fontSize: 56, color: '#fff' }} />,
    description: 'Encontre opções de hospedagem aconchegantes e variadas, do simples ao sofisticado, sempre com a hospitalidade local pronta para receber você.',
    gradient: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)', // Azul acolhedor
    iconBg: '#2196F3',
    subcategories: [
      {
        id: 'hospedagens',
        name: 'HOSPEDAGENS',
        icon: <Bed sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Opções de acomodação para todos os gostos',
        route: '/all-accommodation'
      }
    ]
  },
  {
    id: 3,
    title: 'Onde comer',
    icon: <Restaurant sx={{ fontSize: 56, color: '#fff' }} />,
    description: 'Saboreie a culinária regional em restaurantes, bares e lanchonetes que traduzem a cultura e os sabores do destino em cada prato.',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)', // Laranja gastronômico
    iconBg: '#FF9800',
    subcategories: [
      {
        id: 'restaurantes',
        name: 'RESTAURANTES',
        icon: <RestaurantMenu sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Gastronomia local e regional',
        route: '/all-restaurants'
      }
    ]
  },
  {
    id: 4,
    title: 'Quem contratar',
    icon: <TravelExplore sx={{ fontSize: 56, color: '#fff' }} />,
    description: 'Apoie o comércio local com artesanatos, produtos típicos e lojas variadas, além de agências receptivas, guias e condutores prontos para atender você.',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)', // Roxo profissional
    iconBg: '#9C27B0',
    subcategories: [
      {
        id: 'agencias',
        name: 'AGÊNCIAS',
        icon: <Business sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Agências de turismo receptivo',
        route: '/all-agencies'
      },
      {
        id: 'guias',
        name: 'GUIAS/CONDUTORES',
        icon: <PersonPin sx={{ fontSize: 20, color: brandColors.primary.teal }} />,
        description: 'Guias e condutores especializados',
        route: '/all-guides'
      }
    ]
  }
];

interface Subcategory {
  id: string;
  name: string;
  icon: React.ReactElement;
  description: string;
  route: string;
}

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCardExpansion = (cardId: number) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    navigate(subcategory.route);
  };

  return (
    <Box sx={{ 
      background: `linear-gradient(135deg, ${brandColors.neutral.lightGray} 0%, #f8f9fa 100%)`,
      minHeight: '100vh', 
      py: { xs: 6, md: 10 } 
    }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: brandColors.primary.teal,
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1,
              textTransform: 'uppercase',
            }}
          >
            Serviços
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: brandColors.neutral.darkGray,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Segmentos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: brandColors.neutral.gray,
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Explore todas as opções de turismo da região organizadas por categoria
          </Typography>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 4, md: 6 },
          justifyContent: 'center',
        }}>
          {ENHANCED_SEGMENTS.map((segment) => (
            <Card
              key={segment.id}
              sx={{
                border: 'none',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                background: '#fff',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  transform: 'translateY(-4px)'
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* Header do Card */}
                <Box 
                  sx={{ 
                    p: { xs: 3, md: 4 },
                    background: segment.gradient,
                    borderBottom: expandedCards.includes(segment.id) ? `1px solid ${brandColors.neutral.lightGray}` : 'none',
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
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ 
                      mr: 2,
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {segment.icon}
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      color: '#fff',
                      flex: 1,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {segment.title}
                    </Typography>
                    <IconButton 
                      onClick={() => toggleCardExpansion(segment.id)}
                      sx={{ 
                        color: '#fff',
                        background: 'rgba(255,255,255,0.2)',
                        '&:hover': { 
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                      }}
                    >
                      {expandedCards.includes(segment.id) ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: 14, 
                      color: '#fff',
                      lineHeight: 1.6,
                      position: 'relative',
                      zIndex: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    {segment.description}
                  </Typography>
                </Box>

                {/* Conteúdo Expandido */}
                <Collapse in={expandedCards.includes(segment.id)}>
                  <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={3}>
                      {segment.subcategories.map((subcategory) => (
                        <Box key={subcategory.id}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {subcategory.icon}
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600,
                                color: brandColors.neutral.darkGray
                              }}>
                                {subcategory.name}
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              size="small"
                              endIcon={<ArrowForward />}
                              onClick={() => handleSubcategoryClick(subcategory)}
                              sx={{
                                background: segment.gradient,
                                color: '#fff',
                                borderRadius: 3,
                                px: 3,
                                py: 1,
                                fontWeight: 600,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                '&:hover': {
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                  background: segment.gradient
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              Ver Todos
                            </Button>
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: brandColors.neutral.gray,
                              mb: 2,
                              fontSize: 13
                            }}
                          >
                            {subcategory.description}
                          </Typography>

                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" sx={{ 
            color: brandColors.neutral.gray,
            mb: 3
          }}>
            Não encontrou o que procura?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: brandColors.primary.teal,
              borderRadius: 8,
              px: 6,
              py: 2,
              fontWeight: 600,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(44,95,45,0.20)',
              '&:hover': {
                backgroundColor: brandColors.primary.orange,
                boxShadow: '0 6px 24px rgba(44,95,45,0.25)',
              }
            }}
            onClick={() => navigate('/contato')}
          >
            Entre em Contato
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 