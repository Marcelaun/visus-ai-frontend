import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';

// Importe seus ícones
import UserIcon from '../../assets/user-icon.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import ImageIcon from '../../assets/image-icon.svg';
import DocIcon from '../../assets/analysis-result-doc-icon.svg';
import LogoVisusAi from '../../assets/Logo.svg';

import './PatientAnalysisResult.css'; // Certifique-se de que este CSS existe (use o mesmo do PatientResult se preferir)

// Ícone de Aviso
const IconWarning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="patient-card-icon warning-icon" style={{color: '#F39C12', width: '1.5rem'}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

// Recebe a prop 'patient' (vinda do AppRoutes)
const PatientAnalysisResult = ({ patient }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Estados
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Logout do Paciente
  const handleLogout = () => {
    // Remove do localStorage e redireciona
    localStorage.removeItem('patientUser');
    // Força um reload para limpar estados do AppRoutes ou usa uma função passada por prop
    window.location.href = '/patient-login'; 
  };

  // Busca os dados ao carregar
  useEffect(() => {
    if (!patient) {
      navigate('/patient-login');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        // Chama a API enviando ID e CPF para autenticar
        const response = await apiClient.post('/api/patient/analysis', {
            patient_id: patient.id,
            cpf: patient.cpf,
            analysis_id: id
        });
        
        const data = response.data;
        setAnalysisData(data);

        // Formata imagens
        const formattedImages = data.images.map(img => ({
            id: img.id,
            url: img.file_path.startsWith('http') ? img.file_path : `https://vziwtdyxiozjkkppxlcl.supabase.co/storage/v1/object/public/exam_images/${img.file_path}`, 
            label: img.file_name, 
            diagnosis: img.ai_diagnosis,
        }));
        
        setImagesList(formattedImages);
        setSelectedImage(formattedImages[0]);

      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
            setError("Nenhuma análise encontrada para seus dados.");
        } else {
            setError("Erro ao carregar resultados. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [patient, navigate]);


  // Função para Baixar PDF
  const handleDownloadPdf = async () => {
    if (!analysisData) return;
    setDownloading(true);

    try {
        const response = await apiClient.post('/api/patient/pdf', {
            patient_id: patient.id,
            cpf: patient.cpf,
            analysis_id: analysisData.id
        }, {
            responseType: 'blob' // Importante para download de arquivo
        });

        // Cria um link temporário para baixar o arquivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Laudo_${patient.nome}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (err) {
        console.error("Erro no download:", err);
        alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
        setDownloading(false);
    }
  };


  if (loading) return <div style={{marginTop: '100px', textAlign: 'center'}}>Carregando resultado...</div>;
  if (error) return (
    <div style={{marginTop: '100px', textAlign: 'center'}}>
        <p style={{color: 'red', fontSize: '1.2rem'}}>{error}</p>
        <button onClick={handleLogout} style={{marginTop:'20px', padding:'10px 20px'}}>Voltar</button>
    </div>
  );
  if (!analysisData) return null;

  return (
    <div className="patient-result-page">
      
      {/* CABEÇALHO */}
      <header className="patient-result-header">
        <div className="patient-header-content">
          <img src={LogoVisusAi} alt="Logo VisusAI" className="patient-header-logo" />
          <h1 className="patient-header-title">Seu Resultado de Triagem</h1>
        </div>
        <button onClick={handleLogout} className="patient-logout-btn">Sair</button>
      </header>

      {/* CONTEÚDO */}
      <div className="patient-result-main-container">
        
        {/* COLUNA ESQUERDA */}
        <div className="patient-result-content-column">
          
          {/* Resultado */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={ChartIcon} alt="Ícone Resultado" className="patient-card-icon" />
              <h2 className="patient-card-title">Resultado da Análise</h2>
            </div>
            {/* Classe dinâmica para cor */}
            <div className={`patient-result-badge tipo-${analysisData.ai_summary_diagnosis.split(' ')[0]}`}>
              <h3>{analysisData.final_diagnosis || analysisData.ai_summary_diagnosis}</h3>
            </div>
          </div>

          {/* Imagens */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={ImageIcon} alt="Ícone Imagens" className="patient-card-icon" />
              <h2 className="patient-card-title">Imagens do Exame</h2>
            </div>
            
            {/* Imagem Principal */}
            <div className="patient-main-image-container">
              {selectedImage && (
                  <img src={selectedImage.url} alt="Exame" className="patient-main-image" />
              )}
            </div>
            
            {/* Miniaturas */}
            <div className="patient-thumbnail-grid">
              {imagesList.map((img) => (
                <div 
                  key={img.id} 
                  className={`patient-thumbnail-item ${selectedImage?.id === img.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img.url} alt="Miniatura" className="patient-thumbnail-preview" />
                  <span className="patient-thumbnail-label">{img.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendação */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={DocIcon} alt="Ícone Documento" className="patient-card-icon" />
              <h2 className="patient-card-title">Recomendação Médica</h2>
            </div>
            <p className="patient-recommendation-text">
              {analysisData.professional_conduct || "O laudo médico ainda não foi emitido. Aguarde a validação do profissional."}
            </p>
          </div>
        </div>

        {/* COLUNA DIREITA (Sidebar) */}
        <div className="patient-result-sidebar-column">
          
          {/* Dados do Paciente */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={UserIcon} alt="Ícone Usuário" className="patient-card-icon" />
              <h2 className="patient-card-title">Dados do Paciente</h2>
            </div>
            <div className="patient-data-rows">
              <div className="patient-data-row">
                <span>Nome:</span> <strong>{patient.nome}</strong>
              </div>
              <div className="patient-data-row">
                <span>Idade:</span> 
                <strong>{new Date().getFullYear() - new Date(patient.birth_date).getFullYear()} Anos</strong>
              </div>
              <div className="patient-data-row">
                <span>Tipo DM:</span> <strong>{patient.tipo_diabetes}</strong>
              </div>
              <div className="patient-data-row">
                <span>Data Exame:</span> 
                <strong>{new Date(analysisData.exam_date).toLocaleDateString('pt-BR')}</strong>
              </div>
              <div className="patient-data-row">
                <span>Profissional:</span> 
                <strong>{analysisData.professional ? analysisData.professional.name : 'Dr. Responsável'}</strong>
              </div>
            </div>
          </div>

          {/* Aviso Legal */}
          <div className="patient-card card-warning">
            <div className="patient-card-header">
              <IconWarning />
              <h2 className="patient-card-title">Aviso Legal</h2>
            </div>
            <p className="patient-warning-text">
              Este é um resultado de **triagem**. Ele foi validado por um profissional, mas não
              substitui uma consulta oftalmológica completa. Siga a recomendação médica.
            </p>
          </div>

          {/* Botão de Download */}
          <button 
            onClick={handleDownloadPdf} 
            className="download-btn" 
            disabled={downloading}
            style={{opacity: downloading ? 0.7 : 1}}
          >
            {downloading ? "Gerando PDF..." : "Baixar Laudo (PDF)"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PatientAnalysisResult;