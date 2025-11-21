import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './PatientDetails.css';
import { toast } from 'react-toastify'; // <--- IMPORTANTE: Usar toast

// Ícone de documento (reutilizando)
const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#33b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="#33b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="#33b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="#33b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H8" stroke="#33b9b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [analyses, setAnalyses] = useState([]); // Estado para as análises
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    nome: '', cpf: '', birth_date: '', sexo: '', telefone: '', email: '',
    tipo_diabetes: '', usa_insulina: '', diagnosis_time: '', 
    current_medication: '', comorbidities: ''
  });

  // 1. Busca dados do paciente E suas análises
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca Paciente
        const patientRes = await apiClient.get(`/api/patients/${id}`);
        
        // --- CORREÇÃO DA DATA AQUI ---
        // O Laravel manda "2000-03-19T00:00:00.000000Z"
        // Nós pegamos apenas a parte antes do "T": "2000-03-19"
        const patientData = patientRes.data;
        if (patientData.birth_date) {
            patientData.birth_date = patientData.birth_date.split('T')[0];
        }

        setPatient(patientData);
        setFormData(patientData); // Agora o formulário recebe o formato YYYY-MM-DD correto!

        // Busca Histórico de Análises
        const analysesRes = await apiClient.get(`/api/patients/${id}/analyses`);
        setAnalyses(analysesRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Erro ao carregar dados.");
        navigate('/patientList');
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await apiClient.put(`/api/patients/${id}`, formData);
      toast.success("Paciente atualizado com sucesso!");
      setIsEditing(false);
      setIsSaving(false);
      setPatient(formData); 
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao atualizar paciente. Verifique os dados.");
    }
  };

  // Função de cor (reutilizada do histórico)
  const getStatusColor = (diag) => {
      if (!diag) return '';
      const d = diag.toLowerCase();
      if (d.includes('normal')) return '#d1fae5';
      if (d.includes('leve') || d.includes('moderada')) return '#fef3c7';
      return '#fee2e2';
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Carregando...</div>;

  return (
    <div className="patient-details-container">
      <div className="details-header">
        <h2>Detalhes do Paciente</h2>
        <button onClick={() => navigate('/patientList')} className="back-btn">Voltar</button>
      </div>

      {/* --- CARD DE DADOS --- */}
      <form className="details-form">
        
        <h3>Dados Pessoais</h3>
        <div className="form-row">
            <label>Nome:</label>
            <input name="nome" value={formData.nome} onChange={handleChange} disabled={!isEditing} required />
        </div>
        <div className="form-row">
            <label>CPF:</label>
            <input name="cpf" value={formData.cpf || ''} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div className="form-row">
            <label>Data Nasc:</label>
            {/* Agora este input receberá a data limpa (YYYY-MM-DD) e funcionará! */}
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} disabled={!isEditing} required />
        </div>
        <div className="form-row">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} disabled={!isEditing} required>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
            </select>
        </div>

        <h3>Dados Clínicos</h3>
        <div className="form-row">
            <label>Tipo Diabetes:</label>
            <select name="tipo_diabetes" value={formData.tipo_diabetes} onChange={handleChange} disabled={!isEditing} required>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="gestacional">Gestacional</option>
                <option value="nao_sabe">Não sabe</option>
            </select>
        </div>
        <div className="form-row">
             <label>Usa Insulina?</label>
             <select name="usa_insulina" value={formData.usa_insulina} onChange={handleChange} disabled={!isEditing}>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
             </select>
        </div>
        
        {/* Adicione os outros campos aqui se necessário (diagnosis_time, etc) */}

         
                
                    

        <div className="form-actions">
            {isEditing ? (
                <>
                    <button type="button" disabled={isSaving} className="save-btn" onClick={handleSave}> {isSaving ? "Salvando Alterações..." : "Salvar Alterações"}</button>
                    <button type="button" className="cancel-btn" onClick={() => { setIsEditing(false); setFormData(patient); }}>Cancelar</button>
                </>
            ) : (
                <button type="button" className="edit-btn" onClick={() => setIsEditing(true)}>Editar Dados</button>
            )}
        </div>

      </form>

      {/* --- SEÇÃO: HISTÓRICO DE ANÁLISES DESTE PACIENTE --- */}
      <div className="patient-history-section">
         <h3>Histórico de Análises</h3>
         
         {analyses.length === 0 ? (
             <p style={{color: '#666', fontStyle: 'italic'}}>Nenhuma análise realizada para este paciente.</p>
         ) : (
             <div className="history-grid">
                 {analyses.map(analise => (
                     <div key={analise.id} className="history-card" onClick={() => navigate(`/analysisResult/${analise.id}`)}>
                         <div className="history-card-header">
                             <DocIcon />
                             <span className="history-date">
                                 {new Date(analise.exam_date).toLocaleDateString('pt-BR')}
                             </span>
                         </div>
                         <div className="history-card-body">
                             <p className="history-label">Resultado:</p>
                             <div 
                                className="history-badge" 
                                style={{backgroundColor: getStatusColor(analise.ai_summary_diagnosis)}}
                             >
                                 {analise.ai_summary_diagnosis}
                             </div>
                             <p className="history-eye">Olho: {analise.eye_examined}</p>
                         </div>
                         <div className="history-card-footer">
                             Ver Detalhes <span>→</span>
                         </div>
                     </div>
                 ))}
             </div>
         )}
         
         <div style={{marginTop: '2rem', textAlign: 'right'}}>
             <button 
                className="new-analysis-btn"
                onClick={() => navigate('/newAnalysis')} 
             >
                + Nova Análise
             </button>
         </div>
      </div>

    </div>
  );
};

export default PatientDetails;