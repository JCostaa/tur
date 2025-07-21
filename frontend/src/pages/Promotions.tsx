import React, { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Header';
import TravelPackages from '../components/TravelPackages';

const Promotions: React.FC = () => {
  // Seções identificadas apenas por id, refs não são necessários para renderização

  // Função para scroll suave
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Exemplo de dados para cada seção (substitua pelos dados reais depois)
  const tours = [
    {
      id: 1,
      title: 'Bird Watching',
      location: 'Amazon',
      rating: 5,
      duration: '3 days',
      price: 'R$549.00',
      image: '/images/browse-1.jpg',
    },
    {
      id: 2,
      title: 'Indigenous Community Experience',
      location: 'Haliti-Paresí',
      rating: 5,
      duration: '3 days',
      price: 'R$649.00',
      image: '/images/browse-2.jpg',
    },
    {
      id: 3,
      title: 'Boat Tour - Paraguay River',
      location: 'Pantanal',
      rating: 5,
      duration: '3 days',
      price: 'R$349.00',
      image: '/images/browse-3.jpg',
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
    },
    {
      id: 2,
      title: 'Boutique Hotel',
      location: 'Cuiabá',
      rating: 4.7,
      duration: '1 night',
      price: 'R$499.00',
      image: '/images/browse-5.jpg',
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
    },
    {
      id: 2,
      title: 'Amazon Bistro',
      location: 'Amazon',
      rating: 4.8,
      duration: 'Special Menu',
      price: 'R$129.00',
      image: '/images/category-2.jpg',
    },
  ];

  // Componente de seção reutilizável
  const Section = ({ id, title, data }: { id: string, title: string, data: any[] }) => (
    <Box id={id} sx={{ py: 8, background: '#fff' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: '#1a237e', fontFamily: 'Playfair Display, serif' }}>
          {title}
        </Typography>
        <TravelPackages customPackages={data} hideTitle />
      </Container>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Header />
      <Section id="tours" title="Tours" data={tours} />
      <Section id="accommodations" title="Accommodations" data={accommodations} />
      <Section id="restaurants" title="Restaurants" data={restaurants} />
    </Box>
  );
};

export default Promotions; 