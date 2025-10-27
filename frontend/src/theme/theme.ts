import { createTheme } from '@mui/material/styles';
import { brandColors } from '../config/colors';

/**
 * Função para criar tema dinâmico baseado em cores personalizadas
 * @param customColors - Cores personalizadas do .env ou cores padrão
 */
export const createCustomTheme = (customColors?: any) => {
  // Se não há cores personalizadas, usar cores amarela/laranja da logo
  const colors = customColors || {
    primary: {
      main: brandColors.primary.green, // Laranja principal (#FFA500)
      light: brandColors.primary.greenLight, // Amarelo dourado (#FFD700)
      dark: brandColors.primary.greenDark, // Laranja escuro (#FF8C00)
      contrastText: brandColors.neutral.white,
    },
    secondary: {
      main: brandColors.primary.gold, // Amarelo dourado (#FFD700)
      light: brandColors.primary.goldLight, // Amarelo claro (#FFF4CC)
      dark: brandColors.primary.goldDark, // Laranja escuro (#FF8C00)
      contrastText: brandColors.neutral.white,
    },
    background: {
      default: '#FFF8E7', // Fundo creme/bege claro
      paper: brandColors.neutral.white,
    },
    text: {
      primary: brandColors.primary.black, // Marrom escuro (#663300)
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