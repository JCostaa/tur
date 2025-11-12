import React, { useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTours } from '../../services/tours';
import { theme } from '../../theme/theme';
import TravelPackages from '../../components/TravelPackages';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

const Tours: React.FC = () => {
  const navigate = useNavigate();
  const [hasRequestedMore, setHasRequestedMore] = useState(false);
  
  const handleClick = () => {
    navigate('/all-tours');
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['tours'],
    queryFn: ({ pageParam = 1 }) => getTours({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      const tours = lastPage?.data?.tours || [];
      if (tours.length < 10) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  // Callback para quando TravelPackages precisar de mais dados
  const handleNeedMoreData = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !hasRequestedMore) {
      setHasRequestedMore(true);
      fetchNextPage().finally(() => {
        setTimeout(() => setHasRequestedMore(false), 1000);
      });
    }
  }, [hasNextPage, isFetchingNextPage, hasRequestedMore, fetchNextPage]);

  // Combinar todos os tours de todas as páginas carregadas
  const allToursFromPages = data?.pages.flatMap(page => page?.data?.tours || []) || [];
  
  // Pegar o total de registros da primeira página da API
  const totalItemsFromApi = data?.pages[0]?.data?.total || allToursFromPages.length;

  const handleTourCardClick = (tour: { id: number }) => {
    navigate(`/tour/${tour.id}`, { state: { tour } });
  };

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapTourToPackage = (tour: { 
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
    is_featured?: boolean;
    [key: string]: unknown;
  }): {
    id: number;
    title: string;
    location: string;
    rating: number;
    duration: string;
    price: string;
    sale_price?: string;
    image: string;
    people: number;
    gallery: unknown[];
    provider: unknown;
    tags: string[];
    description: string;
    is_featured: boolean;
  } => {
    let location = '';
    if (typeof tour.location === 'string' && tour.location) {
      location = tour.location;
    } else if (
      tour.location &&
      typeof tour.location === 'object' &&
      ('address' in tour.location || 'city' in tour.location || 'state' in tour.location)
    ) {
      const locationObj = tour.location as { address?: string; city?: string; state?: string };
      location = [
        locationObj.address,
        locationObj.city,
        locationObj.state,
      ]
        .filter(Boolean)
        .join(', ');
    }
    if (!location) location = 'Local não informado';

    const cleanContent = (tour.content || tour.description || '')
      .replace(/<[^>]+>/g, '')
      .trim();
    const description = cleanContent.length > 350 
      ? cleanContent.substring(0, 350) + '...' 
      : cleanContent;

    return {
      id: tour.id,
      title: tour.title || tour.name || 'Tour',
      location,
      rating: tour.rating || 5,
      duration: tour.duration_description || tour.duration || '1h',
      price: formatPrice(tour.price || 'R$ 0'),
      sale_price: tour.sale_price ? formatPrice(tour.sale_price) : undefined,
      image: tour.image || '/images/browse-3.jpg',
      people: tour.people || 2,
      gallery: tour.gallery || [],
      provider: tour.provider || {},
      tags: Array.isArray(tour.attributes)
        ? tour.attributes.flatMap((attr: { items?: unknown[]; name?: string } | unknown) =>
            typeof attr === 'object' && attr !== null && 'items' in attr && Array.isArray(attr.items)
              ? attr.items.map(item => String(item))
              : [typeof attr === 'object' && attr !== null && 'name' in attr ? String(attr.name) : String(attr)]
          )
        : [],
      description,
      is_featured: tour.is_featured || false, // incluir propriedade is_featured
    };
  };

  const allTours = allToursFromPages.map(mapTourToPackage);

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>ATRATIVOS</h3>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#888' }}>Carregando tours...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>Erro ao carregar tours.</div>
      ) : (
        <TravelPackages 
          customPackages={allTours} 
          totalItems={totalItemsFromApi}
          hideTitle  
          onCardClick={handleTourCardClick}
          enableAutoSlide={true}
          autoSlideInterval={5000}
          onNeedMoreData={handleNeedMoreData}
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

export default Tours;
