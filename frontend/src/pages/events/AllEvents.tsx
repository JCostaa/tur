import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../services/events';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Button, Box, Typography } from '@mui/material';

const AllEvents: React.FC = () => {
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const handleEventCardClick = (event: any) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapEventToPackage = (event: any) => {
    let location = '';
    if (typeof event.location === 'string' && event.location) {
      location = event.location;
    } else if (
      event.location &&
      (event.location.address || event.location.city || event.location.state)
    ) {
      location = [
        event.location.address,
        event.location.city,
        event.location.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: event.id,
      title: event.title || event.name || 'Evento',
      location,
      rating: event.rating || 5,
      duration: event.duration_description || event.duration || '1h',
      price: event.price || 'R$ 0',
      image: event.image,
      people: event.people || 2,
      gallery: event.gallery || [],
      provider: event.provider || {},
      tags: Array.isArray(event.attributes)
        ? event.attributes.flatMap((attr: any) =>
            Array.isArray(attr.items)
              ? attr.items
              : [attr.name || attr]
          )
        : [],
      description:
        (event.content || event.description || '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 120) + '...',
    };
  };

  const allEvents = Array.isArray(data?.data?.events)
    ? data.data.events.map(mapEventToPackage)
    : Array.isArray(data)
      ? data.map(mapEventToPackage)
      : [];

  return (
    <Box sx={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ 
              mr: 2,
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            Todos os Eventos
          </Typography>
        </Box>
        
        {isLoading ? (
          <Box sx={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>
            <Typography>Carregando eventos...</Typography>
          </Box>
        ) : isError ? (
          <Box sx={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>
            <Typography>Erro ao carregar eventos.</Typography>
          </Box>
        ) : allEvents.length === 0 ? (
          <Box sx={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>
            <Typography>Nenhum evento encontrado.</Typography>
          </Box>
        ) : (
          <TravelPackages 
            customPackages={allEvents} 
            hideTitle 
            onCardClick={handleEventCardClick}
            showAll={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default AllEvents;
