// src/AppRoutes.jsx (NOVO ARQUIVO)

import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Profile from './pages/Profile/Profile';
import PageLayout from './components/PageLayout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PatientList from './pages/PatientList/PatientList';
import AnalysisHistory from './pages/AnalysisHistory/AnalysisHistory';
import AnalysisResult from './pages/AnalysisResult/AnalysisResult';
import RegisterPatient from './pages/RegisterPatient/RegisterPatient';
import Footer from './components/Footer/Footer';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import NewAnalysis from './pages/NewAnalysis/NewAnalysis';
import RegisterProfessional from './pages/RegisterProfessional/RegisterProfessional';
import AccountCreationSplashScreen from './pages/AccountCreationSplashScreen/AccountCreationSplashScreen';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import EmailSendingSplashScreen from './pages/EmailSendingSplashScreen/EmailSendingSplashScreen';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const navigate = useNavigate(); // 1. Inicialize o hook useNavigate

  const handleLogin = () => {
    console.log('isloggedin_antes_e_mudar: ');
    console.log(isLoggedIn);
    setIsLoggedIn(true);
    console.log('isloggedin_depois_de_mudar: ');
    console.log(isLoggedIn);
    navigate('/dashboard'); // Também é bom ter isso aqui para redirecionar no login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login'); // 2. AQUI ESTÁ A MÁGICA! Navega para /login no logout.
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    // 2. SUBSTITUA O FRAGMENT (<>) PELO CONTAINER PRINCIPAL
    <div className="app-container">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      {/* 3. ADICIONE O WRAPPER DE CONTEÚDO */}
      <main className="content-wrap">
        <Routes>
          {/* Todas as suas rotas <Route ... /> vão aqui dentro */}
          <Route
            path="/login"
            element={
              <PageLayout backgroundColor="#ffffffff">
                <Login onLogin={handleLogin} />
              </PageLayout>
            }
          />
          {/* ... (todas as suas outras rotas) ... */}
          <Route
            path="/dashboard"
            element={
              <PageLayout backgroundColor="#ffffffff">
                <Dashboard />
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
            path="/createAccount"
            element={
              <PageLayout backgroundColor="#ffffff">
                <RegisterProfessional />
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
            path="/patientList"
            element={
              <PageLayout backgroundColor="#fff">
                <PatientList />
              </PageLayout>
            }
          />

          <Route
            path="/patientRegister"
            element={
              <PageLayout backgroundColor="#fff">
                <RegisterPatient />
              </PageLayout>
            }
          />

          <Route
            path="/newAnalysis"
            element={
              <PageLayout backgroundColor="#fff">
                <NewAnalysis />
              </PageLayout>
            }
          />

          <Route
            path="/analysisResult"
            element={
              <PageLayout backgroundColor="#fff">
                <AnalysisResult />
              </PageLayout>
            }
          />

          <Route
            path="/analysisHistory"
            element={
              <PageLayout backgroundColor="#fff">
                <AnalysisHistory />
              </PageLayout>
            }
          />

          <Route
            path="/adminPanel"
            element={
              <PageLayout backgroundColor="#fff">
                <AdminPanel />
              </PageLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <PageLayout backgroundColor="#fff">
                <Profile />
              </PageLayout>
            }
          />

          <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </main>

      {/* 4. ADICIONE O FOOTER FORA DO <main> */}
      <Footer />
    </div>
  );
}

export default AppRoutes;
