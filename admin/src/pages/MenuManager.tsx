import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface MenuItem {
  id: number;
  name: string;
  url: string;
  order_index: number;
  is_active: boolean;
  parent_id?: number;
  created_at: string;
}

const MenuManager: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Home',
      url: '/',
      order_index: 1,
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: 2,
      name: 'Destinos',
      url: '/destinos',
      order_index: 2,
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: 3,
      name: 'Pacotes',
      url: '/pacotes',
      order_index: 3,
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: 4,
      name: 'Sobre',
      url: '/sobre',
      order_index: 4,
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: 5,
      name: 'Contato',
      url: '/contato',
      order_index: 5,
      is_active: true,
      created_at: '2024-01-15',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    order_index: 0,
    is_active: true,
    parent_id: undefined as number | undefined,
  });

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        url: item.url,
        order_index: item.order_index,
        is_active: item.is_active,
        parent_id: item.parent_id,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        url: '',
        order_index: menuItems.length + 1,
        is_active: true,
        parent_id: undefined,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSubmit = () => {
    if (editingItem) {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0],
      };
      setMenuItems([...menuItems, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gerenciar Menu</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Ordem</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems
              .sort((a, b) => a.order_index - b.order_index)
              .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.order_index}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.is_active ? 'Ativo' : 'Inativo'} 
                    size="small" 
                    color={item.is_active ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingItem ? 'Editar Item do Menu' : 'Novo Item do Menu'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <TextField
              fullWidth
              label="URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="/pagina"
            />

            <TextField
              fullWidth
              label="Ordem"
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
              }
              label="Ativo"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingItem ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuManager; 