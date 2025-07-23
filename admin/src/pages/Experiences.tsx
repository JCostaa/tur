import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Chip, Card, CardContent, Tooltip, CircularProgress, Snackbar, Alert, Select, MenuItem, InputLabel, FormControl, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryService } from '../services/CategoryService';
import api from '../services/axios';

interface Category { id: number; name: string; }
interface Experience {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageId?: number;
  image?: { id: number; filename: string; path: string };
  categories: Category[];
}

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({ open: false, message: '', severity: 'info' });

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/experiences');
      setExperiences(data);
    } catch (error) {
      showSnackbar('Erro ao carregar experiências', 'error');
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch {}
  };

  useEffect(() => {
    loadExperiences();
    loadCategories();
  }, []);

  const handleOpenDialog = (exp?: Experience) => {
    setEditingExp(exp || null);
    setTitle(exp?.title || '');
    setSubtitle(exp?.subtitle || '');
    setDescription(exp?.description || '');
    setSelectedCategories(exp?.categories?.map(c => c.id) || []);
    setPreview(exp?.image?.id ? `/api/upload/${exp.image.id}` : null);
    setImageFile(null);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingExp(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setSelectedCategories([]);
    setImageFile(null);
    setPreview(null);
  };
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(null);
  };
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    selectedCategories.forEach(id => formData.append('categoryIds', String(id)));
    if (imageFile) formData.append('image', imageFile);
    try {
      if (editingExp) {
        await api.put(`/experiences/${editingExp.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showSnackbar('Experiência atualizada com sucesso!', 'success');
      } else {
        await api.post('/experiences', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        showSnackbar('Experiência criada com sucesso!', 'success');
      }
      handleCloseDialog();
      loadExperiences();
    } catch (error) {
      showSnackbar('Erro ao salvar experiência', 'error');
    }
  };
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta experiência?')) {
      try {
        await api.delete(`/experiences/${id}`);
        showSnackbar('Experiência excluída com sucesso!', 'success');
        loadExperiences();
      } catch (error) {
        showSnackbar('Erro ao excluir experiência', 'error');
      }
    }
  };
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadExperiences();
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get('/experiences');
      const filtered = data.filter((exp: Experience) =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setExperiences(filtered);
    } catch (error) {
      showSnackbar('Erro na busca', 'error');
    } finally {
      setLoading(false);
    }
  };
  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Gerenciar Experiências</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Nova Experiência
        </Button>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Buscar experiências"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </Paper>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {exp.image?.url && (
                    <Avatar
                      variant="rounded"
                      src={exp.image.url}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" noWrap>{exp.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{exp.subtitle}</Typography>
                  </Box>
                  <Box>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => handleOpenDialog(exp)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton size="small" color="error" onClick={() => handleDelete(exp.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{exp.description}</Typography>
                <Box sx={{ mt: 1 }}>
                  {Array.isArray(exp.categories) && exp.categories.map(cat => (
                    <Chip key={cat.id} label={cat.name} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingExp ? 'Editar Experiência' : 'Nova Experiência'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subtítulo"
            fullWidth
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="categories-label">Categorias</InputLabel>
            <Select
              labelId="categories-label"
              multiple
              value={selectedCategories}
              onChange={e => setSelectedCategories(e.target.value as number[])}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as number[]).map(id => {
                    const cat = categories.find(c => c.id === id);
                    return cat ? <Chip key={id} label={cat.name} /> : null;
                  })}
                </Box>
              )}
            >
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center', mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="experience-image-upload"
              type="file"
              onChange={handleImageSelect}
            />
            <label htmlFor="experience-image-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Selecionar Imagem
              </Button>
            </label>
            {preview && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: 'error.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'error.dark' },
                    }}
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                {imageFile && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Arquivo: {imageFile.name}
                  </Typography>
                )}
              </Box>
            )}
            {!preview && (
              <Typography variant="body2" color="text.secondary">
                Clique para selecionar uma imagem para a experiência
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Experiences; 