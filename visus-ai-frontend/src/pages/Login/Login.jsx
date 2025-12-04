import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import LogoVisus from '../../assets/Logo.svg';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validação básica
    if (!email || !password) {
      toast.warning("Por favor, preencha o usuário e a senha.");
      return;
    }
    
    setIsLoading(true);

    try {
      // 2. Tenta fazer login (Chama a função do AppRoutes)
      // O 'await' aqui espera o AppRoutes tentar conectar
      await onLogin(email, password);

      // Se der certo, o AppRoutes vai redirecionar, então não precisamos de toast de sucesso aqui
      // ou podemos colocar um toast rápido se quiser.
      
    } catch (error) {
      // 3. TRATAMENTO DE ERROS ESPECÍFICOS
      console.error("Erro capturado no Login:", error);

      if (error.response) {
        // Erros que vieram do Backend (Laravel)
        const status = error.response.status;

        if (status === 401 || status === 422) {
           toast.error("E-mail ou senha incorretos. Tente novamente.");
        } else if (status === 500) {
           toast.error("Erro no servidor. Tente novamente mais tarde.");
        } else if (status === 419) {
           toast.error("Sessão expirada. Recarregue a página.");
        } else {
           toast.error(`Erro desconhecido (${status}).`);
        }
      } else if (error.request) {
        // Erro de rede (Servidor desligado, sem internet)
        toast.error("Sem conexão com o servidor. Verifique sua internet.");
      } else {
        // Outros erros
        toast.error("Ocorreu um erro inesperado.");
      }
    } finally {
      // Libera o botão novamente
      setIsLoading(false);
    }
  };

  return (
    <div className="login-main-container">
      <img className="login-logo" src={LogoVisus} alt="Logo VisusAI" />

      <div className="login-options-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-form-labels">
            Usuário
          </label>
          <input
            type="email"
            id="email"
            className="login-input-box"
            required
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <label htmlFor="password" className="login-form-labels">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="login-input-box"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Link to="/accountRecovery" className="password-reset-link">
            Esqueceu sua senha?
          </Link>

          <button
            type="submit"
            className="login-submit-btn"
            id="loginClickSubmitButton"
            disabled={isLoading}
            style={{ 
              opacity: isLoading ? 0.7 : 1, 
              cursor: isLoading ? 'not-allowed' : 'pointer' 
            }}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <div className="login-create-account-container">
          <h3 className="login-create-account-title">
            É profissional de saúde e ainda não possui uma conta? Crie aqui!
          </h3>
          <Link to="/createAccount" className="login-create-account-link">
            Criar Conta
          </Link>

          <h3 className="login-create-account-title">
            É paciente? entre por aqui!
          </h3>
          <Link to="/patient-login" className="login-create-account-link">
            Entrar como paciente
          </Link>
        </div>
        
        <div className="login-footer-links" style={{marginTop: '20px', fontSize: '0.8rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px'}}>
            <Link to="/termsOfUse" style={{color: '#888'}}>Termos de Uso</Link>
            <span style={{color: '#ccc'}}>|</span>
            <Link to="/privacypolicy" style={{color: '#888'}}>Política de Privacidade</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;