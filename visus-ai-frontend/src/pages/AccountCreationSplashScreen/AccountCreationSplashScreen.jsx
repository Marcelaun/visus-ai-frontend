import React from 'react';

import './AccountCreationSplashScreen.css';
import {useNavigate, Link} from 'react-router-dom';

import SucessIcon from '../../assets/account-creation-splash-img.svg';

const AccountCreationSplashScreen = () => {
  return (
    <>
      <div className="account-creation-success-main-container">
        <div className="account-creation-success-splash-message-container">
          <img
            className="account-creation-sucess-img"
            src={SucessIcon}
            alt="Conta criada com sucesso"
          />

          <h2 className="account-creation-success-title">Conta criada com sucesso!</h2>
          <h3 className="account-creation-success-text">
            Confira seu e-mail e confirme o cadastro de conta para continuar.
          </h3>
        </div>

        <Link to="/login" className="account-creation-splash-screen-link">
          {' '}
          Confirmar{' '}
        </Link>
      </div>
    </>
  );
};

export default AccountCreationSplashScreen;
