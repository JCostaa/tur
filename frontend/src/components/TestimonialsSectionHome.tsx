import React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Rating, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward, Star, VerifiedUser, LocationOn, AccessTime } from '@mui/icons-material';
import { theme } from '../theme/theme';
import { useAutoSlide } from '../hooks/useAutoSlide';

interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  occupation?: string;
  rating: number;
  title: string;
  content: string;
  image?: string;
  avatar?: string;
  visitDate: string;
  experience: string;
  verified?: boolean;
  helpful?: number;
}

interface TestimonialsSectionHomeProps {
  testimonials: TestimonialItem[];
  isLoading?: boolean;
  onTestimonialClick?: (id: number) => void;
  onViewAllClick?: () => void;
}

const TestimonialCard = styled(Card)({
  height: '100%',
  borderRadius: 20,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  background: 'white',
  border: '1px solid rgba(0,0,0,0.04)',
  position: 'relative',
  
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  }
});

const TestimonialContent = styled(CardContent)({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const TestimonialHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
  gap: 12,
});

const TestimonialAvatar = styled(Avatar)({
  width: 56,
  height: 56,
  border: `3px solid ${theme.palette.primary.light}20`,
});

const TestimonialUserInfo = styled(Box)({
  flex: 1,
});

const TestimonialName = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 2,
});

const TestimonialLocation = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: theme.palette.text.secondary,
  fontSize: '0.85rem',
});

const TestimonialOccupation = styled(Typography)({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
});

const TestimonialRating = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 16,
});

const VerifiedBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  background: '#e8f5e8',
  color: '#2e7d32',
  padding: '4px 8px',
  borderRadius: 12,
  fontSize: '0.75rem',
  fontWeight: 500,
});

const TestimonialTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 12,
  lineHeight: 1.3,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const TestimonialText = styled(Typography)({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: 16,
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  flexGrow: 1,
});

const TestimonialFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 'auto',
  paddingTop: 16,
  borderTop: '1px solid #f0f4f8',
});

const TestimonialMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
});

const TestimonialMetaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const QuoteIcon = styled(Box)({
  position: 'absolute',
  top: 16,
  right: 16,
  fontSize: '2rem',
  color: theme.palette.primary.main + '20',
  fontFamily: 'Georgia, serif',
  fontWeight: 'bold',
});

const CarouselContainer = styled(Box)({
  position: 'relative',
  padding: '0 20px',
});

const MobileArrowsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  marginBottom: 24,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
});

const ArrowCounter = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  minWidth: 80,
  textAlign: 'center',
});


const LoadingSkeleton: React.FC = () => (
  <div style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {[1, 2, 3].map((item) => (
      <Card key={item} sx={{ height: '100%', borderRadius: 3, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: '#f0f0f0' }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 16, bgcolor: '#f0f0f0', borderRadius: 1, mb: 1, width: '70%' }} />
            <Box sx={{ height: 12, bgcolor: '#f0f0f0', borderRadius: 1, width: '50%' }} />
          </Box>
        </Box>
        <Box sx={{ height: 20, bgcolor: '#f0f0f0', borderRadius: 1, mb: 2, width: '80%' }} />
        <Box sx={{ height: 16, bgcolor: '#f0f0f0', borderRadius: 1, mb: 1 }} />
        <Box sx={{ height: 16, bgcolor: '#f0f0f0', borderRadius: 1, mb: 1 }} />
        <Box sx={{ height: 16, bgcolor: '#f0f0f0', borderRadius: 1, mb: 2, width: '60%' }} />
        <Box sx={{ height: 12, bgcolor: '#f0f0f0', borderRadius: 1, width: '40%' }} />
      </Card>
    ))}
  </div>
);

