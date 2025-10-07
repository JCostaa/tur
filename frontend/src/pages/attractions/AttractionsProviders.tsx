import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../../services/providers';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';

const AttractionsProviders: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/all-providers-tours'); // Navega para a página de todos os fornecedores
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['providers-tours'],
    queryFn: () => getProviders('tours'),
  });

  const handleAttractionCardClick = (attraction: { id: number }) => {
    navigate(`/provider-tour/${attraction.id}`, { state: { tour: attraction } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapAttractionToPackage = (attraction: { 
    id: number;
    title?: string;
    name?: string;
    location?: string | { address?: string; city?: string; state?: string };
    rating?: number;
    duration_description?: string;
    duration?: string;
    price?: string;
    sale_price?: string;
    image?: string;
    people?: number;
    gallery?: unknown[];
    provider?: unknown;
    attributes?: { items?: unknown[]; name?: string }[] | unknown[];
    content?: string;
    description?: string;
    [key: string]: unknown;
  }) => {
    let location = '';
    if (typeof attraction.location === 'string' && attraction.location) {
      location = attraction.location;
    } else if (
      attraction.location &&
      typeof attraction.location === 'object' &&
      ('address' in attraction.location || 'city' in attraction.location || 'state' in attraction.location)
    ) {
      const locationObj = attraction.location as { address?: string; city?: string; state?: string };
      location = [
        locationObj.address,
        locationObj.city,
        locationObj.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    return {
      id: attraction.id,
      title: attraction.title || attraction.name || 'Atrativo',
      location,
      rating: attraction.rating || 5,
      duration: '', // Removido para não exibir duração
      price: attraction.price || 'R$ 0',
      sale_price: attraction.sale_price,
      image: attraction.image,
      people: attraction.people || 2,
      gallery: attraction.gallery || [],
      provider: attraction.provider || {},
      tags: Array.isArray(attraction.attributes)
        ? attraction.attributes.flatMap((attr: { items?: unknown[]; name?: string } | unknown) =>
            typeof attr === 'object' && attr !== null && 'items' in attr && Array.isArray(attr.items)
              ? attr.items.map(item => String(item))
              : [typeof attr === 'object' && attr !== null && 'name' in attr ? String(attr.name) : String(attr)]
          )
        : [],
      description:
        (attraction.content || attraction.description || '')
          .replace(/<[^>]+>/g, '')
          .slice(0, 120) + '...',
      is_featured: attraction.is_featured || false,
    };
  };

  const allAttractions = Array.isArray(data?.data?.providers)
    ? data.data.providers.map(mapAttractionToPackage)
    : Array.isArray(data)
      ? data.map(mapAttractionToPackage)
      : [];

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>FORNECEDORES DE ATRATIVOS</h3>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando fornecedores de atrativos...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar fornecedores de atrativos.</div>
      ) : (
        <TravelPackages 
          customPackages={allAttractions} 
          hideTitle  
          hidePeopleAndPrice={true}
          showReserveButton={false}
          onCardClick={handleAttractionCardClick}
          enableAutoSlide={true}
          autoSlideInterval={5000}
        />
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

export default AttractionsProviders;
