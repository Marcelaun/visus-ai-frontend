// src/AppRoutes.jsx (CORRIGIDO)

import {useState, useEffect} from 'react'; // useEffect foi importado
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Profile from './pages/Profile/Profile';
import PageLayout from './components/PageLayout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Importado
import PatientList from './pages/PatientList/PatientList';
import AnalysisHistory from './pages/AnalysisHistory/AnalysisHistory';
import AnalysisResult from './pages/AnalysisResult/AnalysisResult';
import RegisterPatient from './pages/RegisterPatient/RegisterPatient';
import Footer from './components/Footer/Footer';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import PatientResult from './pages/PatientAnalysisResult/PatientAnalysisResult';
import NewAnalysis from './pages/NewAnalysis/NewAnalysis';
import RegisterProfessional from './pages/RegisterProfessional/RegisterProfessional';
import AccountCreationSplashScreen from './pages/AccountCreationSplashScreen/AccountCreationSplashScreen';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import EmailSendingSplashScreen from './pages/EmailSendingSplashScreen/EmailSendingSplashScreen';

// 1. Importe o Axios que configuramos
import apiClient from './api/axiosConfig'; 

function AppRoutes() {
  // 2. Estado inicial é 'false' (começa deslogado)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // (NOVO) Estado para guardar os dados do usuário
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 3. FUNÇÃO DE LOGIN ATUALIZADA
  //    (Agora ela recebe 'email' e 'password' do Login.jsx)
  const handleLogin = async (email, password) => {
    try {
      // (Opcional, mas recomendado) Pede um "cookie" de proteção ao Sanctum
      await apiClient.get('/sanctum/csrf-cookie');
      
      // 4. Tenta fazer o login no Laravel
      await apiClient.post('/api/login', {
        email: email,
        password: password
      });

      // 5. Se o login deu certo, busca os dados do usuário
      const response = await apiClient.get('/api/user');
      setUser(response.data); // Salva os dados do usuário (Dr. João Teste)
      setIsLoggedIn(true);    // Marca como logado
      navigate('/dashboard'); // Redireciona para o dashboard

    } catch (error) {
      // 6. Se o login falhar (senha errada, etc.)
      console.error('Erro no login:', error);
      alert('Email ou senha incorretos.'); // Aviso para o usuário
    }
  };

  // 7. FUNÇÃO DE LOGOUT ATUALIZADA
  const handleLogout = async () => {
    try {
      await apiClient.post('/api/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpa os estados de qualquer jeito
      setUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  // 8. (NOVO) Checa se o usuário JÁ está logado quando a página carrega
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await apiClient.get('/api/user');
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []); // O '[]' significa que isso roda SÓ UMA VEZ

  return (
    <div className="app-container"> 
      {/* A Navbar agora recebe a função de logout real */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <main className="content-wrap">
        <Routes>
          {/* === ROTAS PÚBLICAS === */}
          <Route
            path="/login"
            element={
              <PageLayout backgroundColor="#ffffffff">
                <Login onLogin={handleLogin} /> 
              </PageLayout>
            }
          />
          <Route
            path="/createAccount"
            element={
              <PageLayout backgroundColor="#ffffff">
                <RegisterProfessional />
              </PageLayout>
            }
          />
          <Route
            path="/passwordReset"
            element={
              <PageLayout backgroundColor="#f0f4f8">
                <PasswordReset />
              </PageLayout>
            }
          />
          <Route
            path="/accountCreationSuccessful"
            element={
              <PageLayout backgroundColor="#fff">
                <AccountCreationSplashScreen />
              </PageLayout>
            }
          />
          <Route
            path="/accountRecovery"
            element={
              <PageLayout backgroundColor="#fff">
                <AccountRecovery />
              </PageLayout>
            }
          />
          <Route
            path="/emailSendSuccess"
            element={
              <PageLayout backgroundColor="#fff">
                <EmailSendingSplashScreen />
              </PageLayout>
            }
          />
          <Route
            path="/patientAnalysisResult" // Rota do Paciente (pode precisar de lógica de login diferente)
            element={
              <PageLayout backgroundColor="#fff">
                <PatientResult />
              </PageLayout>
            }
          />

          {/* === ROTAS PROTEGIDAS (SÓ PARA PROFISSIONAIS LOGADOS) === */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#ffffffff">
                  <Dashboard />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patientList"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <PatientList />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patientRegister"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <RegisterPatient />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/newAnalysis"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <NewAnalysis />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysisResult"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <AnalysisResult />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysisHistory"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <AnalysisHistory />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminPanel"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <AdminPanel />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageLayout backgroundColor="#fff">
                  <Profile user={user} /> {/* Passa os dados do usuário para o Perfil */}
                </PageLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Rota Padrão: Redireciona para o login ou dashboard */}
          <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppRoutes;