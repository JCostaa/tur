import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocationCity,
  FilterList,
} from '@mui/icons-material';

interface Municipio {
  id: number;
  nome: string;
  estado: string;
  regiao: string;
  populacao: number;
  status: 'ativo' | 'inativo';
  ultimaAtualizacao: string;
}

const Municipio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMunicipio, setEditingMunicipio] = useState<Municipio | null>(null);

  // Mock data
  const municipios: Municipio[] = [
    {
      id: 1,
      nome: 'São Paulo',
      estado: 'SP',
      regiao: 'Sudeste',
      populacao: 12345678,
      status: 'ativo',
      ultimaAtualizacao: '2024-01-15',
    },
    {
      id: 2,
      nome: 'Rio de Janeiro',
      estado: 'RJ',
      regiao: 'Sudeste',
      populacao: 6747815,
      status: 'ativo',
      ultimaAtualizacao: '2024-01-14',
    },
    {
      id: 3,
      nome: 'Belo Horizonte',
      estado: 'MG',
      regiao: 'Sudeste',
      populacao: 2521564,
      status: 'ativo',
      ultimaAtualizacao: '2024-01-13',
    },
    {
      id: 4,
      nome: 'Salvador',
      estado: 'BA',
      regiao: 'Nordeste',
      populacao: 2886698,
      status: 'inativo',
      ultimaAtualizacao: '2024-01-12',
    },
    {
      id: 5,
      nome: 'Fortaleza',
      estado: 'CE',
      regiao: 'Nordeste',
      populacao: 2669342,
      status: 'ativo',
      ultimaAtualizacao: '2024-01-11',
    },
  ];

  const estados = ['SP', 'RJ', 'MG', 'BA', 'CE', 'RS', 'PR', 'SC'];

  const handleOpenDialog = (municipio?: Municipio) => {
    setEditingMunicipio(municipio || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMunicipio(null);
  };

  const handleSave = () => {
    // Here you would save the municipio data
    console.log('Saving municipio:', editingMunicipio);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    // Here you would delete the municipio
    console.log('Deleting municipio:', id);
  };

  const filteredMunicipios = municipios.filter((municipio) => {
    const matchesSearch = municipio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         municipio.estado.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || municipio.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Municípios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualize, adicione e gerencie municípios do sistema
        </Typography>
      </Box>

      {/* Filters and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, alignItems: 'end' }}>
            <TextField
              label="Buscar município"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl variant="outlined">
              <InputLabel>Estado</InputLabel>
              <Select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                label="Estado"
              >
                <MenuItem value="">Todos</MenuItem>
                {estados.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ height: 56 }}
            >
              Novo Município
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Região</TableCell>
                  <TableCell align="right">População</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Última Atualização</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMunicipios.map((municipio) => (
                  <TableRow key={municipio.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationCity color="primary" />
                        {municipio.nome}
                      </Box>
                    </TableCell>
                    <TableCell>{municipio.estado}</TableCell>
                    <TableCell>{municipio.regiao}</TableCell>
                    <TableCell align="right">
                      {municipio.populacao.toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={municipio.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        color={municipio.status === 'ativo' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{municipio.ultimaAtualizacao}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(municipio)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(municipio.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMunicipio ? 'Editar Município' : 'Novo Município'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              label="Nome do Município"
              variant="outlined"
              fullWidth
              defaultValue={editingMunicipio?.nome || ''}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                defaultValue={editingMunicipio?.estado || ''}
                label="Estado"
              >
                {estados.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="População"
              variant="outlined"
              type="number"
              fullWidth
              defaultValue={editingMunicipio?.populacao || ''}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={editingMunicipio?.status || 'ativo'}
                label="Status"
              >
                <MenuItem value="ativo">Ativo</MenuItem>
                <MenuItem value="inativo">Inativo</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Municipio; 