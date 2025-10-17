import React from 'react';

import './EmailSendingSplashScreen.css';
import {useNavigate, Link} from 'react-router-dom';

import EmailIcon from '../../assets/email-sending-splash-screen.svg';


const EmailSendingSplashScreen = () => {
  return (
    <>

    <div className="email-sending-success-main-container">
            <div className="email-sending-success-splash-message-container">
              <img
                className="email-sending-sucess-img"
                src={EmailIcon}
                alt="Conta criada com sucesso"
              />
    
              <h2 className="email-sending-success-title">Email enviado com sucesso!</h2>
              <h3 className="email-sending-success-text">
                Confira seu e-mail e modifique a senha de acesso ao sistema.
              </h3>
            </div>
    
            <Link to="/login" className="email-sending-splash-screen-link">
              {' '}
              Confirmar{' '}
            </Link>
          </div>

    </>
  )
}

export default EmailSendingSplashScreen
