import React from 'react';
import { Link } from 'react-router-dom';
import LogoVisus from '../../assets/Logo.svg';
import './TermsOfUse.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

const TermsOfUse = () => {
  const navigate = useNavigate(); // Instancie o hook

  return (
    <div className="terms-main-container">
      <div className="terms-card">
        
       
        <div className="terms-header">
          <img src={LogoVisus} alt="VisusAI" className="terms-logo" />
          <h2>Termos de Uso e Política de Privacidade</h2>
          <p className="terms-subtitle">Última atualização: Dezembro de 2025</p>
        </div>

        
        <div className="terms-content">
          <section>
            <h3>1. Sobre o VisusAI</h3>
            <p>
              O <strong>VisusAI</strong> é uma plataforma de auxílio ao diagnóstico médico baseada em Inteligência Artificial. 
              Nosso objetivo é fornecer ferramentas de triagem rápida para detecção de Retinopatia Diabética através da análise de imagens de fundo de olho (retinografias).
            </p>
          </section>

          <section>
            <h3>2. Natureza da Ferramenta (Aviso Legal Importante)</h3>
            <p className="highlight-warning">
              <strong>ATENÇÃO:</strong> Os resultados fornecidos pelos nossos algoritmos de Inteligência Artificial são 
              <strong> probabilísticos</strong> e servem apenas como <strong>auxílio à triagem</strong>.
            </p>
            <p>
              O VisusAI <strong>NÃO SUBSTITUI</strong> o diagnóstico clínico realizado por um médico oftalmologista. 
              A plataforma não deve ser utilizada como única base para tomada de decisões clínicas, prescrição de medicamentos ou cirurgias. 
              Todo laudo gerado deve ser validado por um profissional de saúde qualificado.
            </p>
          </section>

          <section>
            <h3>3. Privacidade e Dados (LGPD)</h3>
            <p>
              Levamos a privacidade a sério. Em conformidade com a Lei Geral de Proteção de Dados (LGPD):
            </p>
            <ul>
              <li>Os dados dos pacientes são armazenados de forma segura e criptografada.</li>
              <li>O acesso aos dados sensíveis é restrito ao profissional de saúde responsável pelo cadastro.</li>
              <li>As imagens enviadas para análise são processadas anonimamente pelo nosso motor de IA.</li>
            </ul>
          </section>

          <section>
            <h3>4. Responsabilidades do Profissional</h3>
            <p>
              Ao utilizar o sistema, o profissional de saúde declara que:
            </p>
            <ul>
              <li>Possui as credenciais necessárias (CRM/COREN) para atuar na área.</li>
              <li>Obteve consentimento do paciente para o uso de seus dados na plataforma.</li>
              <li>É o único responsável pela validação final do laudo e pela conduta médica adotada.</li>
            </ul>
          </section>

          <section>
            <h3>5. Limitações Tecnológicas</h3>
            <p>
              Nossa IA (baseada na arquitetura EfficientNet-B4) possui uma taxa de acerto aproximada de 82% e concordância (Kappa) de 0.90. 
              No entanto, erros (falsos positivos ou falsos negativos) podem ocorrer devido a qualidade da imagem, iluminação ou limitações do modelo.
            </p>
          </section>

          <section>
            <h3>6. Disposições Finais</h3>
            <p>
              Reservamo-nos o direito de atualizar estes termos periodicamente. O uso contínuo da plataforma implica na aceitação das novas condições.
              Esta plataforma é, no momento, um projeto de cunho acadêmico e de portfólio, apenas para demonstração de capacidades técnicas de engenharia de software e inteligência artificial.
            </p>
          </section>
        </div>

      
        <div className="terms-footer">
         <button 
            onClick={() => navigate(-1)} // <--- A MÁGICA ESTÁ AQUI (-1 volta 1 passo)
            className="terms-btn-back"
            style={{border: 'none', cursor: 'pointer'}} // Ajuste CSS se precisar
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
};

export default TermsOfUse;