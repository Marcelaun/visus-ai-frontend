import React, {useState} from 'react';
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
      files: selectedFiles,
    };

    console.log(dadosFormatados);
  };

  const handleFileChange = (e) => {
    // Converte a FileList (que não é um array) para um array
    const newFiles = Array.from(e.target.files);

    // Adiciona os novos arquivos à lista existente
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Limpa o valor do input para permitir selecionar o mesmo arquivo de novo
    e.target.value = null;
  };

  // 3. NOVA FUNÇÃO: Remove um arquivo da lista pelo seu índice
  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  // Função para formatar o tamanho do arquivo (opcional, mas bom para UI)
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
              Paciente *
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
            <input type="file" id="file-upload" className="new-analysis-input-file" />
            <label htmlFor="file-upload" className="new-analysis-upload-dropzone">
              <div className="new-analysis-upload-icon">
                <img src={UploadIcon} alt="Ícone Upload" className="new-analysis-upload-icon-img" />
              </div>

              <p className="new-analysis-upload-text-main">Clique aqui ou arraste a imagem</p>
              <p className="new-analysis-upload-text-sub">
                Formatos aceitos: JPG, PNG, TIFF (máx. 10MB)
              </p>
            </label>
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
            disabled={!patient}
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
