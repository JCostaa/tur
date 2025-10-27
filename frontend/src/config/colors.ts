// Configuração de cores baseada na logo "É de LIVRAMENTO"
// Cores extraídas diretamente da logo amarela/laranja
export const brandColors = {
  // Cores principais da logo (amarelo/laranja vibrante)
  primary: {
    green: '#FFA500', // Substituído por laranja principal
    greenLight: '#FFD700', // Substituído por amarelo dourado
    greenDark: '#FF8C00', // Substituído por laranja escuro
    gold: '#FFD700', // Amarelo dourado
    goldLight: '#FFF4CC', // Amarelo clarinho
    goldDark: '#FF8C00', // Laranja escuro
    red: '#FF6B35', // Laranja avermelhado
    black: '#663300', // Marrom escuro (texto)
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
  
  // Cores derivadas (baseadas na paleta amarela/laranja)
  secondary: {
    // Cores derivadas do amarelo
    greenMuted: '#FFC107', // Âmbar
    greenDeep: '#FF9800', // Laranja médio
    
    // Cores derivadas do laranja
    goldMuted: '#FFEB3B', // Amarelo vibrante
    goldDeep: '#F57C00', // Laranja profundo
    
    // Cores derivadas do laranja avermelhado
    redLight: '#FFB74D', // Laranja claro
    redDark: '#E65100', // Laranja escuro profundo
    
    // Cores complementares
    lightTeal: '#FFD54F', // Amarelo suave
    darkOrange: '#F57F17', // Laranja escuro vibrante
    lightOrange: '#FFCC80', // Laranja pastel
    mutedTeal: '#FF6F00', // Laranja médio escuro
  },
  
  // Cores neutras
  neutral: {
    white: '#ffffff',
    black: '#000000',
    darkGray: '#333333',
    lightGray: '#f5f5f5',
    gray: '#666666',
  },
  
  // Gradientes (baseados na paleta amarela/laranja)
  gradients: {
    // Gradiente principal - amarelo para laranja
    primary: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    
    // Gradiente secundário - laranja para amarelo
    secondary: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
    
    // Gradiente hero - amarelo para laranja escuro
    hero: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
    
    // Gradiente sunset - amarelo para laranja avermelhado
    sunset: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
    
    // Gradiente warm - laranja claro para laranja escuro
    natural: 'linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)',
    
    // Gradiente vibrante - amarelo claro para laranja
    aquatic: 'linear-gradient(135deg, #FFF4CC 0%, #FFA500 100%)',
    
    // Gradientes legados (atualizados para amarelo/laranja)
    legacyPrimary: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
    legacySecondary: 'linear-gradient(135deg, #FFA500 0%, #FF6B35 100%)',
    legacyHero: 'linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)',
    legacySunset: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
  },
  
  // Cores de estado (baseadas na paleta amarela/laranja)
  states: {
    hover: '#FFD700', // Amarelo dourado para hover
    active: '#FF8C00', // Laranja escuro para estado ativo
    disabled: '#cccccc',
    success: '#FFA500', // Laranja para sucesso
    warning: '#FF8C00', // Laranja escuro para avisos
    error: '#FF6B35', // Laranja avermelhado para erros
    info: '#FFC107', // Âmbar para informações
  }
};

// Tema Material-UI baseado nas cores amarela/laranja da logo
export const themeColors = {
  palette: {
    primary: {
      main: brandColors.primary.green, // Laranja principal
      light: brandColors.primary.greenLight, // Amarelo dourado
      dark: brandColors.primary.greenDark, // Laranja escuro
      contrastText: brandColors.neutral.white,
    },
    secondary: {
      main: brandColors.primary.gold, // Amarelo dourado
      light: brandColors.primary.goldLight, // Amarelo claro
      dark: brandColors.primary.goldDark, // Laranja escuro
      contrastText: brandColors.neutral.white,
    },
    background: {
      default: '#FFF8E7', // Fundo creme/bege claro
      paper: brandColors.neutral.white,
    },
    text: {
      primary: brandColors.primary.black, // Marrom escuro
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