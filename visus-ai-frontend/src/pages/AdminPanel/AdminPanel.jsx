import React from 'react';
import './AdminPanel.css'; // Vamos criar este arquivo
import MultiUserIcon from '../../assets/multi-user-icon.svg';

const mockProfessionals = [
  {
    id: 1,
    nome: 'DR. João Silva',
    registro: 'CRM 123456',
    status: 'Ativo',
    statusTipo: 'ativo',
  },
  {
    id: 2,
    nome: 'DR. Carlos Santos',
    registro: 'CRM 345678',
    status: 'Pendente',
    statusTipo: 'pendente',
  },
];

// Componente de Cartão de Estatística reutilizável
const StatCard = ({ title, value, colorClass }) => (
  <div className="stat-card">
    <span className="stat-title">{title}</span>
    <span className={`stat-value ${colorClass}`}>{value}</span>
  </div>
);

// Ícone de "Gestão de Profissionais" (SVG embutido)
const IconeGestao = () => (
  <svg className="management-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-12.728 0M11.25 3.171V5.514m0 0a1.5 1.5 0 01-1.44 1.492A1.5 1.5 0 018.31 5.514V3.171m3.75 0V5.514m0 0a1.5 1.5 0 01-1.44 1.492A1.5 1.5 0 0112.19 5.514V3.171m-6.375 5.083a1.5 1.5 0 00-1.44 1.492.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5a1.5 1.5 0 00-1.44-1.492V6.604m3.75 0V8.096m0 0a1.5 1.5 0 001.44 1.492.5.5 0 01.5.5h1.5a.5.5 0 01.5-.5a1.5 1.5 0 001.44-1.492V6.604m-6.375 5.083a1.5 1.5 0 00-1.44 1.492.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5a1.5 1.5 0 00-1.44-1.492V6.604m3.75 0V8.096m0 0a1.5 1.5 0 001.44 1.492.5.5 0 01.5.5h1.5a.5.5 0 01.5-.5a1.5 1.5 0 001.44-1.492V6.604m12 5.083a1.5 1.5 0 00-1.44 1.492.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5a1.5 1.5 0 00-1.44-1.492V6.604m3.75 0V8.096m0 0a1.5 1.5 0 001.44 1.492.5.5 0 01.5.5h1.5a.5.5 0 01.5-.5a1.5 1.5 0 001.44-1.492V6.604" />
  </svg>
);

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      
      {/* --- CARTÕES DE ESTATÍSTICA --- */}
      <div className="stat-cards-grid">
        <StatCard title="Usuários Ativos" value="23" colorClass="color-blue" />
        <StatCard title="Total Pacientes" value="1.247" colorClass="color-green" />
        <StatCard title="Análises/Mês" value="342" colorClass="color-orange" />
      </div>

      {/* --- GESTÃO DE PROFISSIONAIS --- */}
      <div className="management-section">
        <div className="management-header">
          <img src={MultiUserIcon} alt="Ícone Gestão Profissionais" className="multi-user-icon" />
          <h3>Gestão de Profissionais</h3>
        </div>

        {/* *** MUDANÇA AQUI ***
          Usando a nova estrutura de tabela responsiva
        */}
        <div className="admin-table-container">
          
          {/* Cabeçalho da Tabela (só aparece em telas grandes) */}
          <div className="table-header">
            <span className="header-cell">Nome</span>
            <span className="header-cell">Registro</span>
            <span className="header-cell">Status</span>
            <span className="header-cell">Ações</span>
          </div>

          {/* Corpo da Tabela */}
          <div className="table-body">
            {mockProfessionals.map((prof) => (
              <div key={prof.id} className="table-row">
                
                <div className="cell-nome" data-label="Nome">
                  <strong>{prof.nome}</strong>
                </div>
                
                <div className="cell-registro" data-label="Registro">
                  {prof.registro}
                </div>
                
                <div className="cell-status" data-label="Status">
                  <span className={`admin-status-tag ${'status-' + prof.statusTipo}`}>
                    {prof.status}
                  </span>
                </div>
                
                <div className="cell-acoes" data-label="Ações">
                  {prof.statusTipo === 'ativo' ? (
                    <button className="admin-action-button btn-editar">Editar</button>
                  ) : (
                    <button className="admin-action-button btn-aprovar">Aprovar</button>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;




