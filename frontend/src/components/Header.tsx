import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
  // Remover Link do MUI
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ExpandMore
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { brandColors } from '../config/colors';
import Logo from './Logo';

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  background: `rgba(${brandColors.primary.teal}, 0.95)`,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `rgba(${brandColors.primary.teal}, 0.98)`,
    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
  },
}));



const NavLink = styled(RouterLink)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    color: brandColors.primary.orange,
    backgroundColor: alpha(brandColors.primary.orange, 0.1),
    transform: 'translateY(-2px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: 2,
    background: brandColors.primary.orange,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '80%',
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  background: brandColors.primary.orange,
  color: brandColors.neutral.white,
  borderRadius: 8,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 1,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  '&:hover': {
    background: brandColors.secondary.darkOrange,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: brandColors.primary.orange,
    transform: 'scale(1.1) rotate(5deg)',
    backgroundColor: alpha(brandColors.primary.orange, 0.1),
  },
}));

const menuItems = [
  { text: 'Início', href: '/' },
  { text: 'Serviços', href: '/#servicos' },
  { text: 'Experiências', href: '/#experiencias' },
  {
    text: 'Promoções',
    href: '/#promocoes',
    children: [
      { text: 'Passeios', href: '/#tours' },
      { text: 'Hospedagens', href: '/#accommodations' },
      { text: 'Restaurantes', href: '/#restaurants' },
    ],
  },
  {
    text: 'Fornecedores',
    href: '/#provedores',
    children: [
      { text: 'Condutores', href: '/#drivers' },
      { text: 'Guia de Viagem', href: '/#guides' },
      { text: 'Agência de Viagem', href: '/#agencies' },
    ],
  },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Corrigido: só faz scroll suave para âncoras, deixa rotas normais para o NavLink
  const handleMenuClick = (href: string) => (e: React.MouseEvent) => {
    if (href === '/') {
      e.preventDefault();
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollToTop: true } });
      }
      return;
    }
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '').replace('#', '');
      if (location.pathname !== '/') {
        navigate('/', { state: { anchor: id } });
      } else {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Função recursiva para renderizar submenus (CSS para hover, com posicionamento horizontal para submenus)
  const renderMenuItem = (item: any, parent?: boolean, idx?: number, arr?: any[]) => {
    const hasChildren = item.children && item.children.length > 0;

    // Identificar se este é o item 'Provedores' e se o anterior é 'Promoções'
    const isProvedores = item.text === 'Provedores';
    const isAfterPromocoes = arr && idx !== undefined && idx > 0 && arr[idx - 1]?.text === 'Promoções';

    if (!hasChildren) {
      const isAnchor = item.href.startsWith('#') || item.href.startsWith('/#');
      return (
        <NavLink
          key={item.text}
          to={item.href}
          onClick={isAnchor ? handleMenuClick(item.href) : undefined}
          sx={{
            minWidth: parent ? 200 : undefined,
            px: parent ? 2.5 : 2,
            py: parent ? 1.1 : 1,
            fontSize: parent ? '1rem' : '1.08rem',
            color: parent ? '#222' : '#fff',
            backgroundColor: parent ? '#fff' : 'transparent',
            borderRadius: parent ? 1 : 0,
            fontWeight: parent ? 400 : 500,
            transition: 'all 0.18s',
            mb: arr && idx !== arr.length - 1 && parent ? 0 : 0,
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            borderBottom: arr && idx !== arr.length - 1 && parent ? '1px solid #f0f0f0' : 'none',
            '&:hover': {
              color: brandColors.primary.orange,
              backgroundColor: parent ? alpha(brandColors.primary.orange, 0.13) : alpha(brandColors.primary.orange, 0.1),
              fontWeight: 500,
            },
          }}
        >
          {item.text}
        </NavLink>
      );
    }

    // Wrapper para hover: mantém o menu aberto ao mover o mouse entre o pai e o dropdown
    return (
      <Box
        key={item.text}
        sx={{
          position: 'relative',
          mx: parent ? 0 : isProvedores && isAfterPromocoes ? '-0.5rem' : 1, // Margem negativa para colar ainda mais
          display: 'inline-block',
          '&:hover > .dropdown-menu, &:focus-within > .dropdown-menu': {
            display: 'block',
          },
        }}
        tabIndex={0}
      >
        <NavLink
          to={item.href}
          onClick={handleMenuClick(item.href)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            minWidth: item.text === 'Promoções' && !parent ? 145 : parent ? 200 : undefined, // minWidth 145px para Promoções
            px: 2.5,
            py: 1.1,
            fontSize: parent ? '1rem' : '1.08rem',
            color: parent ? '#222' : '#fff',
            backgroundColor: parent ? '#fff' : 'transparent',
            borderRadius: parent ? 1 : 0,
            fontWeight: parent ? 400 : 500,
            transition: 'all 0.18s',
            mb: arr && idx !== arr.length - 1 && parent ? 0 : 0,
            boxShadow: 'none',
            borderBottom: arr && idx !== arr.length - 1 && parent ? '1px solid #f0f0f0' : 'none',
            '&:hover': {
              color: '#fff',
              backgroundColor: parent ? '#f7f7f7' : alpha(brandColors.primary.orange, 0.1),
              fontWeight: 500,
            },
          }}
        >
          {item.text}
          <ExpandMore fontSize="small" sx={{ ml: 0.5 }} />
        </NavLink>
        <Box
          className="dropdown-menu"
          sx={{
            display: 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            bgcolor: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            borderRadius: 2,
            minWidth: 200,
            zIndex: 20,
            mt: 0,
            p: 0.5,
            border: '1.5px solid #e0e0e0',
            transition: 'all 0.18s',
          }}
        >
          {item.children && item.children.map((child: any, i: number) => renderMenuItem(child, true, i, item.children))}
        </Box>
      </Box>
    );
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
          <Logo height={40} />
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} sx={{ py: 1 }}>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Siga-nos
        </Typography>
        <Box>
          <SocialIcon size="small">
            <Facebook />
          </SocialIcon>
          <SocialIcon size="small">
            <Twitter />
          </SocialIcon>
          <SocialIcon size="small">
            <Instagram />
          </SocialIcon>
          <SocialIcon size="small">
            <LinkedIn />
          </SocialIcon>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <HeaderContainer>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo height={50} />
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {menuItems.map((item) => renderMenuItem(item))}
              </Box>
            )}

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ContactButton onClick={() => navigate('/contato')}>
                  Fale Conosco
                </ContactButton>
              </Box>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#fff' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </HeaderContainer>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: `rgba(${brandColors.primary.teal}, 0.98)`,
            backdropFilter: 'blur(10px)',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: '#fff', alignSelf: 'flex-end' }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mt: 2 }}>
            {menuItems.map((item) => {
              return (
                <NavLink
                  to={item.href}
                  sx={{
                    display: 'block',
                    py: 1,
                    px: 2,
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: brandColors.primary.orange,
                      backgroundColor: alpha(brandColors.primary.orange, 0.1),
                    },
                  }}
                  onClick={handleMenuClick(item.href)}
                >
                  {item.text}
                </NavLink>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header; 