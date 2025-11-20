import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import LogoVisusAi from '../../assets/Logo.svg';
import apiClient from '../../api/axiosConfig'; // Importe o apiClient
import BackIcon from '../../assets/back-icon.svg';

import './RegisterProfessional.css';

const RegisterProfessional = () => {
  const navigate = useNavigate();
  
  // Estados
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [professionalRegister, setProfessionalRegister] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estado de loading
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Prepara os dados para o Laravel
    // Lembre-se: 'password_confirmation' é obrigatório para o Breeze
    const dadosParaEnviar = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      
      // Campos customizados que adicionamos na migration
      cpf: cpf,
      registro_profissional: professionalRegister,
      telefone: number,
    };

    try {
      // 2. Envia para a API de Registro
      // O Laravel Breeze cria o usuário e JÁ FAZ O LOGIN automaticamente
      await apiClient.post('/api/register', dadosParaEnviar);

      alert('Conta criada com sucesso!');
      
      // 3. Redireciona para o Dashboard (já logado)
      // O AppRoutes vai checar o cookie e ver que está logado
      navigate('/verify-email'); 

      // (Opcional: se o AppRoutes não atualizar sozinho, você pode forçar um reload: window.location.href = '/dashboard';)

    } catch (error) {
      console.error("Erro no registro:", error);

      // Tratamento de Erro
      if (error.response && error.response.data.errors) {
        // Pega o primeiro erro (ex: "Email já está em uso")
        const mensagens = Object.values(error.response.data.errors).flat();
        alert(`Erro: ${mensagens[0]}`);
      } else {
        alert('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
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
              value={name}
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
              value={email}
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
              value={cpf}
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
              value={professionalRegister}
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
              value={number}
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
              value={password}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <input
              type="submit"
              value={isLoading ? "Criando conta..." : "Criar Conta"}
              className="register-professional-submit-btn"
              id="clickSubmitButton"
              disabled={password !== confirmPassword || isLoading}
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