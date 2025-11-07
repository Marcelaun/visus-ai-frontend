import React, { useState } from 'react';
import './AnalysisHistory.css';
import BarIcon from '../../assets/chart-bar-vertical.svg';

const mockData = [
  {
    id: 1,
    paciente: 'Maria Santos',
    olho: 'Direito',
    resultado: 'RD Moderada',
    resultadoTipo: 'moderada', // Para o CSS
    dataHora: '08/09/2025 14:32',
    status: 'Laudo Liberado',
    statusTipo: 'liberado',
  },
  {
    id: 2,
    paciente: 'José Silva',
    olho: 'Esquerdo',
    resultado: 'Normal',
    resultadoTipo: 'normal',
    dataHora: '08/09/2025 11:32',
    status: 'Laudo Liberado',
    statusTipo: 'liberado',
  },
  {
    id: 3,
    paciente: 'Ana Pereira',
    olho: 'Direito',
    resultado: 'RD Leve',
    resultadoTipo: 'leve',
    dataHora: '07/09/2025 09:15',
    status: 'Em Análise',
    statusTipo: 'analise',
  },
];


const IconeHistorico = () => (
  <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconeBusca = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const AnalysisHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = mockData.filter(item => 
    item.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.resultado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dataHora.includes(searchTerm)
  );

  return (
    <>
    <div className="analysis-history-main-container">
     
      <div className="historico-header">
        <IconeHistorico />
        <h2>Histórico de Análises</h2>
      </div>

      
      <div className="historico-controls">
        <div className="search-bar-wrapper">
          <IconeBusca />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por paciente, data ou resultado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">Filtrar</button>
      </div>

      
      <div className="historico-table">
        
        
        <div className="table-header">
          <span className="header-cell">Paciente</span>
          <span className="header-cell">Olho</span>
          <span className="header-cell">Resultado</span>
          <span className="header-cell">Data/Hora</span>
          <span className="header-cell">Status</span>
          <span className="header-cell">Ações</span>
        </div>

        
        <div className="table-body">
          {filteredData.map((item) => (
            <div key={item.id} className="table-row">
              
              <div className="cell-paciente" data-label="Paciente">
                <strong>{item.paciente}</strong>
              </div>
              
              <div className="cell-olho" data-label="Olho">
                {item.olho}
              </div>
              
              <div className="cell-resultado" data-label="Resultado">
                <span className={`resultado-text ${'tipo-' + item.resultadoTipo}`}>
                  {item.resultado}
                </span>
              </div>
              
              <div className="cell-data" data-label="Data/Hora">
                {item.dataHora}
              </div>
              
              <div className="cell-status" data-label="Status">
                <span className={`status-tag ${'status-' + item.statusTipo}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="cell-acoes" data-label="Ações">
                <button className="action-button">Ver</button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default AnalysisHistory