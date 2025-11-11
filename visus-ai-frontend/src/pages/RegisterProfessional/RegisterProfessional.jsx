import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import LogoVisusAi from '../../assets/Logo.svg';

import BackIcon from '../../assets/back-icon.svg';

import './RegisterProfessional.css';

const RegisterProfessional = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [professionalRegister, setProfessionalRegister] = useState();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Agora só chama a função onLogin.
    // O redirecionamento será feito no AppRoutes.

    const dadosTeste = {
      'nome: ': name,
      'email: ': email,
      'cpf: ': cpf,
      'professionalRegister: ': professionalRegister,
      'telefone: ': number,
      'senha: ': password,
    };

    console.log(dadosTeste);
  };

  return (
    <>
      <div className="resgister-professional-main-container">
        <div className="register-professional-nav-header">
          <Link to="/login" className="register-professional-back-icon-container">
            <img className="register-professional-back-icon" src={BackIcon} alt="Ícone Voltar" />
          </Link>
          <h2 className="register-professional-page-title">Cadastre-se</h2>
        </div>

        <div className="register-professional-form-greetings-container">
          <div className="register-professional-greetings-main-container">
            <div className="register-professional-logo-container">
              <img src={LogoVisusAi} alt="Logo Visus Ai" className="register-professional-logo" />
            </div>
            <div className="register-professional-greetings-text-container">
              <h4 className="register-professional-greetings-title">Bem Vindo!</h4>
              <p className="register-professional-greetings-text">
                {' '}
                Faça o cadastro para acessar a plataforma de triagem de retinopatia diabética e
                gerenciar os exames de seus pacientes de forma rápida e segura.
              </p>
            </div>
          </div>

          <form className="register-professional-form" onSubmit={handleSubmit}>
            <div className="register-professional-text-title-form-container">
              <h2 className="register-professional-page-title">Cadastre-se</h2>
            </div>
            <label htmlFor="name" className="register-professional-form-labels">
              Nome Completo*
            </label>
            <input
              type="text"
              id="name"
              className="register-professional-input-box"
              required
              placeholder="Insira seu nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email" className="register-professional-form-labels">
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              className="register-professional-input-box"
              required
              placeholder="Insira seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="cpf" className="register-professional-form-labels">
              CPF*
            </label>
            <input
              type="text"
              id="cpf"
              className="register-professional-input-box"
              required
              placeholder="Insira seu CPF"
              onChange={(e) => setCpf(e.target.value)}
            />
            <label htmlFor="pro_register" className="register-professional-form-labels">
              Registro Profissional (Ex: CRM, COREN)*
            </label>
            <input
              type="text"
              id="pro_register"
              className="register-professional-input-box"
              required
              placeholder="Insira seu Resgistro Profissional"
              onChange={(e) => setProfessionalRegister(e.target.value)}
            />
            <label htmlFor="tel_number" className="register-professional-form-labels">
              Telefone
            </label>
            <input
              type="text"
              id="tel_number"
              className="register-professional-input-box"
              placeholder="Insira seu Telefone"
              onChange={(e) => setNumber(e.target.value)}
            />
            <label htmlFor="password" className="register-professional-form-labels">
              Senha*
            </label>
            <input
              type="password"
              id="password"
              className="register-professional-input-box"
              required
              placeholder="Insira sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm_password" className="register-professional-form-labels">
              Confirmação de senha*
            </label>
            <input
              type="password"
              id="confirm_password"
              className="register-professional-input-box"
              required
              placeholder="Confirme sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Criar Conta"
              className="register-professional-submit-btn"
              id="clickSubmitButton"
              disabled={password !== confirmPassword}
            />
            <div className="register-professional-login-redirect">
              <h3 className="register-professional-login-redirect-text">Já tem conta?</h3>
              <Link to="/login" className="register-professional-login-link">
                {' '}
                Faça login{' '}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterProfessional;
