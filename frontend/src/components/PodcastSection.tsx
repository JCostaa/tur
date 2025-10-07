import React from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery, Chip, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
import { MusicNote, Headphones, PlayArrow, VolumeUp, TrendingUp, Public, AccessTime, CalendarToday } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { podcastService } from '../services/podcastService';
import type { PodcastEpisode } from '../types/podcast';

const PodcastSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Query para buscar episódios do podcast
  const { data: podcastData, isLoading, error } = useQuery({
    queryKey: ['podcastEpisodes'],
    queryFn: () => podcastService.getEpisodes(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (substitui cacheTime)
  });

  // Debug: log dos dados recebidos
  React.useEffect(() => {
    if (podcastData) {
      console.log('🎧 Podcast Data:', podcastData);
      console.log('📊 Episodes count:', podcastData.data?.episodes?.length || 0);
    }
  }, [podcastData]);

  const podcastFeatures = [
    { icon: <TrendingUp />, text: "Tendências do Turismo" },
    { icon: <Public />, text: "Destinos Globais" },
    { icon: <VolumeUp />, text: "Experiências Únicas" },
    { icon: <MusicNote />, text: "Cultura Local" }
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 50%, ${theme.palette.primary.main}08 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, ${theme.palette.primary.main}10 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main}10 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, ${theme.palette.primary.main}05 0%, transparent 50%)
          `,
          opacity: 0.8,
        }
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
                mr: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                }
              }}
            >
              <Headphones sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  mb: 1
                }}
              >
                Vozes do Turismo
              </Typography>
              <Chip
                icon={<PlayArrow />}
                label="Podcast Exclusivo"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  height: 32,
                  '& .MuiChip-icon': {
                    color: 'white'
                  }
                }}
              />
            </Box>
          </Box>
          
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              maxWidth: 700,
              mx: 'auto',
              mb: 3,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 500,
              lineHeight: 1.4
            }}
          >
            Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 900,
              mx: 'auto',
              mb: 6,
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            Explore tendências, inovação, destinos, cultura, experiências e sustentabilidade. 
            Histórias que inspiram e transformam o setor turístico em uma força para o desenvolvimento local e global.
          </Typography>

          {/* Features Grid */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 6 }}>
            {podcastFeatures.map((feature, index) => (
              <Chip
                key={index}
                icon={feature.icon}
                label={feature.text}
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  height: 40,
                  px: 2,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}10`,
                    borderColor: theme.palette.primary.dark,
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Episódios Recentes Section */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Episódios Recentes
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 6 }}>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Box key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ height: 200, background: theme.palette.grey[200], animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ height: 20, background: theme.palette.grey[300], mb: 2, borderRadius: 1 }} />
                      <Box sx={{ height: 16, background: theme.palette.grey[300], mb: 1, borderRadius: 1 }} />
                      <Box sx={{ height: 16, background: theme.palette.grey[300], mb: 2, borderRadius: 1, width: '70%' }} />
                      <Box sx={{ height: 24, background: theme.palette.grey[300], borderRadius: 1 }} />
                    </CardContent>
                  </Card>
                </Box>
              ))
            ) : error ? (
              // Error state
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                  Erro ao carregar episódios
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usando dados de exemplo
                </Typography>
              </Box>
            ) : podcastData?.data?.episodes && podcastData.data.episodes.length > 0 ? (
              podcastData.data.episodes.map((episode: PodcastEpisode) => (
              <Box key={episode.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      background: episode.imageUrl 
                        ? `url(${episode.imageUrl}) center/cover no-repeat`
                        : episode.gradient,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: episode.imageUrl 
                          ? 'rgba(0, 0, 0, 0.4)'
                          : 'rgba(0, 0, 0, 0.1)',
                        opacity: 0.7,
                      }
                    }}
                  >
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h4"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {episode.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {episode.description}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Chip
                        icon={<AccessTime />}
                        label={episode.duration}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        icon={<CalendarToday />}
                        label={episode.date}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        }
                      }}
                      onClick={() => {
                        window.open(episode.spotifyUrl || 'https://open.spotify.com/show/0Gk72vRhktUvbiYGEcuKCT', '_blank');
                      }}
                    >
                      Ouvir no Spotify
                    </Button>
                  </CardActions>
                </Card>
                </Box>
              ))
            ) : (
              // No episodes state
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Nenhum episódio disponível
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Os episódios serão carregados em breve
                </Typography>
              </Box>
            )}
          </Box>

          {/* Player Principal */}
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'transparent',
              border: `2px solid ${theme.palette.divider}`,
              boxShadow: `
                0 20px 40px ${theme.palette.primary.main}15,
                0 0 0 1px ${theme.palette.primary.main}10
              `,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `
                  0 32px 64px ${theme.palette.primary.main}25,
                  0 0 0 1px ${theme.palette.primary.main}20
                `,
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '400px' : '500px',
                '& iframe': {
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 'inherit',
                }
              }}
            >
              <iframe
                src="https://open.spotify.com/embed/show/0Gk72vRhktUvbiYGEcuKCT?utm_source=generator&theme=0"
                title="Vozes do Turismo - Podcast"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </Box>
          </Box>

          {/* Bottom Info */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <MusicNote sx={{ fontSize: 16 }} />
              Disponível no Spotify
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Public sx={{ fontSize: 16 }} />
              Integrado ao Blog da Plataforma VAR
            </Typography>
          </Stack>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 32px ${theme.palette.primary.main}40`,
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                window.open('https://open.spotify.com/show/0Gk72vRhktUvbiYGEcuKCT', '_blank');
              }}
            >
              Ouvir no Spotify
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PodcastSection;
