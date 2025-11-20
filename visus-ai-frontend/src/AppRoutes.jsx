import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';

// Componentes e Páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageLayout from './components/PageLayout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Profile from './pages/Profile/Profile';
import PatientList from './pages/PatientList/PatientList';
import AnalysisHistory from './pages/AnalysisHistory/AnalysisHistory';
import AnalysisResult from './pages/AnalysisResult/AnalysisResult';
import RegisterPatient from './pages/RegisterPatient/RegisterPatient';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import PatientResult from './pages/PatientAnalysisResult/PatientAnalysisResult';
import NewAnalysis from './pages/NewAnalysis/NewAnalysis';
import RegisterProfessional from './pages/RegisterProfessional/RegisterProfessional';
import AccountCreationSplashScreen from './pages/AccountCreationSplashScreen/AccountCreationSplashScreen';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import EmailSendingSplashScreen from './pages/EmailSendingSplashScreen/EmailSendingSplashScreen';
import PatientLogin from './pages/PatientLogin/PatientLogin';
import PatientDetails from './pages/PatientDetails/PatientDetails';
import ProfessionalDetails from './pages//ProfessionalDetails/ProfessionalDetails';

import apiClient from './api/axiosConfig';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 1. LAZY INITIALIZATION (Para o paciente não perder o login no F5)
  const [patientUser, setPatientUser] = useState(() => {
    const saved = localStorage.getItem('patientUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const navigate = useNavigate();

  // --- Lógica do Profissional ---
  // Lógica de Login com Token
  const handleLogin = async (email, password) => {
    try {
      // NÃO precisamos mais do csrf-cookie
      
      // Chama a NOVA rota de token
      const response = await apiClient.post('/api/login-token', {
        email: email,
        password: password
      });

      // O backend retorna { token: "...", user: {...} }
      const { token, user } = response.data;

      // 1. Salva o token no LocalStorage
      localStorage.setItem('authToken', token);
      
      // 2. Salva o usuário no estado
      setUser(user);
      setIsLoggedIn(true);
      navigate('/dashboard');

    } catch (error) {
      console.error('Erro no login:', error);
      alert('Email ou senha incorretos.');
    }
  };

  const handleLogout = async () => {
    try {
       // Tenta avisar o backend para destruir o token
       await apiClient.post('/api/logout');
    } catch (e) {
       // Se der erro, não importa, vamos deslogar localmente
    } finally {
       // LIMPEZA LOCAL
       localStorage.removeItem('authToken'); // Remove o token
       setUser(null);
       setIsLoggedIn(false);
       navigate('/login');
    }
  };
  // --- Lógica do Paciente ---
  
  // 2. FUNÇÃO DE LOGIN DO PACIENTE (Salva no localStorage)
  const handlePatientLogin = (patientData) => {
    localStorage.setItem('patientUser', JSON.stringify(patientData));
    setPatientUser(patientData);
    // O PatientLogin.jsx deve navegar para '/patient-dashboard' agora!
};

  // 3. FUNÇÃO DE LOGOUT DO PACIENTE
  const handlePatientLogout = () => {
      localStorage.removeItem('patientUser');
      setPatientUser(null);
      navigate('/patient-login');
  };

  // Verificação Inicial (F5)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
           // Tenta buscar o usuário usando o token salvo
           const response = await apiClient.get('/api/user');
           setUser(response.data);
           setIsLoggedIn(true);
        } catch (error) {
           // Token inválido ou expirado
           localStorage.removeItem('authToken');
           setUser(null);
           setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };
    
    checkLoginStatus();
  }, []);

  // 5. BLOQUEIO DE RENDERIZAÇÃO
  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>Carregando...</div>;
  }

  return (
    <div className="app-container">
      {/* Navbar do Profissional */}
      {isLoggedIn && <Navbar onLogout={handleLogout} user={user} />}
      
      {/* Navbar Simplificada do Paciente (Opcional, mas bom para UX) */}
      {!isLoggedIn && patientUser && (
          <div style={{
              padding: '1rem 2rem', 
              background: '#fff', 
              borderBottom: '1px solid #eee', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'fixed', width: '100%', top: 0, zIndex: 100
          }}>
             <span style={{fontWeight: 'bold', color: '#33b9b9', fontSize: '1.1rem'}}>Olá, {patientUser.nome}</span>
             <button onClick={handlePatientLogout} style={{
                 border: '1px solid #ccc', background: 'white', color: '#666', 
                 padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600'
             }}>Sair</button>
          </div>
      )}

      <main className="content-wrap">
        <Routes>
          {/* === ROTAS PÚBLICAS === */}
          <Route path="/login" element={<PageLayout backgroundColor="#ffffffff"><Login onLogin={handleLogin} /></PageLayout>} />
          <Route path="/createAccount" element={<PageLayout backgroundColor="#ffffff"><RegisterProfessional /></PageLayout>} />
          <Route path="/password-reset/:token" element={<PageLayout backgroundColor="#f0f4f8"><PasswordReset /></PageLayout>} />
          <Route path="/accountCreationSuccessful" element={<PageLayout backgroundColor="#fff"><AccountCreationSplashScreen /></PageLayout>} />
          <Route path="/accountRecovery" element={<PageLayout backgroundColor="#fff"><AccountRecovery /></PageLayout>} />
          <Route path="/emailSendSuccess" element={<PageLayout backgroundColor="#fff"><EmailSendingSplashScreen /></PageLayout>} />
          
           {/* ROTA DE LOGIN DO PACIENTE */}
           <Route 
             path="/patient-login" 
             element={
               <PageLayout backgroundColor="#f0f8ff">
                 <PatientLogin onPatientLogin={handlePatientLogin} />
               </PageLayout>
             } 
           />
           
           <Route 
   path="/patient-dashboard" 
   element={
     patientUser ? (
        <PageLayout backgroundColor="#f8f9fa">
           <PatientDashboard patient={patientUser} />
        </PageLayout>
     ) : <Navigate to="/patient-login" />
   } 
/>

{/* Rota: Detalhes (Com ID) */}
<Route
   path="/patientAnalysisResult/:id" 
   element={
     patientUser ? (
       <PageLayout backgroundColor="#fff">
         <PatientResult patient={patientUser} />
       </PageLayout>
     ) : <Navigate to="/patient-login" />
   }
/>

           {/* ROTA DE RESULTADO DO PACIENTE (PROTEGIDA POR patientUser) */}
           <Route
             path="/patientAnalysisResult"
             element={
               patientUser ? (
                 <PageLayout backgroundColor="#fff">
                   <PatientResult patient={patientUser} />
                 </PageLayout>
               ) : (
                 <Navigate to="/patient-login" replace />
               )
             }
           />

           <Route 
  path="/verify-email" 
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
       <PageLayout backgroundColor="#fff">
          <VerifyEmail onLogout={handleLogout} />
       </PageLayout>
    </ProtectedRoute>
  } 
/>


          {/* === ROTAS PROTEGIDAS (SÓ PARA PROFISSIONAIS LOGADOS) === */}
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

      {/* Footer aparece para médico logado OU paciente logado */}
      {(isLoggedIn || patientUser) && <Footer />}
    </div>
  );
}

export default AppRoutes;