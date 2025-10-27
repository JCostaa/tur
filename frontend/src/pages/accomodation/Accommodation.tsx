import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAccommodations } from '../../services/accommodations';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Accommodation: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: accommodationsData, isLoading, isError } = useQuery({
    queryKey: ['accommodations'],
    queryFn: getAccommodations,
  });

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapAccommodationToPackage = (accommodation: any) => ({
    id: accommodation.id,
    title: accommodation.title || accommodation.name || 'Hospedagem',
    location:
      typeof accommodation.location === 'string'
        ? accommodation.location
        : [accommodation.location?.address, accommodation.location?.city, accommodation.location?.state]
            .filter(Boolean)
            .join(', '),
    rating: accommodation.rating || 5,
    duration: accommodation.duration_description || accommodation.duration || '1 noite',
    price: accommodation.price || 'R$ 0',
    image: accommodation.image,
    people: accommodation.people || 2,
    gallery: accommodation.gallery || [],
    provider: accommodation.provider || {},
    // Tags: atributos lançados como tags (array de string)
    tags: Array.isArray(accommodation.attributes)
      ? accommodation.attributes.flatMap((attr: any) => Array.isArray(attr.items) ? attr.items : [attr.name || attr])
      : [],
    // Descrição: usar content ou description, limitado a 120 caracteres
    description: (accommodation.content || accommodation.description || '').replace(/<[^>]+>/g, '').slice(0, 120) + '...',
  });

  const accommodations = Array.isArray(accommodationsData?.data?.hotels)
    ? accommodationsData.data.hotels.map(mapAccommodationToPackage)
    : Array.isArray(accommodationsData)
      ? accommodationsData.map(mapAccommodationToPackage)
      : [];

  const handleClick = () => {
    navigate('/all-accommodation');
  };

  const handleAccommodationCardClick = (accommodation: any) => {
    console.log('accommodation', accommodation);
    navigate(`/accommodation/${accommodation.id}`, { state: { accommodation } });
  };

  // Se está carregando, mostra loading
  if (isLoading) {
    return (
      <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>HOSPEDAGENS</h3>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>Carregando hospedagens...</div>
      </div>
    );
  }

  // Se não houver hospedagens ou houver erro, esconde a seção completamente
  if (isError || accommodations.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '40px 0', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>HOSPEDAGENS</h3>
      </div>
      <TravelPackages 
        customPackages={accommodations} 
        hideTitle 
        detailRoute="accommodation"
        showArrows={true}
        hidePeopleAndPrice={true}
        showReserveButton={false}
        onCardClick={handleAccommodationCardClick}
        enableAutoSlide={true}
        autoSlideInterval={4500}
      />
      {accommodations.length > 3 && (
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
      )}
    </div>
  );
};

export default Accommodation;
