import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/events">Мероприятия</Link>
        <Link to="/security-systems">Системы безопасности</Link>
        <Link to="/logs">Логи изменений</Link>
      </div>
    </nav>
  );
};

export default Navbar;
