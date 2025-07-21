import React, { useState } from 'react';
import {
  Box, Container, Typography, useTheme, useMediaQuery, InputBase, Paper, IconButton, Card, CardContent, Divider, Checkbox, FormControlLabel, Slider, Button, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelPackages from '../components/TravelPackages';
import Grid from '@mui/material/Grid';
import Header from '../components/Header';

// MOCK DATA
const MOCK_RESTAURANTS = [
  {
    id: 1,
    title: 'Restaurante Sabor do Pantanal',
    location: 'Centro',
    rating: 4.7,
    duration: 'Almoço',
    price: 'R$ 60',
    image: '/images/category-2.jpg',
    people: 50,
    description: 'Pratos típicos da região, ambiente acolhedor e música ao vivo.'
  },
  {
    id: 2,
    title: 'Peixaria do Zé',
    location: 'Beira Rio',
    rating: 4.5,
    duration: 'Jantar',
    price: 'R$ 80',
    image: '/images/browse-2.jpg',
    people: 40,
    description: 'Especialidade em peixes frescos e frutos do mar.'
  },
  {
    id: 3,
    title: 'Churrascaria Boi na Brasa',
    location: 'Centro',
    rating: 4.8,
    duration: 'Almoço/Jantar',
    price: 'R$ 90',
    image: '/images/browse-3.jpg',
    people: 100,
    description: 'Rodízio de carnes nobres e buffet variado.'
  },
  {
    id: 4,
    title: 'Pizzaria Bella Massa',
    location: 'Praia',
    rating: 4.6,
    duration: 'Noite',
    price: 'R$ 50',
    image: '/images/browse-4.jpg',
    people: 30,
    description: 'Pizzas artesanais e ambiente familiar.'
  },
  {
    id: 5,
    title: 'Restaurante Vegetariano Vida Verde',
    location: 'Centro',
    rating: 4.9,
    duration: 'Almoço',
    price: 'R$ 55',
    image: '/images/browse-5.jpg',
    people: 25,
    description: 'Opções vegetarianas e veganas, sucos naturais.'
  },
];

const LOCATIONS = [
  'Centro',
  'Beira Rio',
  'Praia',
];

const RATINGS = [4, 4.5, 5];

const DURATIONS = [
  { label: 'Almoço', value: 1 },
  { label: 'Jantar', value: 2 },
  { label: 'Noite', value: 3 },
  { label: 'Almoço/Jantar', value: 4 },
];

const PRICE_RANGE = [0, 100];

const AllRestaurants: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>(PRICE_RANGE);

  // Filtro de busca simples (por nome)
  let filteredPackages = MOCK_RESTAURANTS.filter(pkg =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  // Filtros laterais
  if (selectedLocations.length > 0) {
    filteredPackages = filteredPackages.filter(pkg => selectedLocations.includes(pkg.location));
  }
  if (selectedRatings.length > 0) {
    filteredPackages = filteredPackages.filter(pkg => selectedRatings.some(r => pkg.rating >= r));
  }
  if (selectedDurations.length > 0) {
    filteredPackages = filteredPackages.filter(pkg => {
      return selectedDurations.some(d => {
        if (d === 1) return pkg.duration.includes('Almoço');
        if (d === 2) return pkg.duration.includes('Jantar');
        if (d === 3) return pkg.duration.includes('Noite');
        if (d === 4) return pkg.duration.includes('Almoço/Jantar');
        return false;
      });
    });
  }
  filteredPackages = filteredPackages.filter(pkg => {
    const priceNumber = Number(pkg.price.replace(/\D/g, ''));
    return priceNumber >= price[0] && priceNumber <= price[1];
  });

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

  return (
    <>
      <Header />
      <Box sx={{ padding: isMobile ? '24px 0' : '40px 0', minHeight: '100vh', background: theme.palette.background.default, marginTop: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, fontSize: isMobile ? 28 : 44, mb: 1 }}>
              Encontre o restaurante ideal
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: isMobile ? 16 : 22 }}>
              Descubra os melhores sabores da região
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
                placeholder="Buscar por nome do restaurante..."
                inputProps={{ 'aria-label': 'buscar restaurante' }}
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
                    {LOCATIONS.map(loc => (
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
                  {/* Período */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Período</Typography>
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
                      step={5}
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
              {filteredPackages.length === 0 ? (
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Nenhum restaurante encontrado.</Typography>
              ) : (
                <TravelPackages customPackages={filteredPackages} hideTitle detailRoute="restaurant" />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AllRestaurants; 