import React from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import { Twitter, Facebook, LinkedIn, Instagram, YouTube, Person, Login, Home } from '@mui/icons-material';

const socialLinks = [
  { icon: <Twitter />, url: '#' },
  { icon: <Facebook />, url: '#' },
  { icon: <LinkedIn />, url: '#' },
  { icon: <Instagram />, url: '#' },
  { icon: <YouTube />, url: '#' },
];

const Topbar: React.FC = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#15397C', color: 'white', px: 2, py: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Social icons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {socialLinks.map((item, idx) => (
          <IconButton key={idx} href={item.url} target="_blank" sx={{ color: 'white', border: '1px solid #fff', p: 0.5, mx: 0.25 }} size="small">
            {item.icon}
          </IconButton>
        ))}
      </Box>
      {/* Right actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button startIcon={<Person />} color="inherit" sx={{ color: 'white', textTransform: 'none', fontSize: 14 }}>
          Registro
        </Button>
        <Button startIcon={<Login />} color="inherit" sx={{ color: 'white', textTransform: 'none', fontSize: 14 }}>
          Acesso
        </Button>
        <Button startIcon={<Home />} color="inherit" sx={{ color: 'white', textTransform: 'none', fontSize: 14 }}>
          Meu Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar; 