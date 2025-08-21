import React from 'react';
import { Box } from '@mui/material';

interface CurvedDividerProps {
  /** Altura do divisor em pixels */
  height?: number;
  /** Se deve ser a versão invertida (curva para baixo) */
  inverted?: boolean;
  /** Cor de fundo do divisor */
  backgroundColor?: string;
}

const CurvedDivider: React.FC<CurvedDividerProps> = ({ 
  height = 80, 
  inverted = false,
  backgroundColor = '#FF8C00' // Cor laranja
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        transform: inverted ? 'rotate(180deg)' : 'none',
        zIndex: 1
      }}
    >
      {/* SVG para criar a curva */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <path
          d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
          fill={backgroundColor}
        />
      </svg>
      
      {/* Gradiente sutil para dar mais profundidade */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(${inverted ? '180deg' : '0deg'}, 
            ${backgroundColor}00 0%, 
            ${backgroundColor}20 50%, 
            ${backgroundColor}00 100%)`,
          zIndex: 2
        }}
      />
    </Box>
  );
};

export default CurvedDivider;
