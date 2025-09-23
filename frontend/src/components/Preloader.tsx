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
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const logoAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(5deg) scale(1.1);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-5deg) scale(1.1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
`;

// Styled Components
const PreloaderContainer = styled(Box)<{ isVisible: boolean }>(({ isVisible }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: isVisible ? `${fadeIn} 0.5s ease-out` : `${fadeOut} 0.8s ease-in forwards`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const LogoContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(4),
  animation: `${logoAnimation} 3s ease-in-out infinite`,
});

const LogoIcon = styled(Box)({
  width: 160,
  height: 160,
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `
    0 30px 100px rgba(0,0,0,0.3),
    0 15px 50px rgba(0,0,0,0.2),
    inset 0 4px 8px rgba(255,255,255,0.9),
    0 0 0 2px rgba(255,255,255,0.9),
    0 0 40px rgba(255,255,255,0.3)
  `,
  fontSize: '4rem',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  animation: `${pulse} 2s ease-in-out infinite`,
  border: '8px solid rgba(255,255,255,0.95)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-12px',
    left: '-12px',
    right: '-12px',
    bottom: '-12px',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.4))',
    animation: `${logoAnimation} 4s linear infinite`,
    zIndex: -1,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '35%',
    height: '35%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 70%)',
    opacity: 0.7,
  },
  
  '& img': {
    borderRadius: '8px',
    maxWidth: '70%',
    maxHeight: '70%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
  }
});

const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: 400,
  padding: theme.spacing(0, 3),
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: 'white',
  marginBottom: theme.spacing(2),
  fontFamily: '"Playfair Display", serif',
  animation: `${fadeIn} 1s ease-out 0.5s both`,
});

const Subtitle = styled(Typography)({
  fontSize: '1.1rem',
  color: 'rgba(255,255,255,0.9)',
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
  animation: `${fadeIn} 1s ease-out 0.8s both`,
});

const ProgressContainer = styled(Box)({
  width: '100%',
  maxWidth: 300,
  animation: `${fadeIn} 1s ease-out 1.1s both`,
});

const StyledLinearProgress = styled(LinearProgress)({
  height: 6,
  borderRadius: 3,
  backgroundColor: 'rgba(255,255,255,0.2)',
  
  '& .MuiLinearProgress-bar': {
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
  },
});

const LoadingText = styled(Typography)({
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.8)',
  marginTop: theme.spacing(2),
  animation: `${pulse} 1.5s ease-in-out infinite`,
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
        <LogoIcon>
          <CustomLogo 
            height={80} 
            variant="preloader" 
          />
        </LogoIcon>
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
