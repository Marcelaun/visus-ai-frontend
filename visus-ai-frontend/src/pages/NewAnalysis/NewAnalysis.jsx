import React, {useState, useEffect} from 'react';
import UploadIcon from '../../assets/new-analysis-upload-img-icon.svg';
import {Link} from 'react-router-dom';

import './NewAnalysis.css';

const NewAnalysis = () => {
  const [patient, setPatient] = useState('');
  const [examDate, setExamDate] = useState('');
  const [patientExaminedEye, setPatientExaminedEye] = useState('');
  const [utilizedEquipment, setUtilizedEquipment] = useState('');
  const [patientClinicalObs, setPatientClinicalObs] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSubmit = (e) => {
    // Agora só chama a função onLogin.
    // O redirecionamento será feito no AppRoutes.
    e.preventDefault();
    const dadosFormatados = {
      patient: patient,
      examDate: examDate,
      patientExaminedEye: patientExaminedEye,
      utilizedEquipment: utilizedEquipment,
      patientClinicalObs: patientClinicalObs,
      // Vamos enviar apenas os objetos 'File', não as URLs de preview
      files: selectedFiles.map((fileObj) => fileObj.file),
    };

    console.log(dadosFormatados);
  };

  // 1. NOVO useEffect: Limpa as URLs da memória para evitar vazamentos
  useEffect(() => {
    // A função de limpeza (return) é chamada quando o componente
    // é desmontado ou antes de o 'selectedFiles' ser atualizado.
    return () => {
      selectedFiles.forEach((fileObj) => URL.revokeObjectURL(fileObj.previewUrl));
    };
  }, [selectedFiles]); // Depende de 'selectedFiles'

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Cria um novo array com o arquivo E a sua URL de preview
    const newFilesWithUrls = newFiles.map((file) => ({
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFilesWithUrls]);
    e.target.value = null;
  };

  // 3. FUNÇÃO ATUALIZADA: Apenas filtra o estado. O useEffect cuidará da limpeza.
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

  return (
    <>
      <div className="new-analysis-main-container">
        <h2 className="new-analysis-main-title">Nova Análise de Imagem</h2>
        <form onSubmit={handleSubmit} className="new-analysis-main-form-container">
          <div className="patient-selection-container">
            <h4 className="patient-selection-title">Seleção do paciente</h4>
            <label htmlFor="patient" className="new-analysis-form-labels">
              Paciente *
            </label>
            <select
              id="patient"
              className="new-analysis-input-box" // Use a mesma classe para herdar estilos
              required
              value={patient} // Vincula o select ao estado 'patient'
              onChange={(e) => setPatient(e.target.value)} // Atualiza o estado
            >
              <option disabled value="">
                Selecione um Paciente...
              </option>
              <option value="paciente1">João da Silva</option>
              <option value="paciente2">Maria Oliveira</option>
              <option value="paciente3">Carlos Souza</option>
            </select>
            <label htmlFor="exam-date" className="new-analysis-form-labels">
              Data do Exame *
            </label>
            <input
              value={examDate}
              type="date"
              id="exam-date"
              className="new-analysis-input-box"
              required
              placeholder="dd/mm/aaaa"
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
              className="new-analysis-input-box" // Use a mesma classe para herdar estilos
              required
              value={patientExaminedEye} // Vincula o select ao estado 'patient-examined-eye'
              onChange={(e) => setPatientExaminedEye(e.target.value)} // Atualiza o estado
            >
              <option value="" disabled selected>
                Selecione...
              </option>
              <option value="direito">Olho Direito</option>
              <option value="esquerdo">Olho Esquerdo</option>
            </select>
            <label htmlFor="utilized-equipment" className="new-analysis-form-labels">
              Equipamento utilizado
            </label>
            <input
              value={utilizedEquipment}
              type="text"
              id="utilized-equipment"
              className="new-analysis-input-box"
              required
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

            {/* 5. BLOCO ATUALIZADO: Renderiza a lista com a imagem */}
            {selectedFiles.length > 0 && (
              <div className="selected-files-list">
                <h5 className="selected-files-title">Imagens Selecionadas:</h5>
                {selectedFiles.map((fileObj, index) => (
                  <div key={index} className="selected-file-item">
                    {/* A nova imagem de preview */}
                    <img
                      src={fileObj.previewUrl}
                      alt={fileObj.file.name}
                      className="file-preview-img"
                    />
                    {/* Um wrapper para o texto */}
                    <div className="file-info">
                      <span className="file-name">{fileObj.file.name}</span>
                      <span className="file-size">({formatFileSize(fileObj.file.size)})</span>
                    </div>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Apagar Imagem &times;
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
              // O 'required' não é necessário se o label não tem '*'
              // required
              value={patientClinicalObs} // Vincule ao novo estado
              onChange={(e) => setPatientClinicalObs(e.target.value)} // Use o novo 'setter'
            />
          </div>

          <input
            type="submit"
            value="Iniciar Análise"
            className="new-analysis-submit-btn"
            id="clickSubmitButton"
            disabled={!patient || selectedFiles.length === 0}
          />
          <Link to="/dashboard" className="new-analysis-cancel-btn">
            Cancelar
          </Link>
        </form>
      </div>
    </>
  );
};

export default NewAnalysis;
