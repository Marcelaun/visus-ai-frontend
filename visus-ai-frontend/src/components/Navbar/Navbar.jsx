// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoVisusAi from '../../assets/Logo.svg';

import './Navbar.css';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Pacientes', icon: <PeopleIcon /> },
  { text: 'Novo Laudo', icon: <PostAddIcon /> },
];

const settings = ['Perfil', 'Sair'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-container">
      <Typography variant="h6" className="drawer-title">
        Plataforma Visus
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
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
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className="navbar-menu-icon">
            <MenuIcon />
          </IconButton>
          
          <img src={LogoVisusAi} className="navbar-brand-logo" alt='Logo da Plataforma Visus' />
          
          <Typography variant="h6" component="div" className="navbar-brand-title">
            Plataforma de Triagem RD
          </Typography>

          <Box className="navbar-desktop-links">
            {navItems.map((item) => (
              <Button key={item.text} className="navbar-link">{item.text}</Button>
            ))}
          </Box>
          
          <Box className="navbar-user-menu">
            <IconButton onClick={handleOpenUserMenu} className="navbar-avatar-button">
              <Avatar alt="Usuário Logado" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu className="navbar-dropdown-menu" id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
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
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}>
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;