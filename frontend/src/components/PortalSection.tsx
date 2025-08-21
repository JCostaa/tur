import React from 'react';
import { Box, Container, Typography, Fade } from '@mui/material';
import { brandColors } from '../config/colors';
import PortalEffects from './PortalEffects';

interface PortalSectionProps {
  /** Conteúdo da seção */
  children: React.ReactNode;
  /** Título da seção */
  title?: string;
  /** Subtítulo da seção */
  subtitle?: string;
  /** Ícone da seção */
  icon?: React.ReactNode;
  /** Tema de cores da seção */
  variant?: 'light' | 'dark' | 'gradient' | 'ocean' | 'sunset';
  /** Se deve mostrar efeitos de portal */
  showEffects?: boolean;
  /** Altura mínima da seção */
  minHeight?: string;
  /** Padding vertical */
  py?: number | object;
  /** ID da seção para navegação */
  id?: string;
}

const PortalSection: React.FC<PortalSectionProps> = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'light',
  showEffects = true,
  minHeight = '100vh',
  py = { xs: 8, md: 12 },
  id,
}) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'dark':
        return {
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
        };
      case 'gradient':
        return {
          background: brandColors.gradients.hero,
          color: 'white',
        };
      case 'ocean':
        return {
          background: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #bbe1fa 100%)',
          color: 'white',
        };
      case 'sunset':
        return {
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%)',
          color: 'white',
        };
      case 'light':
      default:
        return {
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          color: brandColors.neutral.darkGray,
        };
    }
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <Box
      id={id}
      sx={{
        ...backgroundStyle,
        minHeight,
        py,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Portal Effects */}
      {showEffects && (
        <PortalEffects
          variant={variant === 'light' ? 'primary' : variant === 'dark' ? 'dark' : 'secondary'}
          showParticles={true}
          showShimmer={variant === 'gradient' || variant === 'sunset'}
          intensity={0.7}
        />
      )}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        {(title || subtitle || icon) && (
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              {icon && (
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: variant === 'light' 
                      ? 'rgba(255, 107, 53, 0.1)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    mb: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  }}
                >
                  {icon}
                </Box>
              )}

              {title && (
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: subtitle ? 2 : 0,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    background: variant === 'light' 
                      ? brandColors.gradients.secondary 
                      : 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: variant === 'light' ? 'transparent' : 'inherit',
                    textShadow: variant !== 'light' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  {title}
                </Typography>
              )}

              {subtitle && (
                <Typography
                  variant="h6"
                  sx={{
                    color: variant === 'light' 
                      ? brandColors.neutral.gray 
                      : 'rgba(255, 255, 255, 0.8)',
                    maxWidth: 700,
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', md: '1.2rem' }
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Fade>
        )}

        {/* Content */}
        <Fade in timeout={1200}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {children}
          </Box>
        </Fade>
      </Container>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 4,
          background: variant === 'light' 
            ? brandColors.gradients.primary 
            : 'rgba(255, 255, 255, 0.3)',
          borderRadius: 2,
          opacity: 0.6,
        }}
      />
    </Box>
  );
};

export default PortalSection;
