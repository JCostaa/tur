import React, { useState } from 'react';
import {
  Box, Container, Typography, useTheme, useMediaQuery, InputBase, Paper, IconButton, Card, CardContent, Divider, Checkbox, FormControlLabel, Slider, Button, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelPackages from '../../components/TravelPackages';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getTours } from '../../services/tours';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  'Barra de São Miguel',
  'Praia do Gunga',
  'Praia do Francês',
];

const RATINGS = [4, 4.5, 5];

const DURATIONS = [
  { label: 'Até 1h', value: 1 },
  { label: '1-2h', value: 2 },
  { label: '2-4h', value: 4 },
  { label: '4h+', value: 5 },
];

const PRICE_RANGE = [0, 300];

const AllTours: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>(PRICE_RANGE);

  const { data: toursData, isLoading, isError } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
  });

  // Ignorar filtros e listar todos os passeios
  const allTours = Array.isArray(toursData?.data?.tours) ? toursData.data.tours : [];
  console.log(allTours);

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapTourToPackage = (tour: any) => ({
    id: tour.id,
    title: tour.title,
    location: tour.location?.city || tour.location?.address || 'Local não informado',
    rating: 5, // valor padrão
    duration: tour.duration_description || (tour.duration ? `${tour.duration} min` : 'Duração não informada'),
    price: tour.price,
    image: tour.image,
    people: 2, // valor padrão
    description: tour.content ? tour.content.replace(/<[^>]+>/g, '') : '', // remove HTML
  });
  const mappedPackages = allTours.map(mapTourToPackage);

  // Gerar lista dinâmica de cidades a partir dos dados
  const dynamicLocations: string[] = Array.from(new Set(
    (toursData?.data?.tours || [])
      .map((tour: any) => tour.location?.city)
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
  const handlePriceChange = (_: any, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedRatings([]);
    setSelectedDurations([]);
    setPrice(PRICE_RANGE);
  };

  const handleTourCardClick = (tour: any) => {
    navigate(`/tour/${tour.id}`, { state: { tour } });
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: isMobile ? '24px 0' : '40px 0', minHeight: '100vh', background: theme.palette.background.default, marginTop: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, fontSize: isMobile ? 28 : 44, mb: 1 }}>
              Encontre o seu próximo passeio
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: isMobile ? 16 : 22 }}>
              Descubra experiências incríveis em Barra de São Miguel e região
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
                placeholder="Buscar por nome do passeio..."
                inputProps={{ 'aria-label': 'buscar passeio' }}
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
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Carregando passeios...</Typography>
              ) : isError ? (
                <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Erro ao carregar passeios.</Typography>
              ) : allTours.length === 0 ? (
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Nenhum passeio encontrado.</Typography>
              ) : (
                <TravelPackages customPackages={mappedPackages} hideTitle showArrows={false} onCardClick={handleTourCardClick} />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AllTours; 