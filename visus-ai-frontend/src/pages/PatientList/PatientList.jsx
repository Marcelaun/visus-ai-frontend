import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import './PatientList.css';
import PatientUserAddIcon from '../../assets/patient-user-add.svg';
import PatientUserIcon from '../../assets/patient-user.svg';

const PatientList = () => {
  const navigate = useNavigate();
  
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVOS ESTADOS PARA PAGINAÇÃO ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0); // Para saber quantos mostrar ("mostrando 5 de...")


  const getSeverityClass = (diagnosis) => {
    if (!diagnosis) return '';
    
    const d = diagnosis.toLowerCase();
    
    if (d.includes('proliferativa')) return 'sev-proliferativa'; // Mais grave (checa primeiro)
    if (d.includes('severa')) return 'sev-severa';
    if (d.includes('moderada')) return 'sev-moderada';
    if (d.includes('leve')) return 'sev-leve';
    if (d.includes('normal')) return 'sev-normal';
    
    return ''; // Padrão se não achar
  };

  // Função para buscar os pacientes (agora aceita a página)
  const fetchPatients = async (page = 1) => {
    setLoading(true);
    try {
      // O Laravel espera ?page=X na URL para paginação
      const response = await apiClient.get(`/api/patients?page=${page}`);
      
      // O Laravel agora retorna os dados dentro de 'data'
      setPatients(response.data.data); 
      
      // Atualiza os metadados da paginação
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalPatients(response.data.total);
      setItemsPerPage(response.data.per_page);
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      setLoading(false);
    }
  };

  // Carrega a página 1 ao iniciar
  useEffect(() => {
    fetchPatients(1);
  }, []);

  // Funções para mudar de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchPatients(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchPatients(currentPage - 1);
    }
  };

  return (
    <>
      <div className="patient-list-main-container">
        
        <button 
          className="patient-list-new-patient-btn"
          onClick={() => navigate('/patientRegister')}
        >
          <img className="patient-add-user-icon" src={PatientUserAddIcon} alt="Icone" />
          Novo Paciente
        </button>

        <div className="patient-list-data-title-container">
          <img src={PatientUserIcon} alt="Icone" className="patient-list-data-icon" />
          <h4 className="patient-list-box-data-title">Meus Pacientes</h4>
        </div>

        <div className="patient-table-container">
          <div className="table-header">
            <span className="header-cell">Nome</span>
            <span className="header-cell">Idade</span>
            <span className="header-cell">Tipo DM</span>
            <span className="header-cell">Última Análise</span>
            <span className="header-cell">Status</span>
            <span className="header-cell">Ações</span>
          </div>

          <div className="table-body">
            {loading ? (
              <p style={{padding: '2rem', textAlign: 'center'}}>Carregando pacientes...</p>
            ) : patients.length === 0 ? (
              <p style={{padding: '2rem', textAlign: 'center'}}>Nenhum paciente encontrado.</p>
            ) : (
              patients.map((paciente) => (
                <div key={paciente.id} className="table-row">
                  <div className="cell-paciente" data-label="Paciente">
                    <strong>{paciente.nome}</strong>
                  </div>
                  <div className="cell-idade" data-label="Idade">
                    {new Date().getFullYear() - new Date(paciente.birth_date).getFullYear()} Anos
                  </div>
                  <div className="cell-tipo-dm" data-label="Tipo DM">
                    {/* {paciente.tipo_diabetes === 'tipo1' ? 'DM Tipo 1' : 
                     paciente.tipo_diabetes === 'tipo2' ? 'DM Tipo 2' : 
                     paciente.tipo_diabetes === 'gestacional' ? 'Gestacional' : 'Não sabe'} */}
                     {paciente.tipo_diabetes}
                  </div>
               <div className="cell-ultima-analise" data-label="Última Análise">
                    {paciente.latest_analysis ? (
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        {/* Data menorzinha em cima */}
                        <span style={{fontSize: '0.8rem', color: '#666'}}>
                          {new Date(paciente.latest_analysis.exam_date).toLocaleDateString('pt-BR')}
                        </span>
                        
                        {/* Badge colorido com o resultado */}
                        <span className={`severity-badge ${getSeverityClass(paciente.latest_analysis.ai_summary_diagnosis)}`}>
                          {paciente.latest_analysis.ai_summary_diagnosis}
                        </span>
                      </div>
                    ) : (
                      <span style={{color: '#ccc', fontStyle: 'italic'}}>Sem histórico</span>
                    )}
                  </div>
                  <div className="cell-status" data-label="Status">
                    <span className="patient-status-tag status-completo">Cadastrado</span>
                  </div>
                  <div className="cell-acoes" data-label="Ações">
                    <button 
                      className="action-button-details"
                      onClick={() => navigate(`/paciente/${paciente.id}`)} 
                    >
                      Dados do Paciente <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 6. PAGINAÇÃO REAL CONECTADA AO LARAVEL */}
          <div className="patient-list-pages-main-container">
            <p className="patient-list-patient-number">
              {/* Lógica para mostrar "Mostrando 1-5 de 20" */}
              Mostrando {patients.length} de {totalPatients} pacientes 
              (Página {currentPage} de {totalPages})
            </p>
            
            <div className="patient-list-page-nav-buttons-container">
              <button 
                className="patient-list-previous-page-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1} // Desabilita se for a primeira página
                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              > 
                Anterior
              </button>
              
              <button 
                className="patient-list-next-page-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Desabilita se for a última página
                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Próxima
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PatientList;