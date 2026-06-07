import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ name: '', date: '', location: '' });

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    const response = await axios.get(`http://localhost:3001/events/${id}`);
    setEvent(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:3001/events/${id}`, event);
      await axios.post('http://localhost:3001/logs', {
        action: `Отредактировано мероприятие с ID: ${id}`,
        timestamp: new Date().toISOString(),
      });
    } else {
      const response = await axios.post('http://localhost:3001/events', event);
      await axios.post('http://localhost:3001/logs', {
        action: `Добавлено мероприятие с ID: ${response.data.id}`,
        timestamp: new Date().toISOString(),
      });
    }
    navigate('/events');
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>{id ? 'Редактировать мероприятие' : 'Добавить мероприятие'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название:</label>
            <input
              type="text"
              value={event.name}
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Дата:</label>
            <input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Место:</label>
            <input
              type="text"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              required
            />
          </div>
          <button type="submit">{id ? 'Сохранить' : 'Добавить'}</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
