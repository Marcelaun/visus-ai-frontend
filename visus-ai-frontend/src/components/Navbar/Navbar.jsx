// src/components/Navbar/Navbar.jsx

import React, {useState, useEffect} from 'react';
// 1. Importe o useLocation para detectar a rota
import {useLocation} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PeopleIconAdd from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoVisusAi from '../../assets/Logo.svg';

import './Navbar.css';

// 2. Adicionei 'path' a cada item para a lógica do título funcionar
const navItems = [
  {text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard'},
  {text: 'Pacientes', icon: <PeopleIcon />, path: '/patientList'},
  {text: 'Cadastrar Paciente', icon: <PeopleIconAdd />, path: '/patientRegister'},
  {text: 'Novo Laudo', icon: <PostAddIcon />, path: '/novo-laudo'},
  {text: 'Perfil', icon: <PersonIcon />, path: '/perfil'},
  {text: 'Sair', icon: <LogoutIcon />, path: '/login'},
];

// const settings = ['Sair']; // Este array não está mais sendo usado

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // 3. Estado para guardar o título da página atual
  const [pageTitle, setPageTitle] = useState('');
  // 4. Obter o objeto de localização
  const location = useLocation();

  // 5. Efeito que roda toda vez que a rota (location) muda
  useEffect(() => {
    // Encontra o item de navegação correspondente ao caminho atual
    const currentNavItem = navItems.find((item) => item.path === location.pathname);

    if (currentNavItem) {
      setPageTitle(currentNavItem.text);
    } else {
      // Define um título padrão se a rota não for encontrada
      setPageTitle('Visus');
    }
  }, [location]); // Dependência: o efeito roda quando a 'location' muda

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-container">
      <div className="image-container-logo">
        <img src={LogoVisusAi} alt="Logo VisusAI" className="logo-visus-ai" />
      </div>
      <Typography variant="h6" className="drawer-title">
        Plataforma Visus
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              {' '}
              {/* Lembre-se de adicionar <Link to={item.path}> aqui */}
              <ListItemIcon className="drawer-nav-icon">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="drawer-nav-item" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="fixed" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <Toolbar className="navbar-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="navbar-menu-icon"
          >
            {/* O ícone de Menu agora será maior devido ao CSS */}
            <MenuIcon />
          </IconButton>

          {/* 6. Título dinâmico para mobile */}
          <Typography variant="h6" component="div" className="navbar-page-title">
            {pageTitle}
          </Typography>

          {/* Itens do Desktop */}
          <img src={LogoVisusAi} className="navbar-brand-logo" alt="Logo da Plataforma Visus" />
          <Typography variant="h6" component="div" className="navbar-brand-title">
            Plataforma de Triagem RD
          </Typography>

          <Box className="navbar-desktop-links">
            {navItems.map((item) => (
              <Button key={item.text} className="navbar-link">
                {' '}
                {/* Lembre-se de adicionar <Link to={item.path}> aqui */}
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{keepMounted: true}}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 250},
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
