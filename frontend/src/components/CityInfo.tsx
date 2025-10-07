import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useCity } from '../hooks/useCity';

/**
 * Componente de exemplo que mostra como usar o contexto de cidade
 * Pode ser usado em qualquer lugar da aplicação
 */
const CityInfo: React.FC = () => {
  const { currentCity, isLoading, error } = useCity();

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={16} />
        <Typography variant="body2">Carregando cidade...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" variant="outlined">
        Erro ao carregar cidade: {error}
      </Alert>
    );
  }

  if (!currentCity) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhuma cidade configurada
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        📍 {currentCity.name}, {currentCity.state}
        {currentCity.region && ` - ${currentCity.region}`}
      </Typography>
    </Box>
  );
};

export default CityInfo;
