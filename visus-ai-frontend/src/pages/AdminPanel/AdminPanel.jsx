import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';
import MultiUserIcon from '../../assets/multi-user-icon.svg';

const StatCard = ({ title, value, colorClass }) => (
  <div className="stat-card">
    <span className="stat-title">{title}</span>
    <span className={`stat-value ${colorClass}`}>{value}</span>
  </div>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0, 
    analysesMonth: 0  
  });

  // Função para buscar dados (extraída para poder recarregar)
  const fetchAdminData = async () => {
    try {
      const response = await apiClient.get('/api/admin/professionals');
      setProfessionals(response.data);
      setStats(prev => ({ ...prev, totalUsers: response.data.length }));
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar painel admin:", err);
      if (err.response && err.response.status === 403) {
          setError("Acesso negado. Você não é um administrador.");
      } else {
          setError("Erro ao carregar dados.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // --- NOVA FUNÇÃO: Aprovar Profissional ---
  const handleApprove = async (userId) => {
    if (!window.confirm("Tem certeza que deseja aprovar este profissional?")) return;

    try {
      // Chama a API que acabamos de criar
      await apiClient.put(`/api/admin/users/${userId}/approve`);
      alert("Profissional aprovado com sucesso!");
      
      // Atualiza a lista localmente (mais rápido que recarregar tudo)
      setProfessionals(prevList => 
        prevList.map(prof => 
          prof.id === userId ? { ...prof, status: 'active' } : prof
        )
      );

    } catch (err) {
      console.error("Erro ao aprovar:", err);
      alert("Erro ao aprovar profissional.");
    }
  };


  const getStatusColorClass = (status) => {
     if (status === 'active') return 'status-ativo';
     if (status === 'pending') return 'status-pendente';
     return '';
  };

  const formatStatus = (status) => {
      if (status === 'active') return 'Ativo';
      if (status === 'pending') return 'Pendente';
      return status;
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Carregando painel...</div>;
  if (error) return <div style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</div>;

  return (
    <div className="admin-panel-container">
      
      <div className="stat-cards-grid">
        <StatCard title="Profissionais" value={stats.totalUsers} colorClass="color-blue" />
        <StatCard title="Total Pacientes" value="-" colorClass="color-green" />
        <StatCard title="Análises/Mês" value="-" colorClass="color-orange" />
      </div>

      <div className="management-section">
        <div className="management-header">
          <img src={MultiUserIcon} alt="Ícone Gestão Profissionais" className="multi-user-icon" />
          <h3>Gestão de Profissionais</h3>
        </div>

        <div className="admin-table-container">
          
          <div className="table-header" style={{gridTemplateColumns: "1.5fr 2fr 1fr 1fr 1fr"}}>
            <span className="header-cell">Nome</span>
            <span className="header-cell">Email</span>
            <span className="header-cell">Registro (CRM)</span>
            <span className="header-cell">Status</span>
            <span className="header-cell">Ações</span>
          </div>

          <div className="table-body">
            {professionals.length === 0 ? (
                 <p style={{padding: '2rem', textAlign: 'center'}}>Nenhum profissional encontrado.</p>
            ) : (
                professionals.map((prof) => (
                <div key={prof.id} className="table-row" style={{gridTemplateColumns: "1.5fr 2fr 1fr 1fr 1fr"}}>
                    
                    <div className="cell-nome" data-label="Nome">
                        <strong>{prof.name}</strong>
                    </div>
                    
                    <div className="cell-email" data-label="Email">
                        {prof.email}
                    </div>
                    
                    <div className="cell-registro" data-label="Registro">
                        {prof.professional ? prof.professional.registro_profissional : '-'}
                    </div>

                    <div className="cell-status" data-label="Status">
                        <span className={`admin-status-tag ${getStatusColorClass(prof.status)}`}>
                            {formatStatus(prof.status)}
                        </span>
                    </div>
                    
                    <div className="cell-acoes" data-label="Ações">
                        {prof.status === 'pending' ? (
                            <button 
                              className="admin-action-button btn-aprovar"
                              onClick={() => handleApprove(prof.id)} // <-- Conecta a função aqui
                            >
                              Aprovar
                            </button>
                        ) : (
                            <button onClick={() => navigate(`/admin/professional/${prof.id}`)} className="admin-action-button btn-editar">Detalhes</button>
                        )}
                    </div>
                    
                </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;