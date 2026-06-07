import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecuritySystems = () => {
  const [systems, setSystems] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSystems();
    fetchEvents();
  }, []);

  const fetchSystems = async () => {
    const response = await axios.get('http://localhost:5000/securitySystems');
    setSystems(response.data);
  };

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:5000/events');
    setEvents(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/securitySystems/${id}`);
    await axios.post('http://localhost:5000/logs', {
      action: `Удалена система безопасности с ID: ${id}`,
      timestamp: new Date().toISOString(),
    });
    fetchSystems();
  };

  return (
    <div className="container">
      <h1>Системы безопасности</h1>
      <button onClick={() => navigate('/security-systems/add')}>Добавить систему</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Мероприятие</th>
            <th>Порядковый номер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {systems.map((system) => (
            <tr key={system.id}>
              <td>{system.id}</td>
              <td>{system.name}</td>
              <td>{events.find((e) => e.id === system.eventId)?.name}</td>
              <td>{system.orderNumber}</td>
              <td>
                <button onClick={() => navigate(`/security-systems/edit/${system.id}`)}>Редактировать</button>
                <button onClick={() => handleDelete(system.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecuritySystems;
