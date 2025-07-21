import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface FileItem {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  path: string;
  url: string;
  created_at: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      filename: 'logo-viva-barra.png',
      original_name: 'logo-viva-barra.png',
      mime_type: 'image/png',
      size: 1024000,
      path: '/uploads/logo-viva-barra.png',
      url: '/images/logo-viva-barra.png',
      created_at: '2024-01-15',
    },
    {
      id: 2,
      filename: 'banner-1.jpg',
      original_name: 'banner-1.jpg',
      mime_type: 'image/jpeg',
      size: 2048000,
      path: '/uploads/banner-1.jpg',
      url: '/images/banner-1.jpg',
      created_at: '2024-01-14',
    },
  ]);

  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Create mock file item
        const newFile: FileItem = {
          id: Date.now() + i,
          filename: file.name,
          original_name: file.name,
          mime_type: file.type,
          size: file.size,
          path: `/uploads/${file.name}`,
          url: URL.createObjectURL(file),
          created_at: new Date().toISOString().split('T')[0],
        };

        setFiles(prev => [...prev, newFile]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadDialog(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: true,
  });

  const handleDelete = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (mimeType: string) => mimeType.startsWith('image/');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gerenciar Arquivos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setUploadDialog(true)}
        >
          Upload de Arquivos
        </Button>
      </Box>

      <Grid container spacing={3}>
        {files.map((file) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={isImage(file.mime_type) ? file.url : '/placeholder-image.jpg'}
                alt={file.original_name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle2" noWrap>
                  {file.original_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {file.created_at}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <IconButton size="small" color="primary">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(file.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload de Arquivos</DialogTitle>
        <DialogContent>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'primary.50' : 'grey.50',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.50',
              },
            }}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Fazendo upload...
                </Typography>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      width: `${uploadProgress}%`,
                      height: 20,
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {uploadProgress}% concluído
                </Typography>
              </Box>
            ) : (
              <Box>
                <AddIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos aqui ou clique para selecionar'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suporta: JPG, PNG, GIF, WebP (máx. 5MB cada)
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)} disabled={uploading}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileManager; 