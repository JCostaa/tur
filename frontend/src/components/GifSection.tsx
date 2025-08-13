import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '../config/colors';

interface GifItem {
  src: string;
  alt: string;
  title: string;
}

const GifSection: React.FC = () => {
  const gifs: GifItem[] = [
    {
      src: '/images/banners/GIF Biz (1).gif',
      alt: 'GIF Biz',
      title: 'Negócios Locais'
    },
    {
      src: '/images/banners/GIF TBC (1).gif',
      alt: 'GIF TBC',
      title: 'Turismo Sustentável'
    },
    {
      src: '/images/banners/GIF VAR (1).gif',
      alt: 'GIF VAR',
      title: 'Variedade de Opções'
    }
  ];

  return (
    <Box
      sx={{
        background: brandColors.gradients.secondary,
        py: 6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Overlay com padrão */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(44, 95, 45, 0.1)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.1) 0%, transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(0, 128, 128, 0.1) 0%, transparent 70%)
          `,
          zIndex: 1
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Título da seção */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: brandColors.neutral.white,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Descubra Barra do Bugres
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: brandColors.neutral.white,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Explore as belezas naturais e a rica cultura da nossa região
          </Typography>
        </Box>

        {/* Layout de GIFs responsivo */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',                    // 1 coluna no mobile
              sm: 'repeat(2, 1fr)',         // 2 colunas no tablet
              md: 'repeat(3, 1fr)'          // 3 colunas no desktop
            },
            gap: 3,
            justifyItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: { xs: 2, sm: 0 }       // Padding no mobile
          }}
        >
          {gifs.map((gif, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: { xs: '100%', sm: 350, md: 320 },
                aspectRatio: '16/9',              // Proporção fixa para o container
                backgroundColor: 'rgba(0,0,0,0.1)', // Fundo caso a imagem não preencha
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                }
              }}
            >
              {/* GIF */}
              <Box
                component="img"
                src={gif.src}
                alt={gif.alt}
                sx={{
                  width: '100%',
                  height: '100%',                 // Altura total do container
                  objectFit: 'contain',           // Não corta a imagem
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              
              {/* Overlay com título */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: brandColors.neutral.white,
                  p: 2,
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {gif.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Call to action */}
        <Box textAlign="center" mt={5}>
          <Typography
            variant="body1"
            sx={{
              color: brandColors.neutral.white,
              opacity: 0.9,
              fontSize: '1.1rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Venha viver momentos inesquecíveis em Barra do Bugres!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GifSection;
