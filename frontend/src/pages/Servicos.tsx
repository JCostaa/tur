import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Public, Hotel, Restaurant, Visibility, Star } from '@mui/icons-material';
import { brandColors } from '../config/colors';

const servicos = [
  {
    titulo: 'O que fazer',
    descricao: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
    icone: <Public sx={{ fontSize: 56, color: brandColors.primary.teal }} />,
  },
  {
    titulo: 'Onde dormir',
    descricao: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
    icone: <Hotel sx={{ fontSize: 56, color: brandColors.primary.teal }} />,
  },
  {
    titulo: 'Onde comer',
    descricao: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
    icone: <Visibility sx={{ fontSize: 56, color: brandColors.primary.teal }} />,
  },
  {
    titulo: 'Onde comprar',
    descricao: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
    icone: <Star sx={{ fontSize: 56, color: brandColors.primary.teal }} />,
  },
];

const Servicos: React.FC = () => {
  return (
    <Box sx={{ background: brandColors.neutral.lightGray, minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography
          variant="h6"
          sx={{
            color: brandColors.primary.teal,
            textAlign: 'center',
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
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            color: brandColors.neutral.darkGray,
          }}
        >
          Segmentos
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 5 },
          justifyContent: 'center',
        }}>
          {servicos.map((servico, idx) => (
            <Card
              key={servico.titulo}
              sx={{
                width: '100%',
                border: `2px solid ${brandColors.primary.teal}`,
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(44,95,45,0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s',
                p: { xs: 2, md: 3 },
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(44,95,45,0.10)',
                  borderColor: brandColors.primary.orange,
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2, py: { xs: 4, md: 6 } }}>
                <Box sx={{ mb: 2 }}>{servico.icone}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: brandColors.neutral.darkGray }}>
                  {servico.titulo}
                </Typography>
                <Typography variant="body1" sx={{ color: brandColors.neutral.gray }}>
                  {servico.descricao}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          {/* <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              borderRadius: 8,
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(44,95,45,0.10)',
            }}
          >
            Mais Serviços
          </Button> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Servicos; 