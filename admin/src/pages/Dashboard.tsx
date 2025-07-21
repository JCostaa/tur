import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Article as ArticleIcon,
  MenuBook as MenuBookIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    { title: 'Páginas de Conteúdo', value: '12', icon: <ArticleIcon />, color: '#ff6b35' },
    { title: 'Itens do Menu', value: '8', icon: <MenuBookIcon />, color: '#2c5f2d' },
    { title: 'Arquivos', value: '45', icon: <FolderIcon />, color: '#008080' },
    { title: 'Configurações', value: '10', icon: <SettingsIcon />, color: '#ffd700' },
  ];

  const recentActivities = [
    { text: 'Página "Sobre" foi atualizada', time: '2 horas atrás' },
    { text: 'Novo item de menu adicionado', time: '4 horas atrás' },
    { text: 'Logo do site foi alterada', time: '1 dia atrás' },
    { text: 'Configurações de cores atualizadas', time: '2 dias atrás' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: stat.color,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Atividades Recentes
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider={index < recentActivities.length - 1}>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ações Rápidas
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Criar nova página" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Gerenciar menu" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Upload de arquivos" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações do site" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 