// src/pages/Dashboard/Dashboard.jsx

import React from 'react';
import './Dashboard.css';
import DashboardGeneralIcon from '../../assets/dashboard-general.svg';
import DashboardRecentAnalysisIcon from '../../assets/dashboard-recent-analysis-icon.svg';
import DashboardStatisticsIcon from '../../assets/dashboard-statistics-icon.svg';
import LinearProgress from '@mui/material/LinearProgress';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-main-container">
        <h3 className="dashboard-welcome-title">Bem vindo Dr.(a) João Silva!</h3>
        <div className="dashboard-general-data-container">
          <div className="dashboard-general-data-title-container">
            <img
              src={DashboardGeneralIcon}
              alt="Icone dashboard dados"
              className="dashboard-general-data-icon"
            />
            <h4 className="dashboard-general-data-title">Dashboard Geral</h4>
          </div>
          <div className="data-box-container">
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Total Pacientes</h4>
              <p className="dashboard-data-quantity" style={{color: '#008CFF'}}>
                147
              </p>
            </div>
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Análises Hoje</h4>
              <p className="dashboard-data-quantity" style={{color: '#15BE34'}}>
                23
              </p>
            </div>
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Casos Urgentes</h4>
              <p className="dashboard-data-quantity" style={{color: '#BE2E15'}}>
                5
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-recent-analysis-container">
          <div className="dashboard-recent-analysis-data-title-container">
            <img
              src={DashboardRecentAnalysisIcon}
              alt="Icone dashboard dados"
              className="dashboard-recent-analysis-data-icon"
            />
            <h4 className="dashboard-recent-analysis-data-title">Análises Recentes</h4>
          </div>

          <div className="dashboard-recent-analysis-data-container">
            <div className="dashboard-analysis-data-titles">
              <h4 className="dashboard-analisys-data-title">Paciente</h4>
              <h4 className="dashboard-analisys-data-title">Data</h4>
              <h4 className="dashboard-analisys-data-title">Resultado</h4>
              <h4 className="dashboard-analisys-data-title">Status</h4>
            </div>
            <div className="dashboard-analysis-data-container">
              <div className="dashboard-analysis-data">
                <p className="dashboard-analysis-data-name">Maria Santos</p>
                <p className="dashboard-analysis-data-day">08/09/2025</p>
                <p className="dashboard-analysis-data-result">RD Moderado</p>
                <p
                  className="dashboard-analysis-data-status"
                  style={{color: '#721C24', backgroundColor: '#F8D7DA'}}
                >
                  Urgente
                </p>
              </div>
              <div className="dashboard-analysis-data">
                <p className="dashboard-analysis-data-name">José Silva</p>
                <p className="dashboard-analysis-data-day">13/04/2025</p>
                <p className="dashboard-analysis-data-result">Normal</p>
                <p
                  className="dashboard-analysis-data-status"
                  style={{color: '#155724', backgroundColor: '#D4EDDA'}}
                >
                  Completo
                </p>
              </div>
              <div className="dashboard-analysis-data">
                <p className="dashboard-analysis-data-name">Ana Costa</p>
                <p className="dashboard-analysis-data-day">07/02/2025</p>
                <p className="dashboard-analysis-data-result">RD Leve</p>
                <p
                  className="dashboard-analysis-data-status"
                  style={{color: '#856404', backgroundColor: '#FFF3CD'}}
                >
                  Pendente
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-statistics-data-container">
          <div className="dashboard-general-data-title-container">
            <img
              src={DashboardStatisticsIcon}
              alt="Icone dashboard dados"
              className="dashboard-general-data-icon"
            />
            <h4 className="dashboard-general-data-title">Estatísticas RD</h4>
          </div>

          <div className="dashboard-statistics-data-bg-main-container">
            <div className="dashboard-statistics-data-bg-container">
              <div className="dashboard-data-cases">
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">Normal (60%)</h4>
                    <h4 className="dashboard-datacases-text">88 casos</h4>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    // 1. A prop "color" foi removida daqui

                    sx={{
                      height: 12,
                      borderRadius: 5,
                      backgroundColor: '#f0f0f0', // Cor da trilha (fundo cinza)
                      mb: 2,

                      // 2. A mágica acontece aqui
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: '#35B22A', // <-- SUA COR PERSONALIZADA
                      },
                    }}
                  />
                </div>
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">RD Leve (25%)</h4>
                    <h4 className="dashboard-datacases-text">37 casos</h4>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={25}
                    // 1. A prop "color" foi removida daqui

                    sx={{
                      height: 12,
                      borderRadius: 5,
                      backgroundColor: '#f0f0f0', // Cor da trilha (fundo cinza)
                      mb: 2,

                      // 2. A mágica acontece aqui
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: '#F39C12', // <-- SUA COR PERSONALIZADA
                      },
                    }}
                  />
                </div>
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">Normal (15%)</h4>
                    <h4 className="dashboard-datacases-text">22 casos</h4>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={15}
                    // 1. A prop "color" foi removida daqui

                    sx={{
                      height: 12,
                      borderRadius: 5,
                      backgroundColor: '#f0f0f0', // Cor da trilha (fundo cinza)
                      mb: 2,

                      // 2. A mágica acontece aqui
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: '#E74C3C', // <-- SUA COR PERSONALIZADA
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
