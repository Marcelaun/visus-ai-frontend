import React from 'react';
import AnalysisResultDocIcon from '../../assets/analysis-result-doc-icon.svg';
import BulbIcon from '../../assets/Bulb.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import UserIcon from '../../assets/user-icon.svg';

import './AnalysisResult.css';

const AnalysisResult = () => {
  return (
    <>
      <div className="analysis-result-main-container">
        <div className="analysis-result-patient-data-container">
          <div className="analysis-result-title-container">
            <img src={UserIcon} alt="Ícone Usuário" className="analysis-result-title-icon" />
            <h4 className="analysis-result-data-title">Dados do Paciente</h4>
          </div>
          <div className="analysis-result-patient-data">
            <div className="analysis-result-patient-data-sub">
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Nome: </p>
                <p className="analysis-result-patient-data-value">Maria Santos</p>
              </div>
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Idade: </p>
                <p className="analysis-result-patient-data-value">54 Anos</p>
              </div>
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Tipo DM: </p>
                <p className="analysis-result-patient-data-value">Tipo 2</p>
              </div>
            </div>
            <div className="analysis-result-patient-data-sub">
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Data Exame: </p>
                <p className="analysis-result-patient-data-value">08/09/2025</p>
              </div>
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Olho: </p>
                <p className="analysis-result-patient-data-value">Direito</p>
              </div>
              <div className="analysis-result-patient-data-label-container">
                <p className="analysis-result-patient-data-label-title">Profissional: </p>
                <p className="analysis-result-patient-data-value">Dr. João Silva</p>
              </div>
            </div>
          </div>
        </div>
        <div className="analysis-result-ai-results-main-container">
          <div className="analysis-result-title-container">
            <img src={ChartIcon} alt="Ícone Usuário" className="analysis-result-title-icon" />
            <h4 className="analysis-result-data-title">Resultados da IA</h4>
          </div>
          <div className="analysis-result-ai-results-percentage-main-container">
            <div className="analysis-result-ai-result-percentage-container">
              <h3 className="analysis-result-ai-result-title">RETINOPATIA DIABÉTICA MODERADA</h3>
              <div className="analysis-result-ai-confiability-percentage-container">
                <h4 className="analysis-result-ai-result-confiability-title">Confiabilidade: </h4>
                <p className="analysis-result-ai-result-percentage-value">78%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-result-ai-automatic-recomendations-main-container">
          <div className="analysis-result-title-container">
            <img src={BulbIcon} alt="Ícone Lampada" className="analysis-result-title-icon" />
            <h4 className="analysis-result-data-title">
              Recomendações Automáticas (Sugestão da IA)
            </h4>
          </div>
          <div className="analysis-result-ai-text-recomendations-container"></div>
        </div>
      </div>
    </>
  );
};

export default AnalysisResult;
