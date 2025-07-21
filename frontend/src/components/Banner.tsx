import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const bannerImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'; // Troque pela imagem real depois

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 500 },
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay escuro */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 32, 91, 0.5)',
          zIndex: 1,
        }}
      />
      {/* Conteúdo centralizado */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ letterSpacing: 2, mb: 1 }}>
          IMAGEM
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          001
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Frase de impacto 01
        </Typography>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Saiba +
        </Button>
        <Button variant="contained" color="secondary">
          Clique AQUI
        </Button>
      </Box>
    </Box>
  );
};

export default Banner; 