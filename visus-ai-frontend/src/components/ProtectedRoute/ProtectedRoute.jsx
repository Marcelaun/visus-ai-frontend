// src/components/ProtectedRoute/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  // Se o usuário NÃO estiver logado, redireciona para a página de login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o componente filho (a página protegida)
  return children;
};

export default ProtectedRoute;