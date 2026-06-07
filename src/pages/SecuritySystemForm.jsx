import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SecuritySystemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [system, setSystem] = useState({ name: '', eventId: '' });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    if (id) {
      fetchSystem();
    }
  }, [id]);

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:3001/events');
    setEvents(response.data);
  };

  const fetchSystem = async () => {
    const response = await axios.get(`http://localhost:3001/securitySystems/${id}`);
    setSystem(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:3001/securitySystems/${id}`, system);
      await axios.post('http://localhost:3001/logs', {
        action: `Отредактирована система безопасности с ID: ${id}`,
        timestamp: new Date().toISOString(),
      });
    } else {
      const response = await axios.post('http://localhost:3001/securitySystems', system);
      await axios.post('http://localhost:3001/logs', {
        action: `Добавлена система безопасности с ID: ${response.data.id}`,
        timestamp: new Date().toISOString(),
      });
    }
    navigate('/security-systems');
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>{id ? 'Редактировать систему безопасности' : 'Добавить систему безопасности'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название:</label>
            <input
              type="text"
              value={system.name}
              onChange={(e) => setSystem({ ...system, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Мероприятие:</label>
            <select
              value={system.eventId}
              onChange={(e) => setSystem({ ...system, eventId: e.target.value })}
              required
            >
              <option value="">Выберите мероприятие</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} (ID: {event.id})
                </option>
              ))}
            </select>
          </div>
          <button type="submit">{id ? 'Сохранить' : 'Добавить'}</button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySystemForm;
