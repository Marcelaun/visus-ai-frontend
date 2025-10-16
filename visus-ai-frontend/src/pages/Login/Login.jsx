
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';
import LogoVisus from '../../assets/Logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';



import React from 'react';
// import { useNavigate } from 'react-router-dom'; // PODE REMOVER ESTA LINHA
import { Box, Button, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  // const navigate = useNavigate(); // PODE REMOVER ESTA LINHA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    // Agora só chama a função onLogin.
    // O redirecionamento será feito no AppRoutes.
    onLogin();
  };

  return (
    <>
    <div className="login-main-container">

      <img className='login-logo' src={LogoVisus} alt="Logo VisusAI" srcset="" />

      <div className="login-options-container">
        <form action="#" className="login-form" onSubmit={handleSubmit}>
            <input type="email" className="login-input-box" required placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" className="login-input-box" required placeholder='Senha' onChange={(e) => {setPassword(e.target.value)}}/>
            <div className="password-reset">
            <Link to="/passwordReset" className="password-reset-link">Esqueceu sua senha?</Link>
          </div>
           <input type="submit" value="Entrar" className="login-submit-btn" id="loginClickSubmitButton"/>
        </form>
        <div className="login-create-account-container">
            <Link to="/createAccount" className="login-create-account-link">Criar Conta</Link>
          </div>
      </div>

    </div>

    </>
  );
};

export default Login;