import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';
import { ChromePicker } from 'react-color';

interface Setting {
  key: string;
  value: string;
  type: string;
  label: string;
  description?: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, Setting>>({
    site_title: {
      key: 'site_title',
      value: 'Sistema Tur - Viva Barra do Bugres',
      type: 'string',
      label: 'Título do Site',
      description: 'Título principal que aparece no navegador e SEO',
    },
    site_description: {
      key: 'site_description',
      value: 'Descubra as maravilhas de Barra do Bugres',
      type: 'string',
      label: 'Descrição do Site',
      description: 'Descrição para SEO e redes sociais',
    },
    primary_color: {
      key: 'primary_color',
      value: '#ff6b35',
      type: 'color',
      label: 'Cor Primária',
      description: 'Cor principal do site',
    },
    secondary_color: {
      key: 'secondary_color',
      value: '#2c5f2d',
      type: 'color',
      label: 'Cor Secundária',
      description: 'Cor secundária do site',
    },
    logo_url: {
      key: 'logo_url',
      value: '/images/logo-viva-barra.png',
      type: 'string',
      label: 'URL do Logo',
      description: 'Caminho para o arquivo do logo',
    },
    contact_email: {
      key: 'contact_email',
      value: 'contato@barradobugres.com',
      type: 'string',
      label: 'Email de Contato',
      description: 'Email principal para contato',
    },
    contact_phone: {
      key: 'contact_phone',
      value: '+55 65 99999-9999',
      type: 'string',
      label: 'Telefone de Contato',
      description: 'Telefone principal para contato',
    },
    social_facebook: {
      key: 'social_facebook',
      value: '',
      type: 'string',
      label: 'Facebook',
      description: 'URL do perfil do Facebook',
    },
    social_instagram: {
      key: 'social_instagram',
      value: '',
      type: 'string',
      label: 'Instagram',
      description: 'URL do perfil do Instagram',
    },
    social_youtube: {
      key: 'social_youtube',
      value: '',
      type: 'string',
      label: 'YouTube',
      description: 'URL do canal do YouTube',
    },
  });

  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  const handleSave = () => {
    // Here you would typically save to the backend
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderSettingField = (setting: Setting) => {
    if (setting.type === 'color') {
      return (
        <Box>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: setting.value,
              border: '2px solid #ddd',
              borderRadius: 1,
              cursor: 'pointer',
              mb: 1,
            }}
            onClick={() => setShowColorPicker(showColorPicker === setting.key ? null : setting.key)}
          />
          {showColorPicker === setting.key && (
            <Box sx={{ position: 'absolute', zIndex: 2 }}>
              <ChromePicker
                color={setting.value}
                onChange={(color) => handleSettingChange(setting.key, color.hex)}
              />
            </Box>
          )}
        </Box>
      );
    }

    return (
      <TextField
        fullWidth
        value={setting.value}
        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
        placeholder={setting.description}
      />
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Configurações do Site</Typography>
        <Button variant="contained" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Configurações salvas com sucesso!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Site Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações do Site
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.values(settings)
                  .filter(setting => ['site_title', 'site_description', 'logo_url'].includes(setting.key))
                  .map((setting) => (
                    <Box key={setting.key}>
                      <Typography variant="subtitle2" gutterBottom>
                        {setting.label}
                      </Typography>
                      {renderSettingField(setting)}
                      {setting.description && (
                        <Typography variant="caption" color="text.secondary">
                          {setting.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Colors */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cores do Site
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.values(settings)
                  .filter(setting => setting.type === 'color')
                  .map((setting) => (
                    <Box key={setting.key}>
                      <Typography variant="subtitle2" gutterBottom>
                        {setting.label}
                      </Typography>
                      {renderSettingField(setting)}
                      {setting.description && (
                        <Typography variant="caption" color="text.secondary">
                          {setting.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações de Contato
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.values(settings)
                  .filter(setting => ['contact_email', 'contact_phone'].includes(setting.key))
                  .map((setting) => (
                    <Box key={setting.key}>
                      <Typography variant="subtitle2" gutterBottom>
                        {setting.label}
                      </Typography>
                      {renderSettingField(setting)}
                      {setting.description && (
                        <Typography variant="caption" color="text.secondary">
                          {setting.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Redes Sociais
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.values(settings)
                  .filter(setting => setting.key.startsWith('social_'))
                  .map((setting) => (
                    <Box key={setting.key}>
                      <Typography variant="subtitle2" gutterBottom>
                        {setting.label}
                      </Typography>
                      {renderSettingField(setting)}
                      {setting.description && (
                        <Typography variant="caption" color="text.secondary">
                          {setting.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 