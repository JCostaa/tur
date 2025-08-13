import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  InputAdornment, 
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  IconButton,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Search, 
  Star, 
  Filter, 
  AccessTime, 
  Person, 
  LocationOn,
  Visibility,
  Share,
  ThumbUp,
  VerifiedUser,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getTestimonials, getTestimonialExperiences, getTestimonialStats } from '../../services/testimonials';
import type { TestimonialFilters } from '../../services/testimonials';
import { theme } from '../../theme/theme';

const PageContainer = styled(Box)({
  background: '#f8fafb',
  minHeight: '100vh',
});

const HeroSection = styled(Box)({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  padding: '100px 0 80px',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(180deg, transparent 0%, #f8fafb 100%)',
  }
});

const HeroContent = styled(Container)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
});

const HeroTitle = styled(Typography)({
  fontSize: '3.5rem',
  fontWeight: 800,
  marginBottom: 24,
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  
  '@media (max-width: 768px)': {
    fontSize: '2.5rem',
  }
});

const HeroSubtitle = styled(Typography)({
  fontSize: '1.25rem',
  opacity: 0.9,
  maxWidth: 700,
  margin: '0 auto',
  lineHeight: 1.6,
  fontWeight: 400,
});

const StatsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 48,
  marginTop: 40,
  
  '@media (max-width: 768px)': {
    gap: 24,
    flexDirection: 'column',
    alignItems: 'center',
  }
});

const StatItem = styled(Box)({
  textAlign: 'center',
  color: 'rgba(255,255,255,0.9)',
});

const StatNumber = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: 4,
});

const StatLabel = styled(Typography)({
  fontSize: '0.9rem',
  opacity: 0.8,
  textTransform: 'uppercase',
  letterSpacing: 1,
});

const ContentContainer = styled(Container)({
  paddingTop: 40,
  paddingBottom: 80,
  position: 'relative',
  zIndex: 1,
});

const FiltersSection = styled(Box)({
  background: 'white',
  borderRadius: 24,
  padding: 32,
  marginBottom: 48,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0,0,0,0.04)',
});

const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    backgroundColor: '#f8fafb',
    fontSize: '1.1rem',
    height: 56,
    border: 'none',
    '&:hover': {
      backgroundColor: '#f0f4f8',
    },
    '&.Mui-focused': {
      backgroundColor: '#f0f4f8',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
});

const FilterHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: '1px solid #f0f4f8',
});

const FilterTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginLeft: 8,
});

const CategoryGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: 12,
  marginTop: 24,
});

const CategoryChip = styled(Chip)<{ selected: boolean }>(({ selected }) => ({
  height: 48,
  borderRadius: 24,
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '12px 20px',
  background: selected 
    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
    : 'white',
  color: selected ? 'white' : theme.palette.text.primary,
  border: selected ? 'none' : '2px solid #f0f4f8',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&:hover': {
    background: selected 
      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
      : '#f8fafb',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderColor: selected ? 'transparent' : theme.palette.primary.light,
  },
  
  '& .MuiChip-label': {
    padding: 0,
  }
}));

// Featured Testimonial Card
const FeaturedTestimonialCard = styled(Card)({
  borderRadius: 24,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: 48,
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  background: 'white',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  }
});

const FeaturedContent = styled(Box)({
  padding: 40,
  display: 'flex',
  alignItems: 'center',
  gap: 32,
  
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
    gap: 24,
  }
});

const FeaturedAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}20`,
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
});

const FeaturedBadge = styled(Chip)({
  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c00 100%)',
  color: 'white',
  fontWeight: 600,
  marginBottom: 16,
  '& .MuiChip-icon': {
    color: 'white',
  }
});

// Regular Testimonial Card
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
  width: 48,
  height: 48,
  border: `2px solid ${theme.palette.primary.light}20`,
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

const TestimonialTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
  lineHeight: 1.4,
  marginBottom: 12,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  color: theme.palette.text.primary,
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

const MetadataLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const MetadataItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
});

const MetadataRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const ActionButton = styled(IconButton)({
  width: 36,
  height: 36,
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    color: theme.palette.primary.main,
    background: theme.palette.primary.light + '20',
  }
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

// Layout Components
const TestimonialsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: 32,
  marginBottom: 60,
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  gap: 16,
});

const LoadingText = styled(Typography)({
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 60,
  marginBottom: 40,
});

const StyledPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    borderRadius: 12,
    fontWeight: 600,
    margin: '0 4px',
    minWidth: 44,
    height: 44,
    fontSize: '1rem',
    
    '&.Mui-selected': {
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      color: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    
    '&:hover:not(.Mui-selected)': {
      background: theme.palette.primary.light + '20',
    }
  },
});

const NoResultsContainer = styled(Box)({
  textAlign: 'center',
  padding: 80,
  background: 'white',
  borderRadius: 24,
  marginTop: 40,
});

const Testimonials: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TestimonialFilters>({
    page: 1,
    limit: 12,
    sortBy: 'visitDate',
    sortOrder: 'desc'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { data: testimonialsData, isLoading: testimonialsLoading, error: testimonialsError } = useQuery({
    queryKey: ['testimonials', filters],
    queryFn: () => getTestimonials(filters),
    enabled: true,
    retry: 1,
  });

  const { data: experiences, isLoading: experiencesLoading } = useQuery({
    queryKey: ['testimonialExperiences'],
    queryFn: getTestimonialExperiences,
    enabled: true,
    retry: 1,
  });

  const { data: stats } = useQuery({
    queryKey: ['testimonialStats'],
    queryFn: () => import('../../services/testimonials').then(m => m.getTestimonialStats()),
    enabled: true,
    retry: 1,
  });

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1
    }));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleExperienceFilter = (experience: string) => {
    setFilters(prev => ({
      ...prev,
      experience: prev.experience === experience ? undefined : experience,
      page: 1
    }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestimonialClick = (id: number) => {
    navigate(`/testimonials/${id}`);
  };

  const handleShare = (testimonial: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: testimonial.title,
        text: testimonial.content,
        url: `${window.location.origin}/testimonials/${testimonial.id}`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
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

  const allExperiences = ['Todas', ...(experiences || [])];
  const featuredTestimonial = testimonialsData?.data?.find(item => item.featured) || testimonialsData?.data?.[0];
  const regularTestimonials = testimonialsData?.data?.filter(item => item.id !== featuredTestimonial?.id) || [];

  return (
    <Layout>
      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent maxWidth="lg">
            <Fade in timeout={800}>
              <Box>
                <HeroTitle>
                  <Star style={{ fontSize: '4rem', marginRight: 16, verticalAlign: 'middle' }} />
                  Portal de Depoimentos
                </HeroTitle>
                <HeroSubtitle>
                  Descubra as experiências reais de quem visitou Barra do Bugres. 
                  Histórias autênticas de aventuras, gastronomia e hospitalidade pantaneira.
                </HeroSubtitle>
                <StatsContainer>
                  <StatItem>
                    <StatNumber>{stats?.total || 0}</StatNumber>
                    <StatLabel>Depoimentos</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>{stats?.averageRating || 0}</StatNumber>
                    <StatLabel>Avaliação Média</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>{stats?.verified || 0}</StatNumber>
                    <StatLabel>Verificados</StatLabel>
                  </StatItem>
                </StatsContainer>
              </Box>
            </Fade>
          </HeroContent>
        </HeroSection>

        <ContentContainer maxWidth="xl">
          {/* Search & Filters */}
          <Zoom in timeout={600}>
            <FiltersSection>
              <FilterHeader>
                <Filter color="primary" />
                <FilterTitle>Buscar e Filtrar Depoimentos</FilterTitle>
              </FilterHeader>
              
              <SearchField
                fullWidth
                placeholder="Buscar por nome, local, experiência..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {!experiencesLoading && (
                <CategoryGrid>
                  {allExperiences.map((experience) => (
                    <CategoryChip
                      key={experience}
                      label={getExperienceLabel(experience)}
                      selected={
                        (experience === 'Todas' && !filters.experience) ||
                        filters.experience === experience
                      }
                      onClick={() => handleExperienceFilter(experience === 'Todas' ? 'all' : experience)}
                    />
                  ))}
                </CategoryGrid>
              )}
            </FiltersSection>
          </Zoom>

          {testimonialsLoading ? (
            <LoadingContainer>
              <CircularProgress size={60} color="primary" />
              <LoadingText>Carregando depoimentos...</LoadingText>
            </LoadingContainer>
          ) : testimonialsError ? (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
              Erro ao carregar depoimentos. Tente novamente.
            </Alert>
          ) : (
            <>
              {/* Featured Testimonial */}
              {featuredTestimonial && filters.page === 1 && (
                <Fade in timeout={600}>
                  <FeaturedTestimonialCard onClick={() => handleTestimonialClick(featuredTestimonial.id)}>
                    <FeaturedContent>
                      <FeaturedAvatar 
                        src={featuredTestimonial.avatar} 
                        alt={featuredTestimonial.name}
                      >
                        {featuredTestimonial.name.charAt(0)}
                      </FeaturedAvatar>
                      <Box sx={{ flex: 1 }}>
                        <FeaturedBadge 
                          icon={<TrendingUp />} 
                          label="Depoimento em Destaque" 
                        />
                        <Typography variant="h4" sx={{ 
                          fontWeight: 700, 
                          marginBottom: 1,
                          color: theme.palette.text.primary 
                        }}>
                          {featuredTestimonial.title}
                        </Typography>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          marginBottom: 2,
                          color: theme.palette.primary.main 
                        }}>
                          {featuredTestimonial.name} • {featuredTestimonial.location}
                        </Typography>
                        <Rating value={featuredTestimonial.rating} readOnly sx={{ mb: 2 }} />
                        <Typography variant="body1" sx={{ 
                          fontSize: '1.1rem', 
                          lineHeight: 1.6,
                          color: theme.palette.text.secondary,
                          marginBottom: 2
                        }}>
                          {featuredTestimonial.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime />
                            <Typography>{formatDate(featuredTestimonial.visitDate)}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{getExperienceLabel(featuredTestimonial.experience)}</Typography>
                          </Box>
                          {featuredTestimonial.verified && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                              <VerifiedUser />
                              <Typography>Verificado</Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </FeaturedContent>
                  </FeaturedTestimonialCard>
                </Fade>
              )}

              {/* Regular Testimonials Grid */}
              <TestimonialsGrid>
                {regularTestimonials.map((testimonial, index) => (
                  <Fade in timeout={800 + index * 100} key={testimonial.id}>
                    <TestimonialCard onClick={() => handleTestimonialClick(testimonial.id)}>
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
                          </TestimonialUserInfo>
                          <Rating value={testimonial.rating} readOnly size="small" />
                        </TestimonialHeader>

                        <TestimonialTitle>{testimonial.title}</TestimonialTitle>
                        <TestimonialText>{testimonial.content}</TestimonialText>

                        <TestimonialFooter>
                          <MetadataLeft>
                            <MetadataItem>
                              <AccessTime style={{ fontSize: 14 }} />
                              <span>{formatDate(testimonial.visitDate)}</span>
                            </MetadataItem>
                            <MetadataItem>
                              <span>{getExperienceLabel(testimonial.experience)}</span>
                            </MetadataItem>
                          </MetadataLeft>
                          <MetadataRight>
                            <ActionButton
                              onClick={(e) => handleShare(testimonial, e)}
                              title="Compartilhar"
                            >
                              <Share />
                            </ActionButton>
                            <ActionButton title="Útil">
                              <ThumbUp />
                            </ActionButton>
                          </MetadataRight>
                        </TestimonialFooter>
                      </TestimonialContent>
                    </TestimonialCard>
                  </Fade>
                ))}
              </TestimonialsGrid>

              {/* Pagination */}
              {testimonialsData?.meta && testimonialsData.meta.totalPages > 1 && (
                <PaginationContainer>
                  <StyledPagination
                    count={testimonialsData.meta.totalPages}
                    page={testimonialsData.meta.page}
                    onChange={handlePageChange}
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </PaginationContainer>
              )}

              {/* No Results */}
              {testimonialsData?.data && testimonialsData.data.length === 0 && (
                <NoResultsContainer>
                  <Star style={{ fontSize: '4rem', opacity: 0.3, marginBottom: 16 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
                    Nenhum depoimento encontrado
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                    Tente ajustar seus filtros ou termos de busca
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setFilters({ page: 1, limit: 12, sortBy: 'visitDate', sortOrder: 'desc' });
                      setSearchTerm('');
                    }}
                    sx={{ borderRadius: 3 }}
                  >
                    Limpar Filtros
                  </Button>
                </NoResultsContainer>
              )}
            </>
          )}
        </ContentContainer>
      </PageContainer>
    </Layout>
  );
};

export default Testimonials;
