import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import brandColors from '../config/colors';

const SectionWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  backgroundColor: brandColors.neutral.white,
  overflow: 'hidden',
}));

const PromoImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.18)',
  },
  [theme.breakpoints.down('md')]: {
    borderRadius: theme.spacing(1),
  },
}));

const PromoImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'cover',
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 40%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(4),
  opacity: 0,
  transition: 'opacity 0.4s ease',
  '&:hover': {
    opacity: 1,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
  },
  [theme.breakpoints.down('sm')]: {
    opacity: 0,
    background: 'none',
  },
}));

const CallToAction = styled(Button)(({ theme }) => ({
  backgroundColor: brandColors.primary.gold,
  color: 'white',
  fontWeight: 700,
  padding: theme.spacing(1.8, 5),
  fontSize: '1.2rem',
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  boxShadow: '0 8px 30px rgba(255, 140, 0, 0.5)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    backgroundColor: brandColors.primary.goldDark,
    boxShadow: '0 12px 40px rgba(255, 140, 0, 0.7)',
    transform: 'scale(1.08) translateY(-4px)',
    border: '2px solid rgba(255, 255, 255, 0.6)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: theme.spacing(1.4, 3.5),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: 'center',
  display: 'none', // Escondido no desktop
  [theme.breakpoints.down('sm')]: {
    display: 'block', // Visível no mobile
    marginTop: theme.spacing(3),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  color: brandColors.primary.green,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  textAlign: 'center',
  color: brandColors.neutral.darkGray,
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(4),
  },
}));

interface PromoSectionProps {
  imageUrl?: string;
  linkUrl?: string;
  title?: string;
  subtitle?: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({
  imageUrl = '/images/teste.jpg',
  linkUrl = 'https://linktr.ee/resexcunia',
  title = 'Descubra Novos Mundos',
  subtitle = 'Explore nossas redes e conteúdos exclusivos',
}) => {
  const handleClick = () => {
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>
        
        <PromoImageContainer>
          <PromoImage 
            src={imageUrl} 
            alt="RESEX Cuniã - Descubra Novos Mundos" 
            loading="lazy"
          />
          <Overlay onClick={handleClick}>
            <CallToAction 
              variant="contained"
              size="large"
            >
              Acessar Linktree
            </CallToAction>
          </Overlay>
        </PromoImageContainer>
        
        <ButtonContainer>
          <CallToAction 
            variant="contained"
            size="large"
            onClick={handleClick}
          >
            Acessar Linktree
          </CallToAction>
        </ButtonContainer>
      </Container>
    </SectionWrapper>
  );
};

export default PromoSection;

