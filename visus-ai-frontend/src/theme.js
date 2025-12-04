// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // Define a fonte padrão para todo o Material UI
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Se quiser usar Montserrat para títulos dentro do MUI:
    h1: {
      fontFamily: 'Inter, sans-serif',
    },
    h2: {
      fontFamily: 'Inter, sans-serif',
    },
    // ... etc
  },
  // ... suas outras configurações de cores (palette) ...
});

export default theme;