import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AnalysisResultDocIcon from '../../assets/analysis-result-doc-icon.svg';
import BulbIcon from '../../assets/Bulb.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import UserIcon from '../../assets/user-icon.svg';

import './AnalysisResult.css';

const AnalysisResult = () => {

  const [professionalValidation, setProfessionalValidation] = useState('');

  const handleSubmit = (e) => {
    // Agora só chama a função onLogin.
    // O redirecionamento será feito no AppRoutes.
    e.preventDefault();
    const dadosFormatados = {
      professionalValidation: professionalValidation

    };

    console.log(dadosFormatados);
  };

  const handleSketchSave = () => {
    console.log('Rascunho Salvo');
  }

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
          <div className="analysis-result-ai-text-recomendations-container">
            <div className="analysis-result-ai-text-suggestion-container">
              <h4 className="analysis-result-ai-text-suggestion-title">SUGESTÃO: ENCAMINHAMENTO PARA OFTALMOLOGISTA</h4>
              <p className="analysis-result-ai-text-suggestion-text">
                Com base na detecção, sugere-se: Agendamento com especialista em retina (até 30 dias), exames complementares (Angiofluoresceinografia, OCT), controle glicêmico rigoroso e reavaliação a cada 3-4 meses.
              </p>
            </div>
            <div className="analysis-result-ai-warning-container">
              <h3 className="analysis-result-ai-warning-title">IMPORTANTE!!: </h3>
              <p className="analysis-result-ai-warning-text">Este Resultado é uma triagem automatizada e não substitui a avaliação médica. o profissional deve validar o resultado e definir a conduta final.</p>
            </div>
          </div>
        </div>

        <div className="analysis-result-professional-conduct-main-container">
          <div className="analysis-result-title-container">
            <img src={AnalysisResultDocIcon} alt="Ícone Lampada" className="analysis-result-title-icon" />
            <h4 className="analysis-result-data-title">
              Conduta Final do Profissional
            </h4>
          </div>
          <div className="analysis-result-professional-conduct-text-area-container">
            <form action="" onSubmit={handleSubmit} className="analysis-result-professional-conduct-form">
              <label htmlFor="professional-validation" className="analysis-result-professional-validation-form-labels">
            Valide a Sugestão da IA e descreva a recomendação final para o paciente.
          </label>
          <textarea
            id="professional-validation"
            className="analysis-result-professional-validation-input-box"
            placeholder="EX: Encaminho o paciente para avaliação com oftalmologista. Recomendo agendamento prioritário. "
            // O 'required' não é necessário se o label não tem '*'
            // required
            value={professionalValidation} // Vincule ao novo estado
            onChange={(e) => setProfessionalValidation(e.target.value)} // Use o novo 'setter'
          />

          <input
                      type="submit"
                      value="Aprovar e Liberar Laudo"
                      className="analysis-result-professional-submit-btn"
                      id="clickSubmitButton"
                      disabled={!professionalValidation}
                    />
                    <button onClick={handleSketchSave} className="analysis-result-professional-validation-save-sketch-btn">Salvar Rascunho</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisResult;
