// src/components/ModernNavbar.jsx

import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';

// Importa o nosso novo arquivo de CSS
import './Navbar.css';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Pacientes', icon: <PeopleIcon /> },
  { text: 'Novo Laudo', icon: <PostAddIcon /> },
];

const settings = ['Perfil', 'Sair'];

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2 }}>Plataforma RD</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        // Lógica para aplicar a classe 'scrolled' condicionalmente
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="navbar-menu-icon" // Classe para controle de responsividade
          >
            <MenuIcon />
          </IconButton>
          
          <MedicalServicesIcon className="navbar-brand-icon" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Plataforma de Triagem RD
          </Typography>

          <Box className="navbar-desktop-links"> {/* Classe para controle de responsividade */}
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: 'inherit' }}>{item.text}</Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Usuário Logado" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        {/* O Drawer continua sendo controlado pelo estado do React, não precisa de CSS externo */}
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}>
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default ModernNavbar;