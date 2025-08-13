import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
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
  CardMedia,
  Avatar,
  Divider,
  Button,
  IconButton,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Search, 
  TrendingUp, 
  Filter, 
  CalendarToday, 
  Person, 
  AccessTime,
  Visibility,
  Share,
  Bookmark,
  BookmarkBorder,
  FiberNew,
  LocalFireDepartment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getNews, getNewsCategories } from '../../services/news';
import type { NewsFilters } from '../../services/news';
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

// Featured News Card (Hero)
const FeaturedNewsCard = styled(Card)({
  borderRadius: 24,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: 48,
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  }
});

const FeaturedImage = styled(CardMedia)({
  height: 400,
  position: 'relative',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
  }
});

const FeaturedContent = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 40,
  color: 'white',
  zIndex: 2,
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

// Regular News Card
const NewsCard = styled(Card)({
  height: '100%',
  borderRadius: 20,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  background: 'white',
  border: '1px solid rgba(0,0,0,0.04)',
  
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  }
});

const NewsImage = styled(CardMedia)({
  height: 240,
  position: 'relative',
});

const NewsContent = styled(CardContent)({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 240px)',
});

const NewsTitle = styled(Typography)({
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

const NewsExcerpt = styled(Typography)({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: 16,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  flexGrow: 1,
});

const NewsMetadata = styled(Box)({
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

// Layout Components
const NewsGrid = styled(Box)({
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

// Loading Skeleton Components
const SkeletonCard = styled(Card)({
  height: '100%',
  borderRadius: 20,
});

const NoResultsContainer = styled(Box)({
  textAlign: 'center',
  padding: 80,
  background: 'white',
  borderRadius: 24,
  marginTop: 40,
});

const News: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<NewsFilters>({
    page: 1,
    limit: 12,
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedNews, setBookmarkedNews] = useState<Set<number>>(new Set());

  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news', filters],
    queryFn: () => getNews(filters),
    enabled: true,
    retry: 1,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['newsCategories'],
    queryFn: getNewsCategories,
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

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category,
      page: 1
    }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  const toggleBookmark = (newsId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setBookmarkedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  };

  const handleShare = (newsItem: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.summary,
        url: `${window.location.origin}/news/${newsItem.id}`,
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

  const formatReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const allCategories = ['Todas', ...(categories || [])];
  const featuredNews = newsData?.data?.find(item => item.featured) || newsData?.data?.[0];
  const regularNews = newsData?.data?.filter(item => item.id !== featuredNews?.id) || [];

  return (
    <Layout>
      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent maxWidth="lg">
            <Fade in timeout={800}>
              <Box>
                <HeroTitle>
                  <TrendingUp style={{ fontSize: '4rem', marginRight: 16, verticalAlign: 'middle' }} />
                  Portal de Notícias
                </HeroTitle>
                <HeroSubtitle>
                  Fique por dentro de todas as novidades do turismo em Barra do Bugres. 
                  Descubra eventos especiais, novas atrações e as melhores experiências da nossa região.
                </HeroSubtitle>
                <StatsContainer>
                  <StatItem>
                    <StatNumber>{newsData?.meta?.total || 0}</StatNumber>
                    <StatLabel>Notícias</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>{categories?.length || 0}</StatNumber>
                    <StatLabel>Categorias</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>24/7</StatNumber>
                    <StatLabel>Atualizado</StatLabel>
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
                <FilterTitle>Buscar e Filtrar Notícias</FilterTitle>
              </FilterHeader>
              
              <SearchField
                fullWidth
                placeholder="Buscar por título, conteúdo, autor..."
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

              {!categoriesLoading && (
                <CategoryGrid>
                  {allCategories.map((category) => (
                    <CategoryChip
                      key={category}
                      label={category}
                      selected={
                        (category === 'Todas' && !filters.category) ||
                        filters.category === category
                      }
                      onClick={() => handleCategoryFilter(category === 'Todas' ? 'all' : category)}
                    />
                  ))}
                </CategoryGrid>
              )}
            </FiltersSection>
          </Zoom>

          {newsLoading ? (
            <LoadingContainer>
              <CircularProgress size={60} color="primary" />
              <LoadingText>Carregando notícias...</LoadingText>
            </LoadingContainer>
          ) : newsError ? (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
              Erro ao carregar notícias. Tente novamente.
            </Alert>
          ) : (
            <>
              {/* Featured News */}
              {featuredNews && filters.page === 1 && (
                <Fade in timeout={600}>
                  <FeaturedNewsCard onClick={() => handleNewsClick(featuredNews.id)}>
                    <FeaturedImage
                      image={featuredNews.image || '/images/placeholder-news.jpg'}
                      title={featuredNews.title}
                    />
                    <FeaturedContent>
                      <FeaturedBadge 
                        icon={<LocalFireDepartment />} 
                        label="Em Destaque" 
                      />
                      <Typography variant="h3" sx={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 700, 
                        marginBottom: 2,
                        lineHeight: 1.2,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {featuredNews.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontSize: '1.2rem', 
                        opacity: 0.9,
                        marginBottom: 3,
                        lineHeight: 1.6
                      }}>
                        {featuredNews.summary || featuredNews.content?.substring(0, 200) + '...'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday />
                          <Typography>{formatDate(featuredNews.publishedAt)}</Typography>
                        </Box>
                        {featuredNews.author && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person />
                            <Typography>{featuredNews.author}</Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime />
                          <Typography>{formatReadTime(featuredNews.content || '')}</Typography>
                        </Box>
                      </Box>
                    </FeaturedContent>
                  </FeaturedNewsCard>
                </Fade>
              )}

              {/* Regular News Grid */}
              <NewsGrid>
                {regularNews.map((newsItem, index) => (
                  <Fade in timeout={800 + index * 100} key={newsItem.id}>
                    <NewsCard onClick={() => handleNewsClick(newsItem.id)}>
                      <NewsImage
                        image={newsItem.image || '/images/placeholder-news.jpg'}
                        title={newsItem.title}
                      />
                      <NewsContent>
                        <NewsTitle>{newsItem.title}</NewsTitle>
                        <NewsExcerpt>
                          {newsItem.summary || newsItem.content?.substring(0, 150) + '...'}
                        </NewsExcerpt>
                        <NewsMetadata>
                          <MetadataLeft>
                            <MetadataItem>
                              <CalendarToday style={{ fontSize: 16 }} />
                              <span>{formatDate(newsItem.publishedAt)}</span>
                            </MetadataItem>
                            <MetadataItem>
                              <AccessTime style={{ fontSize: 16 }} />
                              <span>{formatReadTime(newsItem.content || '')}</span>
                            </MetadataItem>
                          </MetadataLeft>
                          <MetadataRight>
                            <ActionButton
                              onClick={(e) => toggleBookmark(newsItem.id, e)}
                              title="Salvar notícia"
                            >
                              {bookmarkedNews.has(newsItem.id) ? <Bookmark /> : <BookmarkBorder />}
                            </ActionButton>
                            <ActionButton
                              onClick={(e) => handleShare(newsItem, e)}
                              title="Compartilhar"
                            >
                              <Share />
                            </ActionButton>
                          </MetadataRight>
                        </NewsMetadata>
                      </NewsContent>
                    </NewsCard>
                  </Fade>
                ))}
              </NewsGrid>

              {/* Pagination */}
              {newsData?.meta && newsData.meta.totalPages > 1 && (
                <PaginationContainer>
                  <StyledPagination
                    count={newsData.meta.totalPages}
                    page={newsData.meta.page}
                    onChange={handlePageChange}
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </PaginationContainer>
              )}

              {/* No Results */}
              {newsData?.data && newsData.data.length === 0 && (
                <NoResultsContainer>
                  <TrendingUp style={{ fontSize: '4rem', opacity: 0.3, marginBottom: 16 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
                    Nenhuma notícia encontrada
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                    Tente ajustar seus filtros ou termos de busca
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setFilters({ page: 1, limit: 12, sortBy: 'publishedAt', sortOrder: 'desc' });
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

export default News;
