import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Productions from './pages/Productions'; 
import SecuritySystems from './pages/SecuritySystems';
import Logs from './pages/Logs';
import ProductionForm from './pages/ProductionForm'; 
import SecuritySystemForm from './pages/SecuritySystemForm';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('userRole')
  );

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/productions" />
        } />

        <Route path="/productions" element={isAuthenticated ? <Productions /> : <Navigate to="/login" />} />
        
        <Route path="/productions/add" element={isAuthenticated && isAdmin ? <ProductionForm /> : <Navigate to="/productions" />} />
        <Route path="/productions/edit/:id" element={isAuthenticated && isAdmin ? <ProductionForm /> : <Navigate to="/productions" />} />

        <Route path="/security-systems" element={isAuthenticated ? <SecuritySystems /> : <Navigate to="/login" />} />
        
        <Route path="/security-systems/add" element={isAuthenticated && isAdmin ? <SecuritySystemForm /> : <Navigate to="/security-systems" />} />
        <Route path="/security-systems/edit/:id" element={isAuthenticated && isAdmin ? <SecuritySystemForm /> : <Navigate to="/security-systems" />} />

       
        <Route path="/logs" element={isAuthenticated && isAdmin ? <Logs /> : <Navigate to="/productions" />} />

        <Route path="/" element={<Navigate to={isAuthenticated ? "/productions" : "/login"} />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
