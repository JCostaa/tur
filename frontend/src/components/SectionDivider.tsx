import React from 'react';
import { Box } from '@mui/material';
import CurvedDivider from './CurvedDivider';

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
  height = 80,
  color = '#FF8C00' // Laranja padrão
}) => {
  // Determina se deve mostrar o divisor baseado no índice da seção
  // Mostra o divisor nas seções ímpares (1, 3, 5, etc.)
  const shouldShowDivider = sectionIndex % 2 === 1;

  if (!shouldShowDivider) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        marginTop: inverted ? 0 : '-1px', // Remove pequenas gaps
        marginBottom: inverted ? '-1px' : 0,
      }}
    >
      <CurvedDivider 
        height={height}
        inverted={inverted}
        backgroundColor={color}
      />
    </Box>
  );
};

export default SectionDivider;
