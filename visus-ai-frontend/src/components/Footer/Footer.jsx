import React from 'react';
import './Footer.css';
import LogoVisusAi from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';

const Footer = ({ user, patientUser }) => {
  
  // Verifica se é um Profissional logado (Médico ou Admin)
  const isProfessional = user && (user.role === 'professional' || user.role === 'admin');

  return (
    <>
      <footer className="footer-main-container">
        <div className="footer-info-main-container">
          <img src={LogoVisusAi} alt="Logo Visus AI" className="footer-logo" />
          
          <p className="footer-platform-advise-text">
            Esta plataforma é uma ferramenta de triagem e apoio. Os resultados gerados pela
            Inteligência Artificial não constituem um diagnóstico médico final e não substituem a
            avaliação de um profissional de saúde qualificado.
          </p>

          {/* === SEÇÃO DE LINKS DINÂMICA === */}
          <nav className="footer-links-container">
            
            {/* Estes links só aparecem se for MÉDICO ou ADMIN */}
            {isProfessional && (
              <>
                <Link to="/dashboard" className="footer-link-item">
                  Dashboard
                </Link>
                <Link to="/profile" className="footer-link-item">
                  Perfil
                </Link>
              </>
            )}

            {/* Estes links aparecem para TODOS (Médicos e Pacientes) */}
            <Link to="/termsOfUse" className="footer-link-item">
              Termos de Uso
            </Link>
            <Link to="/privacypolicy" className="footer-link-item">
              Política de Privacidade
            </Link>
            
          </nav>

          <p className="footer-copyright-text">
            © {new Date().getFullYear()} VisusAI. Todos os direitos reservados.
          </p>
        </div>
        
        {/* SVG Background... (Mantido igual) */}
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className="footer-svg-background transition duration-300 ease-in-out delay-150"
        >
          {/* ... path e defs ... */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#33b9b9"></stop>
              <stop offset="95%" stopColor="#8ED1FC"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,400 L 0,100 C 68.83253588516749,94.98564593301435 137.66507177033498,89.97129186602872 247,86 C 356.334928229665,82.02870813397128 506.17224880382764,79.10047846889952 615,77 C 723.8277511961724,74.89952153110048 791.6459330143542,73.6267942583732 872,86 C 952.3540669856458,98.3732057416268 1045.244019138756,124.39234449760767 1142,129 C 1238.755980861244,133.60765550239233 1339.377990430622,116.80382775119617 1440,100 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="0.53"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
          ></path>
          <path
            d="M 0,400 L 0,233 C 107.23444976076553,253.97607655502392 214.46889952153116,274.95215311004785 319,272 C 423.53110047846894,269.04784688995215 525.3588516746412,242.1674641148325 605,241 C 684.6411483253588,239.8325358851675 742.0956937799043,264.377990430622 842,269 C 941.9043062200957,273.622009569378 1084.2583732057417,258.32057416267946 1191,249 C 1297.7416267942583,239.67942583732054 1368.870813397129,236.33971291866027 1440,233 L 1440,400 L 0,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="1"
            className="transition-all duration-300 ease-in-out delay-150 path-1"
          ></path>
        </svg>
      </footer>
    </>
  );
};

export default Footer;