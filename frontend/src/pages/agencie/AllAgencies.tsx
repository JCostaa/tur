import React, { useState } from 'react';
import {
  Box, Container, Typography, useTheme, useMediaQuery, InputBase, Paper, IconButton, Card, CardContent, Divider, Checkbox, FormControlLabel, Slider, Button, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TravelPackages from '../../components/TravelPackages';
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../../services/providers';
import { useNavigate } from 'react-router-dom';


const LOCATIONS = [
  'Barra de São Miguel',
  'Praia do Gunga',
  'Praia do Francês',
];

const RATINGS = [4, 4.5, 5];

const DURATIONS = [
  { label: 'Disponível', value: 1 },
  { label: 'Com experiência', value: 2 },
  { label: 'Profissional', value: 3 },
];

const PRICE_RANGE = [0, 300];


const AllAgencies: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>(PRICE_RANGE);

  const { data: agenciesData, isLoading, isError } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => getProviders('agencies'),
  });

  const RATINGS = [4, 4.5, 5];
  // Ignorar filtros e listar todos os motoristas
  const allAgencies = Array.isArray(agenciesData?.data?.providers) ? agenciesData.data.providers : [];
  console.log(allAgencies);

  // Mapeamento para o formato esperado pelo TravelPackages
  const mapAgencyToPackage = (agency: any) => ({
    id: agency.id,
    title: agency.title || agency.name || 'Agência',
    location: agency.location.city,
    rating: agency.rating || 5, // valor padrão
    duration: agency.duration_description || agency.duration || 'Disponível',
    price: agency.price || 'R$ 0',
    image: agency.image,
    people: agency.people || 1, // valor padrão
    description: agency.description,
    social_media: agency.social,
    email: agency.email,
    cadastur:agency.cadastur,
    phone: agency.phone_number,
    cnpj: agency.cnpj,
  });
  const mappedPackages = allAgencies.map(mapAgencyToPackage);

  // Gerar lista dinâmica de cidades a partir dos dados
  const dynamicLocations: string[] = Array.from(new Set(
    (agenciesData?.data?.providers || [])
      .map((agency: any) => agency.location?.city)
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

  const handleAgencyCardClick = (agency: any) => {
    navigate(`/agency/${agency.id}`, { state: { agency } });
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: isMobile ? '24px 0' : '40px 0', minHeight: '100vh', background: theme.palette.background.default, marginTop: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, fontSize: isMobile ? 28 : 44, mb: 1 }}>
              Encontre o seu guia de viagem
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>
              Guias de viagem profissionais para suas viagens
            </Typography>
          </Box>

          {/* Barra de pesquisa */}
          <Paper
            elevation={0}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar guias de viagem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

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
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Carregando agências...</Typography>
              ) : isError ? (
                <Typography align="center" sx={{ mt: 8, color: 'error.main' }}>Erro ao carregar agências.</Typography>
              ) : allAgencies.length === 0 ? (
                <Typography align="center" sx={{ mt: 8, color: '#888' }}>Nenhuma agência encontrada.</Typography>
              ) : (
                <TravelPackages customPackages={mappedPackages} hideTitle showArrows={false} onCardClick={handleAgencyCardClick} />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AllAgencies;
