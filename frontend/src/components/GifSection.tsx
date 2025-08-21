import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '../config/colors';

interface BannerItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const GifSection: React.FC = () => {
  const banners: BannerItem[] = [
    {
      src: '/images/banners/GIF Biz (1).gif',
      alt: 'Planejamento Estratégico',
      title: 'Planejamento estratégico, capacitação e conexão.',
      description: 'O turismo comunitário fortalecido na prática!'
    },
    {
      src: '/images/banners/GIF TBC (1).gif', 
      alt: 'Plataforma VAR',
      title: 'VAR PLATAFORMA DE INTELIGÊNCIA TURÍSTICA',
      description: 'Transforme o turismo com tecnologia, inovação e estratégia em um só lugar!'
    },
    
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        py: { xs: 4, md: 6 },
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        {/* Banner superior - Verde */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            mb: 3,
            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minHeight: { xs: 200, md: 280 },
              position: 'relative'
            }}
          >
            {/* Conteúdo do lado esquerdo */}
            <Box
              sx={{
                flex: { xs: 1, md: '0 0 60%' },
                p: { xs: 3, md: 4 },
                color: 'white',
                zIndex: 2
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.8)',
                  mb: 1
                }}
              >
                PUBLICIDADE
              </Typography>
              
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Planejamento estratégico,<br />
                capacitação e conexão.{' '}
                <Box component="span" sx={{ color: '#81C784' }}>
                  O turismo<br />
                  comunitário fortalecido na prática!
                </Box>
              </Typography>

              {/* Tags/Badges */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 3 }}>
                <Box sx={{ 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  SAIBA MAIS
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  💻 WWW.TUR.BR
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  📞 (65) 99202 0 TURMA)
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  🎯 TURISMO DE BASE COMUNITÁRIA
                </Box>
              </Box>
            </Box>

            {/* Imagem do lado direito */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                flex: '0 0 40%',
                height: 280,
                position: 'relative'
              }}
            >
              <Box
                component="img"
                src="/images/banners/GIF Biz (1).gif"
                alt="Turismo Comunitário"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>

            {/* Elemento decorativo verde no canto */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 120px 120px 0',
                borderColor: 'transparent #81C784 transparent transparent'
              }}
            />
          </Box>
        </Box>

        {/* Banner inferior - Azul */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minHeight: { xs: 200, md: 280 },
              position: 'relative'
            }}
          >
            {/* Conteúdo do lado esquerdo */}
            <Box
              sx={{
                flex: { xs: 1, md: '0 0 60%' },
                p: { xs: 3, md: 4 },
                color: 'white',
                zIndex: 2
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2.2rem' },
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                <Box component="span" sx={{ color: '#FFD54F' }}>VAR</Box><br />
                PLATAFORMA DE INTELIGÊNCIA<br />
                TURÍSTICA
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 500,
                  mb: 3,
                  color: '#E1F5FE'
                }}
              >
                var.tur.br
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  mb: 3,
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.4
                }}
              >
                Transforme o turismo com tecnologia,<br />
                inovação e estratégia em um só lugar!
              </Typography>

              {/* Tags/Badges */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Box sx={{ 
                  backgroundColor: '#FFD54F', 
                  color: '#1565C0', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  📱 (65) 9 9642-2740
                </Box>
                <Box sx={{ 
                  backgroundColor: '#FF9800', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  📧 CONTATO@VAR.TUR.BR
                </Box>
              </Box>
            </Box>

            {/* Logo/Imagem do lado direito */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flex: '0 0 40%',
                height: 280,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Logo VAR circulado */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF9800 0%, #FFD54F 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  VAR
                </Typography>
              </Box>

              {/* Elementos decorativos circulares */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.2)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </Box>

            {/* Elementos decorativos de conectividade */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: 'rgba(255,255,255,0.3)',
                fontSize: '24px'
              }}
            >
              ⚡ 📊 🔗 💡
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GifSection;
