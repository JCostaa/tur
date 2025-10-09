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
import Agencies from './agencie/Agencies'; // Não utilizado
import { Events } from './events';
import { AttractionsProviders } from './attractions';
import NewsSectionHome from '../components/NewsSectionHome';
import TestimonialsSectionHome from '../components/TestimonialsSectionHome';
import Preloader from '../components/Preloader';
import SectionDivider from '../components/SectionDivider';
import PodcastSection from '../components/PodcastSection';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../services/news';
import { getTestimonials } from '../services/testimonials';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = React.useState(true);

  // Query para buscar notícias na home - buscando mais notícias para permitir navegação
  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['homeNews'],
    queryFn: () => getNews({ limit: 9 }), // Mais notícias para permitir navegação com setinhas
  });

  // Query para buscar depoimentos na home - apenas 3 depoimentos
  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['homeTestimonials'],
    queryFn: () => getTestimonials({ limit: 3, featured: true }), // Apenas depoimentos em destaque
  });

  // Controle do preloader
  const isLoading = newsLoading || testimonialsLoading;

  React.useEffect(() => {
    if (!isLoading && newsData && testimonialsData) {
      // Pequeno delay para uma transição mais suave
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, newsData, testimonialsData]);
  React.useEffect(() => {
    if (location.state && (location.state as { anchor?: string }).anchor) {
      const anchor = (location.state as { anchor: string }).anchor;
      const section = document.getElementById(anchor);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Limpa o state para evitar scroll repetido
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state && (location.state as { scrollToTop?: boolean }).scrollToTop) {
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

  // Função para renderizar seções sempre (independente de ter dados)
  const renderSectionWithDivider = (
    sectionId: string,
    SectionComponent: React.ComponentType,
    sectionIndex: number,
    boxSx?: object
  ) => {
    return (
      <>
        <Box id={sectionId} sx={boxSx}>
          <SectionComponent />
        </Box>
        <SectionDivider sectionIndex={sectionIndex} />
      </>
    );
  };


  return (
    <>
      <Preloader isLoading={showPreloader} />
      
      <Layout>
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          {/* <Box id="inicio">
            <HeroBanner />
          </Box> */}
        <Box id="servicos" sx={{ mt: 10 }}>
          <Services />
        </Box>
        <SectionDivider sectionIndex={1} />
        
        {renderSectionWithDivider(
          "experiencias",
          Experiences,
          2
        )}
        
        {renderSectionWithDivider(
          "tours",
          Tours,
          3
        )}
        
        {renderSectionWithDivider(
          "eventos",
          Events,
          4
        )}
        
        {renderSectionWithDivider(
          "fornecedores-atrativos",
          AttractionsProviders,
          5
        )}
        
        {renderSectionWithDivider(
          "accommodations",
          Accommodation,
          6
        )}
        
        {renderSectionWithDivider(
          "restaurants",
          Restaurants,
          7
        )}
        
        {renderSectionWithDivider(
          "agencies",
          Agencies,
          8
        )}
        
        {renderSectionWithDivider(
          "guides",
          Guides,
          9,
          { minHeight: 300 }
        )}
        
        {renderSectionWithDivider(
          "drivers",
          Drivers,
          10,
          { minHeight: 300 }
        )}
        
        {/* <Box id="podcast">
          <PodcastSection />
        </Box> */}
        <SectionDivider sectionIndex={11} />
        
        <Box id="noticias">
          <NewsSectionHome 
            news={newsData?.data || []}
            isLoading={newsLoading}
            onNewsClick={handleNewsClick}
            onViewAllClick={handleViewAllNews}
          />
        </Box>
        <SectionDivider sectionIndex={100} />
        
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
    </>
  );
};

export default Home; 