const TestimonialsSectionHome: React.FC<TestimonialsSectionHomeProps> = ({
  testimonials,
  isLoading = false,
  onTestimonialClick,
  onViewAllClick
}) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const cardsPerView = isMobile ? 1 : 3;
  
  // Hook para slide automático
  const {
    currentIndex: startIndex,
    goToNext: handleNext,
    goToPrevious: handlePrev,
    canGoNext: canGoForward,
    canGoPrevious: canGoBack
  } = useAutoSlide({
    totalItems: testimonials.length,
    itemsPerView: cardsPerView,
    autoSlideInterval: 6000, // 6 segundos para depoimentos (mais tempo para ler)
    enabled: testimonials.length > cardsPerView
  });
  const handleTestimonialClick = (testimonial: TestimonialItem) => {
    if (onTestimonialClick) {
      onTestimonialClick(testimonial.id);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getExperienceLabel = (experience: string) => {
    const labels: { [key: string]: string } = {
      tours: 'Tours',
      restaurants: 'Restaurantes',
      accommodations: 'Hospedagens',
      events: 'Eventos',
      agencies: 'Agências'
    };
    return labels[experience] || experience;
  };

  // Mostrar depoimentos com base no carrossel
  const displayTestimonials = testimonials.slice(startIndex, startIndex + cardsPerView);

  // Estilos para as setas
  const arrowStyleDesktop = {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 24,
    color: muiTheme.palette.primary.main,
    opacity: 0.95,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-50%) scale(1.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  };

  const arrowStyleMobile = {
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 20,
    color: muiTheme.palette.primary.main,
    transition: 'all 0.2s ease',
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  };

  if (!testimonials.length && !isLoading) {
    return null;
  }

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ 
          color: theme.palette.primary.main, 
          fontWeight: 600, 
          letterSpacing: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 8 
        }}>
          <Star style={{ fontSize: 18 }} />
          DEPOIMENTOS
        </h3>
        <h1 style={{ 
          fontSize: 36, 
          fontWeight: 700, 
          margin: '8px 0 0 0', 
          color: theme.palette.text.primary 
        }}>
          dos visitantes
        </h1>
      </div>

      {isLoading ? (
        <div style={{ padding: '0 20px' }}>
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {/* Setas de navegação Mobile - acima dos cards */}
          {isMobile && testimonials.length > cardsPerView && (
            <MobileArrowsContainer>
              <button
                aria-label="Voltar"
                style={{
                  ...arrowStyleMobile,
                  opacity: canGoBack ? 1 : 0.3
                }}
                onClick={handlePrev}
                disabled={!canGoBack}
              >
                &#8592;
              </button>
              <ArrowCounter>
                {startIndex + 1} de {testimonials.length}
              </ArrowCounter>
              <button
                aria-label="Avançar"
                style={{
                  ...arrowStyleMobile,
                  opacity: canGoForward ? 1 : 0.3
                }}
                onClick={handleNext}
                disabled={!canGoForward}
              >
                &#8594;
              </button>
            </MobileArrowsContainer>
          )}

          <CarouselContainer>
            {/* Setas de navegação Desktop - laterais */}
            {!isMobile && testimonials.length > cardsPerView && (
              <>
                <button
                  aria-label="Voltar"
                  style={{ 
                    ...arrowStyleDesktop, 
                    left: 20,
                    opacity: canGoBack ? 0.95 : 0.3
                  }}
                  onClick={handlePrev}
                  disabled={!canGoBack}
                >
                  &#8592;
                </button>
                <button
                  aria-label="Avançar"
                  style={{ 
                    ...arrowStyleDesktop, 
                    right: 20,
                    opacity: canGoForward ? 0.95 : 0.3
                  }}
                  onClick={handleNext}
                  disabled={!canGoForward}
                >
                  &#8594;
                </button>
              </>
            )}

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
              gap: '24px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {displayTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} onClick={() => handleTestimonialClick(testimonial)}>
                <QuoteIcon>"</QuoteIcon>
                <TestimonialContent>
                  <TestimonialHeader>
                    <TestimonialAvatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                    >
                      {testimonial.name.charAt(0)}
                    </TestimonialAvatar>
                    <TestimonialUserInfo>
                      <TestimonialName>{testimonial.name}</TestimonialName>
                      <TestimonialLocation>
                        <LocationOn style={{ fontSize: 14 }} />
                        <span>{testimonial.location}</span>
                      </TestimonialLocation>
                      {testimonial.occupation && (
                        <TestimonialOccupation>{testimonial.occupation}</TestimonialOccupation>
                      )}
                    </TestimonialUserInfo>
                  </TestimonialHeader>

                  <TestimonialRating>
                    <Rating value={testimonial.rating} readOnly size="small" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {testimonial.rating}.0
                    </span>
                    {testimonial.verified && (
                      <VerifiedBadge>
                        <VerifiedUser style={{ fontSize: 12 }} />
                        Verificado
                      </VerifiedBadge>
                    )}
                  </TestimonialRating>

                  <TestimonialTitle>{testimonial.title}</TestimonialTitle>
                  <TestimonialText>{testimonial.content}</TestimonialText>

                  <TestimonialFooter>
                    <TestimonialMeta>
                      <TestimonialMetaItem>
                        <AccessTime style={{ fontSize: 14 }} />
                        <span>{formatDate(testimonial.visitDate)}</span>
                      </TestimonialMetaItem>
                      <TestimonialMetaItem>
                        <span>{getExperienceLabel(testimonial.experience)}</span>
                      </TestimonialMetaItem>
                    </TestimonialMeta>
                  </TestimonialFooter>
                </TestimonialContent>
              </TestimonialCard>
              ))}
            </div>
          </CarouselContainer>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <button
          style={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onClick={handleViewAllClick}
        >
          Ver mais depoimentos
          <ArrowForward style={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSectionHome;
