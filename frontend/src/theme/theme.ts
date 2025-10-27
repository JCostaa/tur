import { createTheme } from '@mui/material/styles';
import { brandColors } from '../config/colors';

/**
 * Função para criar tema dinâmico baseado em cores personalizadas
 * @param customColors - Cores personalizadas do .env ou cores padrão
 */
export const createCustomTheme = (customColors?: any) => {
  // Se não há cores personalizadas, usar cores reais da logo de Livramento
  const colors = customColors || {
    primary: {
      main: brandColors.primary.gold,
      light: brandColors.primary.goldLight,
      dark: brandColors.primary.goldDark,
      contrastText: brandColors.neutral.white,
    },
    secondary: {
      main: brandColors.primary.red,
      light: brandColors.secondary.redLight,
      dark: brandColors.secondary.redDark,
      contrastText: brandColors.neutral.white,
    },
    background: {
      default: '#FFF9E6', // Amarelo claríssimo
      paper: brandColors.neutral.white,
    },
    text: {
      primary: '#5D4037', // Marrom para texto
      secondary: brandColors.neutral.gray,
    },
    success: {
      main: brandColors.states.success,
    },
    warning: {
      main: brandColors.states.warning,
    },
    error: {
      main: brandColors.states.error,
    },
    info: {
      main: brandColors.states.info,
    },
  };

  return createTheme({
    palette: colors,
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });
};

// Tema padrão para compatibilidade
export const theme = createCustomTheme();

export default theme; 