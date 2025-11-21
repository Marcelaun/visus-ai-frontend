import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const GlobalLoader = ({ open, message = "Carregando..." }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
      open={open}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />
      <Typography variant="h6" sx={{fontFamily: 'Inter', fontWeight: 500}}>
        {message}
      </Typography>
    </Backdrop>
  );
};

export default GlobalLoader;