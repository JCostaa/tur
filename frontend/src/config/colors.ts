// Configuração de cores baseada na logo de Livramento
// Cores extraídas diretamente da logo oficial
export const brandColors = {
  // Cores principais da logo Livramento (extraídas da logo real)
  primary: {
    green: '#43A047', // Verde - elemento do brasão
    greenLight: '#66BB6A', // Verde claro
    greenDark: '#2E7D32', // Verde escuro
    gold: '#FFC107', // Amarelo vibrante - cor dominante do logo
    goldLight: '#FFD54F', // Amarelo claro brilhante
    goldDark: '#FF8F00', // Laranja dourado do gradiente
    red: '#D84315', // Laranja terracota - produtos artesanais
    black: '#3E2723', // Marrom escuro - letras "LIVRAMENTO"
  },
  
  // Cores da logo original (mantidas para compatibilidade)
  legacy: {
    orange: '#ff6b35', // Laranja-avermelhado do "Viva"
    teal: '#2c5f2d', // Verde escuro do "BARRA DO BUGRES"
    fish: '#008080', // Azul-petróleo do peixe
    sun: '#ffd700', // Amarelo-alaranjado do sol
    leaf: '#228b22', // Verde das folhas
    leafOrange: '#ff8c00', // Laranja da folha com padrão
  },
  
  // Cores derivadas de Livramento (baseadas nas cores reais da logo)
  secondary: {
    // Cores derivadas do verde
    greenMuted: '#66BB6A', // Verde suave
    greenDeep: '#1B5E20', // Verde profundo
    
    // Cores derivadas do amarelo/laranja
    goldMuted: '#FFEB3B', // Amarelo suave
    goldDeep: '#F57C00', // Laranja profundo
    
    // Cores derivadas do laranja terracota
    redLight: '#FF8A65', // Laranja claro
    redDark: '#BF360C', // Laranja escuro/terracota
    
    // Cores legadas (mantidas para compatibilidade)
    lightTeal: '#4a7c59',
    darkOrange: '#e55a2b',
    lightOrange: '#ff8a65',
    mutedTeal: '#1e3d1e',
  },
  
  // Cores neutras
  neutral: {
    white: '#ffffff',
    black: '#000000',
    darkGray: '#333333',
    lightGray: '#f5f5f5',
    gray: '#666666',
  },
  
  // Gradientes de Livramento (baseados nas cores reais da logo)
  gradients: {
    // Gradiente principal - amarelo para laranja (logo principal)
    primary: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)',
    
    // Gradiente secundário - amarelo para laranja terracota
    secondary: 'linear-gradient(135deg, #FFD54F 0%, #D84315 100%)',
    
    // Gradiente hero - amarelo vibrante para laranja dourado
    hero: 'linear-gradient(135deg, #FFC107 0%, #F57C00 100%)',
    
    // Gradiente sunset - amarelo para laranja escuro
    sunset: 'linear-gradient(135deg, #FFD54F 0%, #BF360C 100%)',
    
    // Gradiente natural - amarelo para verde
    natural: 'linear-gradient(135deg, #FFC107 0%, #43A047 100%)',
    
    // Gradiente aquático - amarelo claro para amarelo escuro
    aquatic: 'linear-gradient(135deg, #FFD54F 0%, #FF8F00 100%)',
    
    // Gradientes legados (mantidos para compatibilidade)
    legacyPrimary: 'linear-gradient(135deg, #ff6b35 0%, #ff8c00 100%)',
    legacySecondary: 'linear-gradient(135deg, #2c5f2d 0%, #4a7c59 100%)',
    legacyHero: 'linear-gradient(135deg, #008080 0%, #2c5f2d 100%)',
    legacySunset: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
  },
  
  // Cores de estado de Livramento (baseadas nas cores reais da logo)
  states: {
    hover: '#FFD54F', // Amarelo claro para hover
    active: '#FF8F00', // Laranja para estado ativo
    disabled: '#cccccc',
    success: '#43A047', // Verde para sucesso
    warning: '#FB8C00', // Laranja para avisos
    error: '#D32F2F', // Vermelho para erros
    info: '#1565C0', // Azul do brasão para informações
  }
};

// Tema Material-UI baseado nas cores reais da logo de Livramento
export const themeColors = {
  palette: {
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
  },
};

export default brandColors; 