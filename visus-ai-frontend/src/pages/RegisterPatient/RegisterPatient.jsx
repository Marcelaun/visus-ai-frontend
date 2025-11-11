import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './RegisterPatient.css'; // Vamos usar o novo CSS

const RegisterPatient = () => {
  // Seus estados estão perfeitos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [number, setNumber] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoDiabetes, setTipoDiabetes] = useState('');
  const [usaInsulina, setUsaInsulina] = useState('');
  const [comorbidities, setComorbidities] = useState('');
  const [birthDate, setBirthdate] = useState('');
  const [diagnosisTime, setDiagnosisTime] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosFormatados = {
      nome: name,
      email: email,
      cpf: cpf,
      birthDate: birthDate,
      sexo: sexo,
      telefone: number,
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
        <form className="register-patient-form" onSubmit={handleSubmit}>
          {/* --- COLUNA 1: DADOS PESSOAIS --- */}
          <div className="form-section">
            <h3 className="form-section-title">Dados Pessoais</h3>

            <div className="form-group">
              <label htmlFor="name" className="register-patient-form-labels">
                Nome Completo *
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
            </div>

            <div className="form-group">
              <label htmlFor="cpf" className="register-patient-form-labels">
                CPF *
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
            </div>

            <div className="form-group">
              <label htmlFor="birth-data" className="register-patient-form-labels">
                Data de Nascimento *
              </label>
              <input
                value={birthDate}
                type="text" // Usando "text" para o placeholder "dd/mm/aaaa" funcionar
                onFocus={(e) => (e.target.type = 'date')} // Muda para 'date' ao focar
                onBlur={(e) => (e.target.type = 'text')} // Volta para 'text' se vazio
                id="birth-data"
                className="register-patient-input-box"
                required
                placeholder="dd/mm/aaaa"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sexo" className="register-patient-form-labels">
                Sexo *
              </label>
              <select
                id="sexo"
                className="register-patient-input-box"
                required
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tel_number" className="register-patient-form-labels">
                Telefone *
              </label>
              <input
                value={number}
                type="tel"
                id="tel_number"
                className="register-patient-input-box"
                placeholder="(11) 99999-9999"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="register-patient-form-labels">
                Email (opcional)
              </label>
              <input
                value={email}
                type="email"
                id="email"
                className="register-patient-input-box"
                placeholder="paciente@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* --- COLUNA 2: DADOS CLÍNICOS --- */}
          <div className="form-section">
            <h3 className="form-section-title">Dados Clínicos</h3>

            <div className="form-group">
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
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="gestacional">Gestacional</option>
                <option value="nao_sabe">Não sabe</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="usa-insulina" className="register-patient-form-labels">
                Usa Insulina?
              </label>
              <select
                id="usa-insulina"
                className="register-patient-input-box"
                value={usaInsulina}
                onChange={(e) => setUsaInsulina(e.target.value)}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis_time" className="register-patient-form-labels">
                Tempo de Diagnóstico (anos)
              </label>
              <input
                value={diagnosisTime}
                type="number"
                id="diagnosis_time"
                className="register-patient-input-box"
                placeholder="Ex: 5"
                onChange={(e) => setDiagnosisTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="current_medication" className="register-patient-form-labels">
                Medicação Atual
              </label>
              <input
                value={currentMedication}
                type="text"
                id="current_medication"
                className="register-patient-input-box"
                placeholder="Ex: Metformina, Glibenclamida"
                onChange={(e) => setCurrentMedication(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="relevant_comorbidities" className="register-patient-form-labels">
                Comorbidades Relevantes
              </label>
              <textarea
                id="relevant_comorbidities"
                className="register-patient-textarea-box"
                placeholder="Hipertensão, doenças cardiovasculares, etc."
                value={comorbidities}
                onChange={(e) => setComorbidities(e.target.value)}
              />
            </div>
          </div>

          {/* --- BOTÕES (ocupando as duas colunas) --- */}
          <div className="form-actions">
            <input
              type="submit"
              value="Salvar Paciente"
              className="register-patient-submit-btn"
              id="clickSubmitButton"
            />
            <Link to="/dashboard" className="register-patient-cancel-btn">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPatient;
