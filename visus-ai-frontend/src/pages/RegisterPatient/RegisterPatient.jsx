import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import './RegisterPatient.css';

const RegisterPatient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoDiabetes, setTipoDiabetes] = useState('');
  const [usaInsulina, setUsaInsulina] = useState('');
  const [comorbidities, setComorbidities] = useState('');
  const [birthDate, setBirthdate] = useState('');
  const [diagnosisTime, setDiagnosisTime] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');

  const handleSubmit = (e) => {
    // Agora só chama a função onLogin.
    // O redirecionamento será feito no AppRoutes.
    e.preventDefault();
    const dadosFormatados = {
      nome: name,
      email: email,
      cpf: cpf,
      birthDate: birthDate,
      sexo: sexo,
      telefone: number,
      senha: password,
      // Dados Clínicos que faltavam:
      tipoDiabetes: tipoDiabetes,
      usaInsulina: usaInsulina,
      diagnosisTime: diagnosisTime,
      currentMedication: currentMedication,
      comorbidities: comorbidities,
    };

    console.log(dadosFormatados);
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
            value={name}
            type="text"
            id="name"
            className="register-patient-input-box"
            required
            placeholder="Insira o nome do paciente"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="cpf" className="register-patient-form-labels">
            CPF*
          </label>
          <input
            value={cpf}
            type="text"
            id="cpf"
            className="register-patient-input-box"
            required
            placeholder="Insira o CPF do paciente"
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="birth-data" className="register-patient-form-labels">
            Data de Nascimento *
          </label>
          <input
            value={birthDate}
            type="date"
            id="birth-data"
            className="register-patient-input-box"
            required
            placeholder="dd/mm/aaaa"
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <label htmlFor="sexo" className="register-patient-form-labels">
            Sexo *
          </label>
          <select
            id="sexo"
            className="register-patient-input-box" // Use a mesma classe para herdar estilos
            required
            value={sexo} // Vincula o select ao estado 'sexo'
            onChange={(e) => setSexo(e.target.value)} // Atualiza o estado
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="nao_informar">Prefiro não informar</option>
          </select>

          <label htmlFor="tel_number" className="register-patient-form-labels">
            Telefone *
          </label>
          <input
            value={number}
            type="text"
            id="tel_number"
            className="register-patient-input-box"
            placeholder="(11) 99999-9999"
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <label htmlFor="email" className="register-patient-form-labels">
            E-mail (opcional)
          </label>
          <input
            value={email}
            type="email"
            id="email"
            className="register-patient-input-box"
            placeholder="paciente@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="register-patient-form-labels">
            Senha do Paciente*
          </label>
          <input
            value={password}
            type="password"
            id="password"
            className="register-patient-input-box"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm_password" className="register-patient-form-labels">
            Confirme a senha do paciente*
          </label>
          <input
            value={confirmPassword}
            type="password"
            id="confirm_password"
            className="register-patient-input-box"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <h2 className="register-patient-main-title">Dados Clínicos</h2>
          <label htmlFor="tipo-diabetes" className="register-patient-form-labels">
            Tipo de Diabetes *
          </label>
          <select
            id="tipo-diabetes"
            className="register-patient-input-box"
            required
            value={tipoDiabetes}
            onChange={(e) => setTipoDiabetes(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="tipo1">Tipo 1</option>
            <option value="tipo2">Tipo 2</option>
            <option value="gestacional">Gestacional</option>
            <option value="nao_sabe">Não sabe</option>
          </select>

          <label htmlFor="usa-insulina" className="register-patient-form-labels">
            Usa Insulina?
          </label>
          <select
            id="usa-insulina"
            className="register-patient-input-box"
            // não é 'required' (obrigatório) na sua imagem
            value={usaInsulina}
            onChange={(e) => setUsaInsulina(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>

          <label htmlFor="diagnosis_time" className="register-patient-form-labels">
            Tempo de Diagnóstico (anos)
          </label>
          <input
            value={diagnosisTime}
            type="number"
            id="diagnosis_time"
            className="register-patient-input-box"
            placeholder="Ex: 5"
            required
            onChange={(e) => setDiagnosisTime(e.target.value)}
          />

          <label htmlFor="current_medication" className="register-patient-form-labels">
            Medicação Atual
          </label>
          <input
            value={currentMedication}
            type="text"
            id="current_medication"
            className="register-patient-input-box"
            placeholder="Ex: Metformina, Glibenclamida"
            required
            onChange={(e) => setCurrentMedication(e.target.value)}
          />

          <label htmlFor="relevant_comorbidities" className="register-patient-form-labels">
            Comorbidades Relevantes
          </label>
          <textarea
            id="relevant_comorbidities"
            className="register-patient-input-box-comorbidities"
            placeholder="Hipertensão, doenças cardiovasculares, etc."
            // O 'required' não é necessário se o label não tem '*'
            // required
            value={comorbidities} // Vincule ao novo estado
            onChange={(e) => setComorbidities(e.target.value)} // Use o novo 'setter'
          />

          <input
            type="submit"
            value="Criar Conta"
            className="register-patient-submit-btn"
            id="clickSubmitButton"
            disabled={password !== confirmPassword}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterPatient;
