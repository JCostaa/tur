import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import TravelPackages from '../components/TravelPackages';

const TodosPasseios: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [packages, setPackages] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5001/api/content/type/tour')
      .then(res => {
        const data = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          location: item.metadata?.location || 'Local não informado',
          rating: item.metadata?.rating || 5,
          duration: item.metadata?.duration || 'N/D',
          price: item.metadata?.price || 'N/D',
          image: item.metadata?.image || '/images/browse-1.jpg',
          people: item.metadata?.people || 1,
          description: item.content || '',
        }));
        setPackages(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar passeios.');
        setLoading(false);
      });
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>
            TODOS OS PASSEIOS
          </Typography>
          <Typography variant="h1" sx={{ fontSize: 36, fontWeight: 700, mt: 1, color: theme.palette.text.primary }}>
            Encontre o passeio ideal para você
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <input
            type="text"
            placeholder="Buscar por nome do passeio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: isMobile ? '100%' : 400,
              padding: '14px 20px',
              borderRadius: 24,
              border: '1px solid #ddd',
              fontSize: 18,
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'border 0.2s',
              marginBottom: 0,
            }}
          />
        </Box>
        {loading ? (
          <Typography align="center" sx={{ mt: 8, color: '#888' }}>Carregando passeios...</Typography>
        ) : error ? (
          <Typography align="center" sx={{ mt: 8, color: 'red' }}>{error}</Typography>
        ) : (
          <TravelPackages customPackages={filteredPackages} hideTitle />
        )}
      </Container>
    </Box>
  );
};

export default TodosPasseios; 