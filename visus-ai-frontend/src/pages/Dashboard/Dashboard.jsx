import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig'; // Importe o axios configurado
import './Dashboard.css';
import DashboardGeneralIcon from '../../assets/dashboard-general.svg';
import DashboardRecentAnalysisIcon from '../../assets/dashboard-recent-analysis-icon.svg';
import DashboardStatisticsIcon from '../../assets/dashboard-statistics-icon.svg';
import LinearProgress from '@mui/material/LinearProgress';

const Dashboard = ({ user }) => {
  // 1. Estado para guardar os dados do dashboard
  // Inicializamos com valores zerados para não quebrar a tela enquanto carrega
  const [data, setData] = useState({
    total_patients: 0,
    today_analyses: 0,
    urgent_cases: 0,
    stats: { 'Normal': 0, 'RD Leve': 0, 'RD Moderada': 0, 'RD Severa': 0, 'RD Proliferativa': 0 },
    recent_analyses: []
  });
  const [loading, setLoading] = useState(true);

  // 2. Busca os dados ao carregar a tela
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/api/dashboard');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Função auxiliar para calcular porcentagem para as barras
  const calculatePercentage = (count) => {
    const total = data.stats['Normal'] + data.stats['RD Leve'] + data.stats['RD Moderada'] + data.stats['RD Severa'] + data.stats['RD Proliferativa'];
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  if (loading) {
    return <div style={{marginTop: '100px', textAlign: 'center'}}>Carregando...</div>;
  }

  return (
    <>
      <div className="dashboard-main-container">
        <h3 className="dashboard-welcome-title"> Bem vindo(a), {user ? user.name : 'Profissional'}!</h3>
        
        {/* --- CARDS GERAIS --- */}
        <div className="dashboard-general-data-container">
          <div className="dashboard-general-data-title-container">
            <img src={DashboardGeneralIcon} alt="Icone" className="dashboard-general-data-icon" />
            <h4 className="dashboard-general-data-title">Dashboard Geral</h4>
          </div>
          <div className="data-box-container">
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Total Pacientes</h4>
              <p className="dashboard-data-quantity" style={{color: '#008CFF'}}>
                {data.total_patients}
              </p>
            </div>
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Análises Hoje</h4>
              <p className="dashboard-data-quantity" style={{color: '#15BE34'}}>
                {data.today_analyses}
              </p>
            </div>
            <div className="dashboard-data-box">
              <h4 className="dashboard-data-box-title">Casos Urgentes</h4>
              <p className="dashboard-data-quantity" style={{color: '#BE2E15'}}>
                {data.urgent_cases}
              </p>
            </div>
          </div>
        </div>

        {/* --- ANÁLISES RECENTES (TABELA) --- */}
        <div className="dashboard-recent-analysis-container">
          <div className="dashboard-recent-analysis-data-title-container">
            <img src={DashboardRecentAnalysisIcon} alt="Icone" className="dashboard-recent-analysis-data-icon" />
            <h4 className="dashboard-recent-analysis-data-title">Análises Recentes</h4>
          </div>

          <div className="dashboard-recent-analysis-data-container">
            {/* Cabeçalho */}
            <div className="dashboard-analysis-data-titles">
              <h4 className="dashboard-analisys-data-title">Paciente</h4>
              <h4 className="dashboard-analisys-data-title">Data</h4>
              <h4 className="dashboard-analisys-data-title">Resultado</h4>
              <h4 className="dashboard-analisys-data-title">Status</h4>
            </div>
            
            {/* Lista Dinâmica */}
            <div className="dashboard-analysis-data-container">
              {data.recent_analyses.length === 0 ? (
                <p style={{textAlign: 'center', padding: '1rem'}}>Nenhuma análise recente.</p>
              ) : (
                data.recent_analyses.map((analysis) => (
                  <div key={analysis.id} className="dashboard-analysis-data">
                    <p className="dashboard-analysis-data-name">{analysis.patient_name}</p>
                    <p className="dashboard-analysis-data-day">{analysis.date}</p>
                    <p className="dashboard-analysis-data-result">{analysis.result}</p>
                    <p
                      className="dashboard-analysis-data-status"
                      style={{
                        // Muda a cor dependendo do status (lógica simples)
                        color: analysis.status === 'concluido' ? '#155724' : '#856404',
                        backgroundColor: analysis.status === 'concluido' ? '#D4EDDA' : '#FFF3CD'
                      }}
                    >
                      {analysis.status === 'concluido' ? 'Completo' : 'Pendente'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* --- ESTATÍSTICAS (BARRAS) --- */}
        <div className="dashboard-statistics-data-container">
          <div className="dashboard-general-data-title-container">
            <img src={DashboardStatisticsIcon} alt="Icone" className="dashboard-general-data-icon" />
            <h4 className="dashboard-general-data-title">Estatísticas RD</h4>
          </div>

          <div className="dashboard-statistics-data-bg-main-container">
            <div className="dashboard-statistics-data-bg-container">
              <div className="dashboard-data-cases">
                
                {/* Barra Normal */}
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">Normal ({calculatePercentage(data.stats['Normal'])}%)</h4>
                    <h4 className="dashboard-datacases-text">{data.stats['Normal']} casos</h4>
                  </div>
                  <LinearProgress variant="determinate" value={calculatePercentage(data.stats['Normal'])} sx={{ height: 12, borderRadius: 5, backgroundColor: '#f0f0f0', mb: 2, '& .MuiLinearProgress-bar': { borderRadius: 5, backgroundColor: '#35B22A' }}} />
                </div>

                {/* Barra RD Leve */}
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">RD Leve ({calculatePercentage(data.stats['RD Leve'])}%)</h4>
                    <h4 className="dashboard-datacases-text">{data.stats['RD Leve']} casos</h4>
                  </div>
                  <LinearProgress variant="determinate" value={calculatePercentage(data.stats['RD Leve'])} sx={{ height: 12, borderRadius: 5, backgroundColor: '#f0f0f0', mb: 2, '& .MuiLinearProgress-bar': { borderRadius: 5, backgroundColor: '#F39C12' }}} />
                </div>

                {/* Barra RD Moderada+ (Soma das graves) */}
                <div className="dashboard-data-cases-box">
                  <div className="dashboard-data-cases-title-container">
                    <h4 className="dashboard-data-cases-title">
                       RD Moderada+ ({calculatePercentage(data.stats['RD Moderada'] + data.stats['RD Severa'] + data.stats['RD Proliferativa']) }%)
                    </h4>
                    <h4 className="dashboard-datacases-text">
                      {data.stats['RD Moderada'] + data.stats['RD Severa'] + data.stats['RD Proliferativa']} casos
                    </h4>
                  </div>
                  <LinearProgress variant="determinate" value={calculatePercentage(data.stats['RD Moderada'] + data.stats['RD Severa'] + data.stats['RD Proliferativa'])} sx={{ height: 12, borderRadius: 5, backgroundColor: '#f0f0f0', mb: 2, '& .MuiLinearProgress-bar': { borderRadius: 5, backgroundColor: '#E74C3C' }}} />
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