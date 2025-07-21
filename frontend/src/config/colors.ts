// Configuração de cores baseada na logo Viva Barra do Bugres
export const brandColors = {
  // Cores principais da logo
  primary: {
    orange: '#ff6b35', // Laranja-avermelhado do "Viva"
    teal: '#2c5f2d', // Verde escuro do "BARRA DO BUGRES"
    fish: '#008080', // Azul-petróleo do peixe
    sun: '#ffd700', // Amarelo-alaranjado do sol
    leaf: '#228b22', // Verde das folhas
    leafOrange: '#ff8c00', // Laranja da folha com padrão
  },
  
  // Cores derivadas
  secondary: {
    lightTeal: '#4a7c59', // Versão mais clara do teal
    darkOrange: '#e55a2b', // Versão mais escura do laranja
    lightOrange: '#ff8a65', // Versão mais clara do laranja
    mutedTeal: '#1e3d1e', // Versão mais escura do teal
  },
  
  // Cores neutras
  neutral: {
    white: '#ffffff',
    black: '#000000',
    darkGray: '#333333',
    lightGray: '#f5f5f5',
    gray: '#666666',
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, #ff6b35 0%, #ff8c00 100%)',
    secondary: 'linear-gradient(135deg, #2c5f2d 0%, #4a7c59 100%)',
    hero: 'linear-gradient(135deg, #008080 0%, #2c5f2d 100%)',
    sunset: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
  },
  
  // Cores de estado
  states: {
    hover: '#ff8a65',
    active: '#e55a2b',
    disabled: '#cccccc',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  }
};

// Tema Material-UI baseado nas cores da marca
export const themeColors = {
  palette: {
    primary: {
      main: brandColors.primary.orange,
      light: brandColors.secondary.lightOrange,
      dark: brandColors.secondary.darkOrange,
      contrastText: brandColors.neutral.white,
    },
    secondary: {
      main: brandColors.primary.teal,
      light: brandColors.secondary.lightTeal,
      dark: brandColors.secondary.mutedTeal,
      contrastText: brandColors.neutral.white,
    },
    background: {
      default: brandColors.neutral.white,
      paper: brandColors.neutral.white,
    },
    text: {
      primary: brandColors.neutral.darkGray,
      secondary: brandColors.neutral.gray,
    },
  },
};

export default brandColors; 