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
    e.preventDefault();
    const dadosFormatados = {
      patient: patient,
      examDate: examDate,
      patientExaminedEye: patientExaminedEye,
      utilizedEquipment: utilizedEquipment,
      patientClinicalObs: patientClinicalObs,
      files: selectedFiles.map((fileObj) => fileObj.file),
    };
    console.log(dadosFormatados);
  };

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

  return (
    <>
      <div className="new-analysis-main-container">
        <h2 className="new-analysis-main-title">Nova Análise de Imagem</h2>
        <form onSubmit={handleSubmit} className="new-analysis-main-form-container">
          {/* --- Coluna 1 (Desktop) --- */}
          <div className="patient-selection-container">
            <h4 className="patient-selection-title">Seleção do paciente</h4>
            <label htmlFor="patient" className="new-analysis-form-labels">
              Paciente *
            </label>
            <select
              id="patient"
              className="new-analysis-input-box"
              required
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
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
              type="text" // Alterado para 'text' para o placeholder funcionar
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              id="exam-date"
              className="new-analysis-input-box"
              required
              placeholder="dd/mm/aaaa"
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>

          {/* --- Coluna 2 (Desktop) --- */}
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
              placeholder="Ex: retinógrafo Canon CR-2"
              onChange={(e) => setUtilizedEquipment(e.target.value)}
            />
          </div>

          {/* --- Seção de Upload (Linha Inteira) --- */}
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

          {/* *** NOVO CONTAINER PARA OS BOTÕES *** */}
          <div className="new-analysis-form-actions">
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
          </div>
        </form>
      </div>
    </>
  );
};

export default NewAnalysis;
