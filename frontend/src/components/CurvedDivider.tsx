import React from 'react';
import { Box } from '@mui/material';

interface CurvedDividerProps {
  /** Altura do divisor em pixels */
  height?: number;
  /** Se deve ser a versão invertida (curva para baixo) */
  inverted?: boolean;
  /** Cor de fundo do divisor */
  backgroundColor?: string;
  /** Variação do estilo da onda (1-5) */
  variant?: 1 | 2 | 3 | 4 | 5;
}

const CurvedDivider: React.FC<CurvedDividerProps> = ({ 
  height = 120, 
  inverted = false,
  backgroundColor = '#F9A825', // Amarelo dourado da Cuniã
  variant = 1
}) => {
  // Estilos de ondas mais sofisticados e orgânicos
  const wavePatterns = {
    // Rio Madeira - Ondas suaves e fluidas
    1: "M0,50 C200,80 400,20 600,50 C800,80 1000,20 1200,50 L1200,120 L0,120 Z",
    
    // Floresta Amazônica - Múltiplas camadas
    2: "M0,40 C150,70 300,30 450,60 C600,90 750,30 900,60 C1050,90 1150,40 1200,60 L1200,120 L0,120 Z M0,70 C200,85 400,65 600,75 C800,85 1000,65 1200,75 L1200,120 L0,120 Z",
    
    // Pôr do Sol - Onda dramática e ampla
    3: "M0,30 C300,90 600,90 900,30 C1000,50 1100,30 1200,40 L1200,120 L0,120 Z",
    
    // Corredeiras - Ondas dinâmicas e irregulares
    4: "M0,50 C80,75 150,25 220,50 C300,80 380,20 460,55 C540,85 620,25 700,50 C780,75 860,35 940,60 C1020,85 1100,30 1200,55 L1200,120 L0,120 Z",
    
    // Cachoeira - Queda dramática
    5: "M0,70 C200,30 400,70 600,20 C750,50 900,70 1050,30 C1150,60 1200,70 1200,70 L1200,120 L0,120 Z"
  };

  // Paleta de cores temática amazônica
  const secondaryColor = variant % 2 === 0 ? '#2E7D32' : '#FDD835';
  const tertiaryColor = variant % 3 === 0 ? '#66BB6A' : '#FF6F00';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        transform: inverted ? 'rotate(180deg)' : 'none',
        zIndex: 1,
      }}
    >
      {/* Fundo gradiente multicamadas */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 30% 50%, ${backgroundColor}10, transparent 50%),
            radial-gradient(ellipse at 70% 50%, ${secondaryColor}10, transparent 50%),
            linear-gradient(${inverted ? '180deg' : '0deg'}, transparent 0%, ${backgroundColor}08 100%)
          `,
        }}
      />

      {/* SVG - Camada de fundo decorativa */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.25,
        }}
      >
        <defs>
          <linearGradient id={`gradient-bg-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tertiaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={tertiaryColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d={wavePatterns[variant]}
          fill={`url(#gradient-bg-${variant})`}
        />
      </svg>

      {/* SVG - Camada intermediária */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      >
        <defs>
          <linearGradient id={`gradient-mid-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.7" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d={wavePatterns[variant]}
          fill={`url(#gradient-mid-${variant})`}
        />
      </svg>

      {/* SVG - Onda principal (gradiente sofisticado) */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 -2px 8px rgba(0,0,0,0.1))',
        }}
      >
        <defs>
          <linearGradient id={`gradient-main-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={backgroundColor} stopOpacity="0.85" />
            <stop offset="30%" stopColor={backgroundColor} stopOpacity="1" />
            <stop offset="70%" stopColor={backgroundColor} stopOpacity="1" />
            <stop offset="100%" stopColor={backgroundColor} stopOpacity="0.85" />
          </linearGradient>
          
          {/* Textura para dar profundidade */}
          <pattern id={`texture-${variant}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1" fill="white" opacity="0.1" />
          </pattern>
        </defs>
        <path
          d={wavePatterns[variant]}
          fill={`url(#gradient-main-${variant})`}
        />
        <path
          d={wavePatterns[variant]}
          fill={`url(#texture-${variant})`}
        />
      </svg>




      {/* Glass morphism overlay - efeito moderno (menos blur para não desfocar elementos) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: `linear-gradient(to bottom, 
            rgba(255, 255, 255, 0.12) 0%, 
            rgba(255, 255, 255, 0.03) 50%,
            transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Reflexos de luz (sunrays) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '200%',
          height: '50%',
          background: `
            radial-gradient(ellipse at center, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 70%)
          `,
          transform: 'translateX(-50%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default CurvedDivider;
