import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './ProfessionalDetails.css'; // Vamos criar abaixo

// Ícones
import UserIcon from '../../assets/user-icon.svg';
import BackIcon from '../../assets/back-icon.svg';
import DocIcon from '../../assets/analysis-result-doc-icon.svg';

const ProfessionalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados
  const fetchDetails = async () => {
    try {
      const response = await apiClient.get(`/api/admin/users/${id}`);
      setProfessional(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro:", err);
      setError("Erro ao carregar detalhes do profissional.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Função de Aprovar (Reutilizada)
  const handleApprove = async () => {
    if (!window.confirm("Deseja aprovar este cadastro?")) return;
    try {
      await apiClient.put(`/api/admin/users/${id}/approve`);
      alert("Profissional aprovado!");
      fetchDetails(); // Recarrega os dados
    } catch (err) {
      alert("Erro ao aprovar.");
    }
  };

  if (loading) return <div className="loading-container">Carregando...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!professional) return null;

  return (
    <div className="prof-details-container">
      
      {/* Cabeçalho com Voltar */}
      <div className="prof-details-header-nav">
        <button onClick={() => navigate('/adminPanel')} className="back-btn">
          <img src={BackIcon} alt="Voltar" /> Voltar
        </button>
        <h2>Detalhes do Profissional</h2>
      </div>

      {/* Card Principal */}
      <div className="prof-details-card">
        
        {/* Cabeçalho do Card */}
        <div className="prof-card-header">
            <div className="prof-avatar-placeholder">
                <img src={UserIcon} alt="User" />
            </div>
            <div className="prof-header-info">
                <h3>{professional.name}</h3>
                <span className={`status-badge status-${professional.status}`}>
                    {professional.status === 'active' ? 'Ativo' : 'Pendente'}
                </span>
            </div>
        </div>

        <hr className="divider" />

        {/* Grid de Informações */}
        <div className="prof-info-grid">
            
            {/* Coluna 1: Dados da Conta */}
            <div className="info-column">
                <h4>Dados da Conta</h4>
                <div className="info-item">
                    <label>Email</label>
                    <p>{professional.email}</p>
                </div>
                <div className="info-item">
                    <label>Data de Cadastro</label>
                    <p>{new Date(professional.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
            </div>

            {/* Coluna 2: Dados Profissionais */}
            <div className="info-column">
                <h4>Dados Profissionais</h4>
                <div className="info-item">
                    <label>CPF</label>
                    <p>{professional.professional?.cpf || 'Não informado'}</p>
                </div>
                <div className="info-item">
                    <label>Registro (CRM/COREN)</label>
                    <p className="highlight-text">{professional.professional?.registro_profissional || 'Não informado'}</p>
                </div>
                <div className="info-item">
                    <label>Telefone</label>
                    <p>{professional.professional?.telefone || 'Não informado'}</p>
                </div>
            </div>
        </div>

        {/* Ações */}
        <div className="prof-actions-footer">
            {professional.status === 'pending' && (
                <button className="action-btn btn-approve" onClick={handleApprove}>
                    ✅ Aprovar Cadastro
                </button>
            )}
            {/* Aqui você poderia adicionar um botão de "Bloquear" no futuro */}
            {professional.status === 'active' && (
                <button className="action-btn btn-block" onClick={() => alert("Funcionalidade futura!")}>
                    🚫 Bloquear Acesso
                </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProfessionalDetails;