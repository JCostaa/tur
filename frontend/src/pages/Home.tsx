import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Services from './services';
import Tours from './tours/Tours';
import Accommodation from './accomodation/Accommodation';
import { Restaurants } from './restaurants';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import Experiences from './experience';
import { Drivers } from './drivers';
import Guides from './guides/Guides';
import Agencies from './agencie/Agencies';
import { Events } from './events';
import NewsSectionHome from '../components/NewsSectionHome';
import TestimonialsSectionHome from '../components/TestimonialsSectionHome';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../services/news';
import { getTestimonials } from '../services/testimonials';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Query para buscar notícias na home - apenas 3 notícias para não poluir
  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['homeNews'],
    queryFn: () => getNews({ limit: 3 }), // 1 featured + 2 compactas para home limpa
  });

  // Query para buscar depoimentos na home - apenas 3 depoimentos
  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['homeTestimonials'],
    queryFn: () => getTestimonials({ limit: 3, featured: true }), // Apenas depoimentos em destaque
  });
  React.useEffect(() => {
    if (location.state && (location.state as any).anchor) {
      const anchor = (location.state as any).anchor;
      const section = document.getElementById(anchor);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Limpa o state para evitar scroll repetido
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state && (location.state as any).scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  const handleViewAllNews = () => {
    navigate('/news');
  };

  const handleTestimonialClick = (id: number) => {
    navigate(`/testimonials/${id}`);
  };

  const handleViewAllTestimonials = () => {
    navigate('/testimonials');
  };

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh' }}>
        <Header />
        <Box id="inicio">
          <HeroBanner />
        </Box>
        <Box id="servicos">
          <Services />
        </Box>
        <Box id="experiencias">
          <Experiences />
        </Box>
        <Box id="tours">
          <Tours />
        </Box>
        <Box id="accommodations">
          <Accommodation />
        </Box>
        <Box id="restaurants">
          <Restaurants />
        </Box>
        <Box id="agencies" sx={{ minHeight: 300 }}>
          <Agencies />
        </Box>
        <Box id="guides" sx={{ minHeight: 300 }}>
          <Guides />
        </Box>
        <Box id="drivers" sx={{ minHeight: 300 }}>
          <Drivers />
        </Box>
        <Box id="eventos">
          <Events />
        </Box>
        <Box id="noticias">
          <NewsSectionHome 
            news={newsData?.data || []}
            isLoading={newsLoading}
            onNewsClick={handleNewsClick}
            onViewAllClick={handleViewAllNews}
          />
        </Box>
        <Box id="depoimentos">
          <TestimonialsSectionHome 
            testimonials={testimonialsData?.data || []}
            isLoading={testimonialsLoading}
            onTestimonialClick={handleTestimonialClick}
            onViewAllClick={handleViewAllTestimonials}
          />
        </Box>
       
        {/* <ImageAccordion />
        <StatsSection />
        <VideoSection /> */}
      </Box>
    </Layout>
  );
};

export default Home; 