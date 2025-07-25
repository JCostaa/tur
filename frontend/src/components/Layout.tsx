import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from './Header';
import { FaArrowUp } from 'react-icons/fa';
import Footer from './Footer';

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
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Box>
      {/* Botão de voltar ao topo */}
      <button
        onClick={handleScrollTop}
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          background: '#008080', // cor teal padrão, pode ser ajustada conforme o tema
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px #0002',
          zIndex: 1000,
          cursor: 'pointer',
        }}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp size={22} />
      </button>
      <Footer />
    </Box>
  );
};

export default Layout; 