import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import SecuritySystems from './pages/SecuritySystems';
import Logs from './pages/Logs';
import EventForm from './pages/EventForm';
import SecuritySystemForm from './pages/SecuritySystemForm';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/events" element={isAuthenticated ? <Events /> : <Navigate to="/login" />} />
        <Route path="/events/add" element={isAuthenticated ? <EventForm /> : <Navigate to="/login" />} />
        <Route path="/events/edit/:id" element={isAuthenticated ? <EventForm /> : <Navigate to="/login" />} />
        <Route path="/security-systems" element={isAuthenticated ? <SecuritySystems /> : <Navigate to="/login" />} />
        <Route path="/security-systems/add" element={isAuthenticated ? <SecuritySystemForm /> : <Navigate to="/login" />} />
        <Route path="/security-systems/edit/:id" element={isAuthenticated ? <SecuritySystemForm /> : <Navigate to="/login" />} />
        <Route path="/logs" element={isAuthenticated ? <Logs /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/events" />} />
      </Routes>
    </Router>
  );
}

export default App;
