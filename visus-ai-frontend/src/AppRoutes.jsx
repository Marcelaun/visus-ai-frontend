import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'; // Adicionei useLocation

// Componentes e Páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageLayout from './components/PageLayout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import { ToastContainer } from 'react-toastify'; // <--- IMPORTANTE
import 'react-toastify/dist/ReactToastify.css';  // <-
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Profile from './pages/Profile/Profile';
import PatientList from './pages/PatientList/PatientList';
import AnalysisHistory from './pages/AnalysisHistory/AnalysisHistory';
import AnalysisResult from './pages/AnalysisResult/AnalysisResult';
import RegisterPatient from './pages/RegisterPatient/RegisterPatient';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import PatientResult from './pages/PatientAnalysisResult/PatientAnalysisResult';
import NewAnalysis from './pages/NewAnalysis/NewAnalysis';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import RegisterProfessional from './pages/RegisterProfessional/RegisterProfessional';
import AccountCreationSplashScreen from './pages/AccountCreationSplashScreen/AccountCreationSplashScreen';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import EmailSendingSplashScreen from './pages/EmailSendingSplashScreen/EmailSendingSplashScreen';
import PatientLogin from './pages/PatientLogin/PatientLogin';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import PatientDetails from './pages/PatientDetails/PatientDetails';
import ProfessionalDetails from './pages/ProfessionalDetails/ProfessionalDetails';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'; // <--- IMPORTANTE

import apiClient from './api/axiosConfig';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [patientUser, setPatientUser] = useState(() => {
    const saved = localStorage.getItem('patientUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const navigate = useNavigate();
  const location = useLocation(); // <--- Hook para saber onde estamos

  // --- Lógica do Profissional ---
  const handleLogin = async (email, password) => {
    try {
      // Não precisa mais do csrf-cookie com autenticação por token
      const response = await apiClient.post('/api/login-token', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(userData); 
      setIsLoggedIn(true);    
      
      // O useEffect da "Catraca" vai decidir se vai pro Dashboard ou VerifyEmail
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Email ou senha incorretos.');
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/api/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  // --- A CATRACA DE VERIFICAÇÃO ---
  useEffect(() => {
    // Se temos usuário E ele AINDA NÃO verificou o e-mail...
    if (user && !user.email_verified_at) {
        // ... e ele não está na tela de login nem na de verificação...
        if (location.pathname !== '/verify-email' && location.pathname !== '/login') {
            // ... CHUTA ELE para a verificação!
            navigate('/verify-email');
        }
    }
  }, [user, location, navigate]);


  // --- Lógica do Paciente ---
  const handlePatientLogin = (patientData) => {
      localStorage.setItem('patientUser', JSON.stringify(patientData));
      setPatientUser(patientData);
  };

  const handlePatientLogout = () => {
      localStorage.removeItem('patientUser');
      setPatientUser(null);
      navigate('/patient-login');
  };

  // --- Verificação Inicial (F5) ---
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await apiClient.get('/api/user');
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.removeItem('authToken');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []); 

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>Carregando...</div>;
  }

  return (
    <div className="app-container">
      {isLoggedIn && <Navbar onLogout={handleLogout} user={user} />}
      
     

      <main className="content-wrap">
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route path="/login" element={<PageLayout backgroundColor="#ffffffff"><Login onLogin={handleLogin} /></PageLayout>} />
          <Route path="/createAccount" element={<PageLayout backgroundColor="#ffffff"><RegisterProfessional /></PageLayout>} />
          <Route path="/password-reset/:token" element={<PageLayout backgroundColor="#f0f4f8"><PasswordReset /></PageLayout>} />
          <Route path="/accountCreationSuccessful" element={<PageLayout backgroundColor="#fff"><AccountCreationSplashScreen /></PageLayout>} />
          <Route path="/accountRecovery" element={<PageLayout backgroundColor="#fff"><AccountRecovery /></PageLayout>} />
          <Route path="/emailSendSuccess" element={<PageLayout backgroundColor="#fff"><EmailSendingSplashScreen /></PageLayout>} />
          <Route path="/termsOfUse" element={<PageLayout backgroundColor="#fff"><TermsOfUse /></PageLayout>} />
          <Route path="/privacypolicy" element={<PageLayout backgroundColor="#fff"><PrivacyPolicy /></PageLayout>} />
          
          
          {/* ROTA ESPECIAL: VERIFICAÇÃO DE EMAIL */}
          <Route 
            path="/verify-email" 
            element={
              // Só acessa se estiver logado. O componente VerifyEmail deve ter botão de Reenviar e Logout
              isLoggedIn ? <PageLayout backgroundColor="#fff"><VerifyEmail onLogout={handleLogout} /></PageLayout> : <Navigate to="/login" />
            } 
          />

          {/* ROTAS DO PACIENTE */}
          <Route path="/patient-login" element={<PageLayout backgroundColor="#f0f8ff"><PatientLogin onPatientLogin={handlePatientLogin} /></PageLayout>} />
          <Route path="/patient-dashboard" element={patientUser ? <PageLayout backgroundColor="#f8f9fa"><PatientDashboard patient={patientUser} /></PageLayout> : <Navigate to="/patient-login" />} />
          <Route path="/patientAnalysisResult/:id" element={patientUser ? <PageLayout backgroundColor="#fff"><PatientResult patient={patientUser} /></PageLayout> : <Navigate to="/patient-login" />} />

          {/* ROTAS PROTEGIDAS (MÉDICO) */}
          <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#ffffffff"><Dashboard user={user} /></PageLayout></ProtectedRoute>} />
          <Route path="/patientList" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><PatientList /></PageLayout></ProtectedRoute>} />
          <Route path="/paciente/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><PatientDetails /></PageLayout></ProtectedRoute>} />
          <Route path="/patientRegister" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><RegisterPatient /></PageLayout></ProtectedRoute>} />
          <Route path="/newAnalysis" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><NewAnalysis /></PageLayout></ProtectedRoute>} />
          <Route path="/analysisResult/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><AnalysisResult /></PageLayout></ProtectedRoute>} />
          <Route path="/analysisHistory" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><AnalysisHistory /></PageLayout></ProtectedRoute>} />
          <Route path="/adminPanel" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><AdminPanel /></PageLayout></ProtectedRoute>} />
          <Route path="/admin/professional/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><ProfessionalDetails /></PageLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PageLayout backgroundColor="#fff"><Profile user={user} /></PageLayout></ProtectedRoute>} />

          <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>

      {(isLoggedIn || patientUser) && <Footer user={user} patientUser={patientUser} />}

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{width: "500px"}}
      />
    </div>
  );
}

export default AppRoutes;