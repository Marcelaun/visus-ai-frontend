import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import './RegisterPatient.css';

const RegisterPatient = () => {
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
      <div className="register-patient-main-container">
        <h2 className="register-patient-main-title">Dados Pessoais</h2>
        <form className="register-patient-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="register-patient-form-labels">
            Nome Completo*
          </label>
          <input
            type="text"
            id="name"
            className="register-patient-input-box"
            required
            placeholder="Insira seu nome completo"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="cpf" className="register-patient-form-labels">
            CPF*
          </label>
          <input
            type="text"
            id="cpf"
            className="register-patient-input-box"
            required
            placeholder="Insira seu CPF"
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="birth-data" className="register-patient-form-labels">
            Data de Nascimento *
          </label>
          <input
            type="date"
            id="pro_register"
            className="register-patient-input-box"
            required
            placeholder="dd/mm/aaaa"
            onChange={(e) => setProfessionalRegister(e.target.value)}
          />
          <label htmlFor="tel_number" className="register-patient-form-labels">
            Telefone
          </label>
          <input
            type="text"
            id="tel_number"
            className="register-patient-input-box"
            placeholder="Insira seu Telefone"
            onChange={(e) => setNumber(e.target.value)}
          />
          <label htmlFor="email" className="register-patient-form-labels">
            E-mail*
          </label>
          <input
            type="email"
            id="email"
            className="register-patient-input-box"
            required
            placeholder="Insira seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="register-patient-form-labels">
            Senha*
          </label>
          <input
            type="password"
            id="password"
            className="register-patient-input-box"
            required
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm_password" className="register-patient-form-labels">
            Confirmação de senha*
          </label>
          <input
            type="password"
            id="confirm_password"
            className="register-patient-input-box"
            required
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Criar Conta"
            className="register-patient-submit-btn"
            id="clickSubmitButton"
            disabled={password !== confirmPassword ? 'disabled' : ''}
          />
        </form>

        <button onClick={handleSubmit}>teste botao</button>
      </div>
    </>
  );
};

export default RegisterPatient;
