import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  DragIndicator as DragIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import BannerService, { Banner, CreateBannerData, UpdateBannerData, File } from '../services/BannerService';

const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<CreateBannerData>({
    title: '',
    description: '',
    link: '',
    orderIndex: 0,
    isActive: true,
  });
  const [selectedImage, setSelectedImage] = useState<globalThis.File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'info' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

  useEffect(() => {
    loadBanners();
  }, [filterActive]);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const data = await BannerService.getAllBanners(filterActive ?? undefined);
      setBanners(data);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      showSnackbar('Erro ao carregar banners', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        description: banner.description || '',
        link: banner.link || '',
        orderIndex: banner.orderIndex,
        isActive: banner.isActive,
        imageId: banner.imageId,
      });
      setImagePreview(banner.image?.url || null);
      setSelectedImage(null);
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        description: '',
        link: '',
        orderIndex: banners.length,
        isActive: true,
      });
      setImagePreview(null);
      setSelectedImage(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBanner(null);
    setFormData({
      title: '',
      description: '',
      link: '',
      orderIndex: 0,
      isActive: true,
    });
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({ ...formData, imageId: undefined });
  };

  const handleSubmit = async () => {
    try {
      if (editingBanner) {
        await BannerService.updateBanner(editingBanner.id, formData, selectedImage || undefined);
        showSnackbar('Banner atualizado com sucesso!', 'success');
      } else {
        await BannerService.createBanner(formData, selectedImage || undefined);
        showSnackbar('Banner criado com sucesso!', 'success');
      }
      handleCloseDialog();
      loadBanners();
    } catch (error) {
      console.error('Erro ao salvar banner:', error);
      showSnackbar('Erro ao salvar banner', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este banner?')) {
      try {
        await BannerService.deleteBanner(id);
        showSnackbar('Banner excluído com sucesso!', 'success');
        loadBanners();
      } catch (error) {
        console.error('Erro ao excluir banner:', error);
        showSnackbar('Erro ao excluir banner', 'error');
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await BannerService.toggleBannerStatus(id);
      showSnackbar('Status do banner alterado!', 'success');
      loadBanners();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      showSnackbar('Erro ao alterar status', 'error');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadBanners();
      return;
    }

    try {
      setLoading(true);
      const results = await BannerService.searchBanners(searchQuery);
      setBanners(results);
    } catch (error) {
      console.error('Erro na busca:', error);
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

  const filteredBanners = banners.filter(banner => {
    if (filterActive !== null && banner.isActive !== filterActive) {
      return false;
    }
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gerenciar Banners
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Banner
        </Button>
      </Box>

      {/* Filtros e Busca */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Buscar banners"
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
          <Box sx={{ flex: '0 1 200px', minWidth: 0 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterActive === null ? 'all' : filterActive.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilterActive(value === 'all' ? null : value === 'true');
                }}
                label="Status"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="true">Ativos</MenuItem>
                <MenuItem value="false">Inativos</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>

      {/* Lista de Banners */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {filteredBanners.map((banner) => (
            <Box key={banner.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={banner.image?.url ? `http://localhost:5001${banner.image.url}` : '/placeholder-banner.svg'}
                  alt={banner.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h3" noWrap>
                      {banner.title}
                    </Typography>
                    <Chip
                      label={banner.isActive ? 'Ativo' : 'Inativo'}
                      color={banner.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  {banner.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {banner.description}
                    </Typography>
                  )}
                  
                  {banner.link && (
                    <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                      Link: {banner.link}
                    </Typography>
                  )}
                  
                  <Typography variant="caption" color="text.secondary">
                    Ordem: {banner.orderIndex}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(banner)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={banner.isActive ? 'Desativar' : 'Ativar'}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleStatus(banner.id)}
                        >
                          {banner.isActive ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Dialog para Criar/Editar Banner */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBanner ? 'Editar Banner' : 'Novo Banner'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Descrição"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://exemplo.com"
              />
              
              {/* Image Upload Section */}
              <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageSelect}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    Selecionar Imagem
                  </Button>
                </label>
                
                {imagePreview && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: '8px',
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'error.dark',
                          },
                        }}
                        onClick={handleRemoveImage}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    {selectedImage && (
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        Arquivo: {selectedImage.name}
                      </Typography>
                    )}
                  </Box>
                )}
                
                {!imagePreview && (
                  <Typography variant="body2" color="text.secondary">
                    Clique para selecionar uma imagem para o banner
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Ordem"
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                  inputProps={{ min: 0 }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Banner ativo"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingBanner ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificações */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BannerManager; 