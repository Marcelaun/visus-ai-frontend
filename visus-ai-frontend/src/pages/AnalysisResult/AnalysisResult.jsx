import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axiosConfig';

import AnalysisResultDocIcon from '../../assets/analysis-result-doc-icon.svg';
import BulbIcon from '../../assets/Bulb.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import UserIcon from '../../assets/user-icon.svg';
import ImageIcon from '../../assets/image-icon.svg'; 

import ProbabilityBars from '../../components/ProbabilityBars/ProbabilityBars';

import './AnalysisResult.css';

const AnalysisResult = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Importante para redirecionar após excluir

  // Estados
  const [analysisData, setAnalysisData] = useState(null);
  const [imagesList, setImagesList] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [professionalValidation, setProfessionalValidation] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await apiClient.get(`/api/analyses/${id}`);
        const data = response.data;

        const formattedImages = data.images.map(img => {
          let parsedProbabilities = [];
          try {
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
            probabilities: parsedProbabilities, 
            borderColor: `tipo-${img.ai_diagnosis.split(' ')[0]}` 
          };
        });

        setAnalysisData(data);
        setImagesList(formattedImages); 
        setSelectedItem(formattedImages[0]); 
        setProfessionalValidation(data.professional_conduct || '');

      } catch (err) {
        console.error("Erro ao carregar análise:", err);
        setError("Não foi possível carregar os resultados.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!professionalValidation.trim()) {
        alert("Por favor, escreva uma conduta médica antes de salvar.");
        return;
    }
    try {
        await apiClient.put(`/api/analyses/${id}`, {
            professional_conduct: professionalValidation
        });
        alert("Laudo salvo e finalizado com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar o laudo.");
    }
  };

  // --- NOVA FUNÇÃO: DELETAR ---
  const handleDelete = async () => {
    if (!window.confirm("Tem certeza absoluta? Esta análise e todas as imagens serão apagadas permanentemente.")) {
        return;
    }

    try {
        await apiClient.delete(`/api/analyses/${id}`);
        alert("Análise excluída com sucesso.");
        
        // Redireciona de volta para o histórico geral
        navigate('/analysisHistory'); 
        
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir a análise.");
    }
  };

  const handleDownloadPdf = async () => {
      if (!analysisData) return;
      setDownloading(true);
      try {
          const response = await apiClient.get(`/api/laudo/${id}/pdf`, {
              responseType: 'blob' 
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Laudo_${analysisData.patient.nome}_${analysisData.id}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
      } catch (err) {
          console.error("Erro no download:", err);
          alert("Erro ao gerar PDF. Tente novamente.");
      } finally {
          setDownloading(false);
      }
  };


  if (isLoading) return <div style={{marginTop: '100px', textAlign: 'center'}}>Carregando resultados...</div>;
  if (error) return <div style={{marginTop: '100px', textAlign: 'center', color: 'red'}}>{error}</div>;
  if (!analysisData || !selectedItem) return null;

  return (
    <>
      <div className="analysis-result-main-container">
        
        <div className="analysis-result-content-column">
          
          {/* Veredito */}
          <div className="analysis-result-ai-verdict-container">
            <div className="analysis-result-title-container">
              <img src={ChartIcon} alt="Ícone Gráfico" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">Resultados da IA</h4>
            </div>
            <div className="analysis-result-verdict-box">
              <h3 className="analysis-result-verdict-title">
                Resultado Final (Mais Grave): {analysisData.ai_summary_diagnosis.toUpperCase()}
              </h3>
            </div>
          </div>

          {/* Imagens */}
          <div className="analysis-result-exam-images-container">
            <div className="analysis-result-title-container">
              <img src={ImageIcon} alt="Ícone Imagem" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">Análise Detalhada das Imagens</h4>
            </div>
            <ProbabilityBars probabilities={selectedItem.probabilities} />
            <div className={`main-image-container ${selectedItem.borderColor}`}>
              <img 
                src={selectedItem.url} 
                alt={selectedItem.label} 
                className="main-exam-image" 
              />
               <div className="main-image-diagnosis">
                  <span className="main-image-diag-label">Diagnóstico desta imagem:</span>
                  <span className={`main-image-diag-value ${selectedItem.borderColor}`}>
                    {selectedItem.diagnosis}
                  </span>
                </div>
            </div>
            <div className="thumbnail-gallery-grid">
              {imagesList.map((item) => (
                <div 
                  key={item.id} 
                  className={`exam-thumbnail-item ${selectedItem.id === item.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedItem(item)} 
                >
                  <img src={item.url} alt={item.label} className="exam-thumbnail-preview" />
                  <span className="exam-thumbnail-label">{item.label}</span>
                  <span className={`exam-thumbnail-diagnosis ${item.borderColor}`}>
                    {item.diagnosis}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recomendações */}
          <div className="analysis-result-ai-automatic-recomendations-main-container">
             <div className="analysis-result-title-container">
               <img src={BulbIcon} alt="Lâmpada" className="analysis-result-title-icon" />
               <h4 className="analysis-result-data-title">Recomendações Automáticas</h4>
             </div>
             <div className="analysis-result-ai-text-recomendations-container">
                <div className="analysis-result-ai-text-suggestion-container">
                    <h4 className="analysis-result-ai-text-suggestion-title">SUGESTÃO: ENCAMINHAMENTO</h4>
                    <p className="analysis-result-ai-text-suggestion-text">
                        Com base na detecção ({analysisData.ai_summary_diagnosis}), sugere-se acompanhamento especializado.
                    </p>
                </div>
             </div>
          </div>

          {/* Conduta */}
          <div className="analysis-result-professional-conduct-main-container">
            <div className="analysis-result-title-container">
                <img src={AnalysisResultDocIcon} alt="Doc" className="analysis-result-title-icon" />
                <h4 className="analysis-result-data-title">Conduta Final</h4>
            </div>
            <div className="analysis-result-professional-conduct-text-area-container">
                <form onSubmit={handleSubmit} className="analysis-result-professional-conduct-form">
                    <textarea
                        id="professional-validation"
                        className="analysis-result-professional-validation-input-box"
                        value={professionalValidation}
                        onChange={(e) => setProfessionalValidation(e.target.value)}
                        placeholder="Escreva seu laudo final..."
                    />
                    <input type="submit" value="Salvar Laudo" className="analysis-result-professional-submit-btn" />
                </form>
            </div>
          </div>
        </div>

        {/* --- COLUNA DIREITA (SIDEBAR) --- */}
        <div className="analysis-result-sidebar-wrapper">
          <div className="analysis-result-patient-data-container">
            <div className="analysis-result-title-container">
              <img src={UserIcon} alt="Ícone Usuário" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">Dados do Paciente</h4>
            </div>
            <div className="analysis-result-patient-data">
              <div className="analysis-result-patient-data-sub">
                <div className="analysis-result-patient-data-label-container">
                  <p className="analysis-result-patient-data-label-title">Nome: </p>
                  <p className="analysis-result-patient-data-value">{analysisData.patient.nome}</p>
                </div>
                <div className="analysis-result-patient-data-label-container">
                  <p className="analysis-result-patient-data-label-title">Idade: </p>
                  <p className="analysis-result-patient-data-value">
                    {new Date().getFullYear() - new Date(analysisData.patient.birth_date).getFullYear()} Anos
                  </p>
                </div>
                 <div className="analysis-result-patient-data-label-container">
                  <p className="analysis-result-patient-data-label-title">Tipo DM: </p>
                  <p className="analysis-result-patient-data-value">{analysisData.patient.tipo_diabetes}</p>
                </div>
              </div>
              <div className="analysis-result-patient-data-sub">
                  <div className="analysis-result-patient-data-label-container">
                    <p className="analysis-result-patient-data-label-title">Data Exame: </p>
                    <p className="analysis-result-patient-data-value">
                        {new Date(analysisData.exam_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="analysis-result-patient-data-label-container">
                    <p className="analysis-result-patient-data-label-title">Olho: </p>
                    <p className="analysis-result-patient-data-value">{analysisData.eye_examined}</p>
                  </div>
              </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <button 
                    onClick={handleDownloadPdf} 
                    className="analysis-result-professional-submit-btn" 
                    style={{width: '100%', marginTop: 0, backgroundColor: '#33b9b9'}}
                    disabled={downloading}
                >
                    {downloading ? "Gerando PDF..." : "Baixar Laudo (PDF)"}
                </button>

                {/* --- BOTÃO DE EXCLUIR (NOVO) --- */}
                <button 
                    onClick={handleDelete} 
                    className="analysis-result-professional-submit-btn" 
                    style={{width: '100%', marginTop: 0, backgroundColor: '#e74c3c', border: '1px solid #c0392b'}}
                >
                    Excluir Análise
                </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default AnalysisResult;