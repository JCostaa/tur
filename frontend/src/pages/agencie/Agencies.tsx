import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../../services/providers';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const Agencies: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/all-agencies');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getProviders('agencies'),
  });

  const handleAgencyCardClick = (agency: any) => {
    navigate(`/agency/${agency.id}`, { state: { agency } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapAgencyToPackage = (agency: any) => {
    let location = '';
    if (typeof agency.location === 'string' && agency.location) {
      location = agency.location;
    } else if (
      agency.location &&
      (agency.location.address || agency.location.city || agency.location.state)
    ) {
      location = [
        agency.location.address,
        agency.location.city,
        agency.location.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: agency.id,
      title: agency.title || agency.name || 'Agência',
      location,
      rating: agency.rating || 5,
      duration: agency.duration_description || agency.duration || 'Disponível',
      price: agency.price || 'R$ 0',
      image: agency.image,
      people: agency.people || 1,
      gallery: agency.gallery || [],
      provider: agency.provider || {},
      social_media: agency.social_media || {},
      email: agency.email || '',
      cadastur: agency.cadastur || '',
      phone: agency.phone_number || '',
      cnpj: agency.cnpj || '',
      tags: Array.isArray(agency.attributes)
        ? agency.attributes.flatMap((attr: any) =>
            Array.isArray(attr.items)
              ? attr.items
              : [attr.name || attr]
          )
        : [],
      description:
        (agency.content || agency.description || '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 120) + '...',
    };
  };

  const allAgencies = Array.isArray(data?.data?.providers)
    ? data.data.providers.map(mapAgencyToPackage)
    : Array.isArray(data)
      ? data.map(mapAgencyToPackage)
      : [];

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>GUIA DE VIAGEM</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando guias de viagem...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar guias de viagem.</div>
      ) : (
        <TravelPackages customPackages={allAgencies} hideTitle onCardClick={handleAgencyCardClick} showReserveButton={false}  hidePeopleAndPrice/>
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
          Ver Todos as Agências
        </button>
      </div>
    </div>
  );
};

export default Agencies;
