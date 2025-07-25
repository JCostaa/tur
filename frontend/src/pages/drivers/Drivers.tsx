import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDrivers } from '../../services/drivers';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Drivers: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/all-drivers');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['drivers'],
    queryFn: getDrivers,
  });

  const handleDriverCardClick = (driver: any) => {
    navigate(`/driver/${driver.id}`, { state: { driver } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapDriverToPackage = (driver: any) => {
    let location = '';
    if (typeof driver.location === 'string' && driver.location) {
      location = driver.location;
    } else if (
      driver.location &&
      (driver.location.address || driver.location.city || driver.location.state)
    ) {
      location = [
        driver.location.address,
        driver.location.city,
        driver.location.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: driver.id,
      title: driver.title || driver.name || 'Motorista',
      location,
      rating: driver.rating || 5,
      duration: driver.duration_description || driver.duration || 'Disponível',
      price: driver.price || 'R$ 0',
      image: driver.image,
      people: driver.people || 1,
      gallery: driver.gallery || [],
      provider: driver.provider || {},
      tags: Array.isArray(driver.attributes)
        ? driver.attributes.flatMap((attr: any) =>
            Array.isArray(attr.items)
              ? attr.items
              : [attr.name || attr]
          )
        : [],
      description:
        (driver.content || driver.description || '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 120) + '...',
    };
  };

  const allDrivers = Array.isArray(data?.data?.providers)
    ? data.data.providers.map(mapDriverToPackage)
    : Array.isArray(data)
      ? data.map(mapDriverToPackage)
      : [];

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>CONDUTORES</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando condutores...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar condutores.</div>
      ) : (
        <TravelPackages customPackages={allDrivers} hideTitle onCardClick={handleDriverCardClick} showReserveButton={false}  hidePeopleAndPrice/>
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
          Ver Todos os Condutores
        </button>
      </div>
    </div>
  );
};

export default Drivers;
