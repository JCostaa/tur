import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Person,
  Notifications,
  Security,
  Language,
  Palette,
  Save,
  Edit,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Configurations: React.FC = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('pt-BR');

  const handleProfileSave = () => {
    console.log('Saving profile...');
    setOpenProfileDialog(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configurações
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie suas preferências e configurações do sistema
        </Typography>
      </Box>

      {/* Profile Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Perfil do Usuário</Typography>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setOpenProfileDialog(true)}
            >
              Editar Perfil
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src="https://via.placeholder.com/80"
            />
            <Box>
              <Typography variant="h6">João Silva</Typography>
              <Typography variant="body2" color="text.secondary">
                Administrador do Sistema
              </Typography>
              <Typography variant="body2" color="text.secondary">
                joao.silva@sistema.tur.br
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Notifications */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notificações
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText
                  primary="Notificações por E-mail"
                  secondary="Receba atualizações importantes por e-mail"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  primary="Notificações Push"
                  secondary="Receba notificações no navegador"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText
                  primary="Notificações SMS"
                  secondary="Receba alertas por SMS"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Aparência
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Palette />
                </ListItemIcon>
                <ListItemText
                  primary="Tema"
                  secondary="Escolha o tema da interface"
                />
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <MenuItem value="light">Claro</MenuItem>
                      <MenuItem value="dark">Escuro</MenuItem>
                      <MenuItem value="auto">Automático</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText
                  primary="Idioma"
                  secondary="Selecione o idioma da interface"
                />
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <MenuItem value="pt-BR">Português</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Segurança
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Autenticação de Dois Fatores"
                  secondary="Adicione uma camada extra de segurança"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Configurar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Alterar Senha"
                  secondary="Atualize sua senha regularmente"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Alterar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* System */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sistema
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary="Sessão Ativa"
                  secondary="Último login: 15/01/2024 14:30"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small" color="error">
                    Sair
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Save />
                </ListItemIcon>
                <ListItemText
                  primary="Backup Automático"
                  secondary="Backup realizado diariamente às 02:00"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Configurar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Profile Edit Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 3, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{ width: 60, height: 60 }}
                src="https://via.placeholder.com/60"
              />
              <Button variant="outlined" size="small">
                Alterar Foto
              </Button>
            </Box>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              defaultValue="João Silva"
            />
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              defaultValue="joao.silva@sistema.tur.br"
            />
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              defaultValue="(11) 99999-9999"
            />
            <TextField
              label="Cargo"
              variant="outlined"
              fullWidth
              defaultValue="Administrador do Sistema"
            />
            <TextField
              label="Localização"
              variant="outlined"
              fullWidth
              defaultValue="São Paulo, SP"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfileDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={handleProfileSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Configurations; 