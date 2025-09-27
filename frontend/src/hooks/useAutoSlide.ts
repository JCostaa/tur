import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAutoSlideProps {
  totalItems: number;
  itemsPerView: number;
  autoSlideInterval?: number; // em milissegundos
  enabled?: boolean;
}

interface UseAutoSlideReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  reset: () => void;
}

export const useAutoSlide = ({
  totalItems,
  itemsPerView,
  autoSlideInterval = 4000, // 4 segundos por padrão
  enabled = true
}: UseAutoSlideProps): UseAutoSlideReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calcula se pode avançar ou voltar
  const canGoNext = currentIndex + itemsPerView < totalItems;
  const canGoPrevious = currentIndex > 0;

  // Função para ir para o próximo slide (sempre reinicia do começo)
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      const nextIndex = prev + itemsPerView;
      if (nextIndex >= totalItems) {
        return 0; // Volta para o início quando chega ao final
      }
      return nextIndex;
    });
  }, [itemsPerView, totalItems]);

  // Função para ir para o slide anterior
  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentIndex(prev => prev - itemsPerView);
    } else {
      // Vai para o último conjunto quando está no início
      const lastIndex = Math.floor((totalItems - 1) / itemsPerView) * itemsPerView;
      setCurrentIndex(lastIndex);
    }
  }, [canGoPrevious, itemsPerView, totalItems]);

  // Função para resetar o slide
  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  // Efeito para gerenciar o intervalo do slide automático
  useEffect(() => {
    if (!enabled || totalItems <= itemsPerView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, totalItems, itemsPerView, autoSlideInterval, goToNext]);

  // Limpa o intervalo quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    setCurrentIndex,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    reset
  };
};

export default useAutoSlide;
