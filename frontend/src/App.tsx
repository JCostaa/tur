import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import theme from './theme/theme';
import Contato from './pages/Contato';
import TourDetail from './pages/TourDetail';
import AccommodationDetail from './pages/AccommodationDetail';
import RestaurantDetail from './pages/RestaurantDetail';
import AllTours from './pages/AllTours';
import AllRestaurants from './pages/AllRestaurants';
import AllAccommodation from './pages/AllAccommodation';
import Accommodation from './pages/Accommodation';

// Componente utilitário para zerar o scroll ao trocar de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/destination" element={<div>Destination Page</div>} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/all-tours" element={<AllTours />} />
            <Route path="/all-restaurants" element={<AllRestaurants />} />
            <Route path="/all-accommodation" element={<AllAccommodation />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
