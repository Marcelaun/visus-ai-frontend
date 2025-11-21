import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './AnalysisHistory.css';
import Skeleton from '@mui/material/Skeleton';

// Ícones (sem alteração)
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
  const navigate = useNavigate();

  // Estados de Dados
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados de Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Função de busca com paginação
  const fetchAnalyses = async (page = 1) => {
    setLoading(true);
    try {
      // Passamos a página na URL
      const response = await apiClient.get(`/api/analyses?page=${page}`);
      
      // O Laravel retorna os dados dentro de 'data' quando usamos paginate()
      setAnalyses(response.data.data);
      
      // Atualiza metadados
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      setLoading(false);
    }
  };

  // Carrega a página 1 ao iniciar
  useEffect(() => {
    fetchAnalyses(1);
  }, []);

  // Navegação de páginas
  const handleNextPage = () => {
    if (currentPage < totalPages) fetchAnalyses(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) fetchAnalyses(currentPage - 1);
  };

  // Filtro (Nota: Isso filtra apenas a página ATUAL carregada)
  // Para filtrar todo o banco, precisaríamos enviar o termo de busca para a API
  const filteredData = analyses.filter(item => {
    const termo = searchTerm.toLowerCase();
    const pacienteNome = item.patient?.nome?.toLowerCase() || '';
    const resultado = item.ai_summary_diagnosis?.toLowerCase() || '';
    const data = new Date(item.exam_date).toLocaleDateString('pt-BR');

    return pacienteNome.includes(termo) || resultado.includes(termo) || data.includes(termo);
  });

  const getStatusColorClass = (diagnosis) => {
    if (!diagnosis) return '';
    const diag = diagnosis.toLowerCase();
    if (diag.includes('normal')) return 'tipo-normal';
    if (diag.includes('leve')) return 'tipo-leve';
    if (diag.includes('moderada')) return 'tipo-moderada';
    if (diag.includes('severa') || diag.includes('proliferativa')) return 'tipo-severa';
    return '';
  };

  return (
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
            placeholder="Filtrar nesta página..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* O botão filtrar é visual, pois o filtro é em tempo real no input */}
        <button className="filter-button">Filtrar</button>
      </div>

      <div className="historico-table">
        
        <div className="table-header">
          <span className="header-cell">Paciente</span>
          <span className="header-cell">Olho</span>
          <span className="header-cell">Resultado</span>
          <span className="header-cell">Data</span>
          <span className="header-cell">Status</span>
          <span className="header-cell">Ações</span>
        </div>

        <div className="table-body">
          {loading ? (
             // --- BLOCO DE SKELETON ---
            // Cria 5 linhas falsas para animação
            Array.from(new Array(5)).map((_, index) => (
              <div key={index} className="table-row" style={{ alignItems: 'center' }}>
                
                {/* Paciente */}
                <div className="cell-paciente" style={{ width: '100%' }}>
                   <Skeleton variant="text" width="70%" height={30} />
                </div>

                {/* Olho */}
                <div className="cell-olho" style={{ width: '100%' }}>
                   <Skeleton variant="text" width="40%" />
                </div>

                {/* Resultado */}
                <div className="cell-resultado" style={{ width: '100%' }}>
                   <Skeleton variant="text" width="60%" />
                </div>

                {/* Data */}
                <div className="cell-data" style={{ width: '100%' }}>
                   <Skeleton variant="text" width="80%" />
                </div>

                {/* Status (formato de badge) */}
                <div className="cell-status" style={{ width: '100%' }}>
                   <Skeleton variant="rectangular" width={90} height={24} sx={{borderRadius: 4}} />
                </div>

                {/* Ações (Botão) */}
                <div className="cell-acoes" style={{ width: '100%' }}>
                   <Skeleton variant="rectangular" width={60} height={35} sx={{borderRadius: 2}} />
                </div>

              </div>
            ))
            // --- FIM DO BLOCO DE SKELETON ---
          ) : filteredData.length === 0 ? (
             <p style={{padding: '2rem', textAlign: 'center'}}>Nenhuma análise encontrada.</p>
          ) : (
            filteredData.map((item) => (
              <div key={item.id} className="table-row">
                
                <div className="cell-paciente" data-label="Paciente">
                  <strong>{item.patient ? item.patient.nome : 'Paciente Removido'}</strong>
                </div>
                
                <div className="cell-olho" data-label="Olho">
                  {item.eye_examined}
                </div>
                
                <div className="cell-resultado" data-label="Resultado">
                  <span className={`resultado-text ${getStatusColorClass(item.ai_summary_diagnosis)}`}>
                    {item.ai_summary_diagnosis}
                  </span>
                </div>
                
                <div className="cell-data" data-label="Data">
                  {new Date(item.exam_date).toLocaleDateString('pt-BR')}
                </div>
                
                <div className="cell-status" data-label="Status">
                  <span className={`status-tag status-${item.status}`}>
                    {item.status === 'pendente' ? 'Em Análise' : 'Concluído'}
                  </span>
                </div>
                
                <div className="cell-acoes" data-label="Ações">
                  <button 
                    className="action-button"
                    onClick={() => navigate(`/analysisResult/${item.id}`)}
                  >
                    Ver
                  </button>
                </div>
                
              </div>
            ))
          )}
        </div>
        
        {/* --- PAGINAÇÃO --- */}
        <div className="historico-pages-container">
            <p className="historico-page-info">
              Mostrando {filteredData.length} de {totalItems} registros 
              (Página {currentPage} de {totalPages})
            </p>
            <div className="historico-page-buttons">
              <button 
                className="historico-nav-btn prev"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button 
                className="historico-nav-btn next"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
        </div>

      </div>
    </div>
  );
}

export default AnalysisHistory;