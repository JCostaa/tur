import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createCustomTheme } from './theme';
import { useCustomColors } from '../hooks/useCustomColors';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provider de tema personalizado que aplica cores dinâmicas baseadas no .env
 * Similar ao sistema de logo customizada, permite personalizar cores via variáveis de ambiente
 */
export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  // Obter cores personalizadas do .env
  const customColors = useCustomColors();
  
  // Criar tema dinâmico com as cores personalizadas
  const theme = React.useMemo(() => {
    return createCustomTheme(customColors);
  }, [customColors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
