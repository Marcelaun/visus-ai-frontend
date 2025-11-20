import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import LogoVisus from '../../assets/Logo.svg';
import './VerifyEmail.css'; // Pode copiar o CSS do Login ou criar um simples

const VerifyEmail = ({ onLogout }) => {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    setStatus('Enviando...');
    try {
      await apiClient.post('/api/email/verification-notification');
      setStatus('Um novo link de verificação foi enviado para o seu e-mail.');
    } catch (error) {
      setStatus('Erro ao reenviar. Tente novamente.');
    }
  };

  const handleLogoutAndRedirect = async () => {
     // Faz logout e volta para login
     if (onLogout) await onLogout();
     navigate('/login');
  };

  return (
    <div className="login-main-container">
      <div className="login-options-container" style={{textAlign: 'center', padding: '40px'}}>
        <img src={LogoVisus} alt="Logo" style={{height: '50px', marginBottom: '20px'}} />
        
        <h2 style={{color: '#333', marginBottom: '10px'}}>Verifique seu E-mail</h2>
        
        <p style={{color: '#666', lineHeight: '1.6', marginBottom: '30px'}}>
          Obrigado por se cadastrar! Antes de começar, você poderia verificar seu endereço de e-mail clicando no link que acabamos de enviar?
        </p>

        {status && (
          <div style={{color: '#27ae60', marginBottom: '20px', fontWeight: 'bold'}}>
            {status}
          </div>
        )}

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <button 
            onClick={handleResendEmail}
            className="login-submit-btn"
          >
            Reenviar E-mail de Verificação
          </button>

          <button 
            onClick={handleLogoutAndRedirect}
            style={{background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}
          >
            Sair / Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;