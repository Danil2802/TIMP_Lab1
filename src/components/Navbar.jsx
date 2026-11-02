import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#eee', alignItems: 'center' }}>
      <Link to="/productions">Производства</Link>
      <Link to="/security-systems">Системы безопасности</Link>
      {isAdmin && <Link to="/logs">Логи изменений</Link>}
      
      <div style={{ marginLeft: 'auto' }}>
        <span>Пользователь: <b>{username}</b> ({isAdmin ? 'Админ' : 'Юзер'})</span>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Выйти</button>
      </div>
    </nav>
  );
};
export default Navbar;
