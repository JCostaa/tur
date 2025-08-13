import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward, TrendingUp, CalendarToday, Person } from '@mui/icons-material';
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

interface NewsSectionHomeProps {
  news: NewsItem[];
  isLoading?: boolean;
  onNewsClick?: (id: number) => void;
  onViewAllClick?: () => void;
}

const NewsCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
});

const NewsCardMedia = styled(CardMedia)({
  height: 200,
  position: 'relative',
});

const NewsCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
});

const NewsTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: 8,
  lineHeight: 1.3,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const NewsSummary = styled(Typography)({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: 16,
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  flexGrow: 1,
});

const NewsMetadata = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginTop: 'auto',
  paddingTop: 12,
  borderTop: `1px solid ${theme.palette.divider}`,
});

const MetadataItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
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
      <Card key={item} sx={{ height: '100%' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={24} width="90%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="70%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={16} width="80%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={16} width="60%" sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="text" height={16} width="40%" />
            <Skeleton variant="text" height={16} width="30%" />
          </Box>
        </CardContent>
      </Card>
    ))}
  </div>
);

const NewsSectionHome: React.FC<NewsSectionHomeProps> = ({
  news,
  isLoading = false,
  onNewsClick,
  onViewAllClick
}) => {
  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNewsClick) {
      onNewsClick(newsItem.id);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Mostrar apenas 3 notícias na home
  const displayNews = news.slice(0, 3);

  if (!news.length && !isLoading) {
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
          <TrendingUp style={{ fontSize: 18 }} />
          NOTÍCIAS
        </h3>
        <h1 style={{ 
          fontSize: 36, 
          fontWeight: 700, 
          margin: '8px 0 0 0', 
          color: theme.palette.text.primary 
        }}>
          do município
        </h1>
      </div>

      {isLoading ? (
        <div style={{ padding: '0 20px' }}>
          <LoadingSkeleton />
        </div>
      ) : (
        <div style={{ 
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {displayNews.map((newsItem) => (
            <NewsCard key={newsItem.id} onClick={() => handleNewsClick(newsItem)}>
              <NewsCardMedia
                image={newsItem.image || '/images/placeholder-news.jpg'}
                title={newsItem.title}
              />
              <NewsCardContent>
                <NewsTitle>
                  {newsItem.title}
                </NewsTitle>
                <NewsSummary>
                  {newsItem.summary || newsItem.content?.substring(0, 150) + '...'}
                </NewsSummary>
                <NewsMetadata>
                  <MetadataItem>
                    <CalendarToday style={{ fontSize: 16 }} />
                    <span>{formatDate(newsItem.publishedAt)}</span>
                  </MetadataItem>
                  {newsItem.author && (
                    <MetadataItem>
                      <Person style={{ fontSize: 16 }} />
                      <span>{newsItem.author}</span>
                    </MetadataItem>
                  )}
                </NewsMetadata>
              </NewsCardContent>
            </NewsCard>
          ))}
        </div>
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
          Ver mais notícias
          <ArrowForward style={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
};

export default NewsSectionHome;
