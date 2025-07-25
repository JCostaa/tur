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

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
       
       
        {/* <ImageAccordion />
        <StatsSection />
        <VideoSection /> */}
      </Box>
    </Layout>
  );
};

export default Home; 