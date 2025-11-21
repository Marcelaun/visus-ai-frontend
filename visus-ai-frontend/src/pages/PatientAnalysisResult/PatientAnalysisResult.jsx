import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';

// Ícones
import UserIcon from '../../assets/user-icon.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import ImageIcon from '../../assets/image-icon.svg';
import DocIcon from '../../assets/analysis-result-doc-icon.svg';
import LogoVisusAi from '../../assets/Logo.svg';

import ProbabilityBars from '../../components/ProbabilityBars/ProbabilityBars';
import './PatientAnalysisResult.css';

const IconWarning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="patient-card-icon warning-icon" style={{color: '#F39C12', width: '1.5rem'}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

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
    localStorage.removeItem('patientUser');
    window.location.href = '/patient-login'; 
  };

  const handleBackToAnalysisList = () => {
    navigate('/patient-dashboard');
  }

  useEffect(() => {
    if (!patient) {
      navigate('/patient-login');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        const response = await apiClient.post('/api/patient/analysis', {
            patient_id: patient.id,
            cpf: patient.cpf,
            analysis_id: id
        });
        
        const data = response.data;

        // --- CORREÇÃO CRÍTICA: Tratamento das Probabilidades ---
        const formattedImages = data.images.map(img => {
            let parsedProbabilities = [];
            try {
               // Tenta converter se for string, ou usa direto se for array
               parsedProbabilities = typeof img.ai_probabilities === 'string' 
                ? JSON.parse(img.ai_probabilities) 
                : img.ai_probabilities;
               
               if (!Array.isArray(parsedProbabilities)) parsedProbabilities = [];
            } catch (e) {
               parsedProbabilities = [];
            }

            return {
                id: img.id,
                url: img.file_path.startsWith('http') ? img.file_path : `https://vziwtdyxiozjkkppxlcl.supabase.co/storage/v1/object/public/exam_images/${img.file_path}`, 
                label: img.file_name, 
                diagnosis: img.ai_diagnosis,
                probabilities: parsedProbabilities, // <--- Agora isso existe e é um array!
                borderColor: `tipo-${img.ai_diagnosis.split(' ')[0]}` 
            };
        });

        setAnalysisData(data);
        setImagesList(formattedImages);
        
        // Só seleciona a imagem se a lista não estiver vazia
        if (formattedImages.length > 0) {
            setSelectedImage(formattedImages[0]);
        }

      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
            setError("Nenhuma análise encontrada.");
        } else {
            setError("Erro ao carregar resultados.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [patient, navigate, id]);


  const handleDownloadPdf = async () => {
    if (!analysisData) return;
    setDownloading(true);

    const pdfPromise = apiClient.post('/api/patient/pdf', {
        patient_id: patient.id,
        cpf: patient.cpf,
        analysis_id: analysisData.id
    }, {
        responseType: 'blob' 
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Laudo_${patient.nome.replace(/\s+/g, '_')}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    });

    toast.promise(pdfPromise, {
        pending: 'Gerando seu laudo PDF... ⏳',
        success: 'Download iniciado com sucesso! 📄',
        error: 'Erro ao baixar o PDF. ❌'
    }).finally(() => setDownloading(false));
  };


  // --- SKELETON LOADING ---
  if (loading) {
    return (
      <div className="patient-result-page">
        <header className="patient-result-header">
            <div className="patient-header-content" style={{gap: '1rem', alignItems: 'center'}}>
               <Skeleton variant="circular" width={40} height={40} />
               <Skeleton variant="text" width={200} height={30} />
            </div>
            <Skeleton variant="rectangular" width={60} height={30} sx={{borderRadius: 1}} />
        </header>

        <div className="patient-result-main-container">
           <div className="patient-result-content-column">
               <div className="patient-card">
                   <div className="patient-card-header" style={{marginBottom: '1rem'}}>
                       <Skeleton variant="circular" width={30} height={30} />
                       <Skeleton variant="text" width="150px" height={30} />
                   </div>
                   <Skeleton variant="rectangular" height={80} sx={{borderRadius: 2}} />
               </div>
               <div className="patient-card">
                   <Skeleton variant="rectangular" height={300} sx={{borderRadius: 2, mb: 2}} />
                   <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                       <Skeleton variant="rectangular" height={80} sx={{borderRadius: 1}} />
                       <Skeleton variant="rectangular" height={80} sx={{borderRadius: 1}} />
                       <Skeleton variant="rectangular" height={80} sx={{borderRadius: 1}} />
                   </div>
               </div>
           </div>
           <div className="patient-result-sidebar-column">
               <div className="patient-card">
                   {[1,2,3,4].map(i => (
                       <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                           <Skeleton variant="text" width="30%" />
                           <Skeleton variant="text" width="50%" />
                       </div>
                   ))}
               </div>
           </div>
        </div>
      </div>
    );
  }

  if (error) return (
    <div style={{marginTop: '100px', textAlign: 'center'}}>
        <p style={{color: 'red', fontSize: '1.2rem'}}>{error}</p>
        <button onClick={handleLogout} style={{marginTop:'20px', padding:'10px 20px', cursor:'pointer'}}>Sair</button>
    </div>
  );
  
  if (!analysisData) return null; // Caso raro de loading false mas sem dados

  return (
    <div className="patient-result-page">
      
      <header className="patient-result-header">
        <div className="patient-header-content">
          <img src={LogoVisusAi} alt="Logo VisusAI" className="patient-header-logo" />
          <h1 className="patient-header-title">Seu Resultado de Triagem</h1>
        </div>
        <div className="patient-buttons-container">
          <button onClick={handleBackToAnalysisList} className="patient-logout-btn" style={{marginRight: '15px'}}>Voltar</button>
          <button onClick={handleLogout} className="patient-logout-btn">Sair</button>
        </div>
      </header>

      <div className="patient-result-main-container">
        
        <div className="patient-result-content-column">
          
          {/* Resultado */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={ChartIcon} alt="Ícone Resultado" className="patient-card-icon" />
              <h2 className="patient-card-title">Resultado da Análise</h2>
            </div>
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
            
            <div className="patient-main-image-container">
              {selectedImage && (
                  <>
                    <img src={selectedImage.url} alt="Exame" className="patient-main-image" />
                    <div className="main-image-diagnosis">
                        <span className="main-image-diag-label">Diagnóstico IA:</span>
                        <span className={`main-image-diag-value ${selectedImage.borderColor}`}>
                            {selectedImage.diagnosis}
                        </span>
                    </div>
                  </>
              )}
            </div>

            {/* --- GRÁFICO DE BARRAS (Agora funciona!) --- */}
            {selectedImage && (
                <ProbabilityBars probabilities={selectedImage.probabilities} />
            )}

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

        {/* Sidebar */}
        <div className="patient-result-sidebar-column">
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