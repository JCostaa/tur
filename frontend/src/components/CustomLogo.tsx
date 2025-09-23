import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

// Animação de zoom suave (pulso)
const zoomPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

interface CustomLogoProps {
  height?: number;
  width?: number;
  variant?: 'default' | 'white' | 'dark' | 'header' | 'preloader';
  className?: string;
  showText?: boolean;
}

const LogoContainer = styled(Box)<{ variant?: string, hasimage?: boolean }>(({ variant, hasimage }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
  // Destaque extra quando há imagem
  ...(hasimage && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120%',
      height: '120%',
      background: variant === 'header'
        ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(0,123,255,0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover::after': {
      opacity: 1,
    },
  }),
}));

const StyledImage = styled('img')<CustomLogoProps & { variant?: string }>(({ height = 60, width, variant }) => ({
  height: `${height}px`,
  width: width ? `${width}px` : 'auto',
  objectFit: 'contain',
  display: 'block',
  // Estilo especial para preloader (sem fundo)
  ...(variant === 'preloader' ? {
    borderRadius: 0,
    padding: 0,
    background: 'transparent',
    backdropFilter: 'none',
    border: 'none',
    boxShadow: 'none',
    transition: 'transform 0.3s ease',
    cursor: 'default',
    position: 'relative',
    animation: `${zoomPulse} 4s ease-in-out infinite`,
  } : {
    borderRadius: '12px',
    padding: '8px',
    background: variant === 'header' 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
      : 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))',
    backdropFilter: 'blur(8px)',
    border: variant === 'header' 
      ? '1px solid rgba(255,255,255,0.3)'
      : '1px solid rgba(0,0,0,0.1)',
    boxShadow: variant === 'header'
      ? '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(255,255,255,0.2) inset'
      : '0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(255,255,255,0.3) inset',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    animation: `${zoomPulse} 3s ease-in-out infinite`,
  }),
  // Efeitos especiais apenas se não for preloader
  ...(variant !== 'preloader' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: variant === 'header'
        ? 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3))'
        : 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
      borderRadius: '14px',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      transform: 'scale(1.25) translateY(-6px) rotate(2deg)',
      boxShadow: variant === 'header'
        ? '0 20px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(255,255,255,0.5) inset'
        : '0 15px 50px rgba(0,0,0,0.4), 0 6px 16px rgba(255,255,255,0.6) inset',
      animation: 'none', // Para o pulso durante o hover
      '&::before': {
        opacity: 1,
      },
    },
  }),
  // Hover simples para preloader
  ...(variant === 'preloader' && {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }),
}));

const LogoText = styled(Typography)<{ customvariant?: string }>(({ theme, customvariant }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  fontSize: '22px',
  letterSpacing: '0.8px',
  textTransform: 'none', // Removido uppercase
  color: customvariant === 'white' ? '#fff' : 
         customvariant === 'dark' ? '#333' : 
         customvariant === 'header' ? '#fff' :
         theme.palette.primary.main,
  textDecoration: 'none',
  textShadow: customvariant === 'header' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  background: customvariant === 'header' 
    ? 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
    : 'transparent',
  borderRadius: '8px',
  padding: '4px 8px',
  backdropFilter: customvariant === 'header' ? 'blur(4px)' : 'none',
  border: customvariant === 'header' ? '1px solid rgba(255,255,255,0.2)' : 'none',
  '&:hover': {
    opacity: 0.9,
    transform: 'scale(1.02)',
    background: customvariant === 'header' 
      ? 'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
      : 'rgba(255,255,255,0.05)',
    textShadow: customvariant === 'header' ? '0 2px 6px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.2)',
  },
  // Responsividade
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
    letterSpacing: '0.6px',
    padding: '3px 6px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    letterSpacing: '0.4px',
    padding: '2px 4px',
  },
}));

const CustomLogo: React.FC<CustomLogoProps> = ({ 
  height = 60, 
  width, 
  variant = 'default',
  className,
  showText = true
}) => {
  // Buscar configurações do .env
  const logoUrl = import.meta.env.VITE_CUSTOM_LOGO_URL;
  const businessName = import.meta.env.VITE_BUSINESS_NAME || 'Sistema de Turismo';
  const showBusinessName = import.meta.env.VITE_SHOW_BUSINESS_NAME === 'true';
  
  // Debug logs (apenas em desenvolvimento)
  if (import.meta.env.DEV) {
    console.log('🏷️ CustomLogo - Configurações:', {
      logoUrl,
      businessName,
      showBusinessName,
      hasLogo: !!logoUrl,
      variant
    });
  }

  // Se tem logo customizada, usar ela com destaque especial
  if (logoUrl) {
    // Aumentar tamanho da logo para dar mais destaque
    const logoHeight = height * 1.4; // 40% maior
    
    return (
      <LogoContainer variant={variant} className={className} hasimage={true}>
        <StyledImage 
          src={logoUrl}
          alt={businessName}
          height={logoHeight}
          width={width}
          variant={variant}
          onError={(e) => {
            console.error('❌ Erro ao carregar logo customizada:', logoUrl);
            // Se erro, ocultar imagem - o componente pai vai lidar com o fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        {showBusinessName && showText && (
          <LogoText customvariant={variant}>
            {businessName}
          </LogoText>
        )}
      </LogoContainer>
    );
  }

  // Se não tem logo, mostrar apenas o nome
  return (
    <LogoContainer variant={variant} className={className}>
      <LogoText customvariant={variant}>
        {businessName}
      </LogoText>
    </LogoContainer>
  );
};

export default CustomLogo;
