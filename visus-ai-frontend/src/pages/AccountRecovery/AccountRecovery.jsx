import React, {useState, useEffect} from 'react';

import './AccountRecovery.css';

import BackIcon from '../../assets/back-icon.svg';
import {useNavigate, Link} from 'react-router-dom';

const AccountRecovery = () => {

     const [email, setEmail] = useState('');

     const handleSubmit = () => {


        console.log({
            "email": email
        })
     }

  return (
    <>
      <div className="account-recovery-main-container">
        <div className="account-recovery-nav-header">
          <Link to="/login" className="account-recovery-back-icon-container">
            <img className="account-recovery-back-icon" src={BackIcon} alt="Ícone Voltar" />
          </Link>
          <h2 className="account-recovery-page-title">Recuperar Senha</h2>
          <div>
            
          </div>
        </div>

       

        <form className="account-recovery-form" onSubmit={handleSubmit}>
             <h3 className="account-recovery-desc-title">Por favor digite o e-mail cadastrado para recuperação de senha</h3>
          <label htmlFor="email" className="account-recovery-form-labels">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="account-recovery-input-box"
            required
            placeholder="Insira seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            value="Confirmar"
            className="account-recovery-submit-btn"
            id="clickSubmitButton"
            disabled={email === null ? 'disabled' : ''}
          />
        </form>
        <Link to="/login" className="account-recovery-link">
        Sair
        </Link>
      </div>
    </>
  );
};

export default AccountRecovery;
