import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import brandColors from '../config/colors';

// Importe os logos disponíveis. Use placeholders para os que não existem.
import logoCentelha from '../../public/images/footer/centelha.png'; // Placeholder
import logoFapemat from '../../public/images/footer/fapemat.png'; // Placeholder
import logoConfap from '../../public/images/footer/confap.png'; // Placeholder
import logoCNPq from '../../public/images/footer/cnpq.png'; // Placeholder
import logoCerti from '../../public/images/footer/certi.png'; // Placeholder
import logoFNDCT from '../../public/images/footer/fndct.png'; // Placeholder
import logoFinep from '../../public/images/footer/finep.png'; // Placeholder
import logoMCTI from '../../public/images/footer/ministerio.png'; // Placeholder

const LogoImg = styled('img')({
  maxHeight: 60, // tamanho intermediário
  maxWidth: 160,
  margin: '0 12px 16px 12px',
  objectFit: 'contain',
  backgroundColor: 'transparent',
  borderRadius: 8,
  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  },
});

const SectionTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: 20,
  color: brandColors.primary.teal,
  marginBottom: 16,
  textAlign: 'center',
});

const Footer: React.FC = () => (
  <Box component="footer" sx={{
    background: brandColors.neutral.white,
    borderTop: `1px solid ${brandColors.neutral.lightGray}`,
    py: { xs: 4, md: 6 },
    px: 2,
    mt: 8,
  }}>
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          textAlign: 'center',
          py: { xs: 2, md: 3 },
          // Removido background, borderRadius e boxShadow
        }}
      >
        {/* Apoio */}
        <Box flex={1} sx={{ mb: { xs: 4, md: 0 } }}>
          <SectionTitle>Apoio</SectionTitle>
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <LogoImg src={logoCentelha} alt="Centelha" />
            <LogoImg src={logoFapemat} alt="Fapemat" />
          </Box>
        </Box>
        {/* Parceria */}
        <Box flex={1} sx={{ mb: { xs: 4, md: 0 } }}>
          <SectionTitle>Parceria</SectionTitle>
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <LogoImg src={logoConfap} alt="Confap" />
            <LogoImg src={logoCNPq} alt="CNPq" />
            <LogoImg src={logoCerti} alt="Certi" />
          </Box>
        </Box>
        {/* Realização */}
        <Box flex={1}>
          <SectionTitle>Realização</SectionTitle>
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <LogoImg src={logoFNDCT} alt="FNDCT" />
            <LogoImg src={logoFinep} alt="Finep" />
            <LogoImg src={logoMCTI} alt="MCTI" />
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer; 