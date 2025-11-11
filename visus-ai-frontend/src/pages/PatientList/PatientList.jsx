import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Importei o useNavigate
import './PatientList.css';
import PatientUserAddIcon from '../../assets/patient-user-add.svg';
import PatientUserIcon from '../../assets/patient-user.svg';

// 1. Dados de exemplo (Mock)
const mockData = [
  {
    id: 1,
    nome: 'Maria Santos',
    idade: '54 Anos',
    tipoDM: 'DM Tipo 2',
    ultimaAnalise: '08/09/2025 RD Moderada',
    status: 'Encaminhar',
    statusTipo: 'urgente',
  },
  {
    id: 2,
    nome: 'José Silva',
    idade: '48 anos',
    tipoDM: 'DM Tipo 1',
    ultimaAnalise: '08/09/2025 Normal',
    status: 'Completo',
    statusTipo: 'completo',
  },
  {
    id: 3,
    nome: 'Ana Costa',
    idade: '62 Anos',
    tipoDM: 'RD Leve', // Este dado parecia ser "Resultado" no seu mock
    ultimaAnalise: '07/09/2025 RD Leve',
    status: 'Pendente',
    statusTipo: 'pendente',
  },
  {
    id: 4,
    nome: 'Ana Barbosa',
    idade: '42 Anos',
    tipoDM: 'RD Moderado', // Este dado parecia ser "Resultado" no seu mock
    ultimaAnalise: '01/06/2025 RD Moderado',
    status: 'Pendente',
    statusTipo: 'pendente',
  },
];

const PatientList = () => {
  // 2. Adicionei o useNavigate para os botões
  const navigate = useNavigate();

  return (
    <>
      <div className="patient-list-main-container">
        {/* 3. Botão "Novo Paciente" agora navega para a tela de registro */}
        <button
          className="patient-list-new-patient-btn"
          onClick={() => navigate('/patientRegister')} // Navega ao clicar
        >
          <img
            className="patient-add-user-icon"
            src={PatientUserAddIcon}
            alt="Icone Adicionar Usuário"
          />
          Novo Paciente
        </button>

        <div className="patient-list-data-title-container">
          <img
            src={PatientUserIcon}
            alt="Icone dashboard dados"
            className="patient-list-data-icon"
          />
          <h4 className="patient-list-box-data-title">Meus Pacientes</h4>
        </div>

        {/* 4. ESTRUTURA DA TABELA RESPONSIVA */}
        <div className="patient-table-container">
          {/* Cabeçalho da Tabela (só desktop) */}
          <div className="table-header">
            <span className="header-cell">Nome</span>
            <span className="header-cell">Idade</span>
            <span className="header-cell">Tipo DM</span>
            <span className="header-cell">Última Análise</span>
            <span className="header-cell">Status</span>
            <span className="header-cell">Ações</span>
          </div>

          {/* Corpo da Tabela */}
          <div className="table-body">
            {mockData.map((paciente) => (
              // 5. Cada paciente é uma "table-row"
              <div key={paciente.id} className="table-row">
                <div className="cell-paciente" data-label="Paciente">
                  <strong>{paciente.nome}</strong>
                </div>

                <div className="cell-idade" data-label="Idade">
                  {paciente.idade}
                </div>

                <div className="cell-tipo-dm" data-label="Tipo DM">
                  {paciente.tipoDM}
                </div>

                <div className="cell-ultima-analise" data-label="Última Análise">
                  {paciente.ultimaAnalise}
                </div>

                <div className="cell-status" data-label="Status">
                  <span className={`patient-status-tag ${'status-' + paciente.statusTipo}`}>
                    {paciente.status}
                  </span>
                </div>

                <div className="cell-acoes" data-label="Ações">
                  <button
                    className="action-button-details"
                    onClick={() => navigate(`/paciente/${paciente.id}`)} // Ex: Navega para o perfil do paciente
                  >
                    Dados do Paciente <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Paginação (sem alteração) */}
          <div className="patient-list-pages-main-container">
            <p className="patient-list-patient-number">Mostrando 3 de 147 pacientes</p>
            <div className="patient-list-page-nav-buttons-container">
              <button className="patient-list-previous-page-btn"> Anterior</button>
              <button className="patient-list-next-page-btn">Proxima</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientList;
