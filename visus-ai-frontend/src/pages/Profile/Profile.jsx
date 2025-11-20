import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import './Profile.css';

// Componente de Ícone
const IconePerfil = () => (
  <svg className="perfil-header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// Componente Input/Info Reutilizável
const ProfileField = ({ label, name, value, isEditing, onChange, type = "text", disabled = false }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    {isEditing ? (
      <input 
        type={type}
        name={name}
        className="profile-input" // Vamos adicionar esse estilo
        value={value} 
        onChange={onChange}
        disabled={disabled}
      />
    ) : (
      <span className="info-value">{value || 'Não preenchido'}</span>
    )}
  </div>
);

const Profile = ({ user }) => {
  // Estados de Controle
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Estado do Formulário de Dados
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    registro_profissional: '',
    telefone: ''
  });

  // Estado do Formulário de Senha
  const [passData, setPassData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  // Carrega os dados do user para o form quando o componente monta ou user muda
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        cpf: user.professional?.cpf || '',
        registro_profissional: user.professional?.registro_profissional || '',
        telefone: user.professional?.telefone || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  // --- AÇÃO 1: SALVAR DADOS ---
  const handleSaveProfile = async () => {
    try {
      await apiClient.put('/api/profile', formData);
      alert('Perfil atualizado com sucesso!');
      setIsEditing(false);
      // O ideal aqui seria recarregar o usuário no AppRoutes, 
      // mas como mudamos o estado local, a UI já atualiza.
      // Um window.location.reload() garantiria tudo sincronizado se quiser.
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar perfil. Verifique os dados.');
    }
  };

  // --- AÇÃO 2: SALVAR SENHA ---
  const handleSavePassword = async () => {
    if (passData.password !== passData.password_confirmation) {
        alert("A nova senha e a confirmação não batem.");
        return;
    }
    try {
      await apiClient.put('/api/password', passData);
      alert('Senha alterada com sucesso!');
      setIsChangingPassword(false);
      setPassData({ current_password: '', password: '', password_confirmation: '' });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 422) {
          alert('A senha atual está incorreta ou a nova senha é muito fraca.');
      } else {
          alert('Erro ao mudar senha.');
      }
    }
  };

  if (!user) return <div className="perfil-container"><h2>Carregando...</h2></div>;

  return (
    <div className="perfil-container">
      
      <div className="perfil-header">
        <IconePerfil />
        <h2>Meu Perfil</h2>
      </div>

      <div className="perfil-card">
        
        {/* --- SEÇÃO: DADOS PESSOAIS E ACESSO --- */}
        {!isChangingPassword && (
            <>
                <div className="perfil-section">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 className="perfil-section-title">Informações da Conta</h3>
                </div>
                
                <ProfileField 
                    label="Nome Completo" name="name" 
                    value={formData.name} isEditing={isEditing} onChange={handleInputChange} 
                />
                <ProfileField 
                    label="E-mail" name="email" type="email"
                    value={formData.email} isEditing={isEditing} onChange={handleInputChange} 
                />
                
                {/* Só mostra campos profissionais se for 'professional' */}
                {user.role === 'professional' && (
                    <>
                        <div className="divider" style={{margin: '1rem 0', borderTop: '1px solid #eee'}}></div>
                        <h3 className="perfil-section-title">Dados Profissionais</h3>
                        <ProfileField 
                            label="CPF" name="cpf" 
                            value={formData.cpf} isEditing={isEditing} onChange={handleInputChange} 
                        />
                        <ProfileField 
                            label="Registro Profissional" name="registro_profissional" 
                            value={formData.registro_profissional} isEditing={isEditing} onChange={handleInputChange} 
                        />
                        <ProfileField 
                            label="Telefone" name="telefone" 
                            value={formData.telefone} isEditing={isEditing} onChange={handleInputChange} 
                        />
                    </>
                )}
                </div>

                {/* --- BOTÕES PRINCIPAIS --- */}
                <div className="perfil-actions">
                {isEditing ? (
                    <>
                        <button className="perfil-button btn-primary" onClick={handleSaveProfile}>
                            Salvar Alterações
                        </button>
                        <button className="perfil-button btn-secondary" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <button className="perfil-button btn-primary" onClick={() => setIsEditing(true)}>
                            Editar Informações
                        </button>
                        <button className="perfil-button btn-secondary" onClick={() => setIsChangingPassword(true)}>
                            Mudar Senha
                        </button>
                    </>
                )}
                </div>
            </>
        )}

        {/* --- SEÇÃO: MUDAR SENHA (APARECE SÓ QUANDO CLICA) --- */}
        {isChangingPassword && (
            <div className="perfil-section fade-in">
                <h3 className="perfil-section-title" style={{color: '#e74c3c'}}>Alterar Senha</h3>
                
                <div className="info-row">
                    <label className="info-label">Senha Atual</label>
                    <input type="password" name="current_password" className="profile-input"
                        value={passData.current_password} onChange={handlePassChange} />
                </div>
                <div className="info-row">
                    <label className="info-label">Nova Senha</label>
                    <input type="password" name="password" className="profile-input"
                        value={passData.password} onChange={handlePassChange} />
                </div>
                <div className="info-row">
                    <label className="info-label">Confirmar Nova Senha</label>
                    <input type="password" name="password_confirmation" className="profile-input"
                        value={passData.password_confirmation} onChange={handlePassChange} />
                </div>

                <div className="perfil-actions">
                    <button className="perfil-button btn-primary" onClick={handleSavePassword} style={{backgroundColor: '#e74c3c'}}>
                        Confirmar Mudança
                    </button>
                    <button className="perfil-button btn-secondary" onClick={() => setIsChangingPassword(false)}>
                        Cancelar
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Profile;