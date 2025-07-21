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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Content {
  id: number;
  type: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([
    {
      id: 1,
      type: 'page',
      title: 'Página Inicial',
      content: 'Conteúdo da página inicial...',
      is_active: true,
      created_at: '2024-01-15',
    },
    {
      id: 2,
      type: 'banner',
      title: 'Banner Principal',
      content: 'Banner promocional...',
      is_active: true,
      created_at: '2024-01-14',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
    is_active: true,
  });

  const handleOpenDialog = (content?: Content) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        type: content.type,
        title: content.title,
        content: content.content,
        is_active: content.is_active,
      });
    } else {
      setEditingContent(null);
      setFormData({
        type: '',
        title: '',
        content: '',
        is_active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContent(null);
  };

  const handleSubmit = () => {
    if (editingContent) {
      // Update existing content
      setContents(contents.map(c => 
        c.id === editingContent.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new content
      const newContent: Content = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0],
      };
      setContents([...contents, newContent]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setContents(contents.filter(c => c.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gerenciar Conteúdo</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Conteúdo
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={content.type} 
                    size="small" 
                    color={content.type === 'page' ? 'primary' : 'secondary'}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={content.is_active ? 'Ativo' : 'Inativo'} 
                    size="small" 
                    color={content.is_active ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>{content.created_at}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(content)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(content.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingContent ? 'Editar Conteúdo' : 'Novo Conteúdo'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                label="Tipo"
              >
                <MenuItem value="page">Página</MenuItem>
                <MenuItem value="banner">Banner</MenuItem>
                <MenuItem value="section">Seção</MenuItem>
                <MenuItem value="text">Texto</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <TextField
              fullWidth
              label="Conteúdo"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
            {editingContent ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManager; 