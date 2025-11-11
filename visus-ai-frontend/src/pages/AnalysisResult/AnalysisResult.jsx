import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AnalysisResultDocIcon from '../../assets/analysis-result-doc-icon.svg';
import BulbIcon from '../../assets/Bulb.svg';
import ChartIcon from '../../assets/chart-bar-vertical.svg';
import UserIcon from '../../assets/user-icon.svg';
import ImageIcon from '../../assets/image-icon.svg';

import ProbabilityBars from '../../components/ProbabilityBars/ProbabilityBars';

import './AnalysisResult.css';

// ... (Seu mockResults e funções de gravidade vêm aqui, sem mudança) ...
// 1. DADOS DE EXEMPLO COMPLETOS
const mockResults = [
  {
    id: 1,
    url: 'https://placehold.co/600x600/000/fff?text=Olho+Campo+1',
    label: 'Campo 1 (Mácula)',
    diagnosis: 'Normal',
    probabilities: [
      {label: 'Normal', value: 95.2},
      {label: 'RD Leve', value: 3.1},
      {label: 'RD Moderada', value: 1.5},
      {label: 'RD Severa', value: 0.1},
      {label: 'RD Proliferativa', value: 0.1},
    ],
    borderColor: 'tipo-Normal',
  },
  {
    id: 3,
    url: 'https://placehold.co/600x600/666/fff?text=Olho+Campo+3',
    label: 'Campo 3 (Temporal)',
    diagnosis: 'RD Moderada',
    probabilities: [
      {label: 'Normal', value: 5.8},
      {label: 'RD Leve', value: 15.2},
      {label: 'RD Moderada', value: 78.0},
      {label: 'RD Severa', value: 0.9},
      {label: 'RD Proliferativa', value: 0.1},
    ],
    borderColor: 'tipo-RD',
  },
  {
    id: 2,
    url: 'https://placehold.co/600x600/333/fff?text=Olho+Campo+2',
    label: 'Campo 2 (Nervo Óptico)',
    diagnosis: 'RD Leve',
    probabilities: [
      {label: 'Normal', value: 10.5},
      {label: 'RD Leve', value: 88.3},
      {label: 'RD Moderada', value: 1.0},
      {label: 'RD Severa', value: 0.1},
      {label: 'RD Proliferativa', value: 0.1},
    ],
    borderColor: 'tipo-RD',
  },
];

// 2. Lógica de gravidade (sem alteração)
const gravidade = {
  Normal: 0,
  'RD Leve': 1,
  'RD Moderada': 2,
  'RD Severa': 3,
  'RD Proliferativa': 4,
};
const getMaisGrave = (resultados) => {
  return [...resultados].sort((a, b) => gravidade[b.diagnosis] - gravidade[a.diagnosis])[0];
};

