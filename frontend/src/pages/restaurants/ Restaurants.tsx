import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '../../services/restaurants';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/all-restaurants');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapRestaurantToPackage = (restaurant: any) => {
    let location = '';
    if (typeof restaurant.location === 'string' && restaurant.location) {
      location = restaurant.location;
    } else if (
      restaurant.location &&
      (restaurant.location.address || restaurant.location.city || restaurant.location.state)
    ) {
      location = [
        restaurant.location.address,
        restaurant.location.city,
        restaurant.location.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: restaurant.id,
      title: restaurant.title || restaurant.name || 'Restaurante',
      location,
      rating: restaurant.rating || 5,
      duration: restaurant.duration_description || restaurant.duration || 'Almoço/Jantar',
      price: restaurant.price || 'R$ 0',
      image: restaurant.image,
      people: restaurant.people || 2,
      gallery: restaurant.gallery || [],
      provider: restaurant.provider || {},
      tags: Array.isArray(restaurant.attributes)
        ? restaurant.attributes.flatMap((attr: any) =>
            Array.isArray(attr.items)
              ? attr.items
              : [attr.name || attr]
          )
        : [],
      description: (restaurant.content || restaurant.description || '').replace(/<[^>]+>/g, '').slice(0, 120) + '...',
      _original: restaurant, // para garantir que temos todos os dados originais
    };
  };

  const allRestaurants = Array.isArray(data?.data?.restaurants)
    ? data.data.restaurants.map(mapRestaurantToPackage)
    : Array.isArray(data)
      ? data.map(mapRestaurantToPackage)
      : [];

  // Handler para clique no card
  const handleRestaurantCardClick = (restaurant: any) => {
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant: restaurant._original || restaurant } });
  };

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>RESTAURANTES</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando restaurantes...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar restaurantes.</div>
      ) : (
        <TravelPackages customPackages={allRestaurants} hideTitle detailRoute="restaurant" onCardClick={handleRestaurantCardClick} showReserveButton={false} />
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

export default Restaurants;
