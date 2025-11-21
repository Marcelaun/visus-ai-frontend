import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoVisus from '../../assets/Logo.svg';
import apiClient from '../../api/axiosConfig';
import '../Login/Login.css'; // Reutilizamos o CSS do Login
import { toast } from 'react-toastify';

const PatientLogin = ({ onPatientLogin }) => {
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Chama a rota específica de pacientes
      const response = await apiClient.post('/api/patient/login', {
        cpf: cpf,
        birth_date: birthDate
      });

      // Chama a função do AppRoutes para salvar o estado do paciente
      onPatientLogin(response.data.patient);
      
      toast.success(`Bem-vindo(a), ${response.data.patient.nome}!`);
      navigate('/patient-dashboard'); // Redireciona para a área do paciente

    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Dados incorretos. Verifique seu CPF e Data de Nascimento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-main-container" style={{backgroundColor: '#f0f8ff'}}> {/* Fundo levemente azul para diferenciar */}
      <img className="login-logo" src={LogoVisus} alt="Logo VisusAI" />

      <div className="login-options-container">
        <div style={{marginBottom: '20px', textAlign: 'center'}}>
            <h2 style={{color: '#33b9b9'}}>Área do Paciente</h2>
            <p style={{color: '#666'}}>Consulte seus resultados</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="cpf" className="login-form-labels">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            className="login-input-box"
            required
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          
          <label htmlFor="birthDate" className="login-form-labels">
            Data de Nascimento
          </label>
          <input
            type="date"
            id="birthDate"
            className="login-input-box"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <input
            type="submit"
            value={isLoading ? "Entrando..." : "Acessar Resultados"}
            className="login-submit-btn"
            id="loginClickSubmitButton"
            disabled={isLoading}
          />
        </form>

        <div className="login-create-account-container">
          <Link to="/login" className="login-create-account-link" style={{marginTop: '10px', display: 'block'}}>
             Sou Profissional de Saúde
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;