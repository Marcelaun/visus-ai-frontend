// src/pages/Dashboard/Dashboard.jsx

import React from 'react';
import {Typography} from '@mui/material';
import './Dashboard.css';

const Dashboard = () => {
  return (
    // <div>
    //
    //   <Typography>Esta página só pode ser vista por usuários logados.</Typography>
    // </div>
    <>
      <div className="dashboard-main-container">
        <h3 className="dashboard-welcome-title">Bem vindo Dr.(a) João Silva!</h3>
      </div>
    </>
  );
};

export default Dashboard;
