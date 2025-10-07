import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { theme } from '../theme/theme';
import CustomLogo from './CustomLogo';

interface PreloaderProps {
  isLoading: boolean;
}

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
`;

// Styled Components
const PreloaderContainer = styled(Box)<{ isVisible: boolean }>(({ isVisible }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: isVisible ? `${fadeIn} 0.6s ease-out` : `${fadeOut} 0.6s ease-in forwards`,
  padding: theme.spacing(3),
  minHeight: '100vh',
  
  // Padrão de fundo mais sutil e elegante
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.6,
  },
  
  // Overlay moderno com gradiente radial
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  
  // Responsividade
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const LogoContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: `${fadeIn} 1s ease-out 0.2s both`,
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
});

const LogoWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '24px',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15)
  `,
  animation: `${pulse} 3s ease-in-out infinite`,
  
  // Efeito de brilho sutil
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
    opacity: 0.6,
    pointerEvents: 'none',
  },
  
  '& img': {
    maxWidth: '120px',
    maxHeight: '80px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
    zIndex: 1,
    position: 'relative',
  },
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5),
    borderRadius: '20px',
    
    '& img': {
      maxWidth: '100px',
      maxHeight: '70px',
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '16px',
    
    '& img': {
      maxWidth: '90px',
      maxHeight: '60px',
    },
  },
});

const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: 500,
  width: '100%',
  padding: theme.spacing(0, 4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    maxWidth: 400,
    padding: theme.spacing(0, 3),
    gap: theme.spacing(1.5),
  },
  
  [theme.breakpoints.down('sm')]: {
    maxWidth: 320,
    padding: theme.spacing(0, 2),
    gap: theme.spacing(1),
  },
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: 'white',
  fontFamily: '"Playfair Display", serif',
  animation: `${fadeIn} 1s ease-out 0.5s both`,
  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  letterSpacing: '0.8px',
  textAlign: 'center',
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    fontSize: '1.7rem',
    letterSpacing: '0.6px',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    letterSpacing: '0.4px',
  },
});

const Subtitle = styled(Typography)({
  fontSize: '1.1rem',
  color: 'rgba(255,255,255,0.92)',
  lineHeight: 1.6,
  animation: `${fadeIn} 1s ease-out 0.8s both`,
  textShadow: '0 1px 6px rgba(0,0,0,0.25)',
  fontWeight: 400,
  textAlign: 'center',
  maxWidth: '400px',
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    maxWidth: '350px',
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
    maxWidth: '280px',
  },
});

const ProgressContainer = styled(Box)({
  width: '100%',
  maxWidth: 320,
  animation: `${fadeIn} 1s ease-out 1.1s both`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  
  // Responsividade
  [theme.breakpoints.down('md')]: {
    maxWidth: 280,
  },
  
  [theme.breakpoints.down('sm')]: {
    maxWidth: 240,
    gap: theme.spacing(1.5),
  },
});

const StyledLinearProgress = styled(LinearProgress)({
  width: '100%',
  height: 4,
  borderRadius: 8,
  backgroundColor: 'rgba(255,255,255,0.15)',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
  
  '& .MuiLinearProgress-bar': {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 0 12px rgba(255,255,255,0.6), 0 2px 4px rgba(255,255,255,0.3)',
    position: 'relative',
    
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      borderRadius: 8,
    },
  },
});

const LoadingText = styled(Typography)({
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.88)',
  animation: `${pulse} 1.5s ease-in-out infinite`,
  fontWeight: 400,
  letterSpacing: '0.4px',
  textAlign: 'center',
  
  // Responsividade
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    letterSpacing: '0.3px',
  },
});

const DotAnimation = styled('span')({
  '&::after': {
    content: '"..."',
    animation: `${pulse} 1.5s ease-in-out infinite`,
    display: 'inline-block',
  },
});

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState('Carregando experiências');

  React.useEffect(() => {
    if (isLoading) {
      // Simular progresso mais realista
      const progressTimer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            return 100;
          }
          
          let increment;
          if (oldProgress < 30) {
            increment = Math.random() * 15 + 5; // 5-20% nos primeiros 30%
          } else if (oldProgress < 70) {
            increment = Math.random() * 10 + 2; // 2-12% no meio
          } else {
            increment = Math.random() * 5 + 1; // 1-6% no final
          }
          
          return Math.min(oldProgress + increment, 100);
        });
      }, 300);

      // Alterar texto de loading dinamicamente
      const textTimer = setInterval(() => {
        const texts = [
          'Carregando experiências',
          'Buscando notícias',
          'Preparando depoimentos',
          'Organizando conteúdo',
          'Finalizando...'
        ];
        setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
      }, 1500);

      return () => {
        clearInterval(progressTimer);
        clearInterval(textTimer);
      };
    }
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <PreloaderContainer isVisible={isLoading}>
      <LogoContainer>
        <LogoWrapper>
          <CustomLogo 
            height={60} 
            variant="preloader" 
          />
        </LogoWrapper>
      </LogoContainer>

      <ContentContainer>
        <Title>
          Sistema de Turismo
        </Title>
        
        <Subtitle>
          Carregando as melhores experiências turísticas para você...
        </Subtitle>

        <ProgressContainer>
          <StyledLinearProgress 
            variant="determinate" 
            value={progress}
          />
          <LoadingText>
            {loadingText}<DotAnimation />
          </LoadingText>
        </ProgressContainer>
      </ContentContainer>
    </PreloaderContainer>
  );
};

export default Preloader;
