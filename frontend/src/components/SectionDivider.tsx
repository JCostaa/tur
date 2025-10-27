import React from 'react';
import { Box } from '@mui/material';
import CurvedDivider from './CurvedDivider';
import { env } from '../env';

interface SectionDividerProps {
  /** Índice da seção para determinar se deve mostrar o divisor */
  sectionIndex: number;
  /** Se deve ser a versão invertida (curva para baixo) */
  inverted?: boolean;
  /** Altura do divisor */
  height?: number;
  /** Cor personalizada para o divisor */
  color?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  sectionIndex, 
  inverted = false,
  height = 120,
  color
}) => {
  // Cores da paleta da Cuniã Porto Velho
  const colors = [
    env.VITE_PRIMARY_COLOR,      // Amarelo dourado
    env.VITE_SECONDARY_COLOR,    // Verde floresta
    env.VITE_PRIMARY_LIGHT,      // Amarelo claro
    env.VITE_ACCENT_COLOR,       // Laranja vibrante
    env.VITE_SECONDARY_LIGHT,    // Verde claro
  ];

  // Varia a cor baseado no índice da seção
  const selectedColor = color || colors[sectionIndex % colors.length];
  
  // Varia o estilo da onda (1-5) baseado no índice
  const waveVariant = ((sectionIndex % 5) + 1) as 1 | 2 | 3 | 4 | 5;

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        marginTop: '-2px', // Remove gaps
        marginBottom: '-2px',
      }}
    >
      <CurvedDivider 
        height={height}
        inverted={inverted}
        backgroundColor={selectedColor}
        variant={waveVariant}
      />
    </Box>
  );
};

export default SectionDivider;
