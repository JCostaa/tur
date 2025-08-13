import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../services/events';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/all-events');
  };

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
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>EVENTOS</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando eventos...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar eventos.</div>
      ) : (
        <TravelPackages customPackages={allEvents} hideTitle  onCardClick={handleEventCardClick}/>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <button
          style={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          onClick={handleClick}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default Events;
