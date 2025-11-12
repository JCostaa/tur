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
import EconomicStats from '../components/EconomicStats';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../services/news';
import { getTestimonials } from '../services/testimonials';
import PodcastSection from '../components/PodcastSection';

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

  // Componente auxiliar para renderizar seções com divider
  const SectionWithDivider = ({ 
    sectionId, 
    SectionComponent, 
    sectionIndex, 
    boxSx 
  }: { 
    sectionId: string; 
    SectionComponent: React.ComponentType; 
    sectionIndex: number; 
    boxSx?: object 
  }) => {
    const [hasContent, setHasContent] = React.useState(true); // Começa true para renderizar
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!containerRef.current) return;
      
      const checkContent = () => {
        if (containerRef.current) {
          const children = containerRef.current.children;
          const hasValidContent = children.length > 0;
          setHasContent(hasValidContent);
        }
      };
      
      // Observer para detectar mudanças no DOM
      const observer = new MutationObserver(() => {
        checkContent();
      });
      
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
      
      // Verificação inicial com delay
      const timer = setTimeout(checkContent, 1000);
      
      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }, []);
    
    return (
      <>
        <Box 
          id={sectionId} 
          sx={boxSx}
          style={{ display: hasContent ? 'block' : 'none' }}
        >
          <div ref={containerRef}>
            <SectionComponent />
          </div>
        </Box>
        {hasContent && <SectionDivider sectionIndex={sectionIndex} />}
      </>
    );
  };


  return (
    <>
      <Preloader isLoading={showPreloader} />
      
      <Layout>
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <Box id="inicio">
            <HeroBanner />
          </Box>
        <Box id="servicos" sx={{ mt: 10 }}>
          <Services />
        </Box>
        <SectionDivider sectionIndex={1} />
        
        <Box id="estatisticas">
          <EconomicStats />
        </Box>
        <SectionDivider sectionIndex={1.5} />
        
        <SectionWithDivider
          sectionId="experiencias"
          SectionComponent={Experiences}
          sectionIndex={2}
        />
        
        <SectionWithDivider
          sectionId="tours"
          SectionComponent={Tours}
          sectionIndex={3}
        />
        
        <SectionWithDivider
          sectionId="eventos"
          SectionComponent={Events}
          sectionIndex={4}
        />
        
        <SectionWithDivider
          sectionId="fornecedores-atrativos"
          SectionComponent={AttractionsProviders}
          sectionIndex={5}
        />
        
        <SectionWithDivider
          sectionId="accommodations"
          SectionComponent={Accommodation}
          sectionIndex={6}
        />
        
        <SectionWithDivider
          sectionId="restaurants"
          SectionComponent={Restaurants}
          sectionIndex={7}
        />
        
        <SectionWithDivider
          sectionId="agencies"
          SectionComponent={Agencies}
          sectionIndex={8}
        />
        
        <SectionWithDivider
          sectionId="guides"
          SectionComponent={Guides}
          sectionIndex={9}
          boxSx={{ minHeight: 300 }}
        />
        
        <SectionWithDivider
          sectionId="drivers"
          SectionComponent={Drivers}
          sectionIndex={10}
          boxSx={{ minHeight: 300 }}
        />
        
        <Box id="podcast">
          <PodcastSection />
        </Box>
        <SectionDivider sectionIndex={11} />
        
        <SectionWithDivider
          sectionId="noticias"
          SectionComponent={() => (
            <NewsSectionHome 
              news={newsData?.data || []}
              isLoading={newsLoading}
              onNewsClick={handleNewsClick}
              onViewAllClick={handleViewAllNews}
            />
          )}
          sectionIndex={100}
        />
        
        <SectionWithDivider
          sectionId="depoimentos"
          SectionComponent={() => (
            <TestimonialsSectionHome 
              testimonials={testimonialsData?.data || []}
              isLoading={testimonialsLoading}
              onTestimonialClick={handleTestimonialClick}
              onViewAllClick={handleViewAllTestimonials}
            />
          )}
          sectionIndex={101}
        />
        {/* <ImageAccordion />
        <StatsSection />
        <VideoSection /> */}
      </Box>
    </Layout>
    </>
  );
};

export default Home; 