import { useMemo } from 'react';
import { brandColors } from '../config/colors';
import { env } from '../env';

/**
 * Hook personalizado para obter cores personalizadas do env.ts
 * Similar ao sistema de logo customizada, permite definir cores via configuração
 */
export const useCustomColors = () => {
  const customColors = useMemo(() => {
    // Cores primárias do env.ts (fallback para cores reais da logo de Livramento)
    const primaryColor = env.VITE_PRIMARY_COLOR || brandColors.primary.gold;
    const primaryLight = env.VITE_PRIMARY_LIGHT || brandColors.primary.goldLight;
    const primaryDark = env.VITE_PRIMARY_DARK || brandColors.primary.goldDark;

    // Cores secundárias do env.ts (fallback para cores reais da logo de Livramento)
    const secondaryColor = env.VITE_SECONDARY_COLOR || brandColors.primary.red;
    const secondaryLight = env.VITE_SECONDARY_LIGHT || brandColors.secondary.redLight;
    const secondaryDark = env.VITE_SECONDARY_DARK || brandColors.secondary.redDark;

    // Cores opcionais
    const backgroundColor = env.VITE_BACKGROUND_COLOR || '#FFF9E6';
    const textColor = env.VITE_TEXT_COLOR || '#5D4037';

    // Debug logs apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('🎨 Custom Colors - Configurações:', {
        primary: {
          main: primaryColor,
          light: primaryLight,
          dark: primaryDark,
        },
        secondary: {
          main: secondaryColor,
          light: secondaryLight,
          dark: secondaryDark,
        },
        background: backgroundColor,
        text: textColor,
        hasCustomPrimary: !!env.VITE_PRIMARY_COLOR,
        hasCustomSecondary: !!env.VITE_SECONDARY_COLOR,
      });
    }

    return {
      primary: {
        main: primaryColor,
        light: primaryLight,
        dark: primaryDark,
        contrastText: brandColors.neutral.white,
      },
      secondary: {
        main: secondaryColor,
        light: secondaryLight,
        dark: secondaryDark,
        contrastText: brandColors.neutral.white,
      },
      background: {
        default: backgroundColor,
        paper: brandColors.neutral.white,
      },
      text: {
        primary: textColor,
        secondary: brandColors.neutral.gray,
      },
      // Cores de estado permanecem fixas por serem padrão de UX
      success: {
        main: brandColors.states.success,
      },
      warning: {
        main: brandColors.states.warning,
      },
      error: {
        main: brandColors.states.error,
      },
    };
  }, []);

  return customColors;
};

/**
 * Hook para verificar se há cores personalizadas definidas
 */
export const useHasCustomColors = () => {
  return useMemo(() => {
    const hasCustomPrimary = !!env.VITE_PRIMARY_COLOR;
    const hasCustomSecondary = !!env.VITE_SECONDARY_COLOR;
    
    return {
      hasCustomPrimary,
      hasCustomSecondary,
      hasAnyCustomColors: hasCustomPrimary || hasCustomSecondary,
    };
  }, []);
};

export default useCustomColors;
