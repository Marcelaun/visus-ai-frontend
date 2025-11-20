import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import LogoVisusAi from '../../assets/Logo.svg';
import './PasswordReset.css';

const PasswordReset = () => {
  const navigate = useNavigate();
  
  // 1. Pega o token da URL (ex: /password-reset/TOKEN_AQUI)
  const { token } = useParams();
  
  // 2. Pega o email da URL (ex: ?email=joao@teste.com)
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email');

  const [email, setEmail] = useState(emailFromUrl || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // 3. Envia a nova senha para o Laravel
      // O Laravel Breeze exige: token, email, password, password_confirmation
      await apiClient.get('/sanctum/csrf-cookie');
      await apiClient.post('/api/reset-password', {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      alert('Senha redefinida com sucesso! Você será redirecionado para o login.');
      navigate('/login');

    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      
      let errorMsg = "Ocorreu um erro. O link pode ter expirado.";
      
      if (error.response && error.response.data.errors) {
         // Pega a primeira mensagem de erro que o Laravel mandar
         errorMsg = Object.values(error.response.data.errors).flat()[0];
      } else if (error.response && error.response.data.message) {
         errorMsg = error.response.data.message;
      }
      
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-reset-main-container">
       <div className="password-reset-logo-container">
          <img src={LogoVisusAi} alt="Logo VisusAI" className="password-reset-logo" />
       </div>
       
       <div className="password-reset-box">
           <h2 className="password-reset-title">Redefinir Senha</h2>
           <p className="password-reset-subtitle">Crie uma nova senha segura para sua conta.</p>
           
           {message && (
             <div className={`password-reset-message ${message.type}`}>
               {message.text}
             </div>
           )}
           
           <form className="password-reset-form" onSubmit={handleSubmit}>
              
              {/* Campo Email (Geralmente Readonly, pois vem do link) */}
              <div className="input-group">
                  <label htmlFor="email" className="password-reset-label">E-mail</label>
                  <input 
                    id="email"
                    type="email" 
                    className="password-reset-input"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    readOnly={!!emailFromUrl} // Se veio da URL, bloqueia edição para evitar erros
                  />
              </div>

              <div className="input-group">
                  <label htmlFor="password" className="password-reset-label">Nova Senha</label>
                  <input 
                    id="password"
                    type="password" 
                    className="password-reset-input"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    placeholder="Mínimo 8 caracteres"
                  />
              </div>

              <div className="input-group">
                  <label htmlFor="conf_password" className="password-reset-label">Confirmar Nova Senha</label>
                  <input 
                    id="conf_password"
                    type="password" 
                    className="password-reset-input"
                    value={passwordConfirmation} 
                    onChange={e => setPasswordConfirmation(e.target.value)} 
                    required 
                    placeholder="Repita a senha"
                  />
              </div>

              <button 
                type="submit" 
                className="password-reset-btn" 
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Redefinir Senha"}
              </button>
           </form>
       </div>
    </div>
  );
};

export default PasswordReset;