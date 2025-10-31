import React from 'react';
import './PatientList.css';
import PatientUserAddIcon from '../../assets/patient-user-add.svg';
import PatientUserIcon from '../../assets/patient-user.svg';

const PatientList = () => {
  return (
    <>
      <div className="patient-list-main-container">
        <button className="patient-list-new-patient-btn">
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

        <div className="patient-list-recent-data-container">
          <div className="patient-list-data-titles">
            <h4 className="patient-list-data-title">Nome</h4>
            <h4 className="patient-list-data-title">Idade</h4>
            <h4 className="patient-list-data-title">Tipo DM</h4>
            <h4 className="patient-list-data-title">Última Análise</h4>
          </div>
          <div className="patient-list-data-container">
            <div className="patient-list-data-container-box">
              <div className="patient-list-data">
                <p className="patient-list-data-name">Maria Santos</p>
                <p className="patient-list-data-day">54 Anos</p>
                <p className="patient-list-data-result">DM Tipo 2</p>
                <p className="patient-list-data-last-analysis">08/09/2025 RD Moderada</p>
              </div>
              <div className="patient-list-status-box-container">
                <h3 className="patient-list-status-title">Status:</h3>
                <p
                  className="patient-list-data-status"
                  style={{color: '#a72e3aff', backgroundColor: '#ffdfe3ff'}}
                >
                  Encaminhar
                </p>
              </div>
              <button className="patient-list-redirection-btn">Dados do Paciente -> </button>
            </div>
            <div className="patient-list-data-container-box">
              <div className="patient-list-data">
                <p className="patient-list-data-name">José Silva</p>
                <p className="patient-list-data-day">48 anos</p>
                <p className="patient-list-data-result">DM Tipo 1</p>
                <p className="patient-list-data-last-analysis">08/09/2025 Normal</p>
              </div>
              <div className="patient-list-status-box-container">
                <h3 className="patient-list-status-title">Status:</h3>
                <p
                  className="patient-list-data-status"
                  style={{color: '#1c8a35ff', backgroundColor: '#ddfae4ff'}}
                >
                  Completo
                </p>
              </div>

              <button className="patient-list-redirection-btn">Dados do Paciente -></button>
            </div>

            <div className="patient-list-data-container-box">
              <div className="patient-list-data">
                <p className="patient-list-data-name">Ana Costa</p>
                <p className="patient-list-data-day">62 Anos</p>
                <p className="patient-list-data-result">RD Leve</p>
                <p className="patient-list-data-last-analysis">07/09/2025 RD Leve</p>
              </div>
              <div className="patient-list-status-box-container">
                <h3 className="patient-list-status-title">Status:</h3>
                <p
                  className="patient-list-data-status"
                  style={{color: '#856404', backgroundColor: '#FFF3CD'}}
                >
                  Pendente
                </p>
              </div>
              <button className="patient-list-redirection-btn">Dados do Paciente -> </button>
            </div>
          </div>
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
