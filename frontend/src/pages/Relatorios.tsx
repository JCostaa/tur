import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Assessment,
  Download,
  Visibility,
  Schedule,
  TrendingUp,
  LocationCity,
  People,
  Business,
} from '@mui/icons-material';

interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  size: string;
}

const Relatorios: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');

  const reportTypes = [
    {
      title: 'Relatório de Municípios',
      description: 'Lista completa de municípios cadastrados',
      icon: <LocationCity />,
      type: 'municipios',
    },
    {
      title: 'Relatório Demográfico',
      description: 'Dados populacionais por região',
      icon: <People />,
      type: 'demografico',
    },
    {
      title: 'Relatório de Atividades',
      description: 'Atividades e eventos por município',
      icon: <Business />,
      type: 'atividades',
    },
    {
      title: 'Relatório de Tendências',
      description: 'Análise de tendências e crescimento',
      icon: <TrendingUp />,
      type: 'tendencias',
    },
  ];

  const recentReports: Report[] = [
    {
      id: 1,
      title: 'Relatório de Municípios - Janeiro 2024',
      description: 'Relatório mensal de municípios ativos',
      type: 'municipios',
      status: 'completed',
      createdAt: '2024-01-15 14:30',
      size: '2.5 MB',
    },
    {
      id: 2,
      title: 'Relatório Demográfico - Q4 2023',
      description: 'Dados populacionais do último trimestre',
      type: 'demografico',
      status: 'completed',
      createdAt: '2024-01-10 09:15',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Relatório de Atividades - Dezembro 2023',
      description: 'Atividades realizadas em dezembro',
      type: 'atividades',
      status: 'processing',
      createdAt: '2024-01-08 16:45',
      size: '3.2 MB',
    },
    {
      id: 4,
      title: 'Relatório de Tendências - 2023',
      description: 'Análise anual de tendências',
      type: 'tendencias',
      status: 'failed',
      createdAt: '2024-01-05 11:20',
      size: '4.1 MB',
    },
  ];

  const handleGenerateReport = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReportType('');
  };

  const handleCreateReport = () => {
    console.log('Creating report:', selectedReportType);
    handleCloseDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Processando';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Relatórios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gere e visualize relatórios do sistema
        </Typography>
      </Box>

      {/* Report Types */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Tipos de Relatório</Typography>
            <Button
              variant="contained"
              startIcon={<Assessment />}
              onClick={handleGenerateReport}
            >
              Gerar Relatório
            </Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {reportTypes.map((reportType) => (
              <Card
                key={reportType.type}
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => {
                  setSelectedReportType(reportType.type);
                  setOpenDialog(true);
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {React.cloneElement(reportType.icon, { sx: { fontSize: 40, color: 'primary.main' } })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {reportType.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {reportType.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Relatórios Recentes
          </Typography>
          <List>
            {recentReports.map((report, index) => (
              <React.Fragment key={report.id}>
                <ListItem>
                  <ListItemIcon>
                    <Assessment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={report.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {report.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                          <Chip
                            label={getStatusText(report.status)}
                            color={getStatusColor(report.status) as any}
                            size="small"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {report.createdAt} • {report.size}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      disabled={report.status !== 'completed'}
                    >
                      Visualizar
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download />}
                      disabled={report.status !== 'completed'}
                    >
                      Download
                    </Button>
                  </Box>
                </ListItem>
                {index < recentReports.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Gerar Novo Relatório</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 3, pt: 1 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tipo de Relatório</InputLabel>
              <Select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                label="Tipo de Relatório"
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.type} value={type.type}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Nome do Relatório"
              variant="outlined"
              fullWidth
              placeholder="Ex: Relatório de Municípios - Janeiro 2024"
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="Descrição opcional do relatório"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleCreateReport}
            variant="contained"
            disabled={!selectedReportType}
          >
            Gerar Relatório
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Relatorios; 