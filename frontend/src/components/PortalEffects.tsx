import React from 'react';
import { Box, keyframes } from '@mui/material';

// Animações personalizadas
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface PortalEffectsProps {
  /** Tipo de efeito de fundo */
  variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  /** Se deve incluir partículas flutuantes */
  showParticles?: boolean;
  /** Se deve incluir efeito de brilho */
  showShimmer?: boolean;
  /** Intensidade dos efeitos (0-1) */
  intensity?: number;
}

const PortalEffects: React.FC<PortalEffectsProps> = ({
  variant = 'primary',
  showParticles = true,
  showShimmer = false,
  intensity = 0.6,
}) => {
  const getBackgroundGradient = () => {
    switch (variant) {
      case 'primary':
        return 'radial-gradient(circle at 30% 40%, rgba(255, 107, 53, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(44, 95, 45, 0.15) 0%, transparent 50%)';
      case 'secondary':
        return 'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 128, 128, 0.15) 0%, transparent 50%)';
      case 'accent':
        return 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)';
      case 'dark':
        return 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)';
      default:
        return 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)';
    }
  };

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getBackgroundGradient(),
          opacity: intensity,
        }}
      />

      {/* Shimmer Effect */}
      {showShimmer && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 100%
            )`,
            backgroundSize: '200% 100%',
            animation: `${shimmer} 3s ease-in-out infinite`,
          }}
        />
      )}

      {/* Floating Particles */}
      {showParticles && particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${
              particle.id % 2 === 0 
                ? `rgba(255, 215, 0, ${0.1 * intensity})` 
                : `rgba(0, 128, 128, ${0.08 * intensity})`
            } 0%, transparent 70%)`,
            animation: `${float} ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Rotating Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          border: `2px solid rgba(255, 107, 53, ${0.2 * intensity})`,
          animation: `${rotate} 20s linear infinite`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            borderRadius: '50%',
            border: `1px solid rgba(255, 215, 0, ${0.3 * intensity})`,
            animation: `${rotate} 15s linear infinite reverse`,
          },
        }}
      />

      {/* Pulsing Elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `rgba(44, 95, 45, ${0.1 * intensity})`,
          animation: `${pulse} 4s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `rgba(255, 140, 0, ${0.15 * intensity})`,
          animation: `${pulse} 3s ease-in-out infinite`,
          animationDelay: '1s',
        }}
      />
    </Box>
  );
};

export default PortalEffects;
