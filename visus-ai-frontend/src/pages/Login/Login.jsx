import './Login.css';
import LogoVisus from '../../assets/Logo.svg';

import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';

import React from 'react';
// import { useNavigate } from 'react-router-dom'; // PODE REMOVER ESTA LINHA


const Login = ({onLogin}) => {
  // const navigate = useNavigate(); // PODE REMOVER ESTA LINHA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Valide se os campos não estão vazios (opcional)
    if (!email || !password) {
      alert("Por favor, preencha o usuário e a senha.");
      return;
    }
    
    // 2. Envie o email e a senha para o AppRoutes
    onLogin(email, password);
  };

  return (
    <>
      <div className="login-main-container">
        <img className="login-logo" src={LogoVisus} alt="Logo VisusAI" srcset="" />

        <div className="login-options-container">
          <form action="#" className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-form-labels">
              Usuário
            </label>
            <input
              type="email"
              id="email"
              className="login-input-box"
              required
              placeholder="Insira seu e-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link to="/accountRecovery" className="password-reset-link">
              Esqueceu sua senha?
            </Link>
            <input
              type="submit"
              value="Entrar"
              className="login-submit-btn"
              id="loginClickSubmitButton"
            />
          </form>
          <div className="login-create-account-container">
            <h3 className="login-create-account-title">
              É profissional de saúde e ainda não possui uma conta? Crie aqui!
            </h3>
            <Link to="/createAccount" className="login-create-account-link">
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Login;
