import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { username, password },
      });
      if (response.data.length > 0) {
        setIsAuthenticated(true);
        navigate('/events');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError('Ошибка при входе в систему');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Вход в систему</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Логин:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Войти</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
