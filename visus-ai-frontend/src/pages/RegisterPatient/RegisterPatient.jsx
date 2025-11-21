import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-toastify'; // 1. Importe o toast
import './RegisterPatient.css';

const RegisterPatient = () => {
  const navigate = useNavigate();
  
  // Estados do Formulário
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

  // 2. Estado para controlar o botão (desabilitar enquanto salva)
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Previne duplo clique
    if (isSaving) return;

    setIsSaving(true);

    // Prepara os dados
    const dadosParaEnviar = {
      nome: name,
      cpf: cpf,
      birth_date: birthDate,
      sexo: sexo,
      telefone: number,
      email: email,
      tipo_diabetes: tipoDiabetes,
      usa_insulina: usaInsulina,
      diagnosis_time: diagnosisTime,
      current_medication: currentMedication,
      comorbidities: comorbidities,
    };

    // Cria a promessa da requisição (SEM await aqui)
    const savePromise = apiClient.post('/api/patients', dadosParaEnviar);

    // 3. Usa toast.promise para gerenciar o feedback visual
    toast.promise(
      savePromise,
      {
        pending: 'Salvando paciente...',
        success: {
          render({ data }) {
            // Navega para a lista após um breve delay (opcional)
            setTimeout(() => navigate('/patientList'), 1500);
            return `Paciente ${name} cadastrado com sucesso! 🎉`;
          }
        },
        error: {
          render({ data }) {
            console.error("Erro ao cadastrar:", data);
            // Tenta extrair a mensagem de erro do Laravel
            let msg = 'Erro ao cadastrar paciente.';
            if (data.response?.data?.errors) {
                msg = Object.values(data.response.data.errors).flat()[0];
            }
            return `Erro: ${msg} 🤯`;
          }
        }
      }
    ).finally(() => {
       // Libera o botão novamente (se deu erro) ou mantém travado se navegou
       // Como vamos navegar no sucesso, podemos deixar travado ou liberar.
       // Vamos liberar para caso de erro.
       setIsSaving(false); 
    });
  };

  return (
    <>
      <div className="register-patient-main-container">
        <form className="register-patient-form" onSubmit={handleSubmit}>
          
          {/* --- COLUNA 1: DADOS PESSOAIS --- */}
          <div className="form-section">
            <h3 className="form-section-title">Dados Pessoais</h3>

            <div className="form-group">
              <label htmlFor="name" className="register-patient-form-labels">Nome Completo *</label>
              <input
                value={name}
                type="text"
                id="name"
                className="register-patient-input-box"
                required
                placeholder="Insira o nome do paciente"
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving} // Desabilita inputs também
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf" className="register-patient-form-labels">CPF *</label>
              <input
                value={cpf}
                type="text"
                id="cpf"
                className="register-patient-input-box"
                required
                placeholder="Insira o CPF do paciente"
                onChange={(e) => setCpf(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birth-data" className="register-patient-form-labels">Data de Nascimento *</label>
              <input
                value={birthDate}
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                id="birth-data"
                className="register-patient-input-box"
                required
                placeholder="dd/mm/aaaa"
                onChange={(e) => setBirthdate(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sexo" className="register-patient-form-labels">Sexo *</label>
              <select
                id="sexo"
                className="register-patient-input-box"
                required
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                disabled={isSaving}
              >
                <option value="" disabled>Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tel_number" className="register-patient-form-labels">Telefone *</label>
              <input
                value={number}
                type="tel"
                id="tel_number"
                className="register-patient-input-box"
                placeholder="(11) 99999-9999"
                required
                onChange={(e) => setNumber(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="register-patient-form-labels">Email (opcional)</label>
              <input
                value={email}
                type="email"
                id="email"
                className="register-patient-input-box"
                placeholder="paciente@email.com"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* --- COLUNA 2: DADOS CLÍNICOS --- */}
          <div className="form-section">
            <h3 className="form-section-title">Dados Clínicos</h3>

            <div className="form-group">
              <label htmlFor="tipo-diabetes" className="register-patient-form-labels">Tipo de Diabetes *</label>
              <select
                id="tipo-diabetes"
                className="register-patient-input-box"
                required
                value={tipoDiabetes}
                onChange={(e) => setTipoDiabetes(e.target.value)}
                disabled={isSaving}
              >
                <option value="" disabled>Selecione...</option>
                <option value="Tipo 1">Tipo 1</option>
                <option value="Tipo 2">Tipo 2</option>
                <option value="Gestacional">Gestacional</option>
                <option value="Não Sabe">Não sabe</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="usa-insulina" className="register-patient-form-labels">Usa Insulina?</label>
              <select
                id="usa-insulina"
                className="register-patient-input-box"
                value={usaInsulina}
                onChange={(e) => setUsaInsulina(e.target.value)}
                disabled={isSaving}
              >
                <option value="" disabled>Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis_time" className="register-patient-form-labels">Tempo de Diagnóstico (anos)</label>
              <input
                value={diagnosisTime}
                type="number"
                id="diagnosis_time"
                className="register-patient-input-box"
                placeholder="Ex: 5"
                onChange={(e) => setDiagnosisTime(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="current_medication" className="register-patient-form-labels">Medicação Atual</label>
              <input
                value={currentMedication}
                type="text"
                id="current_medication"
                className="register-patient-input-box"
                placeholder="Ex: Metformina, Glibenclamida"
                onChange={(e) => setCurrentMedication(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="relevant_comorbidities" className="register-patient-form-labels">Comorbidades Relevantes</label>
              <textarea
                id="relevant_comorbidities"
                className="register-patient-textarea-box"
                placeholder="Hipertensão, doenças cardiovasculares, etc."
                value={comorbidities}
                onChange={(e) => setComorbidities(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* --- BOTÕES --- */}
          <div className="form-actions">
            <input
              type="submit"
              value={isSaving ? "Salvando..." : "Salvar Paciente"} // Texto dinâmico
              className="register-patient-submit-btn"
              id="clickSubmitButton"
              disabled={isSaving} // 4. Botão desabilitado durante o loading
              style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
            />
            <Link to="/dashboard" className="register-patient-cancel-btn" style={{pointerEvents: isSaving ? 'none' : 'auto'}}>
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPatient;