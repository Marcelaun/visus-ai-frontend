// src/AppRoutes.jsx (NOVO ARQUIVO)

import {useState, useEffect, use} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PageLayout from './components/PageLayout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PatientList from './pages/PatientList/PatientList';
import RegisterPatient from './pages/RegisterPatient/RegisterPatient';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import NewAnalysis from './pages/NewAnalysis/NewAnalysis';
import RegisterProfessional from './pages/RegisterProfessional/RegisterProfessional';
import AccountCreationSplashScreen from './pages/AccountCreationSplashScreen/AccountCreationSplashScreen';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import EmailSendingSplashScreen from './pages/EmailSendingSplashScreen/EmailSendingSplashScreen';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    <>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/login"
          element={
            <PageLayout backgroundColor="#ffffffff">
              <Login onLogin={handleLogin} />
            </PageLayout>
          }
        />

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
            <PageLayout backgroundColor="#f0f4f8">
              <RegisterProfessional />
            </PageLayout>
          }
        />

        <Route
          path="/accountCreationSuccessful"
          element={
            <PageLayout backgroundColor="#33B9B9">
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
            <PageLayout backgroundColor="#33B9B9">
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

        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
