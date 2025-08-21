import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  Typography,
  Chip,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
  Fade,
  Zoom,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NewsCard from '../../components/NewsCard';
import {
  AccessTime,
  Person,
  Visibility,
  Share,
  Facebook,
  Twitter,
  WhatsApp,
  ArrowBack,
  NavigateNext,
  OpenInNew
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import { getNewsById, getRelatedNews } from '../../services/news';
import { theme } from '../../theme/theme';

const PageContainer = styled(Box)({
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  minHeight: '100vh',
  paddingTop: 40,
  paddingBottom: 80,
});

const BreadcrumbsContainer = styled(Box)({
  marginBottom: 32,
});

const BackButton = styled(IconButton)({
  marginBottom: 24,
  background: theme.palette.background.paper,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    background: theme.palette.action.hover,
    transform: 'translateX(-4px)',
  },
});

const ArticleContainer = styled(Paper)({
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  marginBottom: 60,
});

const HeroImage = styled('img')({
  width: '100%',
  height: 400,
  objectFit: 'cover',
  objectPosition: 'center center', // Centralizar a imagem
  display: 'block',
});

const ArticleContent = styled(Box)({
  padding: 48,
  position: 'relative',
});

const CategoryChip = styled(Chip)({
  position: 'absolute',
  top: -20,
  left: 48,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: 14,
  height: 40,
  borderRadius: 20,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
});

const ArticleTitle = styled(Typography)({
  fontSize: 48,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  marginBottom: 24,
  marginTop: 20,
});

const ArticleMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 32,
  marginBottom: 32,
  padding: 24,
  background: theme.palette.background.default,
  borderRadius: 16,
  flexWrap: 'wrap',
});

const MetaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: 14,
});

const ArticleBody = styled(Typography)({
  fontSize: 18,
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  marginBottom: 40,
  '& p': {
    marginBottom: 24,
  },
  '& h2': {
    fontSize: 32,
    fontWeight: 600,
    marginTop: 48,
    marginBottom: 24,
    color: theme.palette.primary.main,
  },
  '& h3': {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 32,
    marginBottom: 16,
    color: theme.palette.text.primary,
  },
});

const ShareContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: 24,
  background: theme.palette.background.default,
  borderRadius: 16,
  marginBottom: 40,
});

const ShareButton = styled(IconButton)({
  width: 48,
  height: 48,
  borderRadius: 12,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
});

const FacebookButton = styled(ShareButton)({
  background: '#1877f2',
  color: 'white',
  '&:hover': {
    background: '#166fe5',
  },
});

const TwitterButton = styled(ShareButton)({
  background: '#1da1f2',
  color: 'white',
  '&:hover': {
    background: '#0d8bd9',
  },
});

const WhatsAppButton = styled(ShareButton)({
  background: '#25d366',
  color: 'white',
  '&:hover': {
    background: '#128c7e',
  },
});

const RelatedNewsSection = styled(Box)({
  marginTop: 80,
});

const SectionTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 40,
  textAlign: 'center',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
});

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: newsItem, isLoading, error } = useQuery({
    queryKey: ['news', id],
    queryFn: () => getNewsById(Number(id)),
    enabled: !!id,
  });

  const { data: relatedNews } = useQuery({
    queryKey: ['relatedNews', id],
    queryFn: () => getRelatedNews(Number(id)),
    enabled: !!id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = newsItem?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
        break;
    }
  };

  const handleRelatedNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <Layout>
        <PageContainer>
          <Container maxWidth="lg">
            <LoadingContainer>
              <CircularProgress size={60} />
            </LoadingContainer>
          </Container>
        </PageContainer>
      </Layout>
    );
  }

  if (error || !newsItem) {
    return (
      <Layout>
        <PageContainer>
          <Container maxWidth="lg">
            <Alert severity="error" sx={{ mt: 4 }}>
              Notícia não encontrada ou erro ao carregar.
            </Alert>
          </Container>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContainer>
        <Container maxWidth="lg">
          <Fade in timeout={600}>
            <Box>
              <BackButton onClick={handleBack}>
                <ArrowBack />
              </BackButton>

              <BreadcrumbsContainer>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  <Link color="inherit" href="/" onClick={() => navigate('/')}>
                    Início
                  </Link>
                  <Link color="inherit" href="/news" onClick={() => navigate('/news')}>
                    Notícias
                  </Link>
                  <Typography color="text.primary">
                    {newsItem.category}
                  </Typography>
                </Breadcrumbs>
              </BreadcrumbsContainer>
            </Box>
          </Fade>

          <Zoom in timeout={800}>
            <ArticleContainer>
              <HeroImage 
                src={newsItem.image || '/images/header-1.jpg'} 
                alt={newsItem.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/header-1.jpg';
                }}
              />
              
              <ArticleContent>
                {newsItem.category && (
                  <CategoryChip label={newsItem.category} />
                )}
                
                <ArticleTitle>{newsItem.title}</ArticleTitle>
                
                <ArticleMeta>
                  <MetaItem>
                    <Person fontSize="small" />
                    <Typography variant="body2">
                      {newsItem.author || 'Redação'}
                    </Typography>
                  </MetaItem>
                  
                  <MetaItem>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      {formatDate(newsItem.publishedAt)}
                    </Typography>
                  </MetaItem>
                  
                  <MetaItem>
                    <Visibility fontSize="small" />
                    <Typography variant="body2">
                      {newsItem.views || 0} visualizações
                    </Typography>
                  </MetaItem>
                  
                  {newsItem.readTime && (
                    <MetaItem>
                      <Typography variant="body2">
                        Leitura: {newsItem.readTime}
                      </Typography>
                    </MetaItem>
                  )}
                </ArticleMeta>

                <ArticleBody>
                  {newsItem.content.split('\n').map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      paragraph
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </ArticleBody>

                {/* Botão para ver artigo completo no VAR Blog (se for notícia do VAR) */}
                {newsItem.id > 1000 && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    my: 4,
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef'
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<OpenInNew />}
                      onClick={() => window.open(`https://blog.var.tur.br/?p=${newsItem.id}`, '_blank')}
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B35 30%, #F7931E 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 107, 53, .3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF5722 30%, #FF8F00 90%)',
                        },
                      }}
                    >
                      Ver artigo completo no VAR Turismo
                    </Button>
                  </Box>
                )}

                <ShareContainer>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    <Share sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Compartilhar:
                  </Typography>
                  
                  <FacebookButton onClick={() => handleShare('facebook')}>
                    <Facebook />
                  </FacebookButton>
                  
                  <TwitterButton onClick={() => handleShare('twitter')}>
                    <Twitter />
                  </TwitterButton>
                  
                  <WhatsAppButton onClick={() => handleShare('whatsapp')}>
                    <WhatsApp />
                  </WhatsAppButton>
                </ShareContainer>

                {newsItem.tags && newsItem.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {newsItem.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={`#${tag}`}
                        variant="outlined"
                        size="small"
                        sx={{ 
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main 
                        }}
                      />
                    ))}
                  </Box>
                )}
              </ArticleContent>
            </ArticleContainer>
          </Zoom>

          {relatedNews && relatedNews.length > 0 && (
            <RelatedNewsSection>
              <SectionTitle>Notícias Relacionadas</SectionTitle>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 4 }}>
                {relatedNews.map((related) => (
                  <Fade in timeout={1000} key={related.id}>
                    <Box>
                      <NewsCard
                        {...related}
                        date={related.publishedAt}
                        onClick={handleRelatedNewsClick}
                      />
                    </Box>
                  </Fade>
                ))}
              </Box>
            </RelatedNewsSection>
          )}
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default NewsDetail;
