import { useMemo } from 'react';
import { brandColors } from '../config/colors';

/**
 * Hook personalizado para obter cores personalizadas do .env
 * Similar ao sistema de logo customizada, permite definir cores via variáveis de ambiente
 */
export const useCustomColors = () => {
  const customColors = useMemo(() => {
    // Cores primárias do .env (fallback para cores padrão)
    const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || brandColors.primary.orange;
    const primaryLight = import.meta.env.VITE_PRIMARY_LIGHT || brandColors.secondary.lightOrange;
    const primaryDark = import.meta.env.VITE_PRIMARY_DARK || brandColors.secondary.darkOrange;

    // Cores secundárias do .env (fallback para cores padrão)
    const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR || brandColors.primary.teal;
    const secondaryLight = import.meta.env.VITE_SECONDARY_LIGHT || brandColors.secondary.lightTeal;
    const secondaryDark = import.meta.env.VITE_SECONDARY_DARK || brandColors.secondary.mutedTeal;

    // Cores opcionais
    const backgroundColor = import.meta.env.VITE_BACKGROUND_COLOR || brandColors.neutral.white;
    const textColor = import.meta.env.VITE_TEXT_COLOR || brandColors.neutral.darkGray;

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
        hasCustomPrimary: !!import.meta.env.VITE_PRIMARY_COLOR,
        hasCustomSecondary: !!import.meta.env.VITE_SECONDARY_COLOR,
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
    const hasCustomPrimary = !!import.meta.env.VITE_PRIMARY_COLOR;
    const hasCustomSecondary = !!import.meta.env.VITE_SECONDARY_COLOR;
    
    return {
      hasCustomPrimary,
      hasCustomSecondary,
      hasAnyCustomColors: hasCustomPrimary || hasCustomSecondary,
    };
  }, []);
};

export default useCustomColors;
