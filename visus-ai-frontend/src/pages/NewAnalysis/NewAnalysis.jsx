import React, {useState, useEffect} from 'react';
import UploadIcon from '../../assets/new-analysis-upload-img-icon.svg';
import {Link, useNavigate} from 'react-router-dom'; // Importe useNavigate
import apiClient from '../../api/axiosConfig'; // Importe o cliente da API
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';

import './NewAnalysis.css';

const NewAnalysis = () => {
  const navigate = useNavigate();

  // Estados do Formulário
  const [patientId, setPatientId] = useState(''); // Mudamos de 'patient' para 'patientId'
  const [examDate, setExamDate] = useState('');
  const [patientExaminedEye, setPatientExaminedEye] = useState('');
  const [utilizedEquipment, setUtilizedEquipment] = useState('');
  const [patientClinicalObs, setPatientClinicalObs] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPatientsLoading, setIsPatientsLoading] = useState(true);

  // Estado para a lista de pacientes (para preencher o select)
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Carregar a lista de pacientes assim que a tela abre
  useEffect(() => {
    const fetchPatients = async () => {
      setIsPatientsLoading(true); // Garante que está true
      try {
        const response = await apiClient.get('/api/patients');
        // O Laravel retorna { data: [...], ... } se for paginado,
        // ou direto o array [...] se for o ->get(). 
        // Assumindo que você usou ->paginate(), os dados estão em response.data.data
        // Se usou ->get(), estão em response.data. 
        // Vamos garantir que pegamos um array:
        const lista = response.data.data || response.data; 
        setPatientsList(lista);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
        toast.error("Erro ao carregar lista de pacientes.");
      } finally {
        setIsPatientsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Limpeza de memória das imagens (preview)
  useEffect(() => {
    return () => {
      selectedFiles.forEach((fileObj) => URL.revokeObjectURL(fileObj.previewUrl));
    };
  }, [selectedFiles]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newFilesWithUrls = newFiles.map((file) => ({
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFilesWithUrls]);
    e.target.value = null;
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 2. A Função de Envio (O Coração da Integração)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Criar o FormData
    const formData = new FormData();

    // 2. Adiciona os campos de texto
    formData.append('patient_id', patientId);
    formData.append('exam_date', examDate);
    formData.append('eye_examined', patientExaminedEye);
    formData.append('equipment', utilizedEquipment);
    // Envia string vazia se for null/undefined para evitar erro no backend
    formData.append('clinical_notes', patientClinicalObs || '');

    // 3. Adiciona as Imagens
    if (selectedFiles.length === 0) {
        toast.warning("Selecione pelo menos uma imagem.");
        setIsLoading(false);
        return;
    }

    selectedFiles.forEach((fileObj) => {
      // 'files[]' é crucial para o Laravel entender que é um array
      formData.append('files[]', fileObj.file);
    });

    try {
      // 4. Envia para a API FORÇANDO MULTIPART
      const response = await apiClient.post('/api/analyses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Sucesso!", response.data);
      toast.success("Análise criada com sucesso!");
      
      // 5. Redireciona
      navigate(`/analysisResult/${response.data.analysis_id}`);

    } catch (error) {
      console.error("Erro detalhado:", error);

      if (error.response) {
        // Log para ajudar a debugar se der erro de novo
        console.log("Dados do erro:", error.response.data);
        
        if (error.response.status === 422) {
          const errors = error.response.data.details || error.response.data.errors;
          // Transforma o objeto de erros em texto
          const errorMessages = Object.values(errors).flat().join('\n');
          toast.error(`Erro de validação:\n${errorMessages}`);
        } else if (error.response.data.message) {
           toast.error(`Erro do Servidor: ${error.response.data.message}`);
        } else {
           toast.error("Erro desconhecido no servidor.");
        }
      } else {
        toast.error("Erro de conexão. Verifique se o backend está rodando.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="new-analysis-main-container">
        <h2 className="new-analysis-main-title">Nova Análise de Imagem</h2>
        
        {isLoading && (
            <div style={{textAlign: 'center', padding: '1rem', color: '#33b9b9', fontWeight: 'bold'}}>
                Processando imagens com IA... Aguarde...
            </div>
        )}

        <form onSubmit={handleSubmit} className="new-analysis-main-form-container">
          <div className="patient-selection-container">
            <h4 className="patient-selection-title">Seleção do paciente</h4>
            <label htmlFor="patient" className="new-analysis-form-labels">
              Paciente *
            </label>
            
            {/* 7. Select Populado Dinamicamente */}
           {isPatientsLoading ? (
                // Mostra um esqueleto do tamanho do input enquanto carrega
                <Skeleton variant="rectangular" height={45} sx={{borderRadius: '6px'}} />
            ) : (
                <select
                  id="patient"
                  className="new-analysis-input-box"
                  required
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  // Se falhou e a lista tá vazia, desabilita
                  disabled={patientsList.length === 0} 
                >
                  <option disabled value="">
                    {patientsList.length === 0 ? "Nenhum paciente encontrado" : "Selecione um Paciente..."}
                  </option>
                  
                  {patientsList.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.nome} (CPF: {p.cpf || 'S/N'})
                    </option>
                  ))}
                </select>
            )}
            {/* Pequeno texto de ajuda se estiver demorando muito (opcional) */}
            {isPatientsLoading && <span style={{fontSize: '1rem', color: '#58beb9'}}>Buscando lista de pacientes...</span>}
            
            <label htmlFor="exam-date" className="new-analysis-form-labels">
              Data do Exame *
            </label>
            <input
              value={examDate}
              type="date" // Use type="date" direto, é mais seguro e consistente
              id="exam-date"
              className="new-analysis-input-box"
              required
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>

          <div className="exam-data-container">
            <h4 className="exam-data-selection-title">Dados do Exame</h4>
            <label htmlFor="patient-examined-eye" className="new-analysis-form-labels">
              Olho Examinado *
            </label>
            <select
              id="patient-examined-eye"
              className="new-analysis-input-box"
              required
              value={patientExaminedEye}
              onChange={(e) => setPatientExaminedEye(e.target.value)}
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option value="Direito">Olho Direito</option>
              <option value="Esquerdo">Olho Esquerdo</option>
            </select>
            <label htmlFor="utilized-equipment" className="new-analysis-form-labels">
              Equipamento utilizado
            </label>
            <input
              value={utilizedEquipment}
              type="text"
              id="utilized-equipment"
              className="new-analysis-input-box"
              placeholder="Ex: retinógrafo Canon CR-2"
              onChange={(e) => setUtilizedEquipment(e.target.value)}
            />
          </div>

          <div className="new-analysis-img-upload-container">
            <h4 className="new-analysis-selection-title">Upload da Imagem</h4>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="new-analysis-input-file"
              accept="image/jpeg, image/png, image/tiff"
              multiple
            />
            <label htmlFor="file-upload" className="new-analysis-upload-dropzone">
              <div className="new-analysis-upload-icon">
                <img src={UploadIcon} alt="Ícone Upload" className="new-analysis-upload-icon-img" />
              </div>
              <p className="new-analysis-upload-text-main">Clique aqui ou arraste a imagem</p>
              <p className="new-analysis-upload-text-sub">
                Formatos aceitos: JPG, PNG, TIFF (máx. 10MB)
              </p>
            </label>

            {selectedFiles.length > 0 && (
              <div className="selected-files-list">
                <h5 className="selected-files-title">Imagens Selecionadas:</h5>
                {selectedFiles.map((fileObj, index) => (
                  <div key={index} className="selected-file-item">
                    <img
                      src={fileObj.previewUrl}
                      alt={fileObj.file.name}
                      className="file-preview-img"
                    />
                    <div className="file-info">
                      <span className="file-name">{fileObj.file.name}</span>
                      <span className="file-size">({formatFileSize(fileObj.file.size)})</span>
                    </div>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => handleRemoveFile(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label htmlFor="patient-clinical-obs" className="new-analysis-form-labels">
              Observações Clínicas (opcional)
            </label>
            <textarea
              id="patient-clinical-obs"
              className="new-analysis-input-box-clinical-obs"
              placeholder="Observações sobre o exame, sintomas do paciente, etc."
              value={patientClinicalObs}
              onChange={(e) => setPatientClinicalObs(e.target.value)}
            />
          </div>

          <div className="new-analysis-form-actions">
            <input
              type="submit"
              value={isLoading ? "Processando..." : "Iniciar Análise"}
              className="new-analysis-submit-btn"
              id="clickSubmitButton"
              disabled={!patientId || selectedFiles.length === 0 || isLoading}
            />
            <Link to="/dashboard" className="new-analysis-cancel-btn">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewAnalysis;