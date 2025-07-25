import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTours } from '../../services/tours';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Tours: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/all-tours');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
  });

  const handleTourCardClick = (tour: any) => {
    navigate(`/tour/${tour.id}`, { state: { tour } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapTourToPackage = (tour: any) => {
    let location = '';
    if (typeof tour.location === 'string' && tour.location) {
      location = tour.location;
    } else if (
      tour.location &&
      (tour.location.address || tour.location.city || tour.location.state)
    ) {
      location = [
        tour.location.address,
        tour.location.city,
        tour.location.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: tour.id,
      title: tour.title || tour.name || 'Tour',
      location,
      rating: tour.rating || 5,
      duration: tour.duration_description || tour.duration || '1h',
      price: tour.price || 'R$ 0',
      image: tour.image,
      people: tour.people || 2,
      gallery: tour.gallery || [],
      provider: tour.provider || {},
      tags: Array.isArray(tour.attributes)
        ? tour.attributes.flatMap((attr: any) =>
            Array.isArray(attr.items)
              ? attr.items
              : [attr.name || attr]
          )
        : [],
      description:
        (tour.content || tour.description || '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 120) + '...',
    };
  };

  const allTours = Array.isArray(data?.data?.tours)
    ? data.data.tours.map(mapTourToPackage)
    : Array.isArray(data)
      ? data.map(mapTourToPackage)
      : [];

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>TOURS</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando tours...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar tours.</div>
      ) : (
        <TravelPackages customPackages={allTours} hideTitle  onCardClick={handleTourCardClick}/>
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

export default Tours;
