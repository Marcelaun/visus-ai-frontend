// src/App.js (ATUALIZADO)

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; // Importe o novo componente
import './App.css';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;