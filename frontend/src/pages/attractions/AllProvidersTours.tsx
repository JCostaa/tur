import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, useTheme, useMediaQuery, InputBase, Paper, IconButton, Card, CardContent, Divider, Checkbox, FormControlLabel, Slider, Button, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelPackages from '../../components/TravelPackages';

// Tipo TravelPackage importado
interface TravelPackage {
  id: number;
  title: string;
  location: string;
  rating: number;
  duration: string;
  price: string;
  image: string;
  people: number;
  description: string;
  tags?: string[];
  is_featured?: boolean; // Indica se o pacote é destaque
}
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../../services/providers';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Tipo básico para provider tour
interface ProviderTour {
  id: number;
  title: string;
  content?: string;
  price: string;
  image: string;
  duration?: number;
  duration_description?: string;
  location?: {
    city?: string;
    address?: string;
  };
  expriences?: string[];
  is_featured?: boolean; // Indica se o tour é destaque
}

const RATINGS = [4, 4.5, 5];

const DURATIONS = [
  { label: 'Até 1h', value: 1 },
  { label: '1-2h', value: 2 },
  { label: '2-4h', value: 4 },
  { label: '4h+', value: 5 },
];

const PRICE_RANGE = [0, 300];

const AllProvidersTours: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>(PRICE_RANGE);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const { data: providersData, isLoading, isError } = useQuery({
    queryKey: ['providers-tours'],
    queryFn: () => getProviders('tours'),
  });

  // Capturar parâmetro de experiência da URL
  useEffect(() => {
    const experienceParam = searchParams.get('experience');
    if (experienceParam) {
      const decodedExperience = decodeURIComponent(experienceParam);
      setSelectedExperiences([decodedExperience]);
    }
  }, [searchParams]);

  // Obter todos os providers tours
  const allProviderTours = Array.isArray(providersData?.data?.providers) ? providersData.data.providers : [];

  // Extrair todas as experiências únicas dos tours
  const allExperiences: string[] = Array.from(new Set(
    allProviderTours
      .flatMap((tour: ProviderTour) => tour.expriences || [])
      .filter(Boolean)
  ));

  // Filtrar tours por experiências selecionadas
  const filteredTours = selectedExperiences.length > 0
    ? allProviderTours.filter((tour: ProviderTour) => {
        if (!Array.isArray(tour.expriences)) return false;
        
        return selectedExperiences.some(selectedExp => {
          // Dividir a experiência selecionada em partes (por vírgula)
          const selectedParts = selectedExp.split(',').map(part => part.trim().toLowerCase());
          
          // Verificar se todas as partes estão presentes nas experiências do tour
          return selectedParts.every(part => 
            tour.expriences!.some((exp: string) => 
              exp.toLowerCase().includes(part)
            )
          );
        });
      })
    : allProviderTours;

  console.log('All provider tours:', allProviderTours.length);
  console.log('Selected experiences:', selectedExperiences);
  console.log('All experiences available:', allExperiences);
  console.log('Filtered tours:', filteredTours.length);
  
  // Debug: mostrar como a experiência foi dividida
  if (selectedExperiences.length > 0) {
    const selectedParts = selectedExperiences[0].split(',').map(part => part.trim().toLowerCase());
    console.log('Selected experience parts:', selectedParts);
    
    // Mostrar alguns tours e suas experiências para debug
    console.log('Sample tours with experiences:', allProviderTours.slice(0, 3).map((tour: ProviderTour) => ({
      id: tour.id,
      title: tour.title,
      expriences: tour.expriences
    })));
  }

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapTourToPackage = (tour: ProviderTour) => ({
    id: tour.id,
    title: tour.title,
    location: tour.location?.city || tour.location?.address || 'Local não informado',
    rating: 5, // valor padrão
    duration: '', // Removido para não exibir duração
    price: tour.price,
    image: tour.image,
    people: 2, // valor padrão
    description: tour.content ? tour.content.replace(/<[^>]+>/g, '') : '', // remove HTML
    is_featured: tour.is_featured || false, // incluir propriedade is_featured
  });
  const mappedPackages = filteredTours.map(mapTourToPackage);

  // Gerar lista dinâmica de cidades a partir dos dados
  const dynamicLocations: string[] = Array.from(new Set(
    (providersData?.data?.providers || [])
      .map((tour: ProviderTour) => tour.location?.city)
      .filter((city: string | undefined): city is string => !!city)
  ));

  const handleLocationChange = (loc: string) => {
    setSelectedLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };
  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
  };
  const handleDurationChange = (duration: number) => {
    setSelectedDurations(prev => prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]);
  };
  const handleExperienceChange = (experience: string) => {
    setSelectedExperiences(prev => 
      prev.includes(experience) 
        ? prev.filter(exp => exp !== experience) 
        : [...prev, experience]
    );
  };
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedRatings([]);
    setSelectedDurations([]);
    setPrice(PRICE_RANGE);
    setSelectedExperiences([]);
    // Remover parâmetro de experiência da URL
    navigate('/all-providers-tours', { replace: true });
  };

  const handleTourCardClick = (pkg: TravelPackage) => {
    navigate(`/provider-tour/${pkg.id}`, { state: { tour: pkg } });
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: isMobile ? '24px 0' : '40px 0', minHeight: '100vh', background: theme.palette.background.default, marginTop: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, fontSize: isMobile ? 28 : 44, mb: 1 }}>
              {selectedExperiences.length > 0 ? `Fornecedores de Atrativos Filtrados por Experiência` : 'Fornecedores de Atrativos'}
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: isMobile ? 16 : 22 }}>
              {selectedExperiences.length > 0
                ? `Mostrando fornecedores que oferecem: ${selectedExperiences.join(', ')}`
                : 'Descubra fornecedores de atrativos incríveis em Resex Cuniã e região'
              }
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Paper
              component="form"
              sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 400, borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              onSubmit={e => e.preventDefault()}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 18 }}
                placeholder="Buscar por nome do fornecedor..."
                inputProps={{ 'aria-label': 'buscar fornecedor' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
            {/* Filtros laterais */}
            <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0, mb: { xs: 3, md: 0 } }}>
              <Card sx={{ position: 'static', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Filtros</Typography>
                    <Button size="small" onClick={handleClearFilters}>Limpar</Button>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  {/* Experiências */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Experiências</Typography>
                  <Stack spacing={0.5} mb={2} sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {allExperiences.map((exp: string) => (
                      <FormControlLabel
                        key={exp}
                        control={
                          <Checkbox 
                            checked={selectedExperiences.includes(exp)} 
                            onChange={() => handleExperienceChange(exp)} 
                          />
                        }
                        label={exp}
                        sx={{ fontSize: '0.875rem' }}
                      />
                    ))}
                  </Stack>
                  
                  {/* Localidade */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Localidade</Typography>
                  <Stack spacing={0.5} mb={2}>
                    {dynamicLocations.map((loc: string) => (
                      <FormControlLabel
                        key={loc}
                        control={<Checkbox checked={selectedLocations.includes(loc)} onChange={() => handleLocationChange(loc)} />}
                        label={loc}
                      />
                    ))}
                  </Stack>
                  {/* Avaliação */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Avaliação</Typography>
                  <Stack direction="row" spacing={1} mb={2}>
                    {RATINGS.map(r => (
                      <FormControlLabel
                        key={r}
                        control={<Checkbox checked={selectedRatings.includes(r)} onChange={() => handleRatingChange(r)} />}
                        label={`${r}+`}
                      />
                    ))}
                  </Stack>
                  {/* Duração */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Duração</Typography>
                  <Stack spacing={0.5} mb={2}>
                    {DURATIONS.map(d => (
                      <FormControlLabel
                        key={d.value}
                        control={<Checkbox checked={selectedDurations.includes(d.value)} onChange={() => handleDurationChange(d.value)} />}
                        label={d.label}
                      />
                    ))}
                  </Stack>
                  {/* Preço */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Preço (R$)</Typography>
                  <Box px={1}>
                    <Slider
                      value={price}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={PRICE_RANGE[0]}
                      max={PRICE_RANGE[1]}
                      step={10}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#888' }}>
                      <span>{price[0]}</span>
                      <span>{price[1]}</span>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            {/* Resultados */}
            <Box sx={{ flex: 1 }}>
              {isLoading ? (
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Carregando fornecedores...</Typography>
              ) : isError ? (
                <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Erro ao carregar fornecedores.</Typography>
              ) : filteredTours.length === 0 ? (
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>
                  {selectedExperiences.length > 0
                    ? `Nenhum fornecedor encontrado para as experiências selecionadas: ${selectedExperiences.join(', ')}.`
                    : 'Nenhum fornecedor encontrado.'
                  }
                </Typography>
              ) : (
                <TravelPackages customPackages={mappedPackages} hideTitle showArrows={false} hidePeopleAndPrice={true} showReserveButton={false} onCardClick={handleTourCardClick} />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AllProvidersTours;
