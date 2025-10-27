import React from 'react';
import { Box, CssBaseline } from '@mui/material';
//import { Container } from '@mui/material';
import Header from './Header';
import { FaArrowUp } from 'react-icons/fa';
import Footer from './Footer';
//import GifSection from './GifSection'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* Botão de voltar ao topo */}
      <button
        onClick={handleScrollTop}
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          background: '#E7A400', // Ouro da logo Cuniã
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#B8860B'; // Ouro escuro no hover
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#E7A400'; // Volta ao ouro original
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp size={22} />
      </button>
      {/* <GifSection /> */}
      <Footer />
    </Box>
  );
};

export default Layout; 