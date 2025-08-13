import React from 'react';
import { Box, Typography, Button, Container, Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward, TrendingUp } from '@mui/icons-material';
import NewsCard from './NewsCard';
import { theme } from '../theme/theme';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  author?: string;
  publishedAt: string;
  category?: string;
  readTime?: string;
  featured?: boolean;
}

interface NewsSectionProps {
  news: NewsItem[];
  isLoading?: boolean;
  onNewsClick?: (id: number) => void;
  onViewAllClick?: () => void;
}

const SectionContainer = styled(Box)({
  padding: '80px 0',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: '-200px',
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
    borderRadius: '50%',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-100px',
    left: '-200px',
    width: '300px',
    height: '300px',
    background: `radial-gradient(circle, ${theme.palette.secondary.main}08 0%, transparent 70%)`,
    borderRadius: '50%',
  }
});

const SectionHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 64,
  position: 'relative',
  zIndex: 1,
});

const SectionTitle = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 3,
  color: theme.palette.primary.main,
  marginBottom: 16,
  textTransform: 'uppercase',
  position: 'relative',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 2,
  }
});

const SectionSubtitle = styled(Typography)({
  fontSize: 42,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 16,
  lineHeight: 1.2,
});

const SectionDescription = styled(Typography)({
  fontSize: 18,
  color: theme.palette.text.secondary,
  maxWidth: 600,
  margin: '0 auto',
  lineHeight: 1.6,
});

const FeaturedNewsContainer = styled(Box)({
  marginBottom: 48,
  position: 'relative',
  zIndex: 1,
});

const RegularNewsGrid = styled(Grid)({
  marginBottom: 48,
  position: 'relative',
  zIndex: 1,
});

const ViewAllButton = styled(Button)({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: '16px 32px',
  fontSize: 16,
  fontWeight: 600,
  borderRadius: 50,
  textTransform: 'none',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
    
    '&::before': {
      left: '100%',
    }
  }
});

const TrendingIcon = styled(TrendingUp)({
  marginRight: 8,
  fontSize: 20,
});

const LoadingSkeleton: React.FC = () => (
  <Box>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={16} width="40%" />
      </Grid>
      <Grid item xs={12} md={4}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 1 }} />
            <Skeleton variant="text" height={20} width="90%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={16} width="70%" />
          </Box>
        ))}
      </Grid>
    </Grid>
  </Box>
);

const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  isLoading = false,
  onNewsClick,
  onViewAllClick
}) => {
  const featuredNews = news.find(item => item.featured) || news[0];
  const regularNews = news.filter(item => !item.featured).slice(0, 6);

  const handleNewsClick = (id: number) => {
    if (onNewsClick) {
      onNewsClick(id);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl">
        <SectionHeader>
          <SectionTitle>
            <TrendingIcon />
            Últimas Notícias
          </SectionTitle>
          <SectionSubtitle>
            Portal de Notícias
          </SectionSubtitle>
          <SectionDescription>
            Fique por dentro das últimas novidades do turismo em Barra do Bugres, 
            eventos especiais e descobertas incríveis na nossa região.
          </SectionDescription>
        </SectionHeader>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {featuredNews && (
              <FeaturedNewsContainer>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <NewsCard
                      {...featuredNews}
                      variant="featured"
                      onClick={handleNewsClick}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {regularNews.slice(0, Math.min(3, regularNews.length)).map((newsItem) => (
                        <NewsCard
                          key={newsItem.id}
                          {...newsItem}
                          variant="compact"
                          onClick={handleNewsClick}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </FeaturedNewsContainer>
            )}

            {/* Para a home, não mostrar mais notícias além das já exibidas */}
            {news.length > 4 && (
              <RegularNewsGrid container spacing={4}>
                {regularNews.slice(3).map((newsItem) => (
                  <Grid item xs={12} sm={6} md={4} key={newsItem.id}>
                    <NewsCard
                      {...newsItem}
                      variant="standard"
                      onClick={handleNewsClick}
                    />
                  </Grid>
                ))}
              </RegularNewsGrid>
            )}

            <Box sx={{ textAlign: 'center' }}>
              <ViewAllButton
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleViewAllClick}
              >
                Ver todas as notícias
              </ViewAllButton>
            </Box>
          </>
        )}
      </Container>
    </SectionContainer>
  );
};

export default NewsSection;
