// Configuração de cores baseada na logo RESEX Cuniã
// Cores extraídas diretamente da logo oficial
export const brandColors = {
  // Cores principais da logo Cuniã (extraídas da logo real)
  primary: {
    green: '#336633', // Verde - Réptil e vegetação
    greenLight: '#4A7C4A', // Verde claro
    greenDark: '#1A331A', // Verde escuro
    gold: '#E7A400', // Laranja/Ouro - Água e barco
    goldLight: '#FFCC00', // Ouro claro
    goldDark: '#B8860B', // Ouro escuro
    red: '#CC3333', // Vermelho - Calça da figura
    black: '#000000', // Preto - Contornos e aves
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
  
  // Cores derivadas da Cuniã (baseadas nas cores reais da logo)
  secondary: {
    // Cores derivadas do verde
    greenMuted: '#5A8A5A', // Verde suave
    greenDeep: '#2D4A2D', // Verde profundo
    
    // Cores derivadas do ouro
    goldMuted: '#F4D03F', // Ouro suave
    goldDeep: '#D4AF37', // Ouro profundo
    
    // Cores derivadas do vermelho
    redLight: '#E57373', // Vermelho claro
    redDark: '#A52A2A', // Vermelho escuro
    
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
  
  // Gradientes da Cuniã (baseados nas cores reais da logo)
  gradients: {
    // Gradiente principal - verde para ouro (natureza para água)
    primary: 'linear-gradient(135deg, #336633 0%, #E7A400 100%)',
    
    // Gradiente secundário - ouro para verde claro
    secondary: 'linear-gradient(135deg, #E7A400 0%, #4A7C4A 100%)',
    
    // Gradiente hero - verde escuro para ouro
    hero: 'linear-gradient(135deg, #1A331A 0%, #E7A400 100%)',
    
    // Gradiente sunset - ouro para vermelho
    sunset: 'linear-gradient(135deg, #E7A400 0%, #CC3333 100%)',
    
    // Gradiente natural - verde claro para verde escuro
    natural: 'linear-gradient(135deg, #4A7C4A 0%, #1A331A 100%)',
    
    // Gradiente aquático - ouro claro para ouro escuro
    aquatic: 'linear-gradient(135deg, #FFCC00 0%, #B8860B 100%)',
    
    // Gradientes legados (mantidos para compatibilidade)
    legacyPrimary: 'linear-gradient(135deg, #ff6b35 0%, #ff8c00 100%)',
    legacySecondary: 'linear-gradient(135deg, #2c5f2d 0%, #4a7c59 100%)',
    legacyHero: 'linear-gradient(135deg, #008080 0%, #2c5f2d 100%)',
    legacySunset: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
  },
  
  // Cores de estado da Cuniã (baseadas nas cores reais da logo)
  states: {
    hover: '#4A7C4A', // Verde claro para hover
    active: '#1A331A', // Verde escuro para estado ativo
    disabled: '#cccccc',
    success: '#336633', // Verde principal para sucesso
    warning: '#E7A400', // Ouro para avisos
    error: '#CC3333', // Vermelho para erros
    info: '#336633', // Verde para informações
  }
};

// Tema Material-UI baseado nas cores reais da logo Cuniã
export const themeColors = {
  palette: {
    primary: {
      main: brandColors.primary.green,
      light: brandColors.primary.greenLight,
      dark: brandColors.primary.greenDark,
      contrastText: brandColors.neutral.white,
    },
    secondary: {
      main: brandColors.primary.gold,
      light: brandColors.primary.goldLight,
      dark: brandColors.primary.goldDark,
      contrastText: brandColors.neutral.white,
    },
    background: {
      default: '#F5F5DC', // Fundo bege claro
      paper: brandColors.neutral.white,
    },
    text: {
      primary: brandColors.primary.greenDark,
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