import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  IconButton,
  Fade,
  Chip,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccessTime,
  LocationOn,
  Share,
  ThumbUp,
  ArrowBack,
  NavigateNext,
  VerifiedUser,
  Star
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import { getTestimonialById, getRelatedTestimonials } from '../../services/testimonials';
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
  },
});

const TestimonialHeader = styled(Paper)({
  padding: 40,
  borderRadius: 24,
  marginBottom: 32,
  background: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
});

const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  marginBottom: 32,
  
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
    gap: 16,
  }
});

const UserAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  border: `4px solid ${theme.palette.primary.main}20`,
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
});

const UserInfo = styled(Box)({
  flex: 1,
});

const UserName = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 8,
});

const UserLocation = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  marginBottom: 8,
});

const UserOccupation = styled(Typography)({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  fontStyle: 'italic',
});

const RatingSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 24,
});

const VerifiedBadge = styled(Chip)({
  background: '#e8f5e8',
  color: '#2e7d32',
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: '#2e7d32',
  }
});

const TestimonialTitle = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: 24,
  color: theme.palette.text.primary,
  
  '@media (max-width: 768px)': {
    fontSize: '2rem',
  }
});

const TestimonialContent = styled(Paper)({
  padding: 40,
  borderRadius: 24,
  marginBottom: 32,
  background: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  position: 'relative',
});

const QuoteIcon = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 24,
  fontSize: '4rem',
  color: theme.palette.primary.main + '15',
  fontFamily: 'Georgia, serif',
  fontWeight: 'bold',
});

const TestimonialText = styled(Typography)({
  fontSize: '1.2rem',
  lineHeight: 1.8,
  color: theme.palette.text.primary,
  marginBottom: 32,
});

const MetadataSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 16,
  paddingTop: 24,
  borderTop: '1px solid #f0f4f8',
});

const MetadataLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  flexWrap: 'wrap',
});

const MetadataItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.secondary,
});

const MetadataRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const ActionButton = styled(Button)({
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
});

const RelatedSection = styled(Box)({
  marginTop: 48,
});

const RelatedTitle = styled(Typography)({
  fontSize: '1.8rem',
  fontWeight: 700,
  marginBottom: 24,
  color: theme.palette.text.primary,
});

const RelatedGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 24,
});

const RelatedCard = styled(Paper)({
  padding: 24,
  borderRadius: 16,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: 'white',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  }
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
});

const TestimonialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: testimonial, isLoading: testimonialLoading, error: testimonialError } = useQuery({
    queryKey: ['testimonial', id],
    queryFn: () => getTestimonialById(Number(id)),
    enabled: !!id,
  });

  const { data: relatedTestimonials } = useQuery({
    queryKey: ['relatedTestimonials', id],
    queryFn: () => getRelatedTestimonials(Number(id)),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate('/testimonials');
  };

  const handleShare = () => {
    if (navigator.share && testimonial) {
      navigator.share({
        title: testimonial.title,
        text: testimonial.content,
        url: window.location.href,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
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

  if (testimonialLoading) {
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

  if (testimonialError || !testimonial) {
    return (
      <Layout>
        <PageContainer>
          <Container maxWidth="lg">
            <Alert severity="error" sx={{ mt: 4 }}>
              Depoimento não encontrado ou erro ao carregar.
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
          <BackButton onClick={handleBack}>
            <ArrowBack />
          </BackButton>

          <BreadcrumbsContainer>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                color="inherit"
                href="/"
                sx={{ textDecoration: 'none' }}
              >
                Home
              </Link>
              <Link
                color="inherit"
                href="/testimonials"
                sx={{ textDecoration: 'none' }}
              >
                Depoimentos
              </Link>
              <Typography color="text.primary">
                {testimonial.name}
              </Typography>
            </Breadcrumbs>
          </BreadcrumbsContainer>

          <Fade in timeout={800}>
            <Box>
              <TestimonialHeader>
                <UserSection>
                  <UserAvatar 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                  >
                    {testimonial.name.charAt(0)}
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{testimonial.name}</UserName>
                    <UserLocation>
                      <LocationOn />
                      {testimonial.location}
                    </UserLocation>
                    {testimonial.occupation && (
                      <UserOccupation>{testimonial.occupation}</UserOccupation>
                    )}
                  </UserInfo>
                </UserSection>

                <RatingSection>
                  <Rating value={testimonial.rating} readOnly size="large" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {testimonial.rating}.0
                  </Typography>
                  {testimonial.verified && (
                    <VerifiedBadge 
                      icon={<VerifiedUser />} 
                      label="Verificado" 
                    />
                  )}
                </RatingSection>

                <TestimonialTitle>
                  {testimonial.title}
                </TestimonialTitle>
              </TestimonialHeader>

              <TestimonialContent>
                <QuoteIcon>"</QuoteIcon>
                <TestimonialText>
                  {testimonial.content}
                </TestimonialText>

                <MetadataSection>
                  <MetadataLeft>
                    <MetadataItem>
                      <AccessTime />
                      <Typography>
                        Visitou em {formatDate(testimonial.visitDate)}
                      </Typography>
                    </MetadataItem>
                    <MetadataItem>
                      <Star />
                      <Typography>
                        {getExperienceLabel(testimonial.experience)}
                      </Typography>
                    </MetadataItem>
                    {testimonial.helpful && (
                      <MetadataItem>
                        <ThumbUp />
                        <Typography>
                          {testimonial.helpful} acharam útil
                        </Typography>
                      </MetadataItem>
                    )}
                  </MetadataLeft>

                  <MetadataRight>
                    <ActionButton
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={handleShare}
                    >
                      Compartilhar
                    </ActionButton>
                    <ActionButton
                      variant="contained"
                      startIcon={<ThumbUp />}
                    >
                      Útil
                    </ActionButton>
                  </MetadataRight>
                </MetadataSection>
              </TestimonialContent>

              {relatedTestimonials && relatedTestimonials.length > 0 && (
                <RelatedSection>
                  <RelatedTitle>Depoimentos Relacionados</RelatedTitle>
                  <RelatedGrid>
                    {relatedTestimonials.map((related) => (
                      <RelatedCard
                        key={related.id}
                        onClick={() => navigate(`/testimonials/${related.id}`)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar src={related.avatar} sx={{ width: 40, height: 40 }}>
                            {related.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {related.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {related.location}
                            </Typography>
                          </Box>
                          <Rating value={related.rating} readOnly size="small" sx={{ ml: 'auto' }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {related.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {related.content}
                        </Typography>
                      </RelatedCard>
                    ))}
                  </RelatedGrid>
                </RelatedSection>
              )}
            </Box>
          </Fade>
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default TestimonialDetail;
