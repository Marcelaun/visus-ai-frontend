import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import BackIcon from '../../assets/back-icon.svg';
import apiClient from '../../api/axiosConfig'; // 1. Importe o apiClient
import './AccountRecovery.css';

const AccountRecovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setIsLoading(true);

    try {
      // 2. Envia o email para o Laravel
      // O Laravel vai gerar o token e "enviar" o email (para o log)
      await apiClient.get('/sanctum/csrf-cookie'); // Garante o CSRF
      await apiClient.post('/api/forgot-password', { email: email });

      // 3. Sucesso: Redireciona para a tela de aviso "Email Enviado"
      // (Você já tem essa rota no seu AppRoutes: /emailSendSuccess)
      navigate('/emailSendSuccess');

    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      
      // Tratamento de erro básico
      if (error.response && error.response.status === 422) {
        alert("Não encontramos um usuário com esse endereço de e-mail.");
      } else {
        alert("Ocorreu um erro. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="account-recovery-main-container">
        <div className="account-recovery-nav-header">
          <Link to="/login" className="account-recovery-back-icon-container">
            <img className="account-recovery-back-icon" src={BackIcon} alt="Ícone Voltar" />
          </Link>
          <h2 className="account-recovery-page-title">Recuperar Senha</h2>
          <div></div>
        </div>

        <form className="account-recovery-form" onSubmit={handleSubmit}>
          <h3 className="account-recovery-desc-title">
            Por favor digite o e-mail cadastrado para recuperação de senha
          </h3>
          
          <label htmlFor="email" className="account-recovery-form-labels">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="account-recovery-input-box"
            required
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="submit"
            value={isLoading ? "Enviando..." : "Confirmar"}
            className="account-recovery-submit-btn"
            id="clickSubmitButton"
            disabled={!email || isLoading}
          />
        </form>
        
        <Link to="/login" className="account-recovery-link">
          Sair
        </Link>
      </div>
    </>
  );
};

export default AccountRecovery;