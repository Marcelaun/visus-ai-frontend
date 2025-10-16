// src/pages/Dashboard/Dashboard.jsx

import React from 'react';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4">
        Bem-vindo ao Dashboard!
      </Typography>
      <Typography>
        Esta página só pode ser vista por usuários logados.
      </Typography>
    </div>
  );
};

export default Dashboard;