import React, { useState } from 'react';
import './Profile.css'; // Vamos criar este arquivo

// Componente para o ícone do título (como no AdminPanel)
const IconePerfil = () => (
  <svg className="perfil-header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// Componente pequeno e reutilizável para mostrar cada linha de informação
const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

const Profile = () => {
  // Dados de exemplo que viriam do seu login/API
  const [profissional] = useState({
    nome: 'Dr(a). Joana Mendes',
    cpf: '123.456.789-00',
    registro: 'CRM 123456 SP',
    email: 'joana.mendes@email.com',
    telefone: '(11) 98765-4321',
  });

  return (
    <div className="perfil-container">
      
      {/* --- TÍTULO --- */}
      <div className="perfil-header">
        <IconePerfil />
        <h2>Meu Perfil</h2>
      </div>

      {/* --- CARTÃO DE INFORMAÇÕES --- */}
      <div className="perfil-card">
        
        {/* --- DADOS PESSOAIS --- */}
        <div className="perfil-section">
          <h3 className="perfil-section-title">Dados Pessoais</h3>
          <InfoRow label="Nome Completo" value={profissional.nome} />
          <InfoRow label="CPF" value={profissional.cpf} />
          <InfoRow label="Registro Profissional" value={profissional.registro} />
          <InfoRow label="Telefone" value={profissional.telefone} />
        </div>

        {/* --- DADOS DE ACESSO --- */}
        <div className="perfil-section">
          <h3 className="perfil-section-title">Dados de Acesso</h3>
          <InfoRow label="E-mail (Login)" value={profissional.email} />
          <InfoRow label="Senha" value="********" />
        </div>

        {/* --- AÇÕES --- */}
        <div className="perfil-actions">
          <button className="perfil-button btn-primary">
            Editar Informações
          </button>
          <button className="perfil-button btn-secondary">
            Mudar Senha
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;