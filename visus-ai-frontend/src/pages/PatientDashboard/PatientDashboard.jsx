import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './PatientDashboard.css'; // Vamos criar

// Ícones
import HistoryIcon from '../../assets/chart-bar-vertical.svg'; // Reusando ícone
import DocIcon from '../../assets/analysis-result-doc-icon.svg';
import LogoVisusAi from '../../assets/Logo.svg';

const PatientDashboard = ({ patient }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('patientUser');
    window.location.href = '/patient-login';
  };

  // Carregar histórico
  useEffect(() => {
    if (!patient) {
      navigate('/patient-login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await apiClient.post('/api/patient/history', {
            patient_id: patient.id,
            cpf: patient.cpf
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [patient, navigate]);

  // Função de cor do status
  const getStatusColor = (diagnosis) => {
      if (!diagnosis) return '';
      if (diagnosis.includes('Normal')) return 'status-normal';
      if (diagnosis.includes('Leve') || diagnosis.includes('Moderada')) return 'status-warning';
      return 'status-danger';
  };

  return (
    <div className="patient-dash-container">
      {/* Header */}
      <header className="patient-header">
         <div className="header-brand">
            <img src={LogoVisusAi} alt="Visus" />
            <div>
                <h1>Olá, {patient?.nome}</h1>
                <p>Seu histórico de triagens</p>
            </div>
         </div>
         <button onClick={handleLogout} className="btn-logout-patient">Sair</button>
      </header>

      {/* Lista */}
      <main className="patient-content">
         {loading ? (
             <p className="loading-text">Carregando exames...</p>
         ) : history.length === 0 ? (
             <div className="empty-state">
                 <p>Nenhum exame encontrado.</p>
             </div>
         ) : (
             <div className="history-list">
                 {history.map((exam) => (
                     <div key={exam.id} className="exam-card" onClick={() => navigate(`/patientAnalysisResult/${exam.id}`)}>
                         <div className="exam-icon">
                             <img src={DocIcon} alt="Exame" />
                         </div>
                         <div className="exam-info">
                             <span className="exam-date">
                                 {new Date(exam.exam_date).toLocaleDateString('pt-BR')}
                             </span>
                             <h3 className="exam-doctor">
                                 Dr(a). {exam.professional?.name || 'Não informado'}
                             </h3>
                         </div>
                         <div className="exam-status">
                             <span className={`status-badge ${getStatusColor(exam.ai_summary_diagnosis)}`}>
                                 {exam.ai_summary_diagnosis}
                             </span>
                             <span className="arrow-icon">➔</span>
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </main>
    </div>
  );
};

export default PatientDashboard;