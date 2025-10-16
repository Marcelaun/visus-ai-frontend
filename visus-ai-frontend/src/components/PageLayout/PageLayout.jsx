// src/components/PageLayout.jsx
import React from 'react';
import { Box } from '@mui/material';

const PageLayout = ({ children, backgroundColor }) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || '#fff', // Cor padrão é branca
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;