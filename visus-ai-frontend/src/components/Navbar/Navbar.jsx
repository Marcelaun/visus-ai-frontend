// src/components/Navbar/Navbar.jsx

import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';

// Ícones
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkHistory from '@mui/icons-material/WorkHistory';
import PeopleIconAdd from '@mui/icons-material/GroupAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelIcon from '@mui/icons-material/AdminPanelSettings';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoVisusAi from '../../assets/Logo.svg';

import './Navbar.css';

// 1. ADICIONAMOS A PROPRIEDADE 'roles' PARA CADA ITEM
// 'professional': Acesso para profissionais de saúde
// 'admin': Acesso para administradores
// 'patient': Acesso para pacientes
const allNavItems = [
  {
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard', 
    roles: ['professional'] 
  },
  {
    text: 'Pacientes', 
    icon: <PeopleIcon />, 
    path: '/patientList', 
    roles: ['professional', 'admin']
  },
  {
    text: 'Cadastrar Paciente', 
    icon: <PeopleIconAdd />, 
    path: '/patientRegister', 
    roles: ['professional']
  },
  {
    text: 'Nova Análise', 
    icon: <NoteAddIcon />, 
    path: '/newAnalysis', 
    roles: ['professional']
  },
  // { 
  //   text: 'Resultado Análise', 
  //   icon: <BarChartIcon />, 
  //   path: '/analysisResult', 
  //   roles: ['professional', 'admin']
  // },
  {
    text: 'Seu Resultado', 
    icon: <AssessmentIcon />, 
    path: '/patientAnalysisResult', 
    roles: ['patient'] // APENAS PARA PACIENTES
  },
  {
    text: 'Histórico Análises', 
    icon: <WorkHistory />, 
    path: '/analysisHistory', 
    roles: ['professional', 'admin']
  },
  {
    text: 'Painel Administrativo', 
    icon: <AdminPanelIcon />, 
    path: '/adminPanel', 
    roles: ['admin'] // APENAS PARA ADMINS
  },
  {
    text: 'Perfil', 
    icon: <PersonIcon />, 
    path: '/profile', 
    roles: ['professional', 'admin', 'patient'] // TODOS PODEM VER
  },
  {
    text: 'Sair', 
    icon: <LogoutIcon />, 
    path: '/login', 
    roles: ['professional', 'admin', 'patient'] // TODOS PODEM SAIR
  },
];

// 2. RECEBA A PROP 'user'
const Navbar = ({ onLogout, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // 3. FILTRE OS ITENS COM BASE NA ROLE DO USUÁRIO
  // Se 'user' não existir ainda (carregando), mostra lista vazia ou básica
  const userRole = user?.role || 'guest'; 

  const navItems = allNavItems.filter(item => {
    return item.roles.includes(userRole);
  });


  const handleNavigation = (navPath) => {
    navigate(navPath);
  };

  useEffect(() => {
    // Usa a lista filtrada 'navItems' para achar o título
    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setPageTitle(currentNavItem.text);
    } else {
      setPageTitle('Visus');
    }
  }, [location, navItems]); // Adicione navItems nas dependências

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
        {/* Usa a lista filtrada 'navItems' */}
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => {
              if (item.text === 'Sair') {
                onLogout(); 
              } else {
                handleNavigation(item.path); 
              }
            }}>
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
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            style={{fontSize: 18, fontFamily: 'Inter'}}
            component="div"
            className="navbar-page-title"
          >
            {pageTitle}
          </Typography>

          <img src={LogoVisusAi} className="navbar-brand-logo" alt="Logo da Plataforma Visus" />
          <Typography variant="h6" component="div" className="navbar-brand-title">
            Plataforma de Triagem RD
          </Typography>

          <Box className="navbar-desktop-links">
            {/* Usa a lista filtrada 'navItems' */}
            {navItems.map((item) => (
              <Button
                onClick={() => {
                  if (item.text === 'Sair') {
                    onLogout();
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                key={item.text}
                className="navbar-link"
              >
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
            display: {xs: 'block', md: 'none'},
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