const AnalysisResult = () => {
  const [professionalValidation, setProfessionalValidation] = useState('');
  const [finalDiagnosis, setFinalDiagnosis] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const resultadoMaisGrave = getMaisGrave(mockResults);
    setFinalDiagnosis(resultadoMaisGrave);
    setSelectedItem(resultadoMaisGrave);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosFormatados = {
      professionalValidation: professionalValidation,
    };
    console.log(dadosFormatados);
  };

  const handleSketchSave = () => {
    console.log('Rascunho Salvo');
  };

  if (!selectedItem || !finalDiagnosis) {
    return <div style={{marginTop: '100px', textAlign: 'center'}}>Carregando...</div>;
  }

  return (
    <>
      <div className="analysis-result-main-container">
        {/* --- ESTA É A NOVA DIV DA COLUNA ESQUERDA --- */}
        <div className="analysis-result-content-column">
          {/* --- TÍTULO DO RESULTADO FINAL --- */}
          <div className="analysis-result-ai-verdict-container">
            <div className="analysis-result-title-container">
              <img src={ChartIcon} alt="Ícone Gráfico" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">Resultados da IA</h4>
            </div>
            <div className="analysis-result-verdict-box">
              <h3 className="analysis-result-verdict-title">
                Resultado Final (Mais Grave): {finalDiagnosis.diagnosis.toUpperCase()}
              </h3>
            </div>
          </div>

          {/* === BLOCO DE ANÁLISE INTERATIVO === */}
          <div className="analysis-result-exam-images-container">
            <div className="analysis-result-title-container">
              <img src={ImageIcon} alt="Ícone Imagem" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">Análise Detalhada das Imagens</h4>
            </div>
            <ProbabilityBars probabilities={selectedItem.probabilities} />
            <div className={`main-image-container ${selectedItem.borderColor}`}>
              <img src={selectedItem.url} alt={selectedItem.label} className="main-exam-image" />
            </div>
            <div className="thumbnail-gallery-grid">
              {mockResults.map((item) => (
                <div
                  key={item.id}
                  className={`exam-thumbnail-item ${selectedItem.id === item.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img src={item.url} alt={item.label} className="exam-thumbnail-preview" />
                  <span className="exam-thumbnail-label">{item.label}</span>
                  <span
                    className={`exam-thumbnail-diagnosis ${'tipo-' + item.diagnosis.split(' ')[0]}`}
                  >
                    {item.diagnosis}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- RECOMENDAÇÕES --- */}
          <div className="analysis-result-ai-automatic-recomendations-main-container">
            <div className="analysis-result-title-container">
              <img src={BulbIcon} alt="Ícone Lampada" className="analysis-result-title-icon" />
              <h4 className="analysis-result-data-title">
                Recomendações Automáticas (Sugestão da IA)
              </h4>
            </div>
            <div className="analysis-result-ai-text-recomendations-container">
              <div className="analysis-result-ai-text-suggestion-container">
                <h4 className="analysis-result-ai-text-suggestion-title">
                  SUGESTÃO: ENCAMINHAMENTO PARA OFTALMOLOGISTA
                </h4>
                <p className="analysis-result-ai-text-suggestion-text">
                  Com base na detecção, sugere-se: Agendamento com especialista em retina (até 30
                  dias), exames complementares (Angiofluoresceinografia, OCT), controle glicêmico
                  rigoroso e reavaliação a cada 3-4 meses.
                </p>
              </div>
              <div className="analysis-result-ai-warning-container">
                <h3 className="analysis-result-ai-warning-title">IMPORTANTE!!: </h3>
                <p className="analysis-result-ai-warning-text">
                  Este Resultado é uma triagem automatizada e não substitui a avaliação médica. o
                  profissional deve validar o resultado e definir a conduta final.
                </p>
              </div>
            </div>
          </div>

          {/* --- CONDUTA FINAL --- */}
          <div className="analysis-result-professional-conduct-main-container">
            <div className="analysis-result-title-container">
              <img
                src={AnalysisResultDocIcon}
                alt="Ícone Documento"
                className="analysis-result-title-icon"
              />
              <h4 className="analysis-result-data-title">Conduta Final do Profissional</h4>
            </div>
            <div className="analysis-result-professional-conduct-text-area-container">
              <form
                action=""
                onSubmit={handleSubmit}
                className="analysis-result-professional-conduct-form"
              >
                <label
                  htmlFor="professional-validation"
                  className="analysis-result-professional-validation-form-labels"
                >
                  Valide a Sugestão da IA e descreva a recomendação final para o paciente.
                </label>
                <textarea
                  id="professional-validation"
                  className="analysis-result-professional-validation-input-box"
                  placeholder="EX: Encaminho o paciente para avaliação com oftalmologista. Recomendo agendamento prioritário. "
                  value={professionalValidation}
                  onChange={(e) => setProfessionalValidation(e.target.value)}
                />
                <input
                  type="submit"
                  value="Aprovar e Liberar Laudo"
                  className="analysis-result-professional-submit-btn"
                  id="clickSubmitButton"
                  disabled={!professionalValidation}
                />
                <button
                  type="button"
                  onClick={handleSketchSave}
                  className="analysis-result-professional-validation-save-sketch-btn"
                >
                  Salvar Rascunho
                </button>
              </form>
            </div>
          </div>
        </div>{' '}
        {/* --- FIM DA NOVA COLUNA DA ESQUERDA --- */}
        {/* --- COLUNA DIREITA (Sidebar) --- */}
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
        </div>
      </div>
    </>
  );
};

export default AnalysisResult;
