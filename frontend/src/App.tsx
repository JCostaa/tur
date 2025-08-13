import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import theme from './theme/theme';
import Contact from './pages/contact';
import TourDetail from './pages/tours/TourDetail';
import AccommodationDetail from './pages/accomodation/AccommodationDetail';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import AllTours from './pages/tours/AllTours';
import AllRestaurants from './pages/restaurants/AllRestaurants';
import AllAccommodation from './pages/accomodation/AllAccommodation';
import Accommodation from './pages/accomodation/Accommodation';
import AllDrivers from './pages/drivers/AllDrivers';
import DriverDetail from './pages/drivers/DriverDetails';
import GuideDetail from './pages/guides/GuideDetails';
import AllGuides from './pages/guides/AllGuides';
import AllAgencies from './pages/agencie/AllAgencies';
import AgencyDetail from './pages/agencie/AgencieDetails';
import { Events, AllEvents, EventDetail } from './pages/events';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import { Testimonials, TestimonialDetail } from './pages/testimonials';

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
            <Route path="/contato" element={<Contact />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/all-tours" element={<AllTours />} />
            <Route path="/all-restaurants" element={<AllRestaurants />} />
            <Route path="/all-accommodation" element={<AllAccommodation />} />
            <Route path="/all-drivers" element={<AllDrivers />} />
            <Route path="/driver/:id" element={<DriverDetail />} />
            <Route path="/guide/:id" element={<GuideDetail />} />
            <Route path="/all-guides" element={<AllGuides />} />
            <Route path="/all-agencies" element={<AllAgencies />} />
            <Route path="/agency/:id" element={<AgencyDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/all-events" element={<AllEvents />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonials/:id" element={<TestimonialDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
