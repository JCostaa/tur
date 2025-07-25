import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  styled,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getBanners } from '../services/banners';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  minHeight: 600,
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
    zIndex: 1,
  },
}));

const BackgroundImage = styled(Box)<{ $active: boolean }>(({ theme, $active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: $active ? 1 : 0,
  transform: $active ? 'scale(1.05)' : 'scale(1)',
  transition: 'opacity 1s ease-in-out, transform 8s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
    zIndex: 1,
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  color: '#fff',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '3.5rem',
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: theme.spacing(3),
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
  maxWidth: 600,
  opacity: 0.9,
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(3),
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: '#333',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: theme.spacing(1.5, 4),
  borderRadius: 30,
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
  },
}));

const SocialSection = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 40,
  left: 40,
  zIndex: 3,
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    bottom: 'auto',
    left: 'auto',
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
    transform: 'scale(1.1)',
  },
}));

const SlideIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 40,
  right: 40,
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 3,
  [theme.breakpoints.down('md')]: {
    bottom: 20,
    right: 20,
  },
}));

const Indicator = styled(Box)<{ $active: boolean }>(({ theme, $active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: $active ? '#fff' : alpha('#fff', 0.3),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: $active ? '#fff' : alpha('#fff', 0.6),
  },
}));

// Banner type (ajuste conforme necessário)
type Banner = {
  id: number;
  title: string;
  description?: string;
  link?: string;
  orderIndex: number;
  isActive: boolean;
  imageId?: number;
  image?: {
    id: number;
    filename: string;
    originalName: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
};

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Query banners
  const { data: banners, isLoading, isError } = useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: getBanners,
  });

  // Atualizar slide para banners dinâmicos
  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography color="#fff">Carregando banners...</Typography></Box>;
  }
  if (isError || !banners) {
    return <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography color="#fff">Erro ao carregar banners.</Typography></Box>;
  }

  return (
    <HeroSection>
      {banners.map((banner, index) => (
        <BackgroundImage
          key={banner.id}
          $active={index === currentSlide}
          sx={{
            backgroundImage: banner.image?.url ? `url(${import.meta.env.VITE_API_URL}${banner.image.url})` : undefined,
            backgroundColor: !banner.image?.url ? '#222' : undefined,
          }}
        />
      ))}
{/* 
      <ContentWrapper maxWidth="xl">
        <Box sx={{ maxWidth: isMobile ? '100%' : '60%' }}>
      

          <Button
            variant="contained"
            size="large"
            className="animate-fadeInUp glow-enable"
            style={{ animationDelay: '0.4s' }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: 50,
              padding: theme.spacing(1.5, 4),
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              zIndex: 2,
              position: 'relative',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
              },
            }}
          >
            Discover More
          </Button>
        </Box>
      </ContentWrapper> */}
{/* 
      <SocialSection>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Follow us on our social media:
        </Typography>
        <Box>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <LinkedIn />
          </SocialIcon>
        </Box>
      </SocialSection> */}

      <SlideIndicator>
        {banners.map((_, index) => (
          <Indicator
            key={index}
            $active={index === currentSlide}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </SlideIndicator>
    </HeroSection>
  );
};

export default HeroBanner; 