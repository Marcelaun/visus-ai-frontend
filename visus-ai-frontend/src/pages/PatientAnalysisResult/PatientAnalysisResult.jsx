import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// Importe seus ícones (ou use SVGs embutidos como farei)
import UserIcon from '../../assets/user-icon.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import ImageIcon from '../../assets/image-icon.svg';
import DocIcon from '../../assets/analysis-result-doc-icon.svg';
import WarningIcon from '../../assets/circle-warning.svg'; // Exemplo, vou usar um SVG
import LogoVisusAi from '../../assets/Logo.svg';

import './PatientAnalysisResult.css';

// --- DADOS DE EXEMPLO (Viriam da API) ---
// Estes são os dados JÁ validados pelo profissional
const mockPatientData = {
  nome: 'Maria Santos',
  idade: '54 Anos',
  tipoDM: 'Tipo 2',
  dataExame: '08/09/2025',
  olho: 'Direito',
  profissional: 'Dr. João Silva',
};

const mockResults = [
  {
    id: 1,
    url: 'https://placehold.co/600x600/000/fff?text=Olho+Campo+1',
    label: 'Campo 1 (Mácula)',
  },
  {
    id: 3,
    url: 'https://placehold.co/600x600/666/fff?text=Olho+Campo+3',
    label: 'Campo 3 (Temporal)',
  },
];

const mockFinalDiagnosis = {
  resultado: 'RD Moderada',
  resultadoTipo: 'tipo-RD', // Para o CSS
  recomendacao:
    'Encaminho o paciente para avaliação com oftalmologista. Recomendo agendamento prioritário e exames complementares (Angiofluoresceinografia, OCT) para melhor avaliação do quadro.',
};
// --- FIM DOS DADOS DE EXEMPLO ---

// Ícone de Aviso (para o card "Aviso Legal")
const IconWarning = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

const PatientResult = () => {
  const [selectedImage, setSelectedImage] = useState(mockResults[0]);
  const navigate = useNavigate();

  const handleDownloadPdf = () => {
    // Lógica para gerar e baixar o PDF (RF09)
    console.log('Iniciando download do PDF...');
  };

  const handleLogout = () => {
    // Lógica de logout do paciente
    navigate('/login'); // Ou para uma página de "login de paciente"
  };

  return (
    <div className="patient-result-page">
      {/* --- CABEÇALHO (diferente da navbar principal) --- */}

      {/* --- CONTEÚDO PRINCIPAL (Mobile: 1 coluna, Desktop: 2 colunas) --- */}
      <div className="patient-result-main-container">
        {/* --- COLUNA ESQUERDA (Desktop) --- */}
        <div className="patient-result-content-column">
          {/* Card: Resultado da Análise */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={ChartIcon} alt="Ícone Resultado" className="patient-card-icon" />
              <h2 className="patient-card-title">Resultado da Análise</h2>
            </div>
            <div className={`patient-result-badge ${mockFinalDiagnosis.resultadoTipo}`}>
              <h3>{mockFinalDiagnosis.resultado}</h3>
            </div>
          </div>

          {/* Card: Imagens do Exame */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={ImageIcon} alt="Ícone Imagens" className="patient-card-icon" />
              <h2 className="patient-card-title">Imagens do Exame</h2>
            </div>
            {/* Imagem Principal */}
            <div className="patient-main-image-container">
              <img
                src={selectedImage.url}
                alt={selectedImage.label}
                className="patient-main-image"
              />
            </div>
            {/* Miniaturas */}
            <div className="patient-thumbnail-grid">
              {mockResults.map((img) => (
                <div
                  key={img.id}
                  className={`patient-thumbnail-item ${selectedImage.id === img.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img.url} alt={img.label} className="patient-thumbnail-preview" />
                  <span className="patient-thumbnail-label">{img.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Recomendação Médica */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={DocIcon} alt="Ícone Documento" className="patient-card-icon" />
              <h2 className="patient-card-title">Recomendação Médica</h2>
            </div>
            <p className="patient-recommendation-text">{mockFinalDiagnosis.recomendacao}</p>
          </div>
        </div>

        {/* --- COLUNA DIREITA (Sidebar Desktop) --- */}
        <div className="patient-result-sidebar-column">
          {/* Card: Dados do Paciente */}
          <div className="patient-card">
            <div className="patient-card-header">
              <img src={UserIcon} alt="Ícone Usuário" className="patient-card-icon" />
              <h2 className="patient-card-title">Dados do Paciente</h2>
            </div>
            <div className="patient-data-rows">
              <div className="patient-data-row">
                <span>Nome:</span>
                <strong>{mockPatientData.nome}</strong>
              </div>
              <div className="patient-data-row">
                <span>Idade:</span>
                <strong>{mockPatientData.idade}</strong>
              </div>
              <div className="patient-data-row">
                <span>Tipo DM:</span>
                <strong>{mockPatientData.tipoDM}</strong>
              </div>
              <div className="patient-data-row">
                <span>Data Exame:</span>
                <strong>{mockPatientData.dataExame}</strong>
              </div>
              <div className="patient-data-row">
                <span>Olho:</span>
                <strong>{mockPatientData.olho}</strong>
              </div>
              <div className="patient-data-row">
                <span>Profissional:</span>
                <strong>{mockPatientData.profissional}</strong>
              </div>
            </div>
          </div>

          {/* ADIÇÃO: Card "Aviso Legal" */}
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
          <button onClick={handleDownloadPdf} className="download-btn">
            Baixar Laudo (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientResult;
