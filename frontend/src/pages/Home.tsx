import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Servicos from './Servicos';
import ImageAccordion from '../components/ImageAccordion';
import TravelPackages from '../components/TravelPackages';
import StatsSection from '../components/StatsSection';
import VideoSection from '../components/VideoSection';
import Experiences from './Experiences';
import Tours from './Tours';
import Accommodation from './Accommodation';
import Restaurants from './ Restaurants';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';


const tours = [
  {
    id: 1,
    title: 'Bird Watching',
    location: 'Amazon',
    rating: 5,
    duration: '3 days',
    price: 'R$549.00',
    image: '/images/browse-1.jpg',
    description: 'Bird Watching',
    people: 1,
  },
  {
    id: 2,
    title: 'Indigenous Community Experience',
    location: 'Haliti-Paresí',
    rating: 5,
    duration: '3 days',
    price: 'R$649.00',
    image: '/images/browse-2.jpg',
    description: 'Indigenous Community Experience',
    people: 1,
  },
  {
    id: 3,
    title: 'Boat Tour - Paraguay River',
    location: 'Pantanal',
    rating: 5,
    duration: '3 days',
    price: 'R$349.00',
    image: '/images/browse-3.jpg',
    description: 'Boat Tour - Paraguay River',
    people: 1,
  },
];

const accommodations = [
  {
    id: 1,
    title: 'Eco Resort',
    location: 'Chapada',
    rating: 4.8,
    duration: '2 nights',
    price: 'R$799.00',
    image: '/images/browse-4.jpg',
    description: 'Eco Resort',
    people: 2,
  },
  {
    id: 2,
    title: 'Boutique Hotel',
    location: 'Cuiabá',
    rating: 4.7,
    duration: '1 night',
    price: 'R$499.00',
    image: '/images/browse-5.jpg',
    description: 'Boutique Hotel',
    people: 2,
  },
];

const restaurants = [
  {
    id: 1,
    title: 'Pantanal Grill',
    location: 'Pantanal',
    rating: 4.9,
    duration: 'Special Menu',
    price: 'R$99.00',
    image: '/images/category-1.jpg',
    description: 'Pantanal Grill',
    people: 2,
  },
  {
    id: 2,
    title: 'Amazon Bistro',
    location: 'Amazon',
    rating: 4.8,
    duration: 'Special Menu',
    price: 'R$129.00',
    image: '/images/category-2.jpg',
    description: 'Amazon Bistro',
    people: 2,
  },
];

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
          <Servicos />
        </Box>
        <Box id="experiencias">
          < Experiences />
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
        <Box id="contato" sx={{ minHeight: 300 }}>
          {/* Seção de contato pode ser implementada aqui */}
        </Box>
        {/* <ImageAccordion />
        <StatsSection />
        <VideoSection /> */}
      </Box>
    </Layout>
  );
};

export default Home; 