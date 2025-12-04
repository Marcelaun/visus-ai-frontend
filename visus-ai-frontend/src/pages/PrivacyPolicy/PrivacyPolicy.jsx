import React from 'react';
import { Link } from 'react-router-dom';
import LogoVisus from '../../assets/Logo.svg';
import './PrivacyPolicy.css'; // Vamos usar um CSS específico ou reutilizar o dos Termos
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="privacy-main-container">
      <div className="privacy-card">
        
        {/* Cabeçalho */}
        <div className="privacy-header">
          <img src={LogoVisus} alt="VisusAI" className="privacy-logo" />
          <h2>Política de Privacidade</h2>
          <p className="privacy-subtitle">Última atualização: Dezembro de 2025</p>
        </div>

        {/* Conteúdo */}
        <div className="privacy-content">
          <section>
            <h3>1. Introdução</h3>
            <p>
              A sua privacidade é nossa prioridade. O <strong>VisusAI</strong> compromete-se a proteger os dados pessoais e médicos de todos os usuários (profissionais de saúde e pacientes), em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h3>2. Dados Coletados</h3>
            <p>Para o funcionamento da plataforma, coletamos os seguintes tipos de dados:</p>
            <ul>
              <li><strong>Profissionais de Saúde:</strong> Nome, E-mail, CPF, Registro Profissional (CRM/COREN) e Telefone.</li>
              <li><strong>Pacientes:</strong> Nome, CPF, Data de Nascimento, Sexo, Histórico Clínico (Diabetes, Medicações) e Imagens de Exames (Retinografias).</li>

            </ul>
          </section>

          <section>
            <h3>3. Finalidade do Uso dos Dados</h3>
            <p>Os dados são utilizados exclusivamente para:</p>
            <ul>
              <li>Realizar a triagem automatizada de Retinopatia Diabética via Inteligência Artificial.</li>
              <li>Gerar laudos médicos e permitir o acompanhamento do histórico do paciente.</li>
              <li>Autenticar e autorizar o acesso seguro à plataforma.</li>
              <li>Melhorar a precisão dos nossos algoritmos (dados anonimizados).</li>
            </ul>
          </section>

          <section>
            <h3>4. Compartilhamento de Dados</h3>
            <p>
              <strong>Não vendemos</strong> seus dados pessoais. O compartilhamento ocorre apenas:
            </p>
            <ul>
              <li>Com o profissional de saúde responsável pelo paciente.</li>
              <li>Com provedores de infraestrutura segura (ex: Servidores de Banco de Dados e IA), sob rigorosos contratos de confidencialidade.</li>
              <li>Quando exigido por lei ou ordem judicial.</li>
            </ul>
          </section>

          <section>
            <h3>5. Segurança da Informação</h3>
            <p>
              Adotamos medidas técnicas robustas para proteger seus dados, incluindo:
            </p>
            <ul>
              <li>Criptografia de dados em repouso e em trânsito (HTTPS/SSL).</li>
              <li>Controle de acesso rigoroso (apenas profissionais autorizados).</li>
              <li>Monitoramento contínuo contra acessos não autorizados.</li>
            </ul>
          </section>

          <section>
            <h3>6. Seus Direitos (LGPD)</h3>
            <p>
              Você tem o direito de solicitar a qualquer momento:
            </p>
            <ul>
              <li>A confirmação da existência de tratamento de seus dados.</li>
              <li>O acesso aos dados que possuímos sobre você.</li>
              <li>A correção de dados incompletos ou desatualizados.</li>
              <li>A anonimização ou exclusão de dados desnecessários.</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato através do e-mail: <strong>privacidade@visusai.com</strong>.</p>
          </section>
        </div>

        {/* Rodapé */}
        <div className="privacy-footer">
         <button 
            onClick={() => navigate(-1)} // <--- A MÁGICA ESTÁ AQUI (-1 volta 1 passo)
            className="privacy-btn-back"
            style={{border: 'none', cursor: 'pointer'}} // Ajuste CSS se precisar
